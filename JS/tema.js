// Se ejecuta en el head para aplicar el tema antes del primer dibujo.
(() => {
    const key = "fastcraves-theme";
    const preference = window.matchMedia("(prefers-color-scheme: dark)");
    let chosen;
    try { chosen = localStorage.getItem(key); } catch { /* Sigue funcionando sin almacenamiento. */ }
    if (chosen !== "light" && chosen !== "dark") chosen = null;

    function apply(theme) {
        document.documentElement.dataset.bsTheme = theme;
        const button = document.getElementById("theme-toggle");
        if (!button) return;
        const dark = theme === "dark";
        button.setAttribute("aria-pressed", String(dark));
        button.title = dark ? "Cambiar a tema claro" : "Cambiar a tema oscuro";
        button.querySelector("[data-theme-icon]").textContent = dark ? "☀" : "☾";
        button.querySelector("[data-theme-label]").textContent = "Tema oscuro";
    }

    apply(chosen || (preference.matches ? "dark" : "light"));
    document.addEventListener("DOMContentLoaded", () => {
        apply(document.documentElement.dataset.bsTheme);
        document.getElementById("theme-toggle")?.addEventListener("click", () => {
            chosen = document.documentElement.dataset.bsTheme === "dark" ? "light" : "dark";
            apply(chosen);
            try { localStorage.setItem(key, chosen); } catch { /* Preferencia solo de esta página. */ }
        });
    });
    preference.addEventListener("change", () => {
        if (!chosen) apply(preference.matches ? "dark" : "light");
    });
    window.addEventListener("storage", (event) => {
        if (event.key !== key && event.key !== null) return;
        chosen = event.newValue === "dark" || event.newValue === "light" ? event.newValue : null;
        apply(chosen || (preference.matches ? "dark" : "light"));
    });
})();
