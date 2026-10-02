import React, { useState } from 'react';
import { APP_CONFIG } from '../config';
import {
  Calendar,
  ChevronDown,
  ChevronRight,
  Compass,
  Crown,
  MessageCircle,
  RotateCcw,
  Scissors,
  ShieldCheck,
  Sparkles,
  Star,
  Zap,
} from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreServices: () => void;
  onSelectStation?: (stationName: string) => void;
  liteMode?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking,
  onExploreServices,
  onSelectStation = () => {},
  liteMode = false,
}) => {
  const [selectedStation, setSelectedStation] = useState('Haircut & Styling');

  const stations = [
    {
      id: 'throne',
      name: 'Royal Stylist Throne',
      category: 'Haircut & Styling',
      desc: 'Precision cuts, Japanese Nano Plastia & Keratin shine',
      icon: Crown,
      tag: 'Station 01',
    },
    {
      id: 'spa',
      name: 'Aromatherapy Spa Suite',
      category: 'Spa',
      desc: 'Herbal hot oil massage & deep scalp nourishment',
      icon: Sparkles,
      tag: 'Station 02',
    },
    {
      id: 'aesthetic',
      name: 'Aesthetic & Facial Bar',
      category: 'Facial',
      desc: 'Golden D-Tan, bridal glow & organic skin facials',
      icon: Scissors,
      tag: 'Station 03',
    },
  ];

  const handleStationClick = (stationName: string, category: string) => {
    setSelectedStation(category);
    onSelectStation(category);
  };

  const handleStart3DJourney = () => {
    const el = document.getElementById('salon-3d-experience');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center pt-6 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Centered Luxury Header */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center mb-6">
        {/* Crown / Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#FFDF78] text-xs font-semibold uppercase tracking-[0.25em] shadow-[0_0_25px_rgba(212,175,55,0.2)] mb-5 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#FFE8A3]" />
          <span>Award-Winning 3D Spatial Unisex Sanctuary</span>
        </div>

        {/* 3D Gold Logo Crest with Glow */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-3 flex items-center justify-center group cursor-pointer">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#D4AF37] via-[#FFF0A5] to-[#AA7C11] opacity-35 blur-2xl group-hover:opacity-50 transition-opacity duration-700 animate-pulse" />
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl overflow-hidden bg-[#070B14] border-2 border-[#D4AF37] flex items-center justify-center shadow-[0_0_45px_rgba(212,175,55,0.5)] transform group-hover:scale-105 transition-transform duration-500">
            <img
              src="/logo.png"
              onError={(e) => {
                e.currentTarget.src = '/logo.svg';
              }}
              alt="Trim & Twisted Salon Store Crest"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Main Brand Title */}
        <h1 className="font-['Cinzel'] text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5D6] via-[#E8C56B] to-[#996F14] drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)] leading-[1.1]">
          TRIM &amp; TWISTED
        </h1>

        {/* Official Tagline */}
        <p className="font-['Playfair_Display'] italic text-2xl sm:text-3xl md:text-4xl text-[#F6E7B4] tracking-wide mt-2 font-medium">
          &ldquo;Beauty Is You&rdquo;
        </p>

        {/* Descriptive Brief */}
        <p className="max-w-2xl text-sm sm:text-base text-[#B9CADF] mt-4 font-sans leading-relaxed">
          Step into Bengal&apos;s premier aesthetic sanctuary. Experience bespoke styling, Japanese Nano Plastia, and herbal scalp therapies choreographed across an interactive 3D spatial world.
        </p>
      </div>

      {/* 3D Spatial Gateway / Interactive Station Portal Frame */}
      <div className="relative z-10 w-full max-w-5xl mx-auto mb-8 p-6 sm:p-8 rounded-3xl bg-[#070B14]/40 border-2 border-[#D4AF37]/40 backdrop-blur-md shadow-[0_0_60px_rgba(212,175,55,0.2)]">
        {/* Top Portal Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#D4AF37]/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/60 flex items-center justify-center text-[#FFDF78]">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] block font-semibold">
                3D Spatial Viewport
              </span>
              <h3 className="font-['Cinzel'] text-lg font-bold text-white">
                Choreographed 3D Salon Sanctuary
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <span className="text-xs font-mono text-[#D4AF37]/90 hidden md:inline">
              Scroll down to fly through stations
            </span>
            <button
              onClick={handleStart3DJourney}
              className="px-4 py-2 rounded-xl bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 border border-[#D4AF37]/60 text-[#FFDF78] text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
            >
              <span>Begin 3D Journey</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </button>
          </div>
        </div>

        {/* 3 Interactive Station Cards (Direct link into 3D world) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {stations.map((st) => {
            const isSelected = selectedStation === st.category;
            const Icon = st.icon;

            return (
              <button
                key={st.id}
                onClick={() => handleStationClick(st.name, st.category)}
                className={`p-4 rounded-2xl text-left transition-all duration-300 relative overflow-hidden group ${
                  isSelected
                    ? 'bg-[#0E1628]/90 border-2 border-[#FFDF78] shadow-[0_0_25px_rgba(212,175,55,0.35)]'
                    : 'bg-[#070B14]/60 hover:bg-[#0E1628]/60 border border-white/10 hover:border-[#D4AF37]/40'
                }`}
              >
                {/* Station Tag & Icon */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-[10px] font-mono tracking-wider font-semibold ${
                      isSelected ? 'text-[#FFDF78]' : 'text-gray-400'
                    }`}
                  >
                    {st.tag}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-[#D4AF37] text-[#070B14]'
                        : 'bg-white/5 text-[#D4AF37] group-hover:bg-[#D4AF37]/20'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <h4 className="font-['Cinzel'] text-sm font-bold text-white mb-1">
                  {st.name}
                </h4>
                <p className="text-xs text-[#B9CADF] line-clamp-2 leading-relaxed">
                  {st.desc}
                </p>

                {isSelected && (
                  <div className="mt-3 pt-2 border-t border-[#D4AF37]/30 flex items-center justify-between text-[11px] text-[#FFDF78] font-semibold">
                    <span>Target Active in 3D</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Station Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#D4AF37]/20">
          <div className="text-xs text-gray-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Currently Selected: <strong className="text-[#FFDF78] font-['Cinzel']">{selectedStation}</strong></span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#FFF0A5] to-[#AA7C11] text-[#070B14] font-extrabold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book This Station</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Action CTAs & Trust Badges */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Main CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-9 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F3D57C] to-[#AA7C11] text-[#070B14] font-extrabold text-sm uppercase tracking-wider hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_35px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2 group"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Your VIP Appointment</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href={APP_CONFIG.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#0E1628] hover:bg-[#14223E] border border-[#D4AF37]/50 text-[#FFDF78] font-semibold text-sm tracking-wide transition-all shadow-lg flex items-center justify-center gap-2.5"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Direct WhatsApp: {APP_CONFIG.formattedPhone}</span>
          </a>

          <button
            onClick={onExploreServices}
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white font-medium text-sm transition-all"
          >
            Explore Services &amp; Menu
          </button>
        </div>

        {/* Confidence Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-8 text-xs text-[#D8E2F0]">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0E1628]/80 border border-white/10 backdrop-blur-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Zero Advance • Pay After Service</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0E1628]/80 border border-white/10 backdrop-blur-sm">
            <Star className="w-4 h-4 text-[#FFDF78] fill-[#FFDF78]" />
            <span>4.95 Rating • 2,400+ Guests</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0E1628]/80 border border-white/10 backdrop-blur-sm">
            <Compass className="w-4 h-4 text-[#D4AF37]" />
            <span>Chakdaha Main Road</span>
          </div>
        </div>

        {/* Scroll Indicator Guide */}
        <div className="mt-8 flex flex-col items-center gap-2 text-gray-400 animate-pulse">
          <div className="w-5 h-8 rounded-full border-2 border-[#D4AF37]/60 flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-[#FFDF78] rounded-full animate-bounce" />
          </div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37]">
            Scroll Down to Navigate 3D Sanctuary
          </span>
        </div>
      </div>
    </section>
  );
};
