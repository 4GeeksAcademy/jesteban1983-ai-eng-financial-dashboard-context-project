# Skill: Vercel & React Best Practices
## Objetivo
Garantizar un rendimiento óptimo en despliegues Vercel, cumplimiento de Web Vitals y estructura SEO.

## Reglas de Auditoría
1. **Imágenes:** Prohibido usar `<img>`. Reemplazar por `next/image` con `width` y `height` definidos o `fill`.
2. **Fuentes:** Usar `next/font` para evitar el "layout shift" (CLS) durante la carga.
3. **SEO:** Cada página debe tener un componente `Metadata` o `head` con `title` y `description` únicos.
4. **Performance:** Evitar `useEffect` para el fetching inicial de datos; preferir Server Components.
5. **Estilos:** Evitar inyecciones de CSS que causen re-renders innecesarios.

## Criterios de Aceptación
- El comando `npm run build` debe completarse sin errores.
- Score de Lighthouse superior a 90 en Performance.