const { test } = require("node:test");
const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const vm = require("node:vm");
const script = readFileSync(require.resolve("../JS/tema.js"), "utf8");

function setup({ saved = null, systemDark = false, blocked = false } = {}) {
    const events = {};
    const attributes = {};
    const labels = {};
    const values = new Map([["fastcraves-theme", saved]]);
    const button = {
        setAttribute: (name, value) => { attributes[name] = value; },
        querySelector: name => labels[name] ||= {},
        addEventListener: (name, fn) => { events[name] = fn; }
    };
    const preference = { matches: systemDark, addEventListener: (_name, fn) => { events.system = fn; } };
    const document = {
        documentElement: { dataset: {} },
        getElementById: () => button,
        addEventListener: (name, fn) => { events[name] = fn; }
    };
    const storage = {
        getItem: key => { if (blocked) throw Error("blocked"); return values.get(key); },
        setItem: (key, value) => { if (blocked) throw Error("blocked"); values.set(key, value); }
    };
    vm.runInNewContext(script, {
        document, localStorage: storage,
        window: { matchMedia: () => preference, addEventListener: (name, fn) => { events[name] = fn; } }
    });
    events.DOMContentLoaded();
    return { document, preference, events, attributes, values };
}

test("respeta el sistema hasta que el usuario elige un tema", () => {
    const ui = setup({ systemDark: true });
    assert.equal(ui.document.documentElement.dataset.bsTheme, "dark");
    assert.equal(ui.attributes["aria-pressed"], "true");
    ui.preference.matches = false;
    ui.events.system();
    assert.equal(ui.document.documentElement.dataset.bsTheme, "light");
    ui.events.click();
    assert.equal(ui.values.get("fastcraves-theme"), "dark");
    ui.events.system();
    assert.equal(ui.document.documentElement.dataset.bsTheme, "dark");
});

test("recupera la selección guardada y alterna ambos temas", () => {
    const ui = setup({ saved: "light", systemDark: true });
    assert.equal(ui.document.documentElement.dataset.bsTheme, "light");
    ui.events.click();
    assert.equal(ui.document.documentElement.dataset.bsTheme, "dark");
    ui.events.click();
    assert.equal(ui.document.documentElement.dataset.bsTheme, "light");
    assert.equal(ui.values.get("fastcraves-theme"), "light");
});

test("tolera almacenamiento bloqueado y sincroniza cambios de otra pestaña", () => {
    const ui = setup({ blocked: true });
    ui.events.click();
    assert.equal(ui.document.documentElement.dataset.bsTheme, "dark");
    ui.events.storage({ key: "fastcraves-theme", newValue: "light" });
    assert.equal(ui.document.documentElement.dataset.bsTheme, "light");
    assert.equal(ui.attributes["aria-pressed"], "false");
});
