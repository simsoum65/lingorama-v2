"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type Props = {
  scrollProgress: number; // 0..1
};

/**
 * Façade 3D du magasin Lingorama.
 * Modélisation procédurale (pas de GLB requis) : bâtiment moderne avec
 * grandes baies vitrées, enseigne lumineuse, portes automatiques.
 */
function StoreFacade({ scrollProgress }: Props) {
  const cameraRef = useThree((s) => s.camera);
  const doorLeftRef = useRef<THREE.Group>(null);
  const doorRightRef = useRef<THREE.Group>(null);
  const signGlowRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(() => {
    const t = scrollProgress;

    // Phase 1 (0 → 0.5) : avance caméra vers les portes
    // Phase 2 (0.4 → 0.7) : ouverture portes
    // Phase 3 (0.7 → 1.0) : traversée du seuil

    const camZ = THREE.MathUtils.lerp(28, -8, easeInOutCubic(t));
    const camY = THREE.MathUtils.lerp(4, 2.2, easeInOutCubic(t));
    cameraRef.position.set(0, camY, camZ);
    cameraRef.lookAt(0, 2.5, camZ - 5);

    // Portes
    const doorOpen = THREE.MathUtils.clamp((t - 0.4) / 0.3, 0, 1);
    const doorAngle = (Math.PI / 2.2) * doorOpen;
    if (doorLeftRef.current) doorLeftRef.current.rotation.y = -doorAngle;
    if (doorRightRef.current) doorRightRef.current.rotation.y = doorAngle;

    // Pulse de l'enseigne
    if (signGlowRef.current) {
      const pulse = 1.5 + Math.sin(performance.now() * 0.002) * 0.15;
      signGlowRef.current.emissiveIntensity = pulse;
    }
  });

  return (
    <group>
      {/* Sol (trottoir) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.95} />
      </mesh>
      {/* Lignes de trottoir */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 8]}>
        <planeGeometry args={[40, 0.08]} />
        <meshBasicMaterial color="#666" />
      </mesh>

      {/* Bâtiment principal — corps en béton blanchi */}
      <mesh position={[0, 6, -3]} castShadow receiveShadow>
        <boxGeometry args={[24, 12, 6]} />
        <meshStandardMaterial color="#EDE8E0" roughness={0.85} />
      </mesh>

      {/* Encadrement vitrines */}
      <mesh position={[0, 4, -0.3]} castShadow>
        <boxGeometry args={[20, 7, 0.4]} />
        <meshStandardMaterial color="#2D3E50" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Vitrine gauche */}
      <mesh position={[-5, 4, -0.1]}>
        <boxGeometry args={[8, 6, 0.05]} />
        <meshPhysicalMaterial
          color="#a0d4dc"
          transmission={0.85}
          roughness={0.05}
          thickness={0.5}
          transparent
          opacity={0.5}
        />
      </mesh>
      {/* Vitrine droite */}
      <mesh position={[5, 4, -0.1]}>
        <boxGeometry args={[8, 6, 0.05]} />
        <meshPhysicalMaterial
          color="#a0d4dc"
          transmission={0.85}
          roughness={0.05}
          thickness={0.5}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Intérieur visible — lits et linges présentés */}
      <group position={[0, 0, -4]}>
        {/* Lit gauche */}
        <mesh position={[-5, 1, 0]} castShadow>
          <boxGeometry args={[3, 1, 2]} />
          <meshStandardMaterial color="#FAFAF9" roughness={0.7} />
        </mesh>
        {/* Lit droite */}
        <mesh position={[5, 1, 0]} castShadow>
          <boxGeometry args={[3, 1, 2]} />
          <meshStandardMaterial color="#E8D5C4" roughness={0.6} />
        </mesh>
        {/* Lumières intérieures chaudes */}
        <pointLight position={[-5, 4, 0]} intensity={6} distance={10} color="#FFE8C0" />
        <pointLight position={[5, 4, 0]} intensity={6} distance={10} color="#FFE8C0" />
        <pointLight position={[0, 4, -2]} intensity={4} distance={12} color="#FFD89B" />
      </group>

      {/* Sas central + portes */}
      <mesh position={[0, 3, -0.3]}>
        <boxGeometry args={[4, 6, 0.2]} />
        <meshStandardMaterial color="#1A2332" />
      </mesh>

      {/* Porte gauche (charnière à -2) */}
      <group ref={doorLeftRef} position={[-2, 3, -0.1]}>
        <mesh position={[1, 0, 0]} castShadow>
          <boxGeometry args={[2, 5.5, 0.08]} />
          <meshPhysicalMaterial
            color="#7ec8d2"
            transmission={0.7}
            roughness={0.1}
            metalness={0.2}
            transparent
            opacity={0.65}
          />
        </mesh>
        {/* Cadre métal */}
        <mesh position={[1, 0, 0.05]}>
          <boxGeometry args={[2, 5.5, 0.02]} />
          <meshStandardMaterial color="#2D3E50" metalness={0.8} roughness={0.3} wireframe />
        </mesh>
      </group>
      {/* Porte droite */}
      <group ref={doorRightRef} position={[2, 3, -0.1]}>
        <mesh position={[-1, 0, 0]} castShadow>
          <boxGeometry args={[2, 5.5, 0.08]} />
          <meshPhysicalMaterial
            color="#7ec8d2"
            transmission={0.7}
            roughness={0.1}
            metalness={0.2}
            transparent
            opacity={0.65}
          />
        </mesh>
      </group>

      {/* ENSEIGNE — Panneau lumineux avec le logo Lingorama */}
      <group position={[0, 10, 0.2]}>
        {/* Panneau de fond */}
        <mesh castShadow>
          <boxGeometry args={[16, 2.8, 0.3]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
        </mesh>
        {/* Cadre marine */}
        <mesh position={[0, 0, 0.16]}>
          <boxGeometry args={[16.2, 3, 0.05]} />
          <meshStandardMaterial color="#2D3E50" metalness={0.6} roughness={0.4} />
        </mesh>

        {/* Losange textile turquoise du logo */}
        <mesh position={[-5.5, 0, 0.2]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[1.8, 1.8, 0.15]} />
          <meshStandardMaterial
            ref={signGlowRef}
            color="#00B5C8"
            emissive="#00B5C8"
            emissiveIntensity={1.5}
          />
        </mesh>

        {/* Lettrage "Lingorama" — boîtes lumineuses procédurales */}
        {Array.from("LINGORAMA").map((letter, i) => (
          <mesh key={i} position={[-3 + i * 0.85, 0, 0.2]}>
            <boxGeometry args={[0.7, 1.4, 0.12]} />
            <meshStandardMaterial
              color="#2D3E50"
              emissive="#2D3E50"
              emissiveIntensity={0.05}
              metalness={0.5}
              roughness={0.6}
            />
          </mesh>
        ))}

        {/* Sous-titre "LINGE DE MAISON" */}
        <mesh position={[0, -1, 0.2]}>
          <boxGeometry args={[6, 0.35, 0.08]} />
          <meshStandardMaterial
            color="#00B5C8"
            emissive="#00B5C8"
            emissiveIntensity={0.8}
          />
        </mesh>
      </group>

      {/* Spots dirigés vers l'enseigne (effet lumineux nuit) */}
      <spotLight
        position={[-6, 14, 6]}
        target-position={[-2, 10, 0]}
        angle={0.4}
        penumbra={0.5}
        intensity={50}
        color="#FFE8C0"
        castShadow
      />
      <spotLight
        position={[6, 14, 6]}
        target-position={[2, 10, 0]}
        angle={0.4}
        penumbra={0.5}
        intensity={50}
        color="#FFE8C0"
      />

      {/* Toiture (corniche) */}
      <mesh position={[0, 12.2, -3]} castShadow>
        <boxGeometry args={[25, 0.4, 6.5]} />
        <meshStandardMaterial color="#D6CFC4" roughness={0.8} />
      </mesh>

      <ContactShadows position={[0, 0.01, 0]} opacity={0.4} blur={2.5} scale={40} />
    </group>
  );
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function Facade3D({ scrollProgress }: Props) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);

  if (reduced) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-brand-marine via-brand-marine-deep to-bg-warm flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="font-serif text-4xl">Bienvenue chez Lingorama</h2>
          <p className="mt-2 text-white/70">Magasin virtuel Lingorama</p>
        </div>
      </div>
    );
  }

  return (
    <Canvas
      shadows
      camera={{ position: [0, 4, 28], fov: 55 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      dpr={[1, 2]}
    >
      {/* Ciel */}
      <color attach="background" args={["#E8DCC8"]} />
      <fog attach="fog" args={["#E8DCC8", 25, 80]} />
      {/* Lumière ambiante chaleureuse */}
      <ambientLight intensity={0.5} color="#FFF5E4" />
      {/* Soleil */}
      <directionalLight
        position={[10, 20, 15]}
        intensity={2.2}
        color="#FFE8C0"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={60}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={20}
        shadow-camera-bottom={-5}
      />
      <Environment preset="sunset" />

      <StoreFacade scrollProgress={scrollProgress} />
    </Canvas>
  );
}
