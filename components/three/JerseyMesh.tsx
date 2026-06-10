"use client";

import { useMemo } from "react";
import * as THREE from "three";

/**
 * Silueta de la camiseta (mismos puntos que el SVG de JerseyVisual) que se
 * extruye a un volumen 3D. Coordenadas en espacio SVG (y hacia abajo).
 */
const PUNTOS: [number, number][] = [
  [150, 36],
  [108, 28],
  [40, 70],
  [62, 132],
  [92, 120],
  [92, 300],
  [208, 300],
  [208, 120],
  [238, 132],
  [260, 70],
  [192, 28],
];

function buildGeometry() {
  const shape = new THREE.Shape();
  const cx = 150;
  const cy = 164;
  const s = 1 / 88; // escala a unidades de escena

  PUNTOS.forEach(([x, y], i) => {
    const X = (x - cx) * s;
    const Y = (cy - y) * s; // flip Y: SVG (y abajo) → 3D (y arriba)
    if (i === 0) shape.moveTo(X, Y);
    else shape.lineTo(X, Y);
  });
  shape.closePath();

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.28,
    bevelEnabled: true,
    bevelThickness: 0.06,
    bevelSize: 0.05,
    bevelSegments: 4,
    steps: 1,
  });
  geo.center();
  geo.computeVertexNormals();
  return geo;
}

/** Textura de canvas con el número del dorsal (sin dependencias externas). */
function numeroTexture(numero: string, colorTexto: string) {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = colorTexto;
  ctx.font = `700 340px ui-sans-serif, system-ui, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(numero, size / 2, size / 2 + 20);
  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 8;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function esColorClaro(hex: string) {
  const c = hex.replace("#", "");
  if (c.length !== 6) return false;
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.62;
}

export function JerseyMesh({
  primario,
  detalle,
  numero,
}: {
  primario: string;
  secundario?: string;
  detalle: string;
  numero?: string;
}) {
  const geo = useMemo(buildGeometry, []);
  const colorTexto = esColorClaro(primario) ? "#0B0B12" : "#FFFFFF";
  const numTex = useMemo(
    () => (numero ? numeroTexture(numero, colorTexto) : null),
    [numero, colorTexto],
  );

  return (
    <group scale={0.92}>
      {/* Cuerpo extruido de la camiseta */}
      <mesh geometry={geo} castShadow receiveShadow>
        <meshStandardMaterial
          color={primario}
          roughness={0.62}
          metalness={0.05}
          emissive={detalle}
          emissiveIntensity={0.04}
        />
      </mesh>

      {/* Número del dorsal (frente) */}
      {numTex && (
        <mesh position={[0, -0.28, 0.22]}>
          <planeGeometry args={[1.25, 1.25]} />
          <meshBasicMaterial map={numTex} transparent toneMapped={false} />
        </mesh>
      )}
    </group>
  );
}
