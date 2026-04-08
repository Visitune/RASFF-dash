import React, { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import { 
  sankey as d3Sankey, 
  sankeyLinkHorizontal as d3SankeyLinkHorizontal, 
  sankeyCenter as d3SankeyCenter 
} from 'd3-sankey';
import { RasffData } from '../../lib/mockData';

interface SankeyDiagramProps {
  data: RasffData[];
}

export const SankeyDiagram: React.FC<SankeyDiagramProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const sankeyData = useMemo(() => {
    const nodes: any[] = [];
    const links: any[] = [];
    const nodeMap = new Map<string, number>();

    const addNode = (name: string) => {
      if (!nodeMap.has(name)) {
        nodeMap.set(name, nodes.length);
        nodes.push({ name });
      }
      return nodeMap.get(name)!;
    };

    // Prefix each node name with its layer to prevent same-name nodes
    // collapsing across layers (which d3-sankey treats as circular links)
    data.slice(0, 100).forEach(d => {
      const originIdx  = addNode(`orig::${d.origin}`);
      const categoryIdx = addNode(`cat::${d.category}`);
      const hazardIdx  = addNode(`haz::${d.hazard.substring(0, 30)}`);

      // Guard: skip self-loops that would still be circular
      if (originIdx === categoryIdx || categoryIdx === hazardIdx) return;

      const link1 = links.find(l => l.source === originIdx && l.target === categoryIdx);
      if (link1) link1.value++;
      else links.push({ source: originIdx, target: categoryIdx, value: 1 });

      const link2 = links.find(l => l.source === categoryIdx && l.target === hazardIdx);
      if (link2) link2.value++;
      else links.push({ source: categoryIdx, target: hazardIdx, value: 1 });
    });

    return { nodes, links };
  }, [data]);

  useEffect(() => {
    if (!svgRef.current || sankeyData.nodes.length === 0) return;

    const width = 800;
    const height = 500;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const sankey = (d3Sankey() as any)
      .nodeWidth(15)
      .nodePadding(10)
      .extent([[1, 1], [width - 1, height - 6]]);

    const { nodes, links } = sankey(sankeyData);

    const link = svg.append("g")
      .attr("fill", "none")
      .attr("stroke-opacity", 0.2)
      .selectAll("g")
      .data(links)
      .join("g")
      .style("mix-blend-mode", "multiply");

    const gradient = link.append("linearGradient")
      .attr("id", (d: any) => `gradient-${d.index}`)
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", (d: any) => d.source.x1)
      .attr("x2", (d: any) => d.target.x0);

    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#6366f1");

    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#f43f5e");

    link.append("path")
      .attr("d", d3SankeyLinkHorizontal())
      .attr("stroke", (d: any) => `url(#gradient-${d.index})`)
      .attr("stroke-width", (d: any) => Math.max(1, d.width));

    link.append("title")
      .text((d: any) => `${d.source.name} → ${d.target.name}\n${d.value} alertes`);

    const node = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g");

    node.append("rect")
      .attr("x", (d: any) => d.x0)
      .attr("y", (d: any) => d.y0)
      .attr("height", (d: any) => d.y1 - d.y0)
      .attr("width", (d: any) => d.x1 - d.x0)
      .attr("fill", "var(--surface-3)")
      .attr("stroke", "var(--border-strong)")
      .attr("rx", 2);

    node.append("text")
      .attr("x", (d: any) => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
      .attr("y", (d: any) => (d.y1 + d.y0) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", (d: any) => d.x0 < width / 2 ? "start" : "end")
      .attr("fill", "var(--chart-text)")
      .attr("font-size", "10px")
      .attr("font-weight", "bold")
      .text((d: any) => d.name.replace(/^(orig|cat|haz)::/, ''));

  }, [sankeyData]);

  return (
    <div className="panel p-6 overflow-x-auto">
      <h3 className="section-title mb-6">Provenance → Catégorie → Danger</h3>
      <div className="min-w-[800px]">
        <svg ref={svgRef} width="800" height="500" />
      </div>
    </div>
  );
};
