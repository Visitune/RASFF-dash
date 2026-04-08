import React, { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import { RasffData } from '../../lib/mockData';
import { getOriginToNotifyingFlows } from '../../lib/geoEngine';

interface ChordDiagramProps {
  data: RasffData[];
}

export const ChordDiagram: React.FC<ChordDiagramProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const chordData = useMemo(() => {
    const flows = getOriginToNotifyingFlows(data).slice(0, 50);
    const entities = Array.from(new Set([...flows.map(f => f.origin), ...flows.map(f => f.destination)]));
    const matrix = Array.from({ length: entities.length }, () => Array(entities.length).fill(0));

    flows.forEach(f => {
      const source = entities.indexOf(f.origin);
      const target = entities.indexOf(f.destination);
      matrix[source][target] += f.value;
    });

    return { matrix, entities };
  }, [data]);

  useEffect(() => {
    if (!svgRef.current || chordData.entities.length === 0) return;

    const width = 600;
    const height = 600;
    const innerRadius = Math.min(width, height) * 0.4;
    const outerRadius = innerRadius + 10;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const chord = d3.chord()
      .padAngle(0.04)
      .sortSubgroups(d3.descending);

    const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const ribbon = d3.ribbon()
      .radius(innerRadius);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const g = svg.append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const chords = chord(chordData.matrix);

    const group = g.append("g")
      .selectAll("g")
      .data(chords.groups)
      .join("g");

    group.append("path")
      .attr("fill", d => color(d.index.toString()))
      .attr("stroke", d => d3.rgb(color(d.index.toString())).darker().toString())
      .attr("d", arc as any);

    group.append("text")
      .each(d => { (d as any).angle = (d.startAngle + d.endAngle) / 2; })
      .attr("dy", ".35em")
      .attr("transform", d => `
        rotate(${(d as any).angle * 180 / Math.PI - 90})
        translate(${outerRadius + 10})
        ${(d as any).angle > Math.PI ? "rotate(180)" : ""}
      `)
      .attr("text-anchor", d => (d as any).angle > Math.PI ? "end" : "start")
      .attr("fill", "var(--chart-text)")
      .attr("font-size", "10px")
      .attr("font-weight", "bold")
      .text(d => chordData.entities[d.index]);

    g.append("g")
      .attr("fill-opacity", 0.6)
      .selectAll("path")
      .data(chords)
      .join("path")
      .attr("d", ribbon as any)
      .attr("fill", d => color(d.source.index.toString()))
      .attr("stroke", d => d3.rgb(color(d.source.index.toString())).darker().toString())
      .append("title")
      .text(d => `${chordData.entities[d.source.index]} → ${chordData.entities[d.target.index]}: ${d.source.value} alertes`);

  }, [chordData]);

  return (
    <div className="panel p-6 flex flex-col items-center">
      <h3 className="section-title mb-6">Flux : Pays Origine ↔ Pays Notifiant</h3>
      <div className="w-full max-w-[600px]">
        <svg ref={svgRef} width="600" height="600" viewBox="0 0 600 600" />
      </div>
    </div>
  );
};
