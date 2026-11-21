export function normalizeSearch(value) {
    return String(value).normalize("NFD").replace(/\p{M}/gu, "").toLocaleLowerCase("es").trim();
}

export function matchesProduct(text, productCategory, query, selectedCategory) {
    if (selectedCategory !== "todos" && selectedCategory !== productCategory) return false;
    const normalized = normalizeSearch(text);
    return normalizeSearch(query).split(/\s+/).every(word => normalized.includes(word));
}
