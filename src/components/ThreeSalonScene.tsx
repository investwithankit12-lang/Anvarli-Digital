import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

/* =========================================================================
   3D MESH ASSETS: ROYAL CHAIR, GRAND ARCH, SCISSORS, CHANDELIER
   ========================================================================= */

/**
 * 3D Royal Stylist Throne Chair
 */
function RoyalStylistThrone({ isSelected }: { isSelected?: boolean }) {
  const chairRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (chairRef.current) {
      const t = clock.getElapsedTime();
      // Gentle breathing idle rotation
      chairRef.current.rotation.y = Math.sin(t * 0.45) * 0.12;
    }
  });

  return (
    <group ref={chairRef} position={[0, 0, 0]} scale={1.05}>
      {/* Ornate Gold Crown finial on top of chair */}
      <mesh position={[0, 2.38, -0.42]}>
        <cylinderGeometry args={[0.09, 0.18, 0.2, 5]} />
        <meshStandardMaterial
          color="#FFDF78"
          metalness={0.96}
          roughness={0.12}
          emissive="#AA7C11"
          emissiveIntensity={0.35}
        />
      </mesh>

      {/* Hydraulic Polished Gold & Chrome Base */}
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.74, 0.8, 0.12, 36]} />
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

      {/* Interactive Glowing Floor Beacon on Base */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.84, 1.16, 36]} />
        <meshBasicMaterial color="#FFDF78" opacity={0.5} transparent />
      </mesh>
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
 * Side Station Pedestals (Spa & Facial Bar)
 */
function SideStation({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <group position={position}>
      {/* Station Pedestal */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.55, 0.65, 0.9, 24]} />
        <meshStandardMaterial color="#0A101D" metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.91, 0]}>
        <cylinderGeometry args={[0.58, 0.58, 0.05, 24]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Glowing Orb */}
      <mesh position={[0, 1.25, 0]}>
        <sphereGeometry args={[0.18, 20, 20]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.6}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Rotating Floor Halo */}
      <mesh ref={ringRef} position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.7, 0.85, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

/* =========================================================================
   CAMERA SCROLL CONTROLLER
   ========================================================================= */

interface ScrollTarget {
  pos: [number, number, number];
  lookAt: [number, number, number];
}

const SCROLL_STAGES: { threshold: number; target: ScrollTarget }[] = [
  {
    threshold: 0.0,
    target: { pos: [0, 2.2, 4.6], lookAt: [0, 1.35, 0] },
  },
  {
    threshold: 0.22,
    target: { pos: [2.2, 1.8, 2.8], lookAt: [-0.3, 1.25, -0.5] },
  },
  {
    threshold: 0.48,
    target: { pos: [-2.2, 2.8, 3.2], lookAt: [0.1, 1.35, -0.6] },
  },
  {
    threshold: 0.72,
    target: { pos: [-1.8, 1.6, 2.3], lookAt: [0.3, 1.25, 0] },
  },
  {
    threshold: 1.0,
    target: { pos: [0, 3.8, 6.0], lookAt: [0, 1.2, 0] },
  },
];

function interpolateScrollTarget(progress: number): ScrollTarget {
  const p = Math.max(0, Math.min(1, progress));

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
  mousePos,
}: {
  scrollProgress: number;
  mousePos: { x: number; y: number };
}) {
  const { camera } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 1.35, 0));

  useFrame((_, delta) => {
    const { pos, lookAt } = interpolateScrollTarget(scrollProgress);

    // Mouse parallax
    const targetX = pos[0] + mousePos.x * 0.4;
    const targetY = pos[1] - mousePos.y * 0.25;
    const targetZ = pos[2];

    const lerpSpeed = Math.min(delta * 3.5, 0.2);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, lerpSpeed);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, lerpSpeed);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, lerpSpeed);

    currentLookAt.current.x = THREE.MathUtils.lerp(currentLookAt.current.x, lookAt[0], lerpSpeed);
    currentLookAt.current.y = THREE.MathUtils.lerp(currentLookAt.current.y, lookAt[1], lerpSpeed);
    currentLookAt.current.z = THREE.MathUtils.lerp(currentLookAt.current.z, lookAt[2], lerpSpeed);

    camera.lookAt(currentLookAt.current);
  });

  return null;
}

/* =========================================================================
   MAIN 3D BACKGROUND SCENE
   ========================================================================= */

interface ThreeSalonSceneProps {
  liteMode?: boolean;
}

export const ThreeSalonScene: React.FC<ThreeSalonSceneProps> = ({ liteMode = false }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Luxury Radial Scrim for Text Legibility */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#11192A]/40 via-[#070B14]/85 to-[#070B14]/95 z-1 pointer-events-none" />

      {/* 3D WebGL Canvas with Royal Stylist Chair and Salon Environment */}
      {!liteMode ? (
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 2.2, 4.6], fov: 48 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="w-full h-full"
        >
          {/* Studio Lights */}
          <ambientLight intensity={0.55} />
          <directionalLight position={[3, 8, 4]} intensity={2.2} color="#FFDF78" />
          <pointLight position={[-3, 3, 2]} intensity={1.5} color="#D4AF37" />

          {/* Polished Black Obsidian & Marble Floor with Inlay Rings */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry args={[22, 22]} />
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

          {/* Royal Stylist Throne Chair */}
          <RoyalStylistThrone />

          {/* Grand Arch & Mirror */}
          <GrandArchMirror />

          {/* Floating Gold Scissors */}
          <FloatingGoldScissors />

          {/* Grand Crystal Chandelier */}
          <RoyalChandelier />

          {/* Side Station Pedestals */}
          <SideStation position={[-2.4, 0, 0.6]} color="#5CA6FF" />
          <SideStation position={[2.4, 0, 0.6]} color="#FFDF78" />

          {/* Floating Golden Dust */}
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
            <Sparkles count={60} scale={[10, 6, 8]} size={2.8} speed={0.4} color="#D4AF37" />
          </Float>

          {/* Continuous Camera Scroll Choreographer */}
          <ScrollCameraController
            scrollProgress={scrollProgress}
            mousePos={mousePos}
          />
        </Canvas>
      ) : (
        /* Lite Mode Ambient Gradient */
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A111F] via-[#070B14] to-[#05080E] opacity-90" />
      )}
    </div>
  );
};
