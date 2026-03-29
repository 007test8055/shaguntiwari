"use client";

import { useRef, useMemo, Suspense, useEffect, MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  MeshTransmissionMaterial,
  Float,
  Environment,
  ContactShadows,
  PerspectiveCamera,
} from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import * as THREE from "three";
import { useReducedMotion } from "framer-motion";

/* ── Types ───────────────────────────────────────────────────────────────── */
type MouseRef = MutableRefObject<{ x: number; y: number }>;

/* ── Glass Torus Knot ────────────────────────────────────────────────────── */
function GlassKnot({ mouse }: { mouse: MouseRef }) {
  const mesh = useRef<THREE.Mesh>(null);
  const reduced = useReducedMotion();

  // Memoised MeshTransmissionMaterial props — expensive to recompute
  const mat = useMemo(
    () => ({
      samples: 10,
      resolution: 512,
      transmission: 1,
      roughness: 0.02,
      thickness: 3.0,
      ior: 1.55,
      chromaticAberration: 0.09,
      anisotropy: 0.5,
      distortion: 0.14,
      distortionScale: 0.35,
      temporalDistortion: 0.07,
      attenuationDistance: 0.55,
      attenuationColor: "#5b21b6",  // deep violet
      color: "#c4b5fd",  // violet-300
    }),
    []
  );

  useFrame((state) => {
    if (!mesh.current || reduced) return;
    const t = state.clock.elapsedTime;
    const mx = mouse.current.x;
    const my = mouse.current.y;

    // Smooth mouse-reactive rotation + slow autonomous spin
    mesh.current.rotation.x = THREE.MathUtils.lerp(
      mesh.current.rotation.x, my * 0.4 + t * 0.055, 0.025
    );
    mesh.current.rotation.y = THREE.MathUtils.lerp(
      mesh.current.rotation.y, mx * 0.4 + t * 0.09, 0.025
    );
    mesh.current.rotation.z = THREE.MathUtils.lerp(
      mesh.current.rotation.z, Math.sin(t * 0.25) * 0.06, 0.025
    );
  });

  return (
    <Float speed={0.7} rotationIntensity={0.12} floatIntensity={0.9}>
      {/* Offset to right — leaves left side open for text */}
      <mesh ref={mesh} position={[2.8, 0, 0]}>
        <torusKnotGeometry args={[1.35, 0.44, 220, 34, 2, 3]} />
        <MeshTransmissionMaterial {...mat} />
      </mesh>
    </Float>
  );
}

/* ── Particle Sphere (Fibonacci distribution) ────────────────────────────── */
function Particles({ count = 2200 }: { count?: number }) {
  const pts = useRef<THREE.Points>(null);
  const reduced = useReducedMotion();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const golden = Math.PI * (3 - Math.sqrt(5)); // golden angle

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;          // -1 → 1
      const radius = Math.sqrt(1 - y * y) * (4.5 + Math.random() * 4.5);
      const theta = golden * i;

      arr[i * 3] = radius * Math.cos(theta);
      arr[i * 3 + 1] = y * (4.5 + Math.random() * 4.5);
      arr[i * 3 + 2] = radius * Math.sin(theta);
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!pts.current || reduced) return;
    const t = state.clock.elapsedTime;
    pts.current.rotation.y = t * 0.022;
    pts.current.rotation.x = Math.sin(t * 0.014) * 0.12;
  });

  return (
    <points ref={pts}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.011}
        color="#7c3aed"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ── Slow-Rotating Ambient Rings ─────────────────────────────────────────── */
function AmbientRings() {
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const r3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (r1.current) { r1.current.rotation.x = t * 0.11; r1.current.rotation.z = t * 0.06; }
    if (r2.current) { r2.current.rotation.y = t * 0.08; r2.current.rotation.z = -t * 0.05; }
    if (r3.current) { r3.current.rotation.x = -t * 0.07; r3.current.rotation.y = t * 0.04; }
  });

  return (
    <group position={[2.8, 0, 0]}>
      <mesh ref={r1}>
        <torusGeometry args={[3.1, 0.006, 16, 220]} />
        <meshBasicMaterial color="#4c1d95" transparent opacity={0.35} />
      </mesh>
      <mesh ref={r2}>
        <torusGeometry args={[3.8, 0.004, 16, 220]} />
        <meshBasicMaterial color="#0e7490" transparent opacity={0.22} />
      </mesh>
      <mesh ref={r3}>
        <torusGeometry args={[4.5, 0.003, 16, 220]} />
        <meshBasicMaterial color="#5b21b6" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

/* ── Full Scene (inside Canvas) ──────────────────────────────────────────── */
function Scene({ mouse }: { mouse: MouseRef }) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.08} />
      <spotLight
        position={[6, 9, 6]} angle={0.22} penumbra={1}
        intensity={5} color="#7c3aed" castShadow
      />
      <pointLight position={[-7, -4, -6]} intensity={2.5} color="#06b6d4" />
      <pointLight position={[0, 7, 2]} intensity={0.9} color="#ffffff" />
      <pointLight position={[9, 0, 4]} intensity={2} color="#6d28d9" />

      {/* Scene objects */}
      <GlassKnot mouse={mouse} />
      <Particles count={2200} />
      <AmbientRings />

      {/* Environment & contact shadow */}
      <Environment preset="night" />
      <ContactShadows
        position={[2.8, -3.6, 0]} opacity={0.18}
        scale={14} blur={4} far={5}
      />

      {/* ── Post-processing ── */}
      <EffectComposer>
        {/* Bloom: makes bright glass edges glow beautifully */}
        <Bloom
          luminanceThreshold={0.12}
          luminanceSmoothing={0.92}
          intensity={2.2}
          mipmapBlur
        />
        {/* Subtle chromatic aberration for that cinematic feel */}
        <ChromaticAberration
          offset={new THREE.Vector2(0.0007, 0.0007) as never}
          radialModulation={false}
          modulationOffset={0}
        />
      </EffectComposer>
    </>
  );
}

/* ── Main export ─────────────────────────────────────────────────────────── */
export default function HeroCanvas() {
  const mouse = useRef({ x: 0, y: 0 });

  // Track mouse globally so the 3D object can react
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.25,
        }}
        dpr={[1, 1.5]}   // cap at 1.5× for perf
        shadows
        eventPrefix="client"
      >
        {/* Scene background colour & depth fog */}
        <color attach="background" args={["#03040a"]} />
        <fog attach="fog" args={["#03040a", 18, 30]} />

        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={44} near={0.1} far={100} />

        <Suspense fallback={null}>
          <Scene mouse={mouse} />
        </Suspense>
      </Canvas>
    </div>
  );
}
