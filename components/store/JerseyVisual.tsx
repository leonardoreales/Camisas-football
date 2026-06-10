/**
 * Ilustración SVG de una camiseta de fútbol generada con los colores del
 * producto. Sirve como placeholder premium mientras no haya fotos reales
 * en Supabase Storage. Sin dependencias ni imágenes externas.
 */
export function JerseyVisual({
  primario,
  secundario,
  detalle,
  nombre,
  numero,
  className,
}: {
  primario: string;
  secundario: string;
  detalle: string;
  nombre?: string;
  numero?: string;
  className?: string;
}) {
  // Texto oscuro o claro según la luminancia del color primario.
  const textoOscuro = esColorClaro(primario);
  const colorTexto = textoOscuro ? "#0B0B12" : "#FFFFFF";

  return (
    <svg
      viewBox="0 0 300 320"
      className={className}
      role="img"
      aria-label={`Camiseta ${nombre ?? ""} ${numero ?? ""}`}
    >
      {/* Cuerpo de la camiseta */}
      <path
        d="M150 36 L108 28 L40 70 L62 132 L92 120 L92 300 L208 300 L208 120 L238 132 L260 70 L192 28 Z"
        fill={primario}
        stroke={detalle}
        strokeWidth="3"
      />
      {/* Mangas con color secundario */}
      <path d="M108 28 L40 70 L62 132 L92 120 L100 64 Z" fill={secundario} opacity="0.85" />
      <path d="M192 28 L260 70 L238 132 L208 120 L200 64 Z" fill={secundario} opacity="0.85" />
      {/* Cuello */}
      <path
        d="M122 30 Q150 58 178 30 L170 24 Q150 44 130 24 Z"
        fill={detalle}
      />
      {/* Franja central sutil */}
      <rect x="146" y="64" width="8" height="236" fill={secundario} opacity="0.25" />

      {/* Número en el dorsal */}
      {numero && (
        <text
          x="150"
          y="210"
          textAnchor="middle"
          fontFamily="Oswald, sans-serif"
          fontWeight="700"
          fontSize="96"
          fill={colorTexto}
        >
          {numero}
        </text>
      )}
      {/* Nombre sobre el número */}
      {nombre && (
        <text
          x="150"
          y="98"
          textAnchor="middle"
          fontFamily="Oswald, sans-serif"
          fontWeight="600"
          fontSize="22"
          letterSpacing="2"
          fill={colorTexto}
        >
          {nombre.toUpperCase()}
        </text>
      )}
    </svg>
  );
}

function esColorClaro(hex: string): boolean {
  const c = hex.replace("#", "");
  if (c.length !== 6) return false;
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  // Luminancia relativa
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.65;
}
