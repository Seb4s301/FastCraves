# Proyecto FastCraves — Sass (SCSS) + Animaciones & Transiciones

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

- **Fuente única:** `CSS/estilos.scss` → se compila a `index.css`, que comparten las 4 páginas.
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

## ⚡ Comandos para Compilar

> **Nota:** `estilos.scss` es la fuente única y `index.css` es la hoja compilada que comparten todas las páginas.

### Método 1: Por Terminal de Comandos

Desde la raíz del proyecto:

```bash
npx sass --no-source-map --style=expanded CSS/estilos.scss CSS/index.css
```

O en modo observador (recompila automáticamente al guardar):

```bash
npx sass --watch CSS/estilos.scss:CSS/index.css
```

### Verificación rápida

```bash
# Tras editar estilos: recompilar y abrir la portada
npx sass --no-source-map --style=expanded CSS/estilos.scss CSS/index.css
```
