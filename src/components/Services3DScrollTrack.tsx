import React, { useEffect, useRef, useState, useMemo } from 'react';
import type { ServiceItem, CategoryItem } from '../types';
import { Calendar, Check, ChevronDown, Plus, Sparkles, Tag, Scissors } from 'lucide-react';

interface Services3DScrollTrackProps {
  services: ServiceItem[];
  categories: CategoryItem[];
  selectedServiceIds: string[];
  onToggleService: (service: ServiceItem) => void;
  onOpenBooking: () => void;
  liteMode?: boolean;
}

export const Services3DScrollTrack: React.FC<Services3DScrollTrackProps> = ({
  services,
  categories,
  selectedServiceIds,
  onToggleService,
  onOpenBooking,
  liteMode = false,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // Filter services for the 3D track (prioritizing active and highlighted services)
  const displayServices = useMemo(() => {
    const active = services.filter((s) => s.active !== false);
    if (selectedFilter === 'all') {
      // Pick a curated flagship collection across all categories
      return active.slice(0, 10);
    }
    return active.filter((s) => s.category.toLowerCase() === selectedFilter.toLowerCase());
  }, [services, selectedFilter]);

  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const railsRef = useRef<(HTMLElement | null)[]>([]);
  const countRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  const [activeIdx, setActiveIdx] = useState<number>(0);
  const activeIdxRef = useRef<number>(0);

  useEffect(() => {
    const N = displayServices.length;
    if (N === 0) return;

    const track = trackRef.current;
    const stage = stageRef.current;
    const rig = rigRef.current;
    const world = worldRef.current;
    const count = countRef.current;
    const hint = hintRef.current;

    if (!track || !stage || !rig || !world) return;

    let reduce = liteMode;
    if (typeof window !== 'undefined') {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) reduce = true;
    }

    let target = 0;
    let cur = 0;
    let mx = 0;
    let my = 0;
    let cx = 0;
    let cy = 0;
    let W = window.innerWidth;
    let H = window.innerHeight;
    let P = 0.85 * Math.max(W, H);
    let D = 1.25 * P;
    let pos: { x: number; y: number; z: number }[] = [];
    let animationFrameId: number;

    const layout = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      const por = W < H;
      P = 0.85 * Math.max(W, H);
      D = 1.25 * P;
      stage.style.perspective = `${P}px`;

      const xo = por ? 0.38 * W : 0.28 * W;
      const yo = por ? 0.12 * H : 0.08 * H;
      const mh = 0.52 * H;
      const mw = por ? 0.88 * W : 0.64 * W;
      const sx = [-1, 1, -1, 1];
      const sy = [-1, 1, 1, -1];

      pos = [];
      displayServices.forEach((_, i) => {
        const a = 1.5;
        const w = Math.min(mw, mh * a);
        const h = w / a;
        const el = panelsRef.current[i];
        if (el) {
          el.style.width = `${w}px`;
          el.style.height = `${h}px`;
          el.style.left = `${(W - w) / 2}px`;
          el.style.top = `${(H - h) / 2 - (por ? 25 : 35)}px`;
        }
        pos[i] = { x: sx[i % 4] * xo, y: sy[i % 4] * yo, z: -i * D };
      });

      // 11 3D Floor Perspective Rails
      const fy = yo + mh / 2 + 0.12 * H;
      const L = P * 1.1 + (N - 1) * D + 3.2 * P;
      railsRef.current.forEach((l, k) => {
        if (l) {
          l.style.height = `${L}px`;
          const xOffset = (k - 5) * 0.18 * W - 1;
          l.style.transform = `translate3d(${xOffset}px, ${fy}px, ${P * 1.1}px) rotateX(-90deg)`;
        }
      });
    };

    const measure = () => {
      const r = track.getBoundingClientRect();
      const max = track.offsetHeight - window.innerHeight;
      target = Math.max(0, Math.min(1, -r.top / max));
    };

    const ease = (t: number) => {
      const clamped = Math.max(0, Math.min(1, t));
      return clamped * clamped * clamped * (clamped * (6 * clamped - 15) + 10);
    };

    const frame = () => {
      cur += (target - cur) * (reduce ? 1 : 0.08);
      cx += (mx - cx) * 0.06;
      cy += (my - cy) * 0.06;

      const s = cur * (N - 1);
      const i = Math.min(N - 2, Math.floor(s));
      const e = ease((s - i - 0.2) / 0.6);

      const a = pos[i] || { x: 0, y: 0, z: 0 };
      const b = pos[i + 1] || a;

      const X = a.x + (b.x - a.x) * e;
      const Y = a.y + (b.y - a.y) * e;
      const Z = a.z + (b.z - a.z) * e;

      world.style.transform = `translate3d(${-X}px, ${-Y}px, ${-Z}px)`;

      const bank = Math.sin(Math.PI * e) * (b.x > a.x ? -3.5 : 3.5);
      rig.style.transform = `rotateX(${cy * -3}deg) rotateY(${cx * 4 + bank}deg)`;

      // Panels 3D positioning
      panelsRef.current.forEach((el, k) => {
        if (!el || !pos[k]) return;
        const p = pos[k];
        const rz = p.z - Z;
        el.style.visibility = rz < P * 0.9 ? 'visible' : 'hidden';
        const r = Math.min(1, Math.abs(rz) / D) * (k % 2 ? -12 : 12);
        el.style.transform = `translate3d(${p.x}px, ${p.y}px, ${p.z}px) rotateY(${r}deg)`;
      });

      const n = Math.round(cur * (N - 1));
      if (n !== activeIdxRef.current) {
        activeIdxRef.current = n;
        setActiveIdx(n);
        if (count) {
          count.textContent = `${n + 1} of ${N}`;
        }
      }

      if (hint) {
        hint.style.opacity = cur > 0.03 ? '0' : '1';
        hint.style.pointerEvents = cur > 0.03 ? 'none' : 'auto';
      }

      animationFrameId = requestAnimationFrame(frame);
    };

    const handlePointerMove = (e: MouseEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
    };

    window.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', () => {
      layout();
      measure();
    });

    if (!reduce) {
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
    }

    layout();
    measure();
    cur = target;
    frame();

    return () => {
      window.removeEventListener('scroll', measure);
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [displayServices, liteMode]);

  const goToService = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.offsetHeight - window.innerHeight;
    const top = track.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: top + (max * i) / (Math.max(1, displayServices.length - 1)),
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative w-full">
      {/* 3D Services Scroll Track */}
      <div
        ref={trackRef}
        className="relative w-full bg-[#070B14]"
        style={{
          height: `${Math.max(300, displayServices.length * 80)}vh`,
          position: 'relative',
        }}
      >
        {/* Sticky 3D Stage */}
        <div
          ref={stageRef}
          className="sticky top-0 w-full h-screen overflow-hidden select-none bg-[radial-gradient(ellipse_at_50%_40%,#1B273E_0%,#070B14_74%)]"
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Subtle Ambient Gold Gradients */}
          <div className="absolute top-1/4 right-1/4 w-[550px] h-[550px] bg-[#D4AF37]/10 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/4 w-[650px] h-[650px] bg-[#122444]/40 rounded-full blur-[170px] pointer-events-none" />

          {/* 3D Rig & 3D World */}
          <div
            ref={rigRef}
            className="absolute inset-0 w-full h-full"
            style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
          >
            <div
              ref={worldRef}
              className="absolute inset-0 w-full h-full"
              style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
            >
              {/* 11 3D Floor Perspective Rails (Bronze/Gold Runway) */}
              {Array.from({ length: 11 }).map((_, k) => (
                <i
                  key={k}
                  ref={(el) => {
                    railsRef.current[k] = el;
                  }}
                  className="absolute left-1/2 top-1/2 w-[2px] pointer-events-none"
                  style={{
                    background:
                      k === 5
                        ? 'rgba(255, 223, 120, 0.45)'
                        : 'rgba(212, 175, 55, 0.22)',
                    transformOrigin: '50% 0',
                    boxShadow:
                      k === 5 ? '0 0 15px rgba(212, 175, 55, 0.6)' : 'none',
                  }}
                />
              ))}

              {/* 3D Service Exhibition Panels */}
              {displayServices.map((srv, i) => {
                const isSelected = selectedServiceIds.includes(srv.id);
                const displayImage =
                  srv.image ||
                  'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80';

                return (
                  <div
                    key={srv.id}
                    ref={(el) => {
                      panelsRef.current[i] = el;
                    }}
                    className="absolute rounded-2xl overflow-visible transition-shadow duration-300 group"
                    style={{
                      backgroundColor: '#0D1424',
                      boxShadow: isSelected
                        ? '0 0 0 2px #FFDF78, 0 30px 80px rgba(212, 175, 55, 0.5)'
                        : '0 0 0 1px rgba(212, 175, 55, 0.4), 0 30px 80px rgba(0, 0, 0, 0.85)',
                      transformStyle: 'preserve-3d',
                      willChange: 'transform',
                    }}
                  >
                    {/* Panel Image Container */}
                    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#070B14] border border-[#D4AF37]/30">
                      <img
                        src={displayImage}
                        alt={srv.name}
                        draggable={false}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src =
                            'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80';
                        }}
                      />
                      {/* Gradient Scrims */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#070B14]/95 via-[#070B14]/20 to-transparent" />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-md bg-[#070B14]/85 backdrop-blur-md border border-[#D4AF37]/40 text-[#FFDF78] text-[10px] font-mono uppercase tracking-wider font-semibold">
                          {srv.category}
                        </span>

                        {srv.isHaircut && (
                          <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#D4AF37]/90 text-[#070B14] text-[10px] font-bold shadow-md">
                            <Scissors className="w-3 h-3 stroke-[2.5]" />
                            <span>Haircut Pool</span>
                          </div>
                        )}
                      </div>

                      {/* Floating Note Badge if exists */}
                      {srv.note && (
                        <div className="absolute bottom-3 left-3">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-950/85 border border-emerald-500/50 text-emerald-300 text-[11px] font-semibold backdrop-blur-md shadow-md">
                            <Tag className="w-3 h-3 text-emerald-400" />
                            <span>{srv.note}</span>
                          </span>
                        </div>
                      )}

                      {/* Select / Add Button in Corner */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleService(srv);
                        }}
                        className={`absolute bottom-3 right-3 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-xl cursor-pointer pointer-events-auto ${
                          isSelected
                            ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                            : 'bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#070B14] hover:brightness-110 active:scale-95'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>Selected</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>Add to Pass</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Caption Below Panel */}
                    <div
                      className="absolute left-0 top-[102%] w-full pt-3 px-1 pointer-events-auto"
                      style={{ transform: 'translateZ(20px)' }}
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <div>
                          <h3 className="font-['Cinzel'] text-lg sm:text-2xl font-bold text-white tracking-wide drop-shadow-md">
                            {srv.name}
                          </h3>
                        </div>

                        {/* Price Display */}
                        <div className="flex items-center gap-2 mt-1 sm:mt-0 shrink-0">
                          {srv.price !== null ? (
                            <div className="flex items-baseline gap-1.5">
                              {srv.offerPrice ? (
                                <>
                                  <span className="text-sm sm:text-base text-gray-400 line-through">
                                    ₹{srv.price}
                                  </span>
                                  <span className="text-base sm:text-xl font-bold text-[#FFDF78]">
                                    ₹{srv.offerPrice}
                                  </span>
                                </>
                              ) : (
                                <span className="text-base sm:text-xl font-bold text-[#FFDF78]">
                                  ₹{srv.price}
                                </span>
                              )}
                              {srv.priceLabel && (
                                <span className="text-[10px] text-gray-400 uppercase font-mono">
                                  ({srv.priceLabel})
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className="text-xs sm:text-sm font-semibold text-[#FFDF78]">
                              {srv.priceLabel || 'Price on Consultation'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Luxury 3D Services HUD (Fixed Overlays) */}
          <div className="absolute inset-0 pointer-events-none p-5 sm:p-8 flex flex-col justify-between z-20">
            {/* Top Bar Zone: Brand & Category Filters & Counter */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 w-full">
              {/* Brand Wordmark */}
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#070B14]/85 border border-[#D4AF37]/50 backdrop-blur-xl shadow-2xl pointer-events-auto">
                <Sparkles className="w-4 h-4 text-[#FFDF78]" />
                <span className="font-['Cinzel'] text-xs sm:text-sm font-bold text-white tracking-widest uppercase">
                  Trim &amp; Twisted &bull; 3D Services Runway
                </span>
              </div>

              {/* Category Filter Pills (Interactive in 3D HUD) */}
              <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#070B14]/85 border border-[#D4AF37]/40 backdrop-blur-xl shadow-2xl pointer-events-auto overflow-x-auto max-w-full scrollbar-none">
                <button
                  onClick={() => setSelectedFilter('all')}
                  className={`px-3 py-1 rounded-xl text-[11px] font-semibold whitespace-nowrap transition-all ${
                    selectedFilter === 'all'
                      ? 'bg-[#D4AF37] text-[#070B14]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Featured
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedFilter(cat.name)}
                    className={`px-3 py-1 rounded-xl text-[11px] font-semibold whitespace-nowrap transition-all ${
                      selectedFilter === cat.name
                        ? 'bg-[#D4AF37] text-[#070B14]'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Counter */}
              <div
                ref={countRef}
                className="hidden sm:block px-4 py-2 rounded-2xl bg-[#070B14]/85 border border-[#D4AF37]/50 backdrop-blur-xl shadow-2xl text-[#FFDF78] font-mono text-xs sm:text-sm font-bold tracking-wider pointer-events-auto shrink-0"
              >
                {activeIdx + 1} of {displayServices.length}
              </div>
            </div>

            {/* Bottom Bar Zone: Quick Dots & Booking Continue CTA */}
            <div className="flex items-center justify-between w-full">
              {/* Navigation Jump Dots */}
              <nav
                className="flex items-center gap-2 p-2 rounded-2xl bg-[#070B14]/85 border border-[#D4AF37]/40 backdrop-blur-xl shadow-2xl pointer-events-auto"
                aria-label="3D Services Runway Navigation"
              >
                {displayServices.map((srv, j) => {
                  const isActive = j === activeIdx;
                  return (
                    <button
                      key={srv.id}
                      onClick={() => goToService(j)}
                      className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'w-7 bg-gradient-to-r from-[#FFDF78] to-[#D4AF37] shadow-[0_0_12px_#D4AF37]'
                          : 'w-2 bg-white/20 hover:bg-white/50 border border-white/30'
                      }`}
                      aria-label={`Show ${srv.name}`}
                      title={srv.name}
                    />
                  );
                })}
              </nav>

              {/* Action Prompt or Scroll Hint */}
              <div className="flex items-center gap-3 pointer-events-auto">
                {selectedServiceIds.length > 0 && (
                  <button
                    onClick={onOpenBooking}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#FFF0A5] to-[#AA7C11] text-[#070B14] font-extrabold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Selected ({selectedServiceIds.length})</span>
                  </button>
                )}

                <div
                  ref={hintRef}
                  className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#070B14]/85 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-mono tracking-wider backdrop-blur-xl"
                >
                  <span>Scroll to fly through services</span>
                  <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
