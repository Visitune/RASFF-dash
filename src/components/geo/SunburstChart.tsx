import React, { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import { RasffData } from '../../lib/mockData';
import { Target } from 'lucide-react';

interface SunburstChartProps {
  data: RasffData[];
  height?: number;
}

export const SunburstChart: React.FC<SunburstChartProps> = ({ data, height = 500 }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const flatHierarchy = useMemo(() => {
    const root: any = { name: "RASFF", children: [] };
    const countryMap = new Map();

    // On limite au Top 10 pays pour la lisibilité
    const counts: Record<string, number> = {};
    data.forEach(d => { counts[d.origin] = (counts[d.origin] || 0) + 1; });
    const topCountries = Object.entries(counts)
      .sort((a, b) => (b[1] as number) - (a[1] as number))
      .slice(0, 10)
      .map(entry => entry[0]);

    data.filter(d => topCountries.includes(d.origin)).forEach(d => {
      let countryNode = countryMap.get(d.origin);
      if (!countryNode) {
        countryNode = { name: d.origin, children: [], childrenMap: new Map() };
        countryMap.set(d.origin, countryNode);
        root.children.push(countryNode);
      }

      let catNode = countryNode.childrenMap.get(d.category);
      if (!catNode) {
        catNode = { name: d.category, children: [], childrenMap: new Map() };
        countryNode.childrenMap.set(d.category, catNode);
        countryNode.children.push(catNode);
      }

      let hazardNode = catNode.childrenMap.get(d.hazard);
      if (!hazardNode) {
        hazardNode = { name: d.hazard, value: 0 };
        catNode.childrenMap.set(d.hazard, hazardNode);
        catNode.children.push(hazardNode);
      }
      hazardNode.value += 1;
    });

    return root;
  }, [data]);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || data.length === 0) return;

    const width = containerRef.current.clientWidth;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg.append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const partition = (data: any) => {
      const root = d3.hierarchy(data)
        .sum(d => d.value)
        .sort((a, b) => (b.value || 0) - (a.value || 0));
      return d3.partition()
        .size([2 * Math.PI, root.height + 1])
        (root);
    };

    // Palette plus sobre et contrastée
    const color = d3.scaleOrdinal(d3.schemeTableau10);
    const format = d3.format(",d");

    const arc = d3.arc<any>()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.01))
      .padRadius(radius * 1.5)
      .innerRadius(d => d.y0 * radius / 4)
      .outerRadius(d => Math.max(d.y0 * radius / 4, d.y1 * radius / 4 - 1));

    const root = partition(flatHierarchy);
    root.each((d: any) => d.current = d);

    const path = g.append("g")
      .selectAll("path")
      .data(root.descendants().slice(1))
      .join("path")
      .attr("fill", (d: any) => {
        while (d.depth > 1) d = d.parent;
        return color(d.data.name) as string;
      })
      .attr("fill-opacity", (d: any) => arcVisible(d.current) ? (d.children ? 0.8 : 0.6) : 0)
      .attr("pointer-events", (d: any) => arcVisible(d.current) ? "auto" : "none")
      .attr("stroke", "var(--surface-1)")
      .attr("stroke-width", "0.5")
      .attr("d", (d: any) => arc(d.current));

    path.filter((d: any) => d.children)
      .style("cursor", "pointer")
      .on("click", clicked);

    path.append("title")
      .text((d: any) => `${d.ancestors().map((d: any) => d.data.name).reverse().join("/")}\n${format(d.value)}`);

    const label = g.append("g")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .style("user-select", "none")
      .selectAll("text")
      .data(root.descendants().slice(1))
      .join("text")
      .attr("dy", "0.35em")
      .attr("fill", "white")
      .attr("fill-opacity", (d: any) => +labelVisible(d.current))
      .attr("transform", (d: any) => labelTransform(d.current))
      .attr("font-size", "10px")
      .attr("font-weight", "800")
      .style("text-shadow", "0 1px 2px rgba(0,0,0,0.5)")
      .text((d: any) => d.data.name);

    const parent = g.append("circle")
      .datum(root)
      .attr("r", radius / 4)
      .attr("fill", "var(--surface-2)")
      .attr("pointer-events", "all")
      .style("cursor", "pointer")
      .on("click", clicked);

    // Texte central dynamique
    const centralText = g.append("text")
      .attr("text-anchor", "middle")
      .attr("pointer-events", "none")
      .attr("fill", "var(--text-primary)")
      .style("font-weight", "900")
      .style("font-size", "11px");

    centralText.append("tspan")
      .attr("x", 0)
      .attr("dy", "-0.2em")
      .text("RASFF Total");
    
    centralText.append("tspan")
      .attr("x", 0)
      .attr("dy", "1.4em")
      .attr("fill", "var(--blue)")
      .text(format(root.value as number));

    function clicked(event: any, p: any) {
      parent.datum(p.parent || root);

      // Mise à jour du texte central
      centralText.selectAll("tspan").remove();
      centralText.append("tspan")
        .attr("x", 0)
        .attr("dy", p.depth > 0 ? "-0.5em" : "-0.2em")
        .text(p.data.name === "RASFF" ? "Global" : p.data.name.substring(0, 15));
      
      centralText.append("tspan")
        .attr("x", 0)
        .attr("dy", "1.4em")
        .attr("fill", "var(--blue)")
        .text(format(p.value));

      if (p.depth > 0) {
        centralText.append("tspan")
          .attr("x", 0)
          .attr("dy", "1.4em")
          .attr("fill", "var(--text-muted)")
          .style("font-size", "8px")
          .style("font-weight", "400")
          .text("Cliquer pour retour");
      }

      root.each((d: any) => d.target = {
        x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
        x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
        y0: Math.max(0, d.y0 - p.depth),
        y1: Math.max(0, d.y1 - p.depth)
      });

      const t = g.transition().duration(750);

      path.transition(t)
        .tween("data", (d: any) => {
          const i = d3.interpolate(d.current, d.target);
          return (t: any) => d.current = i(t);
        })
        .filter(function(d: any) {
          return +(this as any).getAttribute("fill-opacity") || arcVisible(d.target);
        })
        .attr("fill-opacity", (d: any) => arcVisible(d.target) ? (d.children ? 0.8 : 0.6) : 0)
        .attr("pointer-events", (d: any) => arcVisible(d.target) ? "auto" : "none")
        .attrTween("d", (d: any) => () => arc(d.current) as string);

      label.filter(function(d: any) {
        return +(this as any).getAttribute("fill-opacity") || labelVisible(d.target);
      }).transition(t)
        .attr("fill-opacity", (d: any) => +labelVisible(d.target))
        .attrTween("transform", (d: any) => () => labelTransform(d.current));
    }

    function arcVisible(d: any) {
      return d.y1 <= 4 && d.y0 >= 1 && d.x1 > d.x0;
    }

    function labelVisible(d: any) {
      return d.y1 <= 4 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.05;
    }

    function labelTransform(d: any) {
      const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
      const y = (d.y0 + d.y1) / 2 * radius / 4;
      return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    }

  }, [flatHierarchy, height]);

  return (
    <div className="panel p-6" ref={containerRef}>
      <h3 className="section-title mb-1 flex items-center gap-2">
        <Target size={14} style={{ color: 'var(--blue)' }} /> Exploration Hiérarchique (Fil d'Ariane Central)
      </h3>
      <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 20 }}>
        Visualisation sémantique des risques. Cliquez sur un segment pour explorer la hiérarchie. 
        Le centre indique votre position actuelle et le volume associé.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <svg ref={svgRef} width="100%" height={height} style={{ maxWidth: height }} />
      </div>
    </div>
  );
};
