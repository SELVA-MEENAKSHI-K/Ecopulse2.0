const PARTICLES = ['🌱', '♻️', '🍃', '💧', '⚡', '🌿', '☀️'];

export default function ParticleSystem() {
  const particles = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    symbol: PARTICLES[i % PARTICLES.length],
    x: Math.random() * 100,
    duration: 14 + Math.random() * 10,
    delay: Math.random() * 16,
    size: 11 + Math.random() * 7,
    opacity: 0.15 + Math.random() * 0.2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute bottom-0 select-none"
          style={{
            left: `${p.x}%`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animationName: 'p-float',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            filter: 'drop-shadow(0 0 4px rgba(0,245,255,0.3))',
          }}
        >
          {p.symbol}
        </div>
      ))}
    </div>
  );
}
