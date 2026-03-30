"use client";

import { useRef, useMemo, Suspense, useEffect, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
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
type MouseState = {
  x: number;
  y: number;
};

type MouseRef = RefObject<MouseState>;

/* ── Mouse Smoothing (Premium inertia) ───────────────────────────────────── */
function MouseSmoother({
  mouse,
  target,
}: {
  mouse: MouseRef;
  target: MouseRef;
}) {
  useFrame(() => {
    if (!mouse.current || !target.current) return;

    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, target.current.x, 0.08);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, target.current.y, 0.08);
  });

  return null;
}

/* ── Camera Parallax ─────────────────────────────────────────────────────── */
function CameraRig({ mouse }: { mouse: MouseRef }) {
  const { camera } = useThree();

  useFrame(() => {
    if (!mouse.current) return;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.current.x * 0.6, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.current.y * 0.4, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ── Glass Knot ─────────────────────────────────────────────────────────── */
function GlassKnot({ mouse }: { mouse: MouseRef }) {
  const mesh = useRef<THREE.Mesh>(null);
  const reduced = useReducedMotion();

  const mat = useMemo(
    () => ({
      samples: 8,
      resolution: 256,
      transmission: 1,
      roughness: 0.05,
      thickness: 2.6,
      ior: 1.45,
      chromaticAberration: 0.03,
      anisotropy: 0.3,
      distortion: 0.08,
      distortionScale: 0.2,
      temporalDistortion: 0.03,
      attenuationDistance: 0.7,
      attenuationColor: "#6d28d9",
      color: "#ddd6fe",
    }),
    []
  );

  useFrame((state) => {
    if (!mesh.current || !mouse.current || reduced) return;

    const t = state.clock.elapsedTime;
    const mx = mouse.current.x;
    const my = mouse.current.y;
    const delta = state.clock.getDelta();

    const targetX = my * 0.35 + Math.sin(t * 0.3) * 0.08;
    const targetY = mx * 0.45 + t * 0.08;

    mesh.current.rotation.x = THREE.MathUtils.damp(mesh.current.rotation.x, targetX, 4, delta);
    mesh.current.rotation.y = THREE.MathUtils.damp(mesh.current.rotation.y, targetY, 4, delta);
    mesh.current.rotation.z = THREE.MathUtils.damp(
      mesh.current.rotation.z,
      Math.sin(t * 0.2) * 0.05,
      4,
      delta
    );
  });

  return (
    <Float speed={0.6} rotationIntensity={0.1} floatIntensity={0.8}>
      <mesh ref={mesh} position={[2.8, 0, 0]}>
        <torusKnotGeometry args={[1.35, 0.44, 200, 32, 2, 3]} />
        <MeshTransmissionMaterial {...mat} />
      </mesh>
    </Float>
  );
}

/* ── Particles ───────────────────────────────────────────────────────────── */
function Particles({ count = 32000 }: { count?: number }) {
  const pts = useRef<THREE.Points>(null);
  const reduced = useReducedMotion();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radius = Math.sqrt(1 - y * y) * (4 + Math.random() * 4);
      const theta = golden * i;

      arr[i * 3] = radius * Math.cos(theta);
      arr[i * 3 + 1] = y * (4 + Math.random() * 4);
      arr[i * 3 + 2] = radius * Math.sin(theta);
    }

    return arr;
  }, [count]);

  useFrame((state) => {
    if (!pts.current || reduced) return;

    const t = state.clock.elapsedTime;
    pts.current.rotation.y = t * 0.02;
    pts.current.rotation.x = Math.sin(t * 0.015) * 0.1;
  });

  return (
    <points ref={pts}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.008} color="#8b5cf6" transparent opacity={0.5} depthWrite={false} />
    </points>
  );
}

/* ── Ambient Rings ───────────────────────────────────────────────────────── */
function AmbientRings() {
  const r = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!r.current) return;

    const t = state.clock.elapsedTime;
    r.current.rotation.x = t * 0.05;
    r.current.rotation.y = t * 0.04;
  });

  return (
    <group ref={r} position={[2.8, 0, 0]}>
      <mesh>
        <torusGeometry args={[3.2, 0.004, 16, 200]} />
        <meshBasicMaterial color="#4c1d95" transparent opacity={0.25} />
      </mesh>
      <mesh>
        <torusGeometry args={[4.2, 0.003, 16, 200]} />
        <meshBasicMaterial color="#0ea5e9" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

/* ── Scene ──────────────────────────────────────────────────────────────── */
function Scene({ mouse }: { mouse: MouseRef }) {
  return (
    <>
      <ambientLight intensity={0.05} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} />
      <pointLight position={[6, 2, 6]} intensity={2.5} color="#7c3aed" />
      <pointLight position={[-6, -2, -4]} intensity={1.5} color="#06b6d4" />

      <GlassKnot mouse={mouse} />
      <Particles />
      <AmbientRings />

      <Environment preset="city" />
      <ContactShadows position={[2.8, -3.6, 0]} opacity={0.2} scale={12} blur={4} far={5} />

      <EffectComposer multisampling={0}>
        <Bloom luminanceThreshold={0.3} intensity={0.9} mipmapBlur />
        <ChromaticAberration offset={new THREE.Vector2(0.0004, 0.0004) as never} />
      </EffectComposer>

      <CameraRig mouse={mouse} />
    </>
  );
}

/* ── Main ───────────────────────────────────────────────────────────────── */
export default function HeroCanvas() {
  const mouse = useRef<MouseState>({ x: 0, y: 0 });
  const target = useRef<MouseState>({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!target.current) return;

      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
          alpha: false,
          stencil: false,
          depth: true,
        }}
        dpr={[1, 1.5]}
        shadows
        frameloop="always"
      >
        <color attach="background" args={["#020308"]} />
        <fog attach="fog" args={["#020308", 18, 30]} />

        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={44} />

        <Suspense fallback={null}>
          <MouseSmoother mouse={mouse} target={target} />
          <Scene mouse={mouse} />
        </Suspense>
      </Canvas>
    </div>
  );
}