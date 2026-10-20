import React, { useState, useMemo } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
  ZoomableGroup
} from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
import { getCountryStats, CountryStats, GEO_TOPO_ALIASES } from '../../lib/geoEngine';
import { RasffData } from '../../lib/mockData';
import { motion, AnimatePresence } from 'motion/react';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface WorldMapProps {
  data: RasffData[];
  onCountryClick: (stats: CountryStats) => void;
}

export const WorldMap: React.FC<WorldMapProps> = ({ data, onCountryClick }) => {
  const [mode, setMode] = useState<'count' | 'riskScore'>('count');
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const stats = useMemo(() => getCountryStats(data), [data]);
  
  const colorScale = useMemo(() => {
    const values = stats.map(s => s[mode]);
    const max = Math.max(...values) || 1;
    // Detect light mode from body class
    const isLight = document.body.classList.contains('light');
    const startHex = isLight ? '#e8f0fe' : '#1c1d27';
    const endHex   = mode === 'count' ? '#4285f4' : '#ea4335';
    return scaleLinear<string>()
      .domain([0, max])
      .range([startHex, endHex]);
  }, [stats, mode]);

  return (
    <div className="panel p-6 relative overflow-hidden min-h-[600px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="section-title mb-0">Cartographie des Risques</h3>
        <div className="flex bg-surface-3 rounded-full p-1 border border-border">
          <button 
            onClick={() => setMode('count')}
            className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
              mode === 'count' ? 'bg-blue text-white shadow-md' : 'text-muted hover:text-primary'
            }`}
          >
            Volume
          </button>
          <button 
            onClick={() => setMode('riskScore')}
            className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
              mode === 'riskScore' ? 'bg-red text-white shadow-md' : 'text-muted hover:text-primary'
            }`}
          >
            Risque
          </button>
        </div>
      </div>

      <div className="h-[500px] cursor-grab active:cursor-grabbing">
        <ComposableMap projectionConfig={{ rotate: [-10, 0, 0], scale: 147 }}>
          <ZoomableGroup>
            <Sphere stroke="var(--border)" strokeWidth={0.5} id="sphere" />
            <Graticule stroke="var(--border)" strokeWidth={0.5} />
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryName = geo.properties.name;
                  const dataName = GEO_TOPO_ALIASES[countryName] ?? countryName;
                  const countryStats = stats.find(s => s.name === dataName || s.name === countryName || s.id === geo.id);
                  
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => setHoveredCountry(dataName)}
                      onMouseLeave={() => setHoveredCountry(null)}
                      onClick={() => countryStats && onCountryClick(countryStats)}
                      style={{
                        default: {
                          fill: countryStats ? colorScale(countryStats[mode]) : "var(--surface-2)",
                          stroke: "var(--border)",
                          strokeWidth: 0.5,
                          outline: "none",
                        },
                        hover: {
                          fill: "var(--surface-hover)",
                          stroke: "var(--blue)",
                          strokeWidth: 1,
                          outline: "none",
                          cursor: countryStats ? "pointer" : "default",
                        },
                        pressed: {
                          fill: "var(--surface-3)",
                          outline: "none",
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>

      <AnimatePresence>
        {hoveredCountry && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-6 left-6 pointer-events-none bg-surface-3 border border-border-strong p-4 rounded-xl z-50 shadow-2xl min-w-[150px]"
          >
            <p className="text-primary font-black uppercase text-xs mb-2 tracking-tighter">{hoveredCountry}</p>
            {stats.find(s => s.name === hoveredCountry) ? (
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-muted font-bold uppercase">Cas :</span>
                  <span className="text-blue font-black">{stats.find(s => s.name === hoveredCountry)?.count}</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-muted font-bold uppercase">Risque :</span>
                  <span className="text-red font-black">{stats.find(s => s.name === hoveredCountry)?.riskScore}/100</span>
                </div>
              </div>
            ) : (
              <p className="text-[10px] text-muted font-bold italic">Aucune donnée</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-24 right-8 flex flex-col items-center gap-2">
          <div className="w-1.5 h-32 rounded-full bg-gradient-to-t from-surface-2 via-blue to-blue/40 border border-border relative">
             <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] text-muted font-black uppercase">Max</span>
             <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-muted font-black uppercase">Min</span>
          </div>
      </div>
    </div>
  );
};
