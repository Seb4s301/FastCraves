# Proyecto FastCraves — Material Design + Bootstrap + Tailwind + Sass

🔥 **Temática:** *Classic Flame Burgers* — Rojo Flame `#D42D18`, Mostaza `#F2A81C` y Espresso `#2A1409` sobre crema cálida `#FBF3E2`.

Este directorio contiene el proyecto web completo y autónomo de FastCraves, estilizado con **Sass (SCSS)** y complementado con una sección de **animaciones y transiciones en CSS puro** para lograr una experiencia de usuario dinámica, moderna e interactiva.

---

## 🔄 ACTUALIZACIONES

Resumen de todo lo realizado en la fase de pulido y rediseño del proyecto.

### 1. Imágenes optimizadas y limpias

- **Productos sin fondo:** 7 imágenes PNG con fondo blanco pasaron a **WebP con transparencia** (de ~400 KB a 46–61 KB cada una; las bebidas, aún más ligeras).
- **Hamburguesa del hero:** `HamburguesaPrimerFondo.png` → `hamburguesa-hero.webp` (900×600, ~55 KB, fondo eliminado).
- Todas las imágenes llevan `width`/`height` (evita saltos de layout) y `loading="lazy"`.
- **Limpieza:** se eliminaron las 9 imágenes fuente `.png` que ya no se usaban (**≈ 4.06 MB liberados**). En `IMG/` solo quedan los `.webp` en uso y `logo.jpg`.

### 2. Sistema de diseño cálido (inspirado en Burger King / Tantillo)

- **Paleta nueva** — se abandonó el blanco/gris frío y el naranja `#e67e22`:

| Rol | Color | Uso |
| --- | --- | --- |
| Rojo flame | `#D42D18` | Marca, navbar, botones principales, precios |
| Mostaza | `#F2A81C` | Destacados, tags, acentos |
| Crema vainilla | `#FBF3E2` | Fondo general |
| Superficie | `#FFFCF3` | Tarjetas y formularios |
| Chocolate | `#3A1E12` | Texto principal |
| Taupe | `#7C5A46` | Subtítulos y descripciones |
| Espresso | `#2A1409` | Footer y variantes de insignias |
| Topo | `#ECD9B4` | Bordes sutiles |

- **Un solo acento:** se eliminaron los badges verde/azul; todo obedece a rojo (marca) + mostaza (apoyo).
- **Formas redondeadas apetitosas:** botones píldora (`border-radius: 999px`), radio de tarjeta `18px`, sombras cálidas (nunca negras frías).
- **Footer espresso** con **divisor ondulado** (wave SVG) que une el contenido claro con el pie de forma orgánica.

### 3. Tipografía

- Evolución: **Archivo Black + Inter → Fredoka + Nunito → Anton + Nunito** (actual).
- **Anton** (display condensado y agresivo) para titulares: mayúsculas, itálico sintético, peso `400` (ya es ultra-negro, así se evita el faux-bold).
- **Nunito** para cuerpo y botones (peso `800`, mayúsculas en los botones).
- Google Fonts cargado con `display=swap` en las 4 páginas.

### 4. Hero rediseñado (inspirado en la plantilla «Forma» de Squarespace)

- Hero **cálido** — se eliminó la foto oscura de restaurante — con **resplandor radial ámbar**.
- Titular **Anton gigante en mayúsculas itálico** que **invade la hamburguesa**.
- **Hamburguesa grande** (hasta `680px`) detrás del titular por capas: imagen `z-index:1` → contenido `2` → titular `3`.
- **Halo orgánico** mostaza detrás de la hamburguesa.
- **Split editorial:** título a la izquierda, imagen a la derecha (≈ 58 % de la hamburguesa visible).
- Sombra de texto cálida (`text-shadow`) para mantener la legibilidad sobre la imagen.
- En móvil la hamburguesa se apila arriba y el titular recala a `clamp(2.7rem, 12vw, 4.2rem)`.

### 5. Sección «Nuestras Especialidades» horizontal y responsiva

- **Bug resuelto:** `body` es `flex-column` (necesario para el footer pegajoso) y la sección tenía `margin:auto` lateral, lo que la encogía a ≈ 602 px y apilaba las tarjetas.
- **Fix:** `width: 100%` (limitado por `max-width: 1200px`) + `grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr))`.
- Resultado: 3 columnas en escritorio → 2 → 1, sin desbordamiento horizontal.

### 6. Microinteracciones y movimiento

- **Easings personalizados** (`$ease-out`, `$ease-in-out`) en lugar de las curvas nativas de CSS.
- `:active { scale(0.97) }` en toda superficie presionable (confirma el clic).
- Transiciones con **propiedades específicas**, nunca `all`.
- Hover reservado a `@media (hover: hover) and (pointer: fine)` (en táctil no se queda «pegado»).
- Stagger corto (60–80 ms) y tipografía fluida con `clamp()`.
- Accesibilidad: bloque global `prefers-reduced-motion` que desactiva animaciones y transiciones.

### 7. Arquitectura y limpieza de código

- **Estilos propios:** `CSS/estilos.scss` se compila a `index.css`, compartido por las 4 páginas. Bootstrap se carga por CDN y Tailwind genera su propia hoja `CSS/tailwind.css`.
  > Se eliminó `menu.css` (copia idéntica de `index.css`): `menu.html` cargaba ambos y ahora solo carga uno.
- **Hover consolidado:** las reglas `:hover` viven en un único bloque `@media (hover: hover) and (pointer: fine)`. Antes estaban duplicadas en cada componente (mismo `transform` declarado dos veces), lo que anulaba el bloqueo a puntero real.
- Se corrigió `transition: all` → propiedades específicas en `.btn-agregar`.
- **JS extraído:** el script del menú móvil del navbar (idéntico en los 4 HTML) pasó a `JS/navbar.js`, eliminando 4 copias del mismo código en línea.
- Las animaciones están migradas dentro del mismo SCSS.
- **Solo comentarios clave** en el código: se retiró el código pedagógico/verbose (tanto del SCSS como de las imágenes y docs).
- Compilación verificada: el CSS resultante conserva los mismos estilos.

---

## 📁 Estructura del Proyecto

```text
FastCraves/
├── CSS/
│   ├── estilos.scss       # Archivo fuente Sass (fuente única de estilos)
│   └── index.css          # CSS compilado (compartido por las 4 páginas)
├── IMG/                   # Imágenes .webp (producto y hero) + logo.jpg
├── JS/
│   └── navbar.js          # Menú móvil del navbar (compartido por las 4 páginas)
├── PAGINAS/
│   ├── menu.html          # Carta completa con insignias y precios
│   ├── contactanos.html   # Formulario de contacto
│   └── reservas.html      # Formulario de reserva de mesas
├── index.html             # Portada: hero y sección de especialidades
└── README.md              # Guía de este proyecto
```

---

## 🎬 Enfoque: Animaciones y Transiciones (CSS Puro)

Al final del archivo CSS se integró un bloque dedicado a microinteracciones visuales y efectos de entrada:

1. **Aparición de Arriba hacia Abajo (`@keyframes aparecerDesdeArriba`)**:
   - Efecto *Fade-In-Down* aplicado al recargar o ingresar a cualquier sección.
   - Afecta a títulos, subtítulos y encabezados, deslizándolos desde arriba hacia su posición con control de opacidad (`0.6s`, curva `$ease-out`).

2. **Rotación 360° del Logotipo en su Propio Eje**:
   - Al pasar el cursor sobre el logo, este realiza un giro completo (`transform: rotate(360deg) scale(1.08)`).
   - Usa la curva `$ease-in-out` (`cubic-bezier(0.77, 0, 0.175, 1)`) acompañada de un resplandor dorado exterior.

3. **Entrada Escalonada en Cascada (*Staggered Animation*)**:
   - Las tarjetas de productos, especialidades y formularios se renderizan con `@keyframes aparecerSuave`.
   - Retardos progresivos con `:nth-child(...)` (**de `0.06s` a `0.24s`**), de forma secuencial y fluida.

4. **Efecto de Pulso Dinámico en Badges (`@keyframes pulsoBadge`)**:
   - Las insignias laten de forma infinita y sutil (**`scale(1.05)` cada 2.4 s**) guiando la atención hacia las promociones clave.

5. **Onda de Marea en el Pie (`@keyframes marea` + `@keyframes marea-inversa`)**:
   - La onda que separa el contenido del pie oscuro es un SVG **periódico** (empieza y termina en el mismo punto y con la misma tangente), repetido con `repeat-x` para que no se vean costuras.
   - Hay **dos capas superpuestas** (`::before` y `::after`) con amplitudes distintas que viajan en **sentidos opuestos** y a distinta velocidad (`12s` y `19s`): una corriente entra mientras la otra sale, como una marea real.
   - Ambas miden `200%` y se desplazan con `transform: translateX()` de `-50%` a `0` (o al revés), `linear` e infinito: al ser `transform` se animan en la GPU sin repintar la página.
   - `overflow: hidden` en `.piepagina` recorta las teselas que desbordan.

6. **Zoom y Flotación en Imágenes de Productos**:
   - Al hacer *hover*, la imagen se amplía (`scale(1.08)`), rota levemente (`rotate(-1deg)`) y proyecta una sombra flotante (`drop-shadow`).

7. **Feedback en Formularios**:
   - En *Contacto* y *Reservas*, los campos responden al foco con borde rojo y una sombra difusa en tono carmesí.

---

## 🚀 Ventajas y Características de Sass Demostradas en `estilos.scss`

1. **Módulos Oficiales con `@use`**:
   - Se importa `@use "sass:color";` para trabajar con la paleta de colores de forma moderna y sin advertencias de deprecación.
2. **Placeholders (`%`) y Directiva `@extend` (Exclusiva de Sass)**:
   - `%boton-base` y `%tarjeta-base` comparten estilos entre botones y tarjetas sin duplicar código.
3. **Mixins Avanzados con `@content`**:
   - `@mixin responder-a-movil` inyecta bloques enteros dentro de una media query responsiva.
4. **Funciones del Módulo de Color**:
   - `color.adjust($color, $lightness: -10%)` para oscurecer botones en hover de forma precisa y armónica.
5. **Nesting y Selector Padre (`&`)**:
   - Organización jerárquica clara para navbar, menú móvil, tarjetas y estados `:hover`.

---

## Bootstrap y Tailwind

Las cuatro páginas cargan las hojas en este orden: Bootstrap 5.3.9 por CDN, `CSS/index.css` (Sass) y `CSS/tailwind.css` (Tailwind). El bundle JavaScript de Bootstrap se incluye al final del body, con `integrity` y `crossorigin`, para habilitar los componentes interactivos. Bootstrap requiere conexión a Internet.

### Ejemplos en la portada

- **Acordeón de preguntas frecuentes:** `#preguntas-frecuentes`. Usa `accordion`, `data-bs-toggle="collapse"`, `data-bs-target` y `data-bs-parent` para abrir una respuesta a la vez.
- **Modal «Planifica tu visita»:** `#modal-visita`. Se abre con `data-bs-toggle="modal"` y se cierra con `data-bs-dismiss="modal"`, Escape o el fondo. Bootstrap gestiona el foco del diálogo.
- Los campos de contacto y reservas incorporan `form-control` y `form-select`.

Referencias: [CDN de Bootstrap](https://getbootstrap.com/docs/5.3/getting-started/introduction/), [acordeón](https://getbootstrap.com/docs/5.3/components/accordion/) y [modal](https://getbootstrap.com/docs/5.3/components/modal/).

### Cómo usar Tailwind

Tailwind 4 se compila localmente desde `CSS/tailwind.input.css`, sin CDN de desarrollo. Se omite Preflight para evitar un segundo reinicio de estilos y se usa el prefijo `tw:`. Las utilidades tienen `important` para que puedan sobrescribir las reglas sin capas de Bootstrap y Sass.

La grilla de especialidades ya usa estas clases:

```html
<div class="grilla-destacados tw:grid tw:grid-cols-1 tw:sm:grid-cols-2 tw:lg:grid-cols-3 tw:gap-6">
```

También hay utilidades de espaciado y alineación en la nueva sección de preguntas. Escribe las clases completas en los HTML o JS: el compilador analiza esas rutas, no genera clases construidas por concatenación.

Referencia: [Tailwind sin Preflight](https://tailwindcss.com/docs/preflight).

## ⚡ Comandos para Compilar

Requiere Node.js 20.19+ o 22.12+ y npm. Desde la raíz:

```bash
npm ci
npm run build
```

`build` recompila Sass, Tailwind y los componentes Material Web. Los CSS generados se incluyen en el repositorio para abrir `index.html` sin instalar dependencias. Vuelve a compilar después de cambiar estilos o añadir clases Tailwind.

Para recompilación automática, ejecuta cada comando en una terminal:

```bash
npm run watch:sass
npm run watch:tailwind
```

Para servir el sitio localmente con Python:

```bash
python -m http.server 8000
```

Abre http://localhost:8000. Los formularios siguen siendo demostraciones sin backend.


## Carrito y tema oscuro

En la barra superior de las cuatro páginas hay un botón de tema (luna/sol) y un botón de carrito con el número total de unidades.

- En **Menú**, cada botón `+` agrega el producto al carrito. El panel lateral permite aumentar o reducir cantidades, eliminar un producto y vaciar el carrito. Calcula subtotales y total en soles, con un máximo de 99 unidades por producto.
- El carrito usa el componente [Offcanvas de Bootstrap](https://getbootstrap.com/docs/5.3/components/offcanvas/). Se cierra con el botón de cierre, Escape o el fondo. Es una demostración: no envía pedidos ni procesa pagos.
- `JS/carrito-store.js` contiene el catálogo y los cálculos en céntimos; `JS/carrito.js` conecta los controles y el panel. El carrito se guarda en `localStorage` con la clave `fastcraves-cart-v1`. Solo se guardan IDs y cantidades; los precios se toman del catálogo.
- `JS/tema.js` aplica `data-bs-theme="light"` o `"dark"` antes de cargar el contenido. Respeta inicialmente la preferencia del sistema y guarda la selección manual en `fastcraves-theme`. Las variables `--fc-*` de `CSS/estilos.scss` adaptan los estilos propios y las olas del pie al tema.
- Ambas preferencias se sincronizan entre pestañas del mismo sitio. Si el almacenamiento está bloqueado, los controles siguen funcionando en memoria. Para compartir el carrito entre páginas, sirve el proyecto mediante HTTP (por ejemplo, `python -m http.server 8000`); el almacenamiento bajo `file://` depende del navegador.

Verificaciones de lógica (Node.js, sin dependencias adicionales):

```bash
npm test
```

Las pruebas cubren totales, cantidades, persistencia, datos guardados inválidos, almacenamiento bloqueado y selección de tema.


## Material Design 3

Se integró `@material/web` con componentes reales: el botón **Explorar Menú** de la portada, un buscador con etiqueta flotante y chips de categorías en la carta. La búsqueda combina nombre o ingredientes con la categoría, ignora tildes y mayúsculas, muestra el número de resultados e incluye un botón para restablecer los filtros. Los componentes comparten el tema claro/oscuro del proyecto.

`JS/material.js` importa los componentes y conecta los filtros. Esbuild genera `JS/material.bundle.js`, cargado localmente por la portada y la carta. Para recompilarlo por separado:

```bash
npm run build:material
```

Para conocer **cómo y dónde se usan Material Design, Tailwind y Bootstrap**, consulta [la guía con fragmentos de código](DOCS/tecnologias-ui.md).
