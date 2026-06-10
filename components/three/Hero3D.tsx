"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { JerseyMesh } from "./JerseyMesh";

/**
 * Rig que anima el grupo: rotación base por scroll + parallax con el puntero,
 * suavizado con lerp en cada frame.
 */
function Rig({ children }: { children: ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const scrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      scrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame((state) => {
    const g = ref.current;
    if (!g) return;
    const { pointer } = state;
    // Rotación objetivo: scroll empuja el giro en Y; el puntero da parallax.
    const targetY = scrollY.current * 0.0016 + pointer.x * 0.4;
    const targetX = -pointer.y * 0.25;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetY, 0.08);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, targetX, 0.08);
  });

  return <group ref={ref}>{children}</group>;
}

export type Hero3DColores = {
  primario: string;
  secundario: string;
  detalle: string;
};

export default function Hero3D({
  colores,
  numero,
}: {
  colores: Hero3DColores;
  numero?: string;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 35 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      {/* Iluminación de 3 puntos + rim verde de marca */}
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 5]} intensity={2.2} castShadow />
      <directionalLight position={[-5, 2, -2]} intensity={0.9} color="#00ff87" />
      <directionalLight position={[0, -3, 4]} intensity={0.4} color="#ff2e5b" />

      <Rig>
        <Float speed={2} rotationIntensity={0.35} floatIntensity={0.7}>
          <JerseyMesh
            primario={colores.primario}
            secundario={colores.secundario}
            detalle={colores.detalle}
            numero={numero}
          />
        </Float>
      </Rig>

      <ContactShadows
        position={[0, -2.1, 0]}
        opacity={0.35}
        blur={2.6}
        scale={9}
        far={3}
        color="#000000"
      />
    </Canvas>
  );
}
