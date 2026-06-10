// Número de WhatsApp Business (sin "+" ni espacios). Fallback para previsualizar.
const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573001234567";

/** Construye una URL de wa.me con un mensaje pre-formateado. */
export function buildWhatsAppUrl(params: {
  producto?: string;
  talla?: string;
  personalizacion?: { nombre?: string; numero?: string };
  mensaje?: string;
}): string {
  let texto = params.mensaje ?? "¡Hola! Me interesa una camisa.";

  if (params.producto) {
    texto = `Hola, quiero información sobre: *${params.producto}*`;
    if (params.talla) texto += ` - Talla: *${params.talla}*`;
    if (params.personalizacion?.nombre)
      texto += ` - Nombre en dorsal: *${params.personalizacion.nombre}*`;
    if (params.personalizacion?.numero)
      texto += ` - Número: *${params.personalizacion.numero}*`;
  }

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(texto)}`;
}
