import React, { useEffect, useRef } from 'react';

interface ThreeSalonSceneProps {
  liteMode?: boolean;
}

export const ThreeSalonScene: React.FC<ThreeSalonSceneProps> = ({ liteMode = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (liteMode) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 45 Subtle luxury gold particle dust floating in 3D perspective
    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.6,
      alpha: Math.random() * 0.5 + 0.2,
      dx: (Math.random() - 0.5) * 0.35,
      dy: -Math.random() * 0.45 - 0.15,
      pulse: Math.random() * Math.PI,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.pulse += 0.02;
        const currentAlpha = p.alpha + Math.sin(p.pulse) * 0.15;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${Math.max(0.1, currentAlpha)})`;
        ctx.shadowColor = '#FFDF78';
        ctx.shadowBlur = 8;
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [liteMode]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Luxury Royal Deep Midnight & Gold Atmospheric Gradients */}
      <div className="absolute -top-32 left-1/4 w-[650px] h-[650px] bg-[#D4AF37]/8 rounded-full blur-[170px]" />
      <div className="absolute top-1/3 -right-32 w-[700px] h-[700px] bg-[#142442]/35 rounded-full blur-[180px]" />
      <div className="absolute -bottom-32 left-1/3 w-[750px] h-[750px] bg-[#091120]/80 rounded-full blur-[190px]" />

      {/* Subtle radial luxury vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#11192A]/40 via-[#070B14]/85 to-[#070B14]" />

      {/* Lightweight 60fps Gold Particle Dust */}
      {!liteMode && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-65"
        />
      )}
    </div>
  );
};
