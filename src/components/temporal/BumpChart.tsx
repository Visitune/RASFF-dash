import React, { useEffect, useRef, useMemo } from 'react';
import * as d3 from 'd3';
import { RasffData } from '../../lib/mockData';
import { TrendingUp } from 'lucide-react';

interface BumpChartProps {
  data: RasffData[];
  height?: number;
}

export const BumpChart: React.FC<BumpChartProps> = ({ data, height = 400 }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const bumpData = useMemo(() => {
    if (data.length === 0) return [];

    // 1. Déterminer les semaines
    const weeksMap = new Map<string, Map<string, number>>();
    const allWeeksSet = new Set<string>();
    
    data.forEach(d => {
      if (!d.date) return;
      const date = new Date(d.date);
      const week = d3.timeFormat("%Y-W%V")(date);
      allWeeksSet.add(week);
      
      if (!weeksMap.has(week)) weeksMap.set(week, new Map());
      const countryMap = weeksMap.get(week)!;
      countryMap.set(d.origin, (countryMap.get(d.origin) || 0) + 1);
    });

    const sortedWeeks = Array.from(allWeeksSet).sort().slice(-12); // 12 dernières semaines

    // 2. Identifier le Top 5 global (pour les couleurs)
    const globalCounts: Record<string, number> = {};
    data.forEach(d => { globalCounts[d.origin] = (globalCounts[d.origin] || 0) + 1; });
    const topCountries = Object.entries(globalCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(e => e[0]);

    // 3. Calculer les rangs par semaine
    const result = topCountries.map(country => {
      return {
        country,
        ranks: sortedWeeks.map(week => {
          const weekCountries = Array.from(weeksMap.get(week)?.entries() || [])
            .sort((a, b) => b[1] - a[1]);
          
          const rank = weekCountries.findIndex(e => e[0] === country) + 1;
          return { week, rank: rank > 0 ? rank : null };
        })
      };
    });

    return { result, sortedWeeks };
  }, [data]);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || !bumpData.result) return;

    const width = containerRef.current.clientWidth;
    const margin = { top: 40, right: 100, bottom: 40, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scalePoint()
      .domain(bumpData.sortedWeeks)
      .range([0, innerWidth])
      .padding(0.5);

    const y = d3.scaleLinear()
      .domain([1, 10]) // On limite au top 10
      .range([0, innerHeight]);

    const color = d3.scaleOrdinal(d3.schemeTableau10)
      .domain(bumpData.result.map(d => d.country));

    const line = d3.line<any>()
      .x(d => x(d.week)!)
      .y(d => y(d.rank)!)
      .defined(d => d.rank !== null && d.rank <= 10)
      .curve(d3.curveMonotoneX);

    // Grid lines (horizontal ranks)
    g.selectAll("line.grid")
      .data(d3.range(1, 11))
      .join("line")
      .attr("class", "grid")
      .attr("x1", 0)
      .attr("x2", innerWidth)
      .attr("y1", d => y(d))
      .attr("y2", d => y(d))
      .attr("stroke", "var(--border)")
      .attr("stroke-dasharray", "2,2")
      .attr("opacity", 0.5);

    // Lines
    const countryLine = g.selectAll(".country-line")
      .data(bumpData.result)
      .join("g")
      .attr("class", "country-line");

    countryLine.append("path")
      .attr("d", d => line(d.ranks))
      .attr("fill", "none")
      .attr("stroke", d => color(d.country) as string)
      .attr("stroke-width", 3)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("opacity", 0.8)
      .style("cursor", "pointer")
      .on("mouseenter", function() { d3.select(this).attr("stroke-width", 5).attr("opacity", 1); })
      .on("mouseleave", function() { d3.select(this).attr("stroke-width", 3).attr("opacity", 0.8); });

    // Points
    countryLine.selectAll("circle")
      .data(d => d.ranks.filter(r => r.rank !== null && r.rank <= 10))
      .join("circle")
      .attr("cx", r => x(r.week)!)
      .attr("cy", r => y(r.rank)!)
      .attr("r", 4)
      .attr("fill", function() { 
        return color((d3.select((this as any).parentNode).datum() as any).country) as string; 
      });

    // End labels
    countryLine.append("text")
      .datum(d => ({ 
        country: d.country, 
        last: d.ranks[d.ranks.length - 1] 
      }))
      .attr("x", innerWidth + 10)
      .attr("y", d => d.last.rank ? y(d.last.rank) : 0)
      .attr("dy", "0.35em")
      .attr("fill", d => color(d.country) as string)
      .attr("font-size", "10px")
      .attr("font-weight", "800")
      .style("visibility", d => d.last.rank ? "visible" : "hidden")
      .text(d => d.country);

    // X Axis
    g.append("g")
      .attr("transform", `translate(0,${innerHeight + 20})`)
      .call(d3.axisBottom(x).tickSize(0))
      .call(g => g.select(".domain").remove())
      .selectAll("text")
      .attr("fill", "var(--text-muted)")
      .attr("font-size", "8px")
      .attr("font-weight", "bold");

    // Y labels (Ranks)
    g.selectAll("text.rank-label")
      .data(d3.range(1, 11))
      .join("text")
      .attr("class", "rank-label")
      .attr("x", -15)
      .attr("y", d => y(d))
      .attr("dy", "0.35em")
      .attr("text-anchor", "end")
      .attr("fill", "var(--text-muted)")
      .attr("font-size", "10px")
      .attr("font-weight", "900")
      .text(d => `#${d}`);

  }, [bumpData, height]);

  return (
    <div className="panel p-6" ref={containerRef}>
      <h3 className="section-title mb-1 flex items-center gap-2">
        <TrendingUp size={14} style={{ color: 'var(--blue)' }} /> Dynamique du Classement (12 sem.)
      </h3>
      <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 20 }}>
        Visualisation des transferts de risque. Montrer comment le top 5 des pays d'origine évolue 
        dans le temps. Une ligne qui descend indique un pays qui devient plus problématique.
      </p>
      <svg ref={svgRef} width="100%" height={height} style={{ overflow: 'visible' }} />
    </div>
  );
};
