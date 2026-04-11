import React, { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import { RasffData } from '../../lib/mockData';
import { Layers } from 'lucide-react';

interface TreemapChartProps {
  data: RasffData[];
  height?: number;
}

export const TreemapChart: React.FC<TreemapChartProps> = ({ data, height = 400 }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const treeData = useMemo(() => {
    const categories: Record<string, Record<string, number>> = {};
    
    data.forEach(d => {
      const cat = d.category || 'Inconnu';
      const origin = d.origin || 'Inconnu';
      if (!categories[cat]) categories[cat] = {};
      categories[cat][origin] = (categories[cat][origin] || 0) + 1;
    });

    const children = Object.entries(categories).map(([cat, origins]) => ({
      name: cat,
      children: Object.entries(origins).map(([origin, count]) => ({
        name: origin,
        value: count
      }))
    }));

    return {
      name: "root",
      children: children
    };
  }, [data]);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || data.length === 0) return;

    const width = containerRef.current.clientWidth;
    const padding = 20;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const root = d3.hierarchy(treeData)
      .sum(d => (d as any).value)
      .sort((a, b) => (b.value || 0) - (a.value || 0));

    d3.treemap()
      .size([width, height])
      .paddingOuter(3)
      .paddingTop(20)
      .paddingInner(1)
      .round(true)
      (root);

    const color = d3.scaleOrdinal()
      .domain(root.children?.map(d => d.data.name) || [])
      .range(d3.quantize(t => d3.interpolateTurbo(t * 0.8 + 0.1), (root.children?.length || 1)));

    const leaf = svg.selectAll("g")
      .data(root.leaves())
      .join("g")
      .attr("transform", d => `translate(${d.x0},${d.y0})`);

    leaf.append("rect")
      .attr("fill", d => color(d.parent?.data.name) as string)
      .attr("fill-opacity", 0.7)
      .attr("width", d => d.x1 - d.x0)
      .attr("height", d => d.y1 - d.y0)
      .attr("rx", 2)
      .style("cursor", "crosshair")
      .on("mouseenter", function() { d3.select(this).attr("fill-opacity", 1); })
      .on("mouseleave", function() { d3.select(this).attr("fill-opacity", 0.7); });

    leaf.append("title")
      .text(d => `${d.parent?.data.name}\nOrigine: ${d.data.name}\nAlertes: ${d.value}`);

    leaf.append("text")
      .attr("x", 4)
      .attr("y", 13)
      .attr("fill", "white")
      .attr("font-size", "9px")
      .attr("font-weight", "500")
      .style("pointer-events", "none")
      .text(d => {
        const w = d.x1 - d.x0;
        const name = d.data.name;
        return w > 30 ? name.substring(0, Math.floor(w / 6)) : "";
      });

    // Label pour les parents (catégories)
    svg.selectAll("text.parent")
      .data(root.children || [])
      .join("text")
      .attr("class", "parent")
      .attr("x", d => d.x0 + 5)
      .attr("y", d => d.y0 + 13)
      .attr("fill", "var(--text-secondary)")
      .attr("font-size", "10px")
      .attr("font-weight", "bold")
      .text(d => {
        const w = d.x1 - d.x0;
        return w > 60 ? d.data.name : "";
      });

  }, [treeData, height]);

  return (
    <div className="panel p-6" ref={containerRef}>
      <h3 className="section-title mb-1 flex items-center gap-2">
        <Layers size={14} style={{ color: 'var(--blue)' }} /> Treemap Catégories & Origines
      </h3>
      <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 20 }}>
        Vue hiérarchique : chaque grand rectangle représente une catégorie de produit, 
        subdivisée par pays d'origine au prorata du volume d'alertes.
      </p>
      <div style={{ position: 'relative' }}>
        <svg ref={svgRef} width="100%" height={height} style={{ overflow: 'visible' }} />
      </div>
    </div>
  );
};
