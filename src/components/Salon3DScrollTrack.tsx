import React, { useEffect, useRef, useState } from 'react';
import { Calendar, ChevronDown, ChevronRight, Compass, Sparkles } from 'lucide-react';

interface SalonWallItem {
  id: string;
  src: string;
  category: string;
  t: string;
  d: string;
  price: string;
  a: number; // Aspect ratio
}

interface Salon3DScrollTrackProps {
  onOpenBooking: () => void;
  onSelectCategory?: (category: string) => void;
  liteMode?: boolean;
}

const SALON_WALLS: SalonWallItem[] = [
  {
    id: 'wall-throne',
    src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
    category: 'Ladies - Haircut & Spa',
    t: 'Royal Stylist Suite',
    d: 'Precision haircutting, Japanese Nano Plastia, and Keratin smoothing beneath illuminated gold baroque mirrors.',
    price: 'From ₹399 • Zero advance payment',
    a: 1.5,
  },
  {
    id: 'wall-spa',
    src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    category: 'Spa',
    t: 'Aromatherapy Hair Spa',
    d: 'Botanical hot oil infusion, restorative hair masks, and pressure-point scalp therapies for pure tranquility.',
    price: 'From ₹399 • 10% Festive Discount',
    a: 1.5,
  },
  {
    id: 'wall-facial',
    src: 'https://images.unsplash.com/photo-1512290900672-1f419c8f4204?auto=format&fit=crop&w=1200&q=80',
    category: 'Ladies - Facial, Massage & D-tan',
    t: 'Facial & D-Tan Bar',
    d: 'Diamond and gold facial rituals, botanical D-Tan exfoliation, and dermal hydration for radiant skin.',
    price: 'From ₹349 • Organic herbal elixirs',
    a: 1.5,
  },
  {
    id: 'wall-nails',
    src: 'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1200&q=80',
    category: 'Ladies - Waxing, Nails & Colour',
    t: 'Nail Couture & Spa Pedicure',
    d: 'Sculpted acrylic & gel extensions, Russian cuticle manicures, and soothing aromatic pedicures.',
    price: 'Single ₹450 • Both Hands ₹799',
    a: 1.5,
  },
  {
    id: 'wall-gents',
    src: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80',
    category: 'Gents',
    t: "Gentlemen's Atelier",
    d: 'Precision skin fades, hot towel straight-razor beard sculpting, and invigorating head massages.',
    price: 'From ₹149 • Master barber styling',
    a: 1.5,
  },
  {
    id: 'wall-bridal',
    src: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=80',
    category: 'Combo',
    t: 'Royal Bridal & Combo Suite',
    d: 'Bespoke bridal makeovers, reception styling, and all-inclusive royal pre-wedding luxury packages.',
    price: 'Combos from ₹1,099',
    a: 1.5,
  },
];

export const Salon3DScrollTrack: React.FC<Salon3DScrollTrackProps> = ({
  onOpenBooking,
  onSelectCategory,
  liteMode = false,
}) => {
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
    const N = SALON_WALLS.length;
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
    let P = 0.8 * Math.max(W, H);
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
      SALON_WALLS.forEach((o, i) => {
        const w = Math.min(mw, mh * o.a);
        const h = w / o.a;
        const el = panelsRef.current[i];
        if (el) {
          el.style.width = `${w}px`;
          el.style.height = `${h}px`;
          el.style.left = `${(W - w) / 2}px`;
          el.style.top = `${(H - h) / 2 - (por ? 25 : 35)}px`;
        }
        pos[i] = { x: sx[i % 4] * xo, y: sy[i % 4] * yo, z: -i * D };
      });

      // Floor rails layout extending into deep 3D space
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

    // Smooth quintic easing from reference
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

      // Update 3D panels
      panelsRef.current.forEach((el, k) => {
        if (!el || !pos[k]) return;
        const p = pos[k];
        const rz = p.z - Z;
        el.style.visibility = rz < P * 0.9 ? 'visible' : 'hidden';
        const r = Math.min(1, Math.abs(rz) / D) * (k % 2 ? -12 : 12);
        el.style.transform = `translate3d(${p.x}px, ${p.y}px, ${p.z}px) rotateY(${r}deg)`;
      });

      // Update Counter and Navigation state
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
  }, [liteMode]);

  // Jump to specific 3D wall using smooth scroll
  const goToWall = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.offsetHeight - window.innerHeight;
    const top = track.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: top + (max * i) / (SALON_WALLS.length - 1),
      behavior: 'smooth',
    });
  };

  const handleBookWall = (wall: SalonWallItem) => {
    if (onSelectCategory) {
      onSelectCategory(wall.category);
    }
    onOpenBooking();
  };

  const handleViewMenu = (wall: SalonWallItem) => {
    if (onSelectCategory) {
      onSelectCategory(wall.category);
    }
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="salon-3d-experience" className="relative w-full">
      {/* 3D Scroll Track: Multi-viewport height creating the scroll timeline */}
      <div
        ref={trackRef}
        className="relative w-full h-[520vh] bg-[#070B14]"
        style={{ position: 'relative' }}
      >
        {/* Sticky 3D Stage: Pins to full screen while scrolling the track */}
        <div
          ref={stageRef}
          className="sticky top-0 w-full h-screen overflow-hidden select-none bg-[radial-gradient(ellipse_at_50%_38%,#1A2438_0%,#070B14_72%)]"
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Subtle Ambient Radial Luxury Halos */}
          <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#122240]/40 rounded-full blur-[160px] pointer-events-none" />

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

              {/* 3D Exhibit Panels */}
              {SALON_WALLS.map((item, i) => (
                <div
                  key={item.id}
                  ref={(el) => {
                    panelsRef.current[i] = el;
                  }}
                  className="absolute rounded-2xl overflow-visible transition-shadow duration-300 group"
                  style={{
                    backgroundColor: '#0D1424',
                    boxShadow:
                      '0 0 0 1px rgba(212, 175, 55, 0.45), 0 30px 80px rgba(0, 0, 0, 0.85)',
                    transformStyle: 'preserve-3d',
                    willChange: 'transform',
                  }}
                >
                  {/* High-Resolution Panel Image */}
                  <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#070B14] border border-[#D4AF37]/30">
                    <img
                      src={item.src}
                      alt={item.t}
                      draggable={false}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80';
                      }}
                    />
                    {/* Subtle Gradient Scrim for Contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070B14]/90 via-[#070B14]/20 to-transparent" />

                    {/* Corner Tag */}
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#070B14]/85 border border-[#D4AF37]/50 backdrop-blur-md">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFDF78] font-bold">
                        {item.category}
                      </span>
                    </div>

                    {/* Direct Quick-Action Floating Button on hover */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookWall(item);
                      }}
                      className="absolute bottom-3 right-3 px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#AA7C11] text-[#070B14] font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer pointer-events-auto"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Station</span>
                    </button>
                  </div>

                  {/* Caption & Metadata Container positioned below panel */}
                  <div
                    className="absolute left-0 top-[102%] w-full pt-3 px-1 pointer-events-auto"
                    style={{ transform: 'translateZ(20px)' }}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div>
                        <h2 className="font-['Cinzel'] text-lg sm:text-2xl font-bold text-white tracking-wide drop-shadow-md">
                          {item.t}
                        </h2>
                        <p className="text-xs sm:text-sm text-[#DFD6C2] line-clamp-2 mt-0.5 max-w-xl font-sans leading-relaxed">
                          {item.d}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 mt-1 sm:mt-0 shrink-0">
                        <span className="text-[11px] font-mono text-[#D4AF37] font-semibold">
                          {item.price}
                        </span>
                        <button
                          onClick={() => handleViewMenu(item)}
                          className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-gray-300 hover:text-white text-[11px] transition-all flex items-center gap-1"
                        >
                          <span>Menu</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Luxury 3D HUD Interface (Fixed viewport overlays) */}
          <div className="absolute inset-0 pointer-events-none p-5 sm:p-8 flex flex-col justify-between z-20">
            {/* Top Bar Zone: Brand & Counter */}
            <div className="flex items-center justify-between w-full">
              {/* Brand Wordmark */}
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#070B14]/85 border border-[#D4AF37]/50 backdrop-blur-xl shadow-2xl pointer-events-auto">
                <Sparkles className="w-4 h-4 text-[#FFDF78]" />
                <span className="font-['Cinzel'] text-xs sm:text-sm font-bold text-white tracking-widest uppercase">
                  Trim &amp; Twisted &bull; 3D Salon Walls
                </span>
              </div>

              {/* Progress Count (e.g. 1 of 6) */}
              <div
                ref={countRef}
                className="px-4 py-2 rounded-2xl bg-[#070B14]/85 border border-[#D4AF37]/50 backdrop-blur-xl shadow-2xl text-[#FFDF78] font-mono text-xs sm:text-sm font-bold tracking-wider pointer-events-auto"
              >
                {activeIdx + 1} of {SALON_WALLS.length}
              </div>
            </div>

            {/* Bottom Bar Zone: Jump Dots & Scroll Hint */}
            <div className="flex items-center justify-between w-full">
              {/* Quick Jump Dots */}
              <nav
                className="flex items-center gap-2.5 p-2 rounded-2xl bg-[#070B14]/85 border border-[#D4AF37]/40 backdrop-blur-xl shadow-2xl pointer-events-auto mx-auto sm:mx-0"
                aria-label="3D Salon Station Walls"
              >
                {SALON_WALLS.map((wall, j) => {
                  const isActive = j === activeIdx;
                  return (
                    <button
                      key={wall.id}
                      onClick={() => goToWall(j)}
                      className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'w-8 bg-gradient-to-r from-[#FFDF78] to-[#D4AF37] shadow-[0_0_12px_#D4AF37]'
                          : 'w-2.5 bg-white/20 hover:bg-white/50 border border-white/30'
                      }`}
                      aria-label={`Show ${wall.t}`}
                      title={wall.t}
                    />
                  );
                })}
              </nav>

              {/* Scroll Hint (Fades out when scrolled) */}
              <div
                ref={hintRef}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#070B14]/85 border border-[#D4AF37]/40 backdrop-blur-xl shadow-2xl text-[#D4AF37] text-xs font-mono tracking-wider transition-opacity duration-500"
              >
                <span>Scroll to fly through 3D walls</span>
                <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
