// Alterna el menú desplegable del navbar en pantallas móviles
document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menu-btn");
    const navLinks = document.getElementById("nav-links");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            const open = navLinks.classList.toggle("active");
            menuBtn.setAttribute("aria-expanded", String(open));
            menuBtn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
        });
        document.addEventListener("keydown", event => {
            if (event.key === "Escape" && navLinks.classList.contains("active")) {
                navLinks.classList.remove("active");
                menuBtn.setAttribute("aria-expanded", "false");
                menuBtn.setAttribute("aria-label", "Abrir menú");
                menuBtn.focus();
            }
        });
        document.addEventListener("click", event => {
            if (!event.target.closest(".navbar")) {
                navLinks.classList.remove("active");
                menuBtn.setAttribute("aria-expanded", "false");
                menuBtn.setAttribute("aria-label", "Abrir menú");
            }
        });
    }
});
