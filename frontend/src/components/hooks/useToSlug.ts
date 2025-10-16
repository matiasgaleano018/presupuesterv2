function useToSlug(str: string) {
    return str
    .toLowerCase() // convierte a minúsculas
    .trim() // elimina espacios al inicio y final
    .normalize("NFD") // separa acentos (ej: á -> á)
    .replace(/[\u0300-\u036f]/g, "") // elimina marcas diacríticas (acentos)
    .replace(/[^a-z0-9\s-]/g, "") // elimina caracteres no válidos
    .replace(/\s+/g, "-") // reemplaza espacios por guiones
    .replace(/-+/g, "-"); // evita múltiples guiones seguidos
}

export default useToSlug;