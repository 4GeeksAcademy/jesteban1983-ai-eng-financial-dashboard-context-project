# Reglas de Optimización
1. **Rendimiento:** Priorizar `Server Components`.
2. **Caché:** Usar "use cache" con `cacheLife` y `cacheTag`[cite: 1].
3. **Fetching:** Implementar `Promise.all` para evitar *waterfalls*[cite: 1].