import React, { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import { PropagationLink } from '../../lib/propagationEngine';
import { TrendingUp } from 'lucide-react';

interface Props { 
  links: PropagationLink[]; 
}

export const PropagationGraph: React.FC<Props> = ({ links }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const graphData = useMemo(() => {
    const nodeNames = new Set<string>();
    links.forEach(l => { 
      nodeNames.add(l.from); 
      nodeNames.add(l.to); 
    });
    
    return {
      nodes: Array.from(nodeNames).map(id => ({ id })),
      edges: links.map(l => ({
        source: l.from, 
        target: l.to,
        strength: l.correlation, 
        lag: l.lagWeeks, 
        confidence: l.confidence,
      })),
    };
  }, [links]);

  useEffect(() => {
    if (!svgRef.current || graphData.nodes.length === 0) return;
    
    const container = svgRef.current.parentElement;
    const W = container?.clientWidth || 700;
    const H = 450;
    
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    // Définition des flèches
    svg.append('defs').append('marker')
      .attr('id', 'arrow')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 22) // Eloigne la flèche du centre du nœud
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('fill', 'var(--orange)')
      .attr('d', 'M0,-5L10,0L0,5');

    const simulation = d3.forceSimulation(graphData.nodes as any)
      .force('link', d3.forceLink(graphData.edges as any)
        .id((d: any) => d.id)
        .distance(140)
        .strength((d: any) => d.strength * 0.5))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(W / 2, H / 2))
      .force('collision', d3.forceCollide(45));

    const link = svg.append('g')
      .selectAll('line')
      .data(graphData.edges)
      .join('line')
      .attr('stroke', (d: any) =>
        d.confidence === 'high' ? 'var(--red)' : d.confidence === 'medium' ? 'var(--orange)' : 'var(--text-muted)')
      .attr('stroke-opacity', (d: any) => 0.25 + d.strength * 0.6)
      .attr('stroke-width', (d: any) => 1 + d.strength * 5)
      .attr('marker-end', 'url(#arrow)');

    link.append('title').text((d: any) =>
      `${(d.source as any).id} → ${(d.target as any).id}\nDélai : ${d.lag} sem. | r=${d.strength.toFixed(2)}`);

    const node = svg.append('g')
      .selectAll('g')
      .data(graphData.nodes as any)
      .join('g')
      .call((d3.drag() as any)
        .on('start', (e: any, d: any) => { 
          if (!e.active) simulation.alphaTarget(0.3).restart(); 
          d.fx = d.x; d.fy = d.y; 
        })
        .on('drag', (e: any, d: any) => { d.fx = e.x; d.fy = e.y; })
        .on('end', (e: any, d: any) => { 
          if (!e.active) simulation.alphaTarget(0); 
          d.fx = null; d.fy = null; 
        }));

    node.append('circle')
      .attr('r', 20)
      .attr('fill', 'var(--surface-3)')
      .attr('stroke', 'var(--blue)')
      .attr('stroke-width', 2)
      .style('cursor', 'grab');

    node.append('text')
      .text((d: any) => d.id.split(' ')[0])
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('font-size', 9)
      .attr('font-weight', '900')
      .attr('fill', 'var(--text-primary)')
      .style('pointer-events', 'none')
      .style('text-transform', 'uppercase');

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);
        
      node.attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    return () => simulation.stop();
  }, [graphData]);

  return (
    <div className="panel p-6 mt-4 relative overflow-hidden">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="section-title mb-1 flex items-center gap-2">
            <TrendingUp size={14} style={{ color: 'var(--blue)' }} /> Graphe de Propagation Temporelle (H6)
          </h3>
          <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 20 }}>
            Détection des liens de causalité. Les flèches indiquent qu'une hausse d'alertes dans le pays source 
            est statistiquement suivie d'une hausse dans le pays cible (corrélation croisée décalée).
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red" />
            <span className="text-[9px] font-bold text-muted uppercase">Haute Confiance</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange" />
            <span className="text-[9px] font-bold text-muted uppercase">Moyenne</span>
          </div>
        </div>
      </div>
      
      <div className="min-w-[700px] h-[450px]">
        <svg ref={svgRef} width="100%" height="450" className="overflow-visible" />
      </div>
      
      <div className="absolute bottom-6 right-6 p-4 bg-surface-2/50 backdrop-blur rounded-xl border border-border max-w-[200px]">
        <p className="text-[9px] text-muted leading-relaxed font-bold italic">
          Tip: Faites glisser les pays pour réorganiser le graphe. Survolez les liens pour voir les délais.
        </p>
      </div>
    </div>
  );
};
