import React from 'react';

type Color = 'cyan' | 'green' | 'orange';

const colorVars: Record<Color, { border: string; shadow: string; bg: string; text: string }> = {
  cyan:   { border: 'rgba(0,245,255,0.40)', shadow: '0 0 20px rgba(0,245,255,0.08), inset 0 0 30px rgba(0,20,50,0.4)', bg: 'rgba(4,18,40,0.92)',  text: '#00f5ff' },
  green:  { border: 'rgba(0,255,136,0.38)', shadow: '0 0 20px rgba(0,255,136,0.07), inset 0 0 30px rgba(0,15,10,0.4)', bg: 'rgba(2,16,10,0.92)', text: '#00ff88' },
  orange: { border: 'rgba(255,136,0,0.50)', shadow: '0 0 20px rgba(255,136,0,0.09), inset 0 0 30px rgba(20,8,0,0.4)',  bg: 'rgba(16,8,0,0.92)',   text: '#ff8800' },
};

interface HudPanelProps {
  color?: Color;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  scanLine?: boolean;
  onClick?: () => void;
}

export default function HudPanel({ color = 'cyan', className = '', style, children, scanLine = false, onClick }: HudPanelProps) {
  const cv = colorVars[color];
  return (
    <div
      onClick={onClick}
      className={`corners relative overflow-hidden ${className}`}
      style={{
        background: cv.bg,
        border: `1px solid ${cv.border}`,
        boxShadow: cv.shadow,
        ...style,
      }}
    >
      {/* 4 corner brackets */}
      <span className="corner-tl" style={{ '--c': cv.text } as React.CSSProperties} />
      <span className="corner-tr" style={{ '--c': cv.text } as React.CSSProperties} />
      <span className="corner-bl" style={{ '--c': cv.text } as React.CSSProperties} />
      <span className="corner-br" style={{ '--c': cv.text } as React.CSSProperties} />
      {/* Scan line */}
      {scanLine && (
        <div className={`scan-line ${color === 'green' ? 'scan-line-green' : ''}`} />
      )}
      {children}
    </div>
  );
}
