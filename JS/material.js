// Componentes oficiales Material Design 3. Esbuild los incluye en material.bundle.js.
import "@material/web/button/filled-button.js";
import "@material/web/button/outlined-button.js";
import "@material/web/chips/chip-set.js";
import "@material/web/chips/filter-chip.js";
import "@material/web/textfield/outlined-text-field.js";
import { matchesProduct } from "./menu-filter.mjs";

async function initMenuFilters() {
    const search = document.getElementById("menu-busqueda");
    if (!search) return;
    const toolbar = document.getElementById("menu-herramientas");
    const chips = [...document.querySelectorAll("#menu-filtros md-filter-chip")];
    const groups = [...document.querySelectorAll("[data-menu-category]")];
    const empty = document.getElementById("menu-sin-resultados");
    const status = document.getElementById("menu-resultados");
    let category = "todos";

    function render() {
        let total = 0;
        for (const group of groups) {
            let visible = 0;
            for (const card of group.querySelectorAll(".tarjeta-producto")) {
                const text = `${card.querySelector(".titulo-producto").textContent} ${card.querySelector(".desc-producto").textContent}`;
                const show = matchesProduct(text, group.dataset.menuCategory, search.value, category);
                card.hidden = !show;
                if (show) visible++;
            }
            group.hidden = visible === 0;
            document.getElementById(group.getAttribute("aria-labelledby")).hidden = visible === 0;
            total += visible;
        }
        empty.hidden = total > 0;
        status.textContent = `${total} ${total === 1 ? "producto disponible" : "productos disponibles"}`;
    }

    search.addEventListener("input", render);
    chips.forEach(chip => {
        chip.addEventListener("click", () => {
            category = chip.dataset.category;
            // Siempre queda una categoría activa, incluso al pulsar el chip seleccionado.
            chips.forEach(other => { other.selected = other === chip; });
            render();
        });
    });
    document.getElementById("menu-restablecer").addEventListener("click", () => {
        category = "todos";
        search.value = "";
        chips.forEach(chip => { chip.selected = chip.dataset.category === "todos"; });
        render();
        search.focus();
    });

    // Muestra los controles cuando el campo ya tiene su estructura interna.
    await search.updateComplete;
    toolbar.hidden = false;
    render();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initMenuFilters, { once: true });
} else {
    initMenuFilters();
}
