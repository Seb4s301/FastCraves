document.addEventListener("DOMContentLoaded", () => {
    const { Cart, products, key } = window.FastCravesCart;
    let storage;
    try { storage = window.localStorage; } catch { /* Carrito en memoria si no está disponible. */ }
    const cart = new Cart(storage);
    const panel = document.getElementById("carrito");
    const list = document.getElementById("carrito-items");
    const empty = document.getElementById("carrito-vacio");
    const count = document.getElementById("cart-count");
    const trigger = document.getElementById("cart-toggle");
    const total = document.getElementById("carrito-total");
    const clear = document.getElementById("carrito-vaciar");
    const status = document.getElementById("tienda-status");
    const format = cents => `S/ ${(cents / 100).toFixed(2)}`;
    const images = new URL("../IMG/", document.currentScript?.src || document.querySelector('script[src$="carrito.js"]').src);
    let announcement;
    let hideAnnouncement;

    function announce(message) {
        clearTimeout(announcement);
        clearTimeout(hideAnnouncement);
        status.textContent = "";
        announcement = setTimeout(() => { status.textContent = message; }, 30);
        hideAnnouncement = setTimeout(() => { status.textContent = ""; }, 4500);
    }
    function button(text, label, action, id) {
        const element = document.createElement("button");
        element.type = "button";
        element.textContent = text;
        element.setAttribute("aria-label", label);
        element.dataset.action = action;
        element.dataset.id = id;
        element.className = action === "remove" ? "carrito-eliminar" : "carrito-cantidad-btn";
        return element;
    }
    function render() {
        const active = list.contains(document.activeElement) ? document.activeElement : null;
        const focusId = active?.dataset.id;
        const focusAction = active?.dataset.action;
        const previousIndex = active ? [...list.children].indexOf(active.closest("li")) : -1;
        list.replaceChildren();
        for (const item of cart.items) {
            const row = document.createElement("li");
            row.className = "carrito-item";
            const image = document.createElement("img");
            image.src = new URL(item.image, images).href;
            image.alt = "";
            image.width = 72;
            image.height = 72;
            const info = document.createElement("div");
            info.className = "carrito-info";
            const name = document.createElement("h3");
            name.textContent = item.name;
            const price = document.createElement("p");
            price.textContent = `${format(item.price)} por unidad`;
            const controls = document.createElement("div");
            controls.className = "carrito-cantidad";
            const less = button("−", `Quitar una unidad de ${item.name}`, "less", item.id);
            const quantity = document.createElement("span");
            quantity.textContent = item.quantity;
            quantity.setAttribute("aria-label", `${item.quantity} unidades`);
            const more = button("+", `Agregar una unidad de ${item.name}`, "more", item.id);
            more.disabled = item.quantity >= 99;
            controls.append(less, quantity, more, button("Eliminar", `Eliminar ${item.name}`, "remove", item.id));
            info.append(name, price, controls);
            const subtotal = document.createElement("strong");
            subtotal.className = "carrito-subtotal";
            subtotal.textContent = format(item.quantity * item.price);
            row.append(image, info, subtotal);
            list.append(row);
        }
        empty.hidden = cart.count > 0;
        count.textContent = cart.count;
        trigger.setAttribute("aria-label", `Abrir carrito, ${cart.count} productos`);
        total.textContent = format(cart.total);
        clear.disabled = cart.count === 0;
        if (active) {
            const same = [...list.querySelectorAll("button")].find(b => b.dataset.id === focusId && b.dataset.action === focusAction && !b.disabled);
            const fallback = list.children[Math.min(previousIndex, list.children.length - 1)]?.querySelector("button");
            (same || fallback || panel.querySelector(".btn-close")).focus();
        }
    }
    document.querySelectorAll(".btn-agregar[data-product-id]").forEach(button => {
        const product = products.find(p => p.id === button.dataset.productId);
        button.setAttribute("aria-label", `Agregar ${product.name} al carrito`);
        button.addEventListener("click", () => {
            if (cart.add(product.id)) {
                render();
                announce(`${product.name} agregado. ${cart.count} productos en tu carrito. Total ${format(cart.total)}.`);
            } else announce("Puedes agregar hasta 99 unidades de cada producto.");
        });
    });
    list.addEventListener("click", event => {
        const control = event.target.closest("button[data-action]");
        if (!control) return;
        const id = control.dataset.id;
        const quantity = cart.quantities.get(id) || 0;
        cart.set(id, control.dataset.action === "remove" ? 0 : quantity + (control.dataset.action === "more" ? 1 : -1));
        render();
        announce(`Carrito actualizado. ${cart.count} productos. Total ${format(cart.total)}.`);
    });
    clear.addEventListener("click", () => {
        cart.clear();
        render();
        panel.querySelector(".btn-close").focus();
        announce("Carrito vacío.");
    });
    window.addEventListener("storage", event => {
        if (event.key === key || event.key === null) { cart.load(); render(); }
    });
    render();
});
