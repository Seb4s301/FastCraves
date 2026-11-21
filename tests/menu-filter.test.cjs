const { test } = require("node:test");
const assert = require("node:assert/strict");
const filter = import("../JS/menu-filter.mjs");

test("la búsqueda ignora tildes, mayúsculas y espacios extra", async () => {
    const { matchesProduct } = await filter;
    assert.equal(matchesProduct("Clásica con ají y queso", "hamburguesas", "  CLASICA AJI  ", "todos"), true);
    assert.equal(matchesProduct("Parrillera XL", "hamburguesas", "", "todos"), true);
    assert.equal(matchesProduct("Parrillera XL", "hamburguesas", "pollo", "todos"), false);
});

test("combina categoría con todas las palabras de la búsqueda", async () => {
    const { matchesProduct } = await filter;
    const text = "Inca Kola Sin Azúcar 1L";
    assert.equal(matchesProduct(text, "bebidas", "kola azucar", "bebidas"), true);
    assert.equal(matchesProduct(text, "bebidas", "kola", "hamburguesas"), false);
    assert.equal(matchesProduct(text, "bebidas", "kola queso", "todos"), false);
    assert.equal(matchesProduct(text, "bebidas", "", "bebidas"), true);
});
