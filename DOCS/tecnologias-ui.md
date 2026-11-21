# Material Design, Tailwind y Bootstrap en Fast Craves

Las tres tecnologías conviven con los estilos propios escritos en Sass.

| Tecnología | Cómo se reconoce | Dónde se usa |
| --- | --- | --- |
| Material Design 3 | Etiquetas `md-*` y variables `--md-*` | Botón de la portada y buscador/filtros de la carta |
| Tailwind CSS | Clases con prefijo `tw:` | Grilla de especialidades, alineación y espaciado de la ayuda |
| Bootstrap | Clases `accordion`, `modal`, `offcanvas`, `form-control`; atributos `data-bs-*` | Preguntas frecuentes, modal, carrito y formularios |
| Sass propio | Clases como `tarjeta-producto`, `btn-principal` y variables `--fc-*` | Identidad visual, colores, tarjetas, tema y animaciones |

## Material Design 3

Se instaló `@material/web` mediante npm. `JS/material.js` importa únicamente los componentes utilizados:

```js
import "@material/web/button/filled-button.js";
import "@material/web/button/outlined-button.js";
import "@material/web/chips/chip-set.js";
import "@material/web/chips/filter-chip.js";
import "@material/web/textfield/outlined-text-field.js";
```

Esbuild agrupa los componentes y la lógica de filtrado en `JS/material.bundle.js`. La portada y la carta cargan ese archivo con `defer`. No se necesita un CDN de Material para ejecutarlos:

```html
<!-- En index.html -->
<script defer src="JS/material.bundle.js"></script>
```

En `index.html`, el botón principal para explorar la carta es un componente Material:

```html
<md-filled-button href="PAGINAS/menu.html">Explorar Menú</md-filled-button>
```

Su contenedor conserva un enlace HTML alternativo mientras el componente no esté definido. Así la navegación sigue disponible si el JavaScript no carga.

En `PAGINAS/menu.html`, antes de los productos, hay un campo con etiqueta flotante:

```html
<md-outlined-text-field id="menu-busqueda" label="Buscar en la carta"
    type="search" placeholder="Ej. queso, parrillera o bebida"
    supporting-text="Busca por nombre o ingredientes.">
</md-outlined-text-field>
```

Y un conjunto de chips con una categoría activa:

```html
<md-chip-set id="menu-filtros" aria-label="Categorías del menú">
    <md-filter-chip label="Todos" data-category="todos" selected></md-filter-chip>
    <md-filter-chip label="Hamburguesas" data-category="hamburguesas"></md-filter-chip>
    <md-filter-chip label="Bebidas" data-category="bebidas"></md-filter-chip>
</md-chip-set>
```

`JS/material.js` escucha la escritura y los clics, combina la búsqueda con la categoría y actualiza el contador de resultados. `JS/menu-filter.mjs` permite buscar sin distinguir tildes ni mayúsculas, incluyendo nombres e ingredientes. Si no hay coincidencias, aparece un `md-outlined-button` para restablecer la carta. Los botones de agregar al carrito continúan funcionando sobre los productos visibles.

En `CSS/estilos.scss`, los tokens `--md-sys-color-*` adaptan los componentes a Fast Craves. El selector `:root[data-bs-theme="dark"]` cambia los tokens al activar el tema oscuro. Las variables CSS atraviesan el límite del Shadow DOM de los componentes; sus estilos internos no se mezclan con las clases de Bootstrap y Tailwind.

Referencias oficiales: [Material Web](https://material-web.dev/about/quick-start/), [botones](https://material-web.dev/components/button/), [campos](https://material-web.dev/components/text-field/) y [chips](https://material-web.dev/components/chip/).

## Tailwind CSS

Se instala mediante npm y se configura en `CSS/tailwind.input.css`. El prefijo `tw:` distingue sus utilidades. Se omite Preflight para evitar otro reinicio global de estilos y se genera `CSS/tailwind.css`.

Ejemplo real en la grilla de especialidades de `index.html`:

```html
<div class="grilla-destacados tw:grid tw:grid-cols-1 tw:sm:grid-cols-2 tw:lg:grid-cols-3 tw:gap-6">
```

- `tw:grid`: activa CSS Grid.
- `tw:grid-cols-1`: una columna de base.
- `tw:sm:grid-cols-2`: dos columnas desde 640 px.
- `tw:lg:grid-cols-3`: tres columnas desde 1024 px.
- `tw:gap-6`: separación de 24 px.

La sección «Antes de tu visita» usa `tw:mx-auto`, `tw:px-6`, `tw:py-12`, `tw:text-center` y `tw:justify-center` para centrar, separar y alinear contenido.

## Bootstrap

Las cuatro páginas cargan el CSS y el bundle JavaScript de Bootstrap mediante enlaces CDN con versión fija, `integrity` y `crossorigin`. El CSS se carga antes de las hojas propias y el JavaScript al final del body.

En `index.html`, las preguntas frecuentes usan `accordion`. Su comportamiento se activa mediante atributos:

```html
<button class="accordion-button" type="button"
    data-bs-toggle="collapse" data-bs-target="#respuesta-horario"
    aria-expanded="true" aria-controls="respuesta-horario">
    ¿Cuál es el horario de atención?
</button>
```

El botón «Planifica tu visita» abre el modal:

```html
<button type="button" class="btn btn-principal"
    data-bs-toggle="modal" data-bs-target="#modal-visita">
    Planifica tu visita
</button>
```

El carrito de las cuatro páginas usa `offcanvas offcanvas-end`; su disparador usa `data-bs-toggle="offcanvas"` y `data-bs-target="#carrito"`. Bootstrap gestiona apertura, cierre, fondo y foco. Los cálculos y la persistencia del carrito están en `JS/carrito-store.js` y `JS/carrito.js`.

Los campos de contacto y reservas usan `form-control` y `form-select`. `btn-principal` y `btn-secundario` son personalizaciones Sass del proyecto, mientras que las clases `tw:*` pertenecen a Tailwind.

## Compilación y pruebas

```bash
npm ci
npm run build
npm test
```

`build` genera Sass, Tailwind y el bundle de Material. Para trabajar solo sobre Material:

```bash
npm run build:material
npm run watch:material
```

Los archivos generados se incluyen en el repositorio. Bootstrap y Google Fonts siguen requiriendo Internet; los componentes Material se sirven desde el proyecto.
