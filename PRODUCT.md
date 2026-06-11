# Product

## Register

brand

## Users

**Hinchas jóvenes (16–30 años):** Fanáticos del fútbol colombiano e internacional que quieren la camisa de su equipo o jugador favorito. La compra es impulsiva y emocional: la ven, la quieren, la compran. El precio importa pero no veta si la confianza está ahí.

**Compradores de regalo:** Familiares o amigos que buscan un regalo especial para alguien que vive el fútbol. Valoran la presentación, la personalización del dorsal (nombre + número), y la confianza de que el producto llegará bien. Necesitan claridad, no convencimiento.

Ambos grupos compran desde Colombia, mayoritariamente por celular. La personalizacion del dorsal es el gancho principal que diferencia a KitStore de una tienda genérica.

## Product Purpose

KitStore vende camisas de fútbol premium — versión jugador y aficionado — con personalización de dorsal y envío a toda Colombia. El diferencial es la calidad percibida: no somos una tienda de réplicas baratas ni un marketplace sin cara. Somos la tienda donde el hincha confía.

Éxito se ve así: el visitante entra, ve la camisa que quiere, siente que la tienda es seria, y completa la compra sin fricción.

## Brand Personality

**Premium, confiable, exclusiva.**

Voz: directa, sin relleno. Habla como alguien que sabe de fútbol y sabe lo que vende. Nada corporativo, nada de "supercharge your game". El tono es seguro, no agresivo.

Referencia de feeling: Nike.com — fotografía de producto que domina, tipografía bold sin disculpas, UI que no compite con la camisa. La marca se siente establecida aunque no sea una corporación.

## Anti-references

- **Tiendas de réplicas baratas:** fotos mal recortadas, precios sin contexto, diseño descuidado que grita "aquí te pueden estafar". Cualquier elemento que genere duda sobre la seriedad del negocio está prohibido.
- **SaaS bland / Silicon Valley sterile:** fondo blanco, tipografía neutra, paleta azul/gris sin carácter. Diseñado para vender software de RRHH, no camisas de fútbol. Si un elemento parece sacado de un dashboard de SaaS, rehacerlo.
- **Marketplace genérico (Falabella, Éxito, Mercado Libre):** UI de catálogo masivo donde todo se ve igual. KitStore tiene identidad propia; no es una fila de productos sobre fondo blanco.

## Design Principles

1. **Confianza primero** — La primera impresión es de seriedad. Cada detalle de UI (tipografía, espaciado, fotos) debe comunicar que esto es un negocio real con productos reales. La duda no puede entrar.
2. **La camisa es la estrella** — El producto es el protagonista visual en cada pantalla. La UI lo sirve y lo enaltece; nunca compite con él ni lo ahoga.
3. **Velocidad emocional** — La decisión de compra es rápida y afectiva. El diseño facilita ese impulso: CTA visible, personalizacion accesible, checkout sin fricción.
4. **Identidad propia, no categoría** — KitStore no debe verse como "tienda de camisas genérica" ni como "tienda deportiva colombiana típica". Tiene un punto de vista estético específico: editorial oscuro, eléctrico, con carácter.
5. **Colombia en el contexto, no en los símbolos** — La identidad local vive en el lenguaje, las ligas, los equipos, el tono. No en banderas, colores de escudo, o clichés visuales.

## Accessibility & Inclusion

- WCAG AA como piso mínimo: contraste ≥4.5:1 en texto de cuerpo, ≥3:1 en texto grande e iconos interactivos.
- Paleta oscura: verificar siempre el verde eléctrico (`#00ff87`) contra superficies oscuras — pasa con holgura, pero hay que chequearlo en texto pequeño.
- `prefers-reduced-motion` ya implementado en `globals.css`; mantenerlo en todo componente nuevo con animaciones.
- Público mayoritariamente móvil colombiano: targets táctiles mínimo 44×44px, flujos de compra probados en pantallas de 360px de ancho.
