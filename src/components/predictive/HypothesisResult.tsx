import React from 'react';
import { HypothesisResultData } from '../../lib/hypothesisEngine';
import { CheckCircle2, XCircle, HelpCircle, Activity } from 'lucide-react';
import { motion } from 'motion/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface HypothesisResultProps {
  result: HypothesisResultData;
}

export const HypothesisResult: React.FC<HypothesisResultProps> = ({ result }) => {
  const getVerdictConfig = () => {
    switch (result.verdict) {
      case 'confirmee':
        return { color: 'var(--green)', icon: CheckCircle2, text: 'Confirmee' };
      case 'infirmee':
        return { color: 'var(--red)', icon: XCircle, text: 'Infirmee' };
      case 'incertaine':
        return { color: 'var(--orange)', icon: HelpCircle, text: 'Incertaine' };
    }
  };

  const config = getVerdictConfig();
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="panel p-6 h-full flex flex-col"
    >
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="flex-1 min-w-0">
          <h3 className="section-title mb-2 flex items-center gap-2">
            <Activity size={13} style={{ color: 'var(--blue)' }} /> Verdict du modele
          </h3>
          <p className="text-xs text-secondary leading-relaxed font-medium">{result.summary}</p>
        </div>

        <div className="flex flex-col items-end gap-2 shrink-0">
          <div
            className="flex items-center gap-2 px-4 py-2 rounded border"
            style={{
              borderColor: config.color,
              background: `${config.color}18`,
              color: config.color,
            }}
          >
            <Icon size={16} />
            <span className="font-black uppercase tracking-widest text-xs">{config.text}</span>
          </div>
          <div className="text-[10px] text-muted text-right font-bold uppercase">
            Confiance :{' '}
            <span className="font-black" style={{ color: 'var(--text-primary)' }}>
              {result.confidenceScore}%
            </span>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 200 }}>
        {result.chartData && result.chartData.length > 0 && (
          <div style={{ height: 240 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={result.chartData}
                layout={result.id === 'H2' || result.id === 'H4' ? 'vertical' : 'horizontal'}
                margin={{ top: 4, right: 16, left: 0, bottom: 4 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                {result.id === 'H2' || result.id === 'H4' ? (
                  <>
                    <XAxis
                      type="number"
                      stroke="var(--chart-axis)"
                      fontSize={11}
                      tick={{ fill: 'var(--chart-text)' }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      dataKey={result.id === 'H2' ? 'origin' : 'category'}
                      type="category"
                      width={120}
                      stroke="var(--chart-axis)"
                      fontSize={10}
                      tick={{ fill: 'var(--chart-text)' }}
                      tickLine={false}
                      axisLine={false}
                    />
                  </>
                ) : (
                  <>
                    <XAxis
                      dataKey="name"
                      stroke="var(--chart-axis)"
                      fontSize={11}
                      tick={{ fill: 'var(--chart-text)' }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="var(--chart-axis)"
                      fontSize={11}
                      tick={{ fill: 'var(--chart-text)' }}
                      tickLine={false}
                      axisLine={false}
                    />
                  </>
                )}
                <Tooltip
                  cursor={{ fill: 'var(--surface-hover)' }}
                  contentStyle={{
                    background: 'var(--surface-3)',
                    border: '1px solid var(--border-strong)',
                    borderRadius: 4,
                    fontSize: 11,
                    color: 'var(--text-primary)',
                  }}
                />
                <Bar
                  dataKey={result.id === 'H2' ? 'ratio' : 'value'}
                  fill="var(--blue)"
                  radius={[2, 2, 0, 0]}
                  maxBarSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </motion.div>
  );
};
