const { test } = require("node:test");
const assert = require("node:assert/strict");
const { Cart, products, key } = require("../JS/carrito-store.js");

function memory(initial = "[]") {
    let value = initial;
    return { getItem: () => value, setItem: (_key, next) => { value = next; } };
}

test("suma cantidades y calcula precios exactos en céntimos", () => {
    const cart = new Cart(memory());
    cart.add("parrillera-xl");
    cart.add("parrillera-xl");
    cart.add("sprite");
    assert.equal(cart.count, 3);
    assert.equal(cart.items.length, 2);
    assert.equal(cart.total, 5630);
    cart.set("parrillera-xl", 1);
    assert.equal(cart.total, 3140);
    cart.set("sprite", 0);
    assert.equal(cart.count, 1);
    assert.equal(cart.total, 2490);
});

test("persiste entre páginas y vacía el carrito guardado", () => {
    const storage = memory();
    const first = new Cart(storage);
    first.add("fanta");
    const second = new Cart(storage);
    assert.deepEqual(second.items, [{ ...products.find(p => p.id === "fanta"), quantity: 1 }]);
    second.clear();
    assert.equal(new Cart(storage).count, 0);
    assert.equal(new Cart(storage).total, 0);
    assert.equal(key, "fastcraves-cart-v1");
});

test("ignora datos corruptos y precios manipulados en almacenamiento", () => {
    for (const value of ["no-json", "null", "{}", '[null,{"id":"inventado","quantity":2}]']) {
        assert.equal(new Cart(memory(value)).count, 0);
    }
    const cart = new Cart(memory(JSON.stringify([
        { id: "fanta", quantity: 2, price: 1, name: "<script>" },
        { id: "sprite", quantity: -1 },
        { id: "inca-kola", quantity: 1.5 },
        { id: "coca-cola", quantity: 100 }
    ])));
    assert.equal(cart.count, 2);
    assert.equal(cart.total, 1100);
    assert.equal(cart.items[0].name, "Fanta Naranja 1L");
});

test("rechaza cantidades inválidas y limita cada producto a 99 unidades", () => {
    const cart = new Cart(memory());
    for (const quantity of [-1, 1.5, NaN, Infinity, "2", 100]) assert.equal(cart.set("fanta", quantity), false);
    assert.equal(cart.add("desconocido"), false);
    assert.equal(cart.set("fanta", 99), true);
    assert.equal(cart.add("fanta"), false);
    assert.equal(cart.count, 99);
});

test("funciona en memoria cuando el navegador bloquea localStorage", () => {
    const storage = { getItem() { throw Error("blocked"); }, setItem() { throw Error("quota"); } };
    const cart = new Cart(storage);
    assert.equal(cart.add("fanta"), true);
    assert.equal(cart.total, 550);
    assert.equal(cart.save(), false);
    const withoutStorage = new Cart();
    withoutStorage.add("sprite");
    assert.equal(withoutStorage.total, 650);
});
