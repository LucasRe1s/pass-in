// gere uma função typescript que receba um texto e retorne sem acentos,
//sem espaços e sem simbolos, pronto para uso em url.
export function generateSlug(text: string): string {
    return text

        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLocaleLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
}