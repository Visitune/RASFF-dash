import React, { useEffect, useRef, useMemo, useState } from 'react';
import * as d3 from 'd3';
import { Target, Layers, ArrowLeft } from 'lucide-react';
import { RasffData } from '../../lib/mockData';

interface Props {
  data: RasffData[];
}

interface HierarchyNode {
  name: string;
  value?: number;
  children?: HierarchyNode[];
}

export const ZoomableCirclePacking: React.FC<Props> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentNode, setCurrentNode] = useState<string>("Réseau RASFF Complet");

  // Transformation des données en hiérarchie (Monde > Pays > Catégorie > Danger)
  const hierarchicalData = useMemo(() => {
    const root: HierarchyNode = { name: "Monde", children: [] };
    if (data.length === 0) return root;

    // 1. Top 15 pays pour la clarté visuelle
    const counts: Record<string, number> = {};
    data.forEach(d => { counts[d.origin] = (counts[d.origin] || 0) + 1; });
    const topCountries = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 15)
      .map(entry => entry[0]);

    const countryMap = new Map<string, any>();

    data.filter(d => topCountries.includes(d.origin)).forEach(d => {
      // Noeud Pays
      let countryNode = countryMap.get(d.origin);
      if (!countryNode) {
        countryNode = { name: d.origin, children: [], childrenMap: new Map() };
        countryMap.set(d.origin, countryNode);
        root.children!.push(countryNode);
      }

      // Noeud Catégorie
      let categoryNode = countryNode.childrenMap.get(d.category);
      if (!categoryNode) {
        categoryNode = { name: d.category, children: [], childrenMap: new Map() };
        countryNode.childrenMap.set(d.category, categoryNode);
        countryNode.children.push(categoryNode);
      }

      // Feuille: Danger
      let hazardNode = categoryNode.childrenMap.get(d.hazard);
      if (!hazardNode) {
        hazardNode = { name: d.hazard, value: 0 };
        categoryNode.childrenMap.set(d.hazard, hazardNode);
        categoryNode.children.push(hazardNode);
      }
      hazardNode.value += 1;
    });

    // Nettoyage des maps temporaires
    const cleanHierarchy = (node: any) => {
      delete node.childrenMap;
      if (node.children) {
        node.children.forEach(cleanHierarchy);
      }
    };
    cleanHierarchy(root);

    return root;
  }, [data]);

  useEffect(() => {
    if (!containerRef.current || !hierarchicalData.children?.length) return;

    // Nettoyage du canvas précédent
    d3.select(containerRef.current).select("svg").remove();

    const width = containerRef.current.clientWidth;
    const height = 550; // Hauteur fixe du canvas
    const margin = 20;

    // Couleurs basées sur le mode "dark theme" du dashboard
    const color = d3.scaleLinear<string>()
      .domain([0, 3])
      .range(["rgba(66, 133, 244, 0.1)", "rgba(66, 133, 244, 0.8)"])
      .interpolate(d3.interpolateHcl);

    const pack = d3.pack<HierarchyNode>()
      .size([width - margin, height - margin])
      .padding(4);

    const root = d3.hierarchy<HierarchyNode>(hierarchicalData)
      .sum(d => d.value || 0)
      .sort((a, b) => (b.value || 0) - (a.value || 0));

    const nodes = pack(root).descendants();

    // Conteneur principal
    const svg = d3.select(containerRef.current)
      .append("svg")
      .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
      .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto; height: intrinsic; background: transparent; cursor: pointer; display: block; margin: 0 auto;");

    let focus = root;
    let view: [number, number, number];

    // Groupe pour gérér les cercles
    const node = svg.append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
        .attr("fill", d => d.children ? color(d.depth) : "var(--surface-hover)")
        .attr("stroke", d => d.children ? "var(--border)" : "transparent")
        .attr("stroke-width", 1)
        .attr("pointer-events", d => !d.children ? "none" : null)
        .style("transition", "filter 0.2s, stroke-width 0.2s")
        .on("mouseover", function() { d3.select(this).attr("stroke", "var(--text-primary)").attr("stroke-width", 2); })
        .on("mouseout", function() { d3.select(this).attr("stroke", (d: any) => d.children ? "var(--border)" : "transparent").attr("stroke-width", 1); })
        .on("click", (event, d) => focus !== d && (zoom(event, d), event.stopPropagation()));

    // Groupe pour les étiquettes
    const label = svg.append("g")
      .style("font", "11px Inter, sans-serif")
      .style("font-weight", "600")
      .style("fill", "var(--text-primary)")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(nodes)
      .join("text")
        .style("fill-opacity", d => d.parent === root ? 1 : 0)
        .style("display", d => d.parent === root ? "inline" : "none")
        .text(d => d.data.name + (d.value && !d.children ? ` (${d.value})` : ""));

    // Zoom sur l'arrière-plan remonte à la racine
    svg.on("click", (event) => zoom(event, root));

    zoomTo([root.x, root.y, root.r * 2 + margin]);

    function zoomTo(v: [number, number, number]) {
      const k = Math.min(width, height) / v[2];
      view = v;
      label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
      node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
      node.attr("r", d => d.r * k);
    }

    function zoom(event: any, d: any) {
      focus = d;
      
      // Update breadcrumb state in React
      const path = [];
      let current = d;
      while (current.parent) {
        path.unshift(current.data.name);
        current = current.parent;
      }
      setCurrentNode(path.length > 0 ? path.join(" / ") : "Réseau RASFF Complet");

      const transition = svg.transition()
        .duration(750)
        .tween("zoom", () => {
          const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
          return (t) => zoomTo(i(t));
        });

      label
        .filter(function(d: any) { return d.parent === focus || (this as any).style.display === "inline"; })
        .transition(transition)
        .style("fill-opacity", d => d.parent === focus ? 1 : 0)
        .on("start", function(d: any) { if (d.parent === focus) (this as any).style.display = "inline"; })
        .on("end", function(d: any) { if (d.parent !== focus) (this as any).style.display = "none"; });
    }
  }, [hierarchicalData]);

  return (
    <div className="panel p-6">
      <div className="mb-4">
        <h3 className="section-title mb-1 flex items-center gap-2">
          <Target size={14} style={{ color: 'var(--blue)' }} /> Exploration Multi-Niveaux : Pays &gt; Catégories &gt; Dangers
        </h3>
        <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 20 }}>
          Visualisation granulaire du réseau. <strong>Cliquez sur un cercle pour zoomer</strong> et explorer sa profondeur. Cliquez dans le fond vide pour revenir à la vue globale.
        </p>

        <div className="flex items-center gap-3 bg-surface-2 p-3 border border-border rounded-xl">
          <div className="w-8 h-8 rounded-lg bg-[rgba(66,133,244,0.1)] flex items-center justify-center text-blue shrink-0">
            {currentNode === "Réseau RASFF Complet" ? <Layers size={14} /> : <ArrowLeft size={14} />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[9px] font-black uppercase text-muted tracking-widest mb-0.5">Niveau Actuel</p>
            <p className="text-sm font-bold text-primary truncate">
              {currentNode}
            </p>
          </div>
        </div>
      </div>
      
      <div 
        ref={containerRef} 
        style={{ width: '100%', height: 550, position: 'relative' }} 
      />
    </div>
  );
};

export default ZoomableCirclePacking;
