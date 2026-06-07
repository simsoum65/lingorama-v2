"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import type { ConfiguratorState } from "@/lib/configurator";

type Props = { state: ConfiguratorState };

// --- Mapping tissage → matériau ---
const WEAVE_MATERIAL = {
  "57": { roughness: 0.85, metalness: 0.0, envMapIntensity: 0.4 },
  "80": { roughness: 0.55, metalness: 0.05, envMapIntensity: 0.8 },
  "120": { roughness: 0.15, metalness: 0.12, envMapIntensity: 1.8 },
} as const;

// --- Mapping taille matelas (cm → unités 3D) ---
const SIZE_MAP: Record<string, [number, number]> = {
  "80x200":  [0.8, 2.0],
  "90x200":  [0.9, 2.0],
  "120x200": [1.2, 2.0],
  "140x190": [1.4, 1.9],
  "140x200": [1.4, 2.0],
  "160x200": [1.6, 2.0],
  "180x200": [1.8, 2.0],
  "200x200": [2.0, 2.0],
};

function Bed({ state }: Props) {
  const sheetRef = useRef<THREE.Mesh>(null);
  const [w, l] = SIZE_MAP[state.size] ?? [1.6, 2.0];

  const sheetMaterialProps = WEAVE_MATERIAL[state.weave];

  // Soft idle motion
  useFrame((s) => {
    if (sheetRef.current) {
      sheetRef.current.position.y =
        0.5 + Math.sin(s.clock.elapsedTime * 0.6) * 0.003;
    }
  });

  // Couleur drap-housse
  const sheetColor = useMemo(() => new THREE.Color(state.sheetColor), [state.sheetColor]);
  const duvetCoverColor = useMemo(
    () => new THREE.Color(state.duvetCoverColor),
    [state.duvetCoverColor]
  );

  return (
    <group position={[0, -0.2, 0]}>
      {/* Sommier */}
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[w + 0.05, 0.3, l + 0.05]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.6} />
      </mesh>
      {/* Pieds */}
      {[
        [-w / 2 + 0.05, -l / 2 + 0.05],
        [w / 2 - 0.05, -l / 2 + 0.05],
        [-w / 2 + 0.05, l / 2 - 0.05],
        [w / 2 - 0.05, l / 2 - 0.05],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0, z]}>
          <cylinderGeometry args={[0.025, 0.025, 0.3, 8]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      ))}

      {/* Matelas */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[w, 0.25, l]} />
        <meshStandardMaterial color="#f5f5f0" roughness={0.85} />
      </mesh>

      {/* Protège-matelas (si sélectionné) */}
      {state.protector && (
        <mesh position={[0, 0.585, 0]} receiveShadow>
          <boxGeometry args={[w + 0.005, 0.02, l + 0.005]} />
          <meshStandardMaterial color="#FAFAF9" roughness={0.7} />
        </mesh>
      )}

      {/* Drap-housse — tissage adaptatif */}
      <mesh ref={sheetRef} position={[0, 0.6, 0]} castShadow receiveShadow>
        <boxGeometry args={[w + 0.02, 0.04, l + 0.02]} />
        <meshStandardMaterial
          color={sheetColor}
          roughness={sheetMaterialProps.roughness}
          metalness={sheetMaterialProps.metalness}
          envMapIntensity={sheetMaterialProps.envMapIntensity}
        />
      </mesh>

      {/* Couette (si sélectionnée) */}
      {state.duvet && (
        <mesh position={[0, 0.7, 0.2]} castShadow receiveShadow>
          <boxGeometry args={[w + 0.15, 0.12, l * 0.75]} />
          <meshStandardMaterial
            color={duvetCoverColor}
            roughness={sheetMaterialProps.roughness * 1.1}
            metalness={sheetMaterialProps.metalness}
          />
        </mesh>
      )}

      {/* Oreillers */}
      {state.pillows > 0 &&
        Array.from({ length: state.pillows }).map((_, i) => {
          const offset = state.pillows === 1 ? 0 : i === 0 ? -0.35 : 0.35;
          return (
            <mesh
              key={i}
              position={[offset, 0.72, -l / 2 + 0.25]}
              rotation={[0.1, 0, 0]}
              castShadow
            >
              <boxGeometry args={[0.55, 0.1, 0.35]} />
              <meshStandardMaterial
                color={duvetCoverColor}
                roughness={sheetMaterialProps.roughness}
                metalness={sheetMaterialProps.metalness}
              />
            </mesh>
          );
        })}

      {/* Tête de lit (décor) */}
      <mesh position={[0, 0.9, -l / 2 - 0.05]} castShadow>
        <boxGeometry args={[w + 0.1, 1.4, 0.1]} />
        <meshStandardMaterial color="#3a4a5e" roughness={0.7} />
      </mesh>

      <ContactShadows position={[0, -0.01, 0]} opacity={0.35} blur={2} scale={6} />
    </group>
  );
}

export default function Bed3D({ state }: Props) {
  return (
    <Canvas
      shadows
      camera={{ position: [2.5, 1.8, 3], fov: 38 }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
    >
      <color attach="background" args={["#F5F0EB"]} />
      <ambientLight intensity={0.45} />
      <directionalLight
        position={[5, 8, 3]}
        intensity={1.6}
        color="#FFE8C0"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-4, 5, -2]} intensity={0.4} color="#A0D4DC" />
      <hemisphereLight args={["#FFF5E4", "#3a3a4a", 0.5]} />
      <Bed state={state} />
      <OrbitControls
        enablePan={false}
        minDistance={2.5}
        maxDistance={5.5}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2.2}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
}
