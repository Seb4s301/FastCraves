// Precios en céntimos: evita errores de redondeo al calcular el total.
(() => {
    const products = Object.freeze([
        { id: "parrillera-xl", name: "Parrillera XL", price: 2490, image: "ParrilleraXL.webp" },
        { id: "whopper-grande", name: "WHOPPER Grande", price: 1890, image: "WHOPPERGrande.webp" },
        { id: "grande-carne", name: "Grande de Carne", price: 1490, image: "GrandedeCarne.webp" },
        { id: "mega-doble", name: "Mega Doble con Queso", price: 2690, image: "MegaDobleconQueso.webp" },
        { id: "inca-kola", name: "Inca Kola Sin Azúcar 1L", price: 690, image: "IncaKola.webp" },
        { id: "coca-cola", name: "Coca Cola Sin Azúcar 1L", price: 690, image: "CocaCola.webp" },
        { id: "sprite", name: "Sprite 1L", price: 650, image: "sprite.webp" },
        { id: "fanta", name: "Fanta Naranja 1L", price: 550, image: "fanta.webp" }
    ].map(Object.freeze));
    const key = "fastcraves-cart-v1";

    class Cart {
        constructor(storage) {
            this.storage = storage;
            this.quantities = new Map();
            this.load();
        }
        load() {
            this.quantities.clear();
            try {
                const rows = JSON.parse(this.storage?.getItem(key) || "[]");
                if (!Array.isArray(rows)) return;
                for (const row of rows) {
                    if (row && products.some(p => p.id === row.id) &&
                        Number.isInteger(row.quantity) && row.quantity > 0 && row.quantity <= 99) {
                        this.quantities.set(row.id, row.quantity);
                    }
                }
            } catch { /* Un carrito guardado inválido se trata como vacío. */ }
        }
        save() {
            try {
                this.storage?.setItem(key, JSON.stringify(
                    [...this.quantities].map(([id, quantity]) => ({ id, quantity }))
                ));
                return Boolean(this.storage);
            } catch { return false; }
        }
        set(id, quantity) {
            if (!products.some(p => p.id === id) || !Number.isInteger(quantity) || quantity < 0 || quantity > 99) return false;
            if (quantity === 0) this.quantities.delete(id);
            else this.quantities.set(id, quantity);
            this.save();
            return true;
        }
        add(id) { return this.set(id, (this.quantities.get(id) || 0) + 1); }
        clear() { this.quantities.clear(); this.save(); }
        get items() {
            return products.filter(p => this.quantities.has(p.id))
                .map(p => ({ ...p, quantity: this.quantities.get(p.id) }));
        }
        get count() { return this.items.reduce((sum, p) => sum + p.quantity, 0); }
        get total() { return this.items.reduce((sum, p) => sum + p.quantity * p.price, 0); }
    }

    const api = { Cart, products, key };
    if (typeof module !== "undefined" && module.exports) module.exports = api;
    else window.FastCravesCart = api;
})();
