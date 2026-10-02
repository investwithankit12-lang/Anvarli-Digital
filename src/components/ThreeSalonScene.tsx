import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Compass, Eye, Flame, Maximize2, Minimize2, Move, RotateCcw, Sparkles as SparklesIcon } from 'lucide-react';

/* =========================================================================
   3D ASSETS & MESH COMPONENTS
   ========================================================================= */

/**
 * 3D Royal Stylist Throne Chair
 */
function RoyalStylistThrone({
  isSelected,
  onClick,
}: {
  isSelected: boolean;
  onClick: () => void;
}) {
  const chairRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (chairRef.current) {
      const t = clock.getElapsedTime();
      // Gentle breathing idle rotation
      chairRef.current.rotation.y = Math.sin(t * 0.4) * 0.1;
    }
  });

  return (
    <group
      ref={chairRef}
      position={[0, 0, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered || isSelected ? 1.05 : 1}
    >
      {/* Ornate Gold Crown finial on top of chair */}
      <mesh position={[0, 2.38, -0.42]}>
        <cylinderGeometry args={[0.09, 0.17, 0.2, 5]} />
        <meshStandardMaterial
          color="#FFDF78"
          metalness={0.96}
          roughness={0.12}
          emissive="#AA7C11"
          emissiveIntensity={hovered ? 0.7 : 0.25}
        />
      </mesh>

      {/* Hydraulic Polished Gold & Chrome Base */}
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.72, 0.78, 0.12, 36]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.96} roughness={0.1} />
      </mesh>
      {/* Hydraulic Center Shaft */}
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.9, 24]} />
        <meshStandardMaterial color="#FFF5D6" metalness={0.98} roughness={0.08} />
      </mesh>

      {/* Footrest with Royal Filigree */}
      <group position={[0, 0.25, 0.65]}>
        <mesh>
          <boxGeometry args={[0.68, 0.04, 0.36]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.92} roughness={0.18} />
        </mesh>
        <mesh position={[-0.22, -0.1, -0.2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} />
        </mesh>
        <mesh position={[0.22, -0.1, -0.2]}>
          <cylinderGeometry args={[0.02, 0.02, 0.2, 8]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.9} />
        </mesh>
      </group>

      {/* Tufted Seat Cushion (Royal Midnight Navy Velvet) */}
      <mesh position={[0, 1.05, 0]}>
        <cylinderGeometry args={[0.64, 0.66, 0.24, 32]} />
        <meshStandardMaterial color="#0A111E" roughness={0.75} metalness={0.15} />
      </mesh>

      {/* Royal Gold Cushion Trim Rim */}
      <mesh position={[0, 1.05, 0]}>
        <torusGeometry args={[0.66, 0.025, 16, 32]} />
        <meshStandardMaterial color="#FFDF78" metalness={0.92} roughness={0.18} />
      </mesh>

      {/* High Backrest with Tufted Curve */}
      <group position={[0, 1.7, -0.44]}>
        {/* Navy Velvet Body */}
        <mesh>
          <boxGeometry args={[1.08, 1.18, 0.16]} />
          <meshStandardMaterial color="#070C15" roughness={0.8} />
        </mesh>
        {/* Heavy Gold Border Frame */}
        <mesh position={[0, 0, 0.08]}>
          <boxGeometry args={[1.12, 1.22, 0.025]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.14} />
        </mesh>
      </group>

      {/* Sculpted Golden Lion-Paw / Royal Armrests */}
      <group position={[-0.58, 1.45, 0.05]}>
        <mesh>
          <boxGeometry args={[0.1, 0.45, 0.68]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.14} />
        </mesh>
      </group>
      <group position={[0.58, 1.45, 0.05]}>
        <mesh>
          <boxGeometry args={[0.1, 0.45, 0.68]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.14} />
        </mesh>
      </group>

      {/* Interactive Beacon / Aura on Base when hovered or selected */}
      {(hovered || isSelected) && (
        <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.82, 1.15, 36]} />
          <meshBasicMaterial color="#FFDF78" opacity={0.6} transparent />
        </mesh>
      )}
    </group>
  );
}

/**
 * 3D Grand Illuminated Arch & Gold Mirror
 */
function GrandArchMirror() {
  return (
    <group position={[0, 0, -2.4]}>
      {/* Arch Columns */}
      <mesh position={[-1.65, 2.5, 0]}>
        <cylinderGeometry args={[0.14, 0.16, 5, 24]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.92} roughness={0.18} />
      </mesh>
      <mesh position={[1.65, 2.5, 0]}>
        <cylinderGeometry args={[0.14, 0.16, 5, 24]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.92} roughness={0.18} />
      </mesh>

      {/* Arch Top Curve */}
      <mesh position={[0, 4.8, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[1.65, 0.14, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.92} roughness={0.18} />
      </mesh>

      {/* Mirror Glass Surface */}
      <mesh position={[0, 2.8, 0.02]}>
        <planeGeometry args={[3.1, 3.8]} />
        <meshStandardMaterial
          color="#162238"
          metalness={0.98}
          roughness={0.05}
          emissive="#0D1526"
          emissiveIntensity={0.35}
        />
      </mesh>

      {/* Mirror Halo Backlight */}
      <pointLight position={[0, 3.2, 0.4]} intensity={2.2} distance={5.5} color="#FFE6A3" />

      {/* Marble & Glass Vanity Shelf */}
      <mesh position={[0, 0.95, 0.35]}>
        <boxGeometry args={[3.5, 0.08, 0.72]} />
        <meshStandardMaterial color="#0A0E18" roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0.92, 0.35]}>
        <boxGeometry args={[3.54, 0.03, 0.76]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.95} />
      </mesh>

      {/* Luxury Perfume / Hair Care Crystal Flasks */}
      <mesh position={[-0.9, 1.15, 0.4]}>
        <cylinderGeometry args={[0.07, 0.07, 0.32, 16]} />
        <meshStandardMaterial color="#FFDF78" roughness={0.1} metalness={0.85} />
      </mesh>
      <mesh position={[-0.65, 1.12, 0.35]}>
        <boxGeometry args={[0.14, 0.26, 0.14]} />
        <meshStandardMaterial color="#E8A838" roughness={0.15} metalness={0.5} />
      </mesh>
      <mesh position={[0.8, 1.15, 0.4]}>
        <cylinderGeometry args={[0.06, 0.08, 0.35, 16]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.18} metalness={0.92} />
      </mesh>
    </group>
  );
}

/**
 * 3D Animated Floating Gold Scissors
 */
function FloatingGoldScissors() {
  const groupRef = useRef<THREE.Group>(null);
  const blade1 = useRef<THREE.Mesh>(null);
  const blade2 = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = 2.45 + Math.sin(t * 1.5) * 0.14;
      groupRef.current.rotation.y = t * 0.4;
      groupRef.current.rotation.z = Math.sin(t * 0.8) * 0.1;
    }
    const snip = Math.sin(t * 3.8) * 0.22 + 0.18;
    if (blade1.current) blade1.current.rotation.z = snip;
    if (blade2.current) blade2.current.rotation.z = -snip;
  });

  return (
    <group ref={groupRef} position={[1.4, 2.4, 0.5]} scale={0.78}>
      {/* Pivot */}
      <mesh position={[0, 0, 0.05]}>
        <cylinderGeometry args={[0.07, 0.07, 0.12, 16]} />
        <meshStandardMaterial color="#FFF5D6" metalness={0.95} />
      </mesh>
      {/* Blade 1 */}
      <group ref={blade1 as any}>
        <mesh position={[0.5, 0.03, 0]}>
          <boxGeometry args={[1.0, 0.06, 0.02]} />
          <meshStandardMaterial color="#FFDF78" metalness={0.96} roughness={0.1} />
        </mesh>
        <mesh position={[-0.5, 0.2, 0]}>
          <torusGeometry args={[0.22, 0.04, 12, 24]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.92} />
        </mesh>
      </group>
      {/* Blade 2 */}
      <group ref={blade2 as any}>
        <mesh position={[0.5, -0.03, 0]}>
          <boxGeometry args={[1.0, 0.06, 0.02]} />
          <meshStandardMaterial color="#FFDF78" metalness={0.96} roughness={0.1} />
        </mesh>
        <mesh position={[-0.5, -0.2, 0]}>
          <torusGeometry args={[0.22, 0.04, 12, 24]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.92} />
        </mesh>
      </group>
    </group>
  );
}

/**
 * 3D Grand Crystal Chandelier
 */
function RoyalChandelier() {
  const chandelierRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (chandelierRef.current) {
      const t = clock.getElapsedTime();
      chandelierRef.current.rotation.y = Math.sin(t * 0.2) * 0.08;
    }
  });

  return (
    <group ref={chandelierRef} position={[0, 4.5, 0]}>
      {/* Suspension Chain */}
      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 1.6, 8]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} />
      </mesh>
      {/* Golden Tier 1 */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[1.15, 0.05, 16, 32]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.14} />
      </mesh>
      {/* Golden Tier 2 */}
      <mesh position={[0, -0.36, 0]}>
        <torusGeometry args={[0.74, 0.04, 16, 32]} />
        <meshStandardMaterial color="#FFDF78" metalness={0.95} roughness={0.14} />
      </mesh>

      {/* Glowing Warm Chandelier Bulbs */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 1.15;
        const z = Math.sin(angle) * 1.15;
        return (
          <mesh key={i} position={[x, 0.12, z]}>
            <sphereGeometry args={[0.065, 12, 12]} />
            <meshStandardMaterial color="#FFF5D6" emissive="#FFDA73" emissiveIntensity={3.2} />
          </mesh>
        );
      })}

      <pointLight position={[0, -0.2, 0]} intensity={3.0} distance={7.5} color="#FFE8A3" />
    </group>
  );
}

/**
 * Side Station Hotspot Beacons (Aromatherapy Spa & Facial Bar)
 */
function SideStation({
  position,
  label,
  color,
  onClick,
}: {
  position: [number, number, number];
  label: string;
  color: string;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <group
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Station Pedestal */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.55, 0.65, 0.9, 24]} />
        <meshStandardMaterial color="#0A101D" metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.91, 0]}>
        <cylinderGeometry args={[0.58, 0.58, 0.05, 24]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Glowing Orb on Pedestal */}
      <mesh position={[0, 1.25, 0]}>
        <sphereGeometry args={[0.18, 20, 20]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 2.8 : 1.4}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Rotating Floor Halo */}
      <mesh ref={ringRef} position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.7, 0.85, 32]} />
        <meshBasicMaterial color={hovered ? '#FFF0A5' : color} transparent opacity={0.65} />
      </mesh>
    </group>
  );
}

/* =========================================================================
   CAMERA SCROLL CHOREOGRAPHER
   ========================================================================= */

interface ScrollTarget {
  pos: [number, number, number];
  lookAt: [number, number, number];
}

/**
 * Coordinates and camera perspectives for different scroll stages:
 * 0.00: Hero Imperial Entry
 * 0.20: Services & Styling Bar
 * 0.45: Transformations & Gallery
 * 0.70: Reviews Wall & Stylists
 * 0.95: Packages & Reserve Sanctuary
 */
const SCROLL_STAGES: { threshold: number; target: ScrollTarget }[] = [
  {
    threshold: 0.0,
    target: { pos: [0, 2.2, 4.8], lookAt: [0, 1.4, 0] },
  },
  {
    threshold: 0.2,
    target: { pos: [2.5, 1.8, 2.8], lookAt: [-0.3, 1.2, -0.6] },
  },
  {
    threshold: 0.45,
    target: { pos: [-2.4, 2.9, 3.2], lookAt: [0.1, 1.4, -0.7] },
  },
  {
    threshold: 0.7,
    target: { pos: [-1.9, 1.6, 2.2], lookAt: [0.3, 1.2, 0] },
  },
  {
    threshold: 0.95,
    target: { pos: [0, 3.8, 6.2], lookAt: [0, 1.2, 0] },
  },
];

function interpolateScrollTarget(progress: number): ScrollTarget {
  // Clamp
  const p = Math.max(0, Math.min(1, progress));

  // Find surrounding stages
  for (let i = 0; i < SCROLL_STAGES.length - 1; i++) {
    const s1 = SCROLL_STAGES[i];
    const s2 = SCROLL_STAGES[i + 1];

    if (p >= s1.threshold && p <= s2.threshold) {
      const segmentProgress = (p - s1.threshold) / (s2.threshold - s1.threshold);
      // Smooth cubic easing
      const ease =
        segmentProgress < 0.5
          ? 2 * segmentProgress * segmentProgress
          : 1 - Math.pow(-2 * segmentProgress + 2, 2) / 2;

      return {
        pos: [
          THREE.MathUtils.lerp(s1.target.pos[0], s2.target.pos[0], ease),
          THREE.MathUtils.lerp(s1.target.pos[1], s2.target.pos[1], ease),
          THREE.MathUtils.lerp(s1.target.pos[2], s2.target.pos[2], ease),
        ],
        lookAt: [
          THREE.MathUtils.lerp(s1.target.lookAt[0], s2.target.lookAt[0], ease),
          THREE.MathUtils.lerp(s1.target.lookAt[1], s2.target.lookAt[1], ease),
          THREE.MathUtils.lerp(s1.target.lookAt[2], s2.target.lookAt[2], ease),
        ],
      };
    }
  }

  return SCROLL_STAGES[SCROLL_STAGES.length - 1].target;
}

function ScrollCameraController({
  scrollProgress,
  isOrbitMode,
  mousePos,
}: {
  scrollProgress: number;
  isOrbitMode: boolean;
  mousePos: { x: number; y: number };
}) {
  const { camera } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 1.4, 0));

  useFrame((_, delta) => {
    if (isOrbitMode) return;

    const { pos, lookAt } = interpolateScrollTarget(scrollProgress);

    // Subtle mouse parallax
    const targetX = pos[0] + mousePos.x * 0.45;
    const targetY = pos[1] - mousePos.y * 0.25;
    const targetZ = pos[2];

    // Smooth camera position damping
    const lerpSpeed = Math.min(delta * 3.5, 0.2);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, lerpSpeed);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, lerpSpeed);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, lerpSpeed);

    // Smooth camera lookAt damping
    currentLookAt.current.x = THREE.MathUtils.lerp(currentLookAt.current.x, lookAt[0], lerpSpeed);
    currentLookAt.current.y = THREE.MathUtils.lerp(currentLookAt.current.y, lookAt[1], lerpSpeed);
    currentLookAt.current.z = THREE.MathUtils.lerp(currentLookAt.current.z, lookAt[2], lerpSpeed);

    camera.lookAt(currentLookAt.current);
  });

  return null;
}

/* =========================================================================
   MAIN 3D SCENE & AMBIENCE
   ========================================================================= */

interface ThreeSalonSceneProps {
  liteMode?: boolean;
  onSelectStation?: (stationName: string) => void;
  onOpenBooking?: () => void;
}

export const ThreeSalonScene: React.FC<ThreeSalonSceneProps> = ({
  liteMode = false,
  onSelectStation,
  onOpenBooking,
}) => {
  // Global page scroll progress state [0..1]
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isOrbitMode, setIsOrbitMode] = useState(false);
  const [lightingTheme, setLightingTheme] = useState<'gold' | 'sapphire' | 'champagne'>('gold');
  const [activeStationName, setActiveStationName] = useState('Royal Stylist Throne');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Listen to window scroll
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
          setScrollProgress(Math.min(1, Math.max(0, progress)));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen to mouse move for subtle parallax
  useEffect(() => {
    if (liteMode) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [liteMode]);

  // Current active waypoint label for HUD
  const activeChapter = useMemo(() => {
    if (scrollProgress < 0.15) return { num: '01', title: 'Imperial Sanctuary' };
    if (scrollProgress < 0.4) return { num: '02', title: 'Haute Menu & Styling Bar' };
    if (scrollProgress < 0.65) return { num: '03', title: 'Artistic Transformations' };
    if (scrollProgress < 0.85) return { num: '04', title: 'Patron Wall & Master Team' };
    return { num: '05', title: 'Curated Combos & Reserve' };
  }, [scrollProgress]);

  const lightColor =
    lightingTheme === 'sapphire'
      ? '#7BA9E8'
      : lightingTheme === 'champagne'
      ? '#FFF3D6'
      : '#FFDF78';

  // Smooth scroll helper for Wayfinder dots
  const scrollToChapter = (fraction: number) => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: totalHeight * fraction,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* Fixed Full-Viewport Background 3D Canvas */}
      <div
        className={`fixed inset-0 z-0 overflow-hidden transition-all duration-700 ${
          isOrbitMode ? 'pointer-events-auto cursor-grab active:cursor-grabbing' : 'pointer-events-none'
        }`}
      >
        {/* Ambient Radial Vignette & Linen Scrim (allows 3D to shine through while keeping text legible) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#11192A]/40 via-[#070B14]/80 to-[#070B14]/95 pointer-events-none z-1" />

        {/* 3D WebGL Canvas */}
        {!liteMode ? (
          <Canvas
            dpr={[1, 1.5]}
            camera={{ position: [0, 2.2, 4.8], fov: 48 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            className="w-full h-full"
          >
            {/* Dynamic Studio Lighting */}
            <ambientLight intensity={0.55} />
            <directionalLight position={[3, 8, 4]} intensity={2.2} color={lightColor} />
            <pointLight position={[-3, 3, 2]} intensity={1.5} color="#D4AF37" />

            {/* Polished Black Obsidian & Marble Floor with Geometric Gold Border Inlay */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
              <planeGeometry args={[20, 20]} />
              <meshStandardMaterial color="#060911" roughness={0.12} metalness={0.65} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
              <ringGeometry args={[2.5, 2.56, 48]} />
              <meshStandardMaterial color="#D4AF37" metalness={0.95} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
              <ringGeometry args={[3.8, 3.86, 48]} />
              <meshStandardMaterial color="#D4AF37" metalness={0.95} />
            </mesh>

            {/* Central Throne Chair */}
            <RoyalStylistThrone
              isSelected={activeStationName === 'Royal Stylist Throne'}
              onClick={() => {
                setActiveStationName('Royal Stylist Throne');
                if (onSelectStation) onSelectStation('Haircut & Styling');
              }}
            />

            {/* Grand Arch & Mirror */}
            <GrandArchMirror />

            {/* Floating Scissors */}
            <FloatingGoldScissors />

            {/* Grand Crystal Chandelier */}
            <RoyalChandelier />

            {/* Left Station: Aromatherapy Spa */}
            <SideStation
              position={[-2.4, 0, 0.6]}
              label="Spa Suite"
              color="#5CA6FF"
              onClick={() => {
                setActiveStationName('Aromatherapy Spa Suite');
                if (onSelectStation) onSelectStation('Spa');
              }}
            />

            {/* Right Station: Aesthetic Facial Bar */}
            <SideStation
              position={[2.4, 0, 0.6]}
              label="Aesthetic Bar"
              color="#FFDF78"
              onClick={() => {
                setActiveStationName('Aesthetic & Facial Bar');
                if (onSelectStation) onSelectStation('Facial');
              }}
            />

            {/* Floating Gold Sparkle Embers */}
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
              <Sparkles count={60} scale={[10, 6, 8]} size={2.8} speed={0.4} color="#D4AF37" />
            </Float>

            {/* Scroll Camera Controller */}
            <ScrollCameraController
              scrollProgress={scrollProgress}
              isOrbitMode={isOrbitMode}
              mousePos={mousePos}
            />

            {/* OrbitControls active when user toggles 360 inspect mode */}
            {isOrbitMode && (
              <OrbitControls
                enableZoom={true}
                maxDistance={7.5}
                minDistance={1.8}
                maxPolarAngle={Math.PI / 2 - 0.05}
                minPolarAngle={Math.PI / 6}
                dampingFactor={0.08}
              />
            )}
          </Canvas>
        ) : (
          /* High-performance Lite Fallback (Gentle Gold Gradients) */
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A111F] via-[#070B14] to-[#05080E] opacity-90" />
        )}
      </div>

      {/* =========================================================================
         FLOATING 3D SPATIAL CONTROLS & WAYFINDER HUD (Layered above 3D scene)
         ========================================================================= */}

      {/* Floating 3D Navigation Wayfinder (Desktop Right Edge) */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-end gap-3.5 pointer-events-auto select-none">
        <div className="flex flex-col items-end gap-1.5 p-2 rounded-2xl bg-[#070B14]/80 border border-[#D4AF37]/30 backdrop-blur-xl shadow-2xl">
          {[
            { fraction: 0.0, num: '01', label: 'Sanctuary' },
            { fraction: 0.25, num: '02', label: 'Menu' },
            { fraction: 0.5, num: '03', label: 'Artistry' },
            { fraction: 0.75, num: '04', label: 'Patrons' },
            { fraction: 1.0, num: '05', label: 'Reserve' },
          ].map((item, idx) => {
            const isActive =
              (idx === 0 && scrollProgress < 0.15) ||
              (idx === 1 && scrollProgress >= 0.15 && scrollProgress < 0.38) ||
              (idx === 2 && scrollProgress >= 0.38 && scrollProgress < 0.65) ||
              (idx === 3 && scrollProgress >= 0.65 && scrollProgress < 0.88) ||
              (idx === 4 && scrollProgress >= 0.88);

            return (
              <button
                key={item.num}
                onClick={() => scrollToChapter(item.fraction)}
                className={`group flex items-center gap-2 px-2.5 py-1.5 rounded-xl transition-all duration-300 text-right ${
                  isActive
                    ? 'bg-[#D4AF37]/20 text-[#FFDF78] font-bold shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                    : 'text-gray-400 hover:text-white'
                }`}
                title={`Go to chapter ${item.num}: ${item.label}`}
              >
                <span
                  className={`text-[10px] font-mono tracking-wider transition-all ${
                    isActive ? 'text-[#FFDF78]' : 'text-gray-500 group-hover:text-gray-300'
                  }`}
                >
                  {item.label}
                </span>
                <span
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-4 bg-[#FFDF78] shadow-[0_0_10px_#FFDF78]'
                      : 'bg-white/20 group-hover:bg-white/50'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Current Camera Vantage HUD indicator */}
        <div className="px-3 py-1.5 rounded-full bg-[#070B14]/85 border border-[#D4AF37]/40 text-[#FFDF78] text-[11px] font-mono tracking-wider backdrop-blur-md shadow-lg flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>
            {activeChapter.num} // {activeChapter.title}
          </span>
        </div>
      </div>

      {/* Floating Bottom-Left 3D Scene Controls (Lighting & 360° Inspect) */}
      {!liteMode && (
        <div className="fixed bottom-6 left-6 z-30 flex items-center gap-2 pointer-events-auto">
          {/* 360° Free Inspect Toggle */}
          <button
            onClick={() => setIsOrbitMode(!isOrbitMode)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 backdrop-blur-xl border transition-all duration-300 shadow-xl ${
              isOrbitMode
                ? 'bg-[#D4AF37] text-[#070B14] border-[#FFDF78] shadow-[0_0_20px_rgba(212,175,55,0.5)] font-bold'
                : 'bg-[#070B14]/85 text-[#F3EFE0] border-[#D4AF37]/40 hover:border-[#FFDF78]'
            }`}
            title="Toggle 360° Free Camera Inspection"
          >
            {isOrbitMode ? (
              <>
                <Minimize2 className="w-3.5 h-3.5" />
                <span>Resume 3D Journey</span>
              </>
            ) : (
              <>
                <RotateCcw className="w-3.5 h-3.5 text-[#FFDF78]" />
                <span className="hidden sm:inline">360° Free Inspect</span>
                <span className="sm:hidden">360°</span>
              </>
            )}
          </button>

          {/* Lighting Mode Pill */}
          <button
            onClick={() =>
              setLightingTheme((curr) =>
                curr === 'gold' ? 'sapphire' : curr === 'sapphire' ? 'champagne' : 'gold'
              )
            }
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-[#070B14]/85 border border-[#D4AF37]/40 text-[#FFDF78] text-xs flex items-center gap-1.5 backdrop-blur-xl hover:border-[#FFDF78] transition-all shadow-xl"
            title="Change Ambiance Lighting"
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline capitalize">{lightingTheme} Aura</span>
          </button>
        </div>
      )}

      {/* Free Orbit Active Notice */}
      {isOrbitMode && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 px-5 py-2 rounded-full bg-[#070B14]/90 border border-[#D4AF37] text-[#FFDF78] text-xs font-bold backdrop-blur-xl shadow-2xl flex items-center gap-2 animate-bounce pointer-events-auto">
          <Move className="w-3.5 h-3.5" />
          <span>Click &amp; Drag Anywhere to Orbit 360° • Click &apos;Resume 3D Journey&apos; to continue scrolling</span>
        </div>
      )}
    </>
  );
};
