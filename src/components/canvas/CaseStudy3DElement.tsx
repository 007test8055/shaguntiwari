"use client";
import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Wireframe } from "@react-three/drei";
import * as THREE from "three";

// ─── Iridescent outer shell ──────────────────────────────────────────────────
const iridShaderMat = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("#6f42d4") },
    uHover: { value: 0 },
  },
  vertexShader: /* glsl */ `
    varying vec3 vNormal;
    varying vec3 vViewDir;
    varying vec2 vUv;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 worldPos = modelViewMatrix * vec4(position, 1.0);
      vViewDir = normalize(-worldPos.xyz);
      vUv = uv;
      gl_Position = projectionMatrix * worldPos;
    }
  `,
  fragmentShader: /* glsl */ `
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uHover;
    varying vec3 vNormal;
    varying vec3 vViewDir;
    varying vec2 vUv;

    vec3 hsl2rgb(vec3 c) {
      vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0, 0.0, 1.0);
      return c.z + c.y * (rgb - 0.5) * (1.0 - abs(2.0*c.z - 1.0));
    }

    void main() {
      float fresnel = pow(1.0 - abs(dot(vNormal, vViewDir)), 3.0);
      float hue = mod(vUv.y * 1.2 + uTime * 0.08 + fresnel * 0.4 + uHover * 0.3, 1.0);
      vec3 iridescentColor = hsl2rgb(vec3(hue, 0.75, 0.55));
      vec3 base = mix(uColor * 0.4, iridescentColor, fresnel * 0.85);
      float alpha = 0.18 + fresnel * 0.55 + uHover * 0.12;
      gl_FragColor = vec4(base, alpha);
    }
  `,
  transparent: true,
  side: THREE.FrontSide,
  depthWrite: false,
};

// ─── Orbiting tetrahedra ─────────────────────────────────────────────────────
function OrbitingCrystals({ color, hovered }: { color: string; active: boolean; hovered: boolean }) {
  const group = useRef<THREE.Group>(null!);
  const count = 6;

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.children.forEach((child, i) => {
      const angle = (i / count) * Math.PI * 2 + t * 0.4;
      const tilt = Math.sin(t * 0.3 + i) * 0.3;
      child.position.set(
        Math.cos(angle) * 2.15,
        Math.sin(angle * 0.5 + i) * 0.45,
        Math.sin(angle) * 2.15
      );
      child.rotation.x = t * 0.6 + i;
      child.rotation.z = t * 0.4 + tilt;
      const s = hovered ? 0.13 : 0.09;
      child.scale.setScalar(THREE.MathUtils.lerp(child.scale.x, s, 0.07));
    });
  });

  return (
    <group ref={group}>
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i}>
          <tetrahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={color}
            metalness={0.9}
            roughness={0.1}
            emissive={color}
            emissiveIntensity={hovered ? 0.6 : 0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

// ─── Dust motes (instancedMesh) ──────────────────────────────────────────────
function DustMotes({ color }: { color: string }) {
  const ref = useRef<THREE.InstancedMesh>(null!);
  const count = 80;

  const { positions, speeds, phases } = useMemo(() => {
    const positions = Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 6,
      y: (Math.random() - 0.5) * 6,
      z: (Math.random() - 0.5) * 6,
      r: 0.8 + Math.random() * 2.2,
      theta: Math.random() * Math.PI * 2,
      phi: Math.random() * Math.PI,
    }));
    const speeds = Array.from({ length: count }, () => 0.1 + Math.random() * 0.25);
    const phases = Array.from({ length: count }, () => Math.random() * Math.PI * 2);
    return { positions, speeds, phases };
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    positions.forEach((p, i) => {
      const angle = t * speeds[i] + phases[i];
      dummy.position.set(
        Math.sin(angle) * p.r * Math.sin(p.phi),
        Math.cos(angle * 0.7) * p.r * 0.4 + p.y * 0.15,
        Math.cos(angle) * p.r * Math.cos(p.phi)
      );
      const s = 0.018 + Math.sin(t * speeds[i] * 2 + phases[i]) * 0.008;
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial color={color} transparent opacity={0.35} depthWrite={false} />
    </instancedMesh>
  );
}

// ─── Inner torus knot core ───────────────────────────────────────────────────
function Core({ color, hovered }: { color: string; hovered: boolean }) {
  const ref = useRef<THREE.Mesh>(null!);
  const matRef = useRef<THREE.ShaderMaterial>(null!);

  const shaderArgs = useMemo(() => ({
    ...iridShaderMat,
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uHover: { value: 0 },
    },
  }), [color]);

  useFrame(({ clock }, delta) => {
    if (!ref.current || !matRef.current) return;
    ref.current.rotation.x += delta * (hovered ? 0.25 : 0.12);
    ref.current.rotation.y += delta * (hovered ? 0.35 : 0.18);
    ref.current.rotation.z += delta * 0.07;
    matRef.current.uniforms.uTime.value = clock.getElapsedTime();
    matRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
      matRef.current.uniforms.uHover.value,
      hovered ? 1 : 0,
      0.05
    );
    const target = hovered ? 1.12 : 1.0;
    ref.current.scale.lerp(new THREE.Vector3(target, target, target), 0.07);
  });

  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[0.82, 0.28, 160, 24, 2, 3]} />
      <shaderMaterial ref={matRef} args={[shaderArgs]} />
    </mesh>
  );
}

// ─── Outer glass sphere ──────────────────────────────────────────────────────
function GlassSphere({ color, hovered }: { color: string; hovered: boolean }) {
  const ref = useRef<THREE.Mesh>(null!);
  const matRef = useRef<THREE.ShaderMaterial>(null!);

  const shaderArgs = useMemo(() => ({
    ...iridShaderMat,
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uHover: { value: 0 },
    },
  }), [color]);

  useFrame(({ clock }) => {
    if (!ref.current || !matRef.current) return;
    matRef.current.uniforms.uTime.value = clock.getElapsedTime();
    matRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
      matRef.current.uniforms.uHover.value,
      hovered ? 1 : 0,
      0.04
    );
    const t = hovered ? 1.05 : 1.0;
    ref.current.scale.lerp(new THREE.Vector3(t, t, t), 0.05);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.7, 64, 64]} />
      <shaderMaterial ref={matRef} args={[shaderArgs]} side={THREE.BackSide} />
    </mesh>
  );
}

// ─── Wireframe shell ─────────────────────────────────────────────────────────
function WireShell({ color, hovered }: { color: string; hovered: boolean }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y -= delta * 0.1;
    ref.current.rotation.x += delta * 0.05;
    const t = hovered ? 0.28 : 0.12;
    (ref.current.material as THREE.MeshBasicMaterial).opacity = THREE.MathUtils.lerp(
      (ref.current.material as THREE.MeshBasicMaterial).opacity,
      t,
      0.06
    );
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.65, 1]} />
      <meshBasicMaterial
        color={color}
        wireframe
        transparent
        opacity={0.12}
        depthWrite={false}
      />
    </mesh>
  );
}

// ─── Scene root ──────────────────────────────────────────────────────────────
function Scene({ color }: { color: string }) {
  const [hovered, setHover] = useState(false);

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.9}>
      <group
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <GlassSphere color={color} hovered={hovered} />
        <WireShell color={color} hovered={hovered} />
        <Core color={color} hovered={hovered} />
        <OrbitingCrystals color={color} active={hovered} hovered={hovered} />
        <DustMotes color={color} />
      </group>
    </Float>
  );
}

// ─── Export ──────────────────────────────────────────────────────────────────
export function CaseStudy3DElement({ color = "#6f42d4" }: { color?: string }) {
  return (
    <div
      className="w-full h-full cursor-pointer pointer-events-auto"
      title="Explore Case Study"
    >
      <Canvas
        camera={{ position: [0, 0.6, 5.5], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2.0} />
        <directionalLight position={[-8, -6, -4]} intensity={1.4} color={color} />
        <pointLight position={[3, 5, -3]} intensity={2.5} color={color} />
        <pointLight position={[-4, -3, 4]} intensity={1.2} color="#e0d0ff" />
        <Scene color={color} />
      </Canvas>
    </div>
  );
}