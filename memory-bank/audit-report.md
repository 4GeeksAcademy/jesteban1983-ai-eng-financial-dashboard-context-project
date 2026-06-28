# Auditoría Técnica Integral (`frontend/` + `backend/`)

## Alcance y Criterios
- Directorios auditados: `/frontend` y `/backend`.
- Referencias aplicadas:
  - Skill `accessibility` (WCAG 2.2, enfoque POUR).
  - Skill `vercel-practices` (performance, SEO, imágenes, fuentes, build).
  - Reglas internas en `.agents/rules`:
    - `01-data-fetching.md`
    - `02-security-cors.md`
    - `03-magic-strings.md`

## Validaciones Ejecutadas
- `frontend`: `npm run build` -> **FALLA** (tipos faltantes y error de permisos en `node_modules/.tmp`).
- `backend`: `pytest -q` -> **FALLA** (falta dependencia `fastapi` en entorno de ejecución).

## Tabla de Hallazgos

| Severidad | Área | Hallazgo | Evidencia | Impacto | Recomendación |
|---|---|---|---|---|---|
| Crítico | Seguridad backend | Configuración CORS insegura: wildcard con credenciales habilitadas. | `backend/app/main.py:9` (`allow_origins=["*"]`) y `backend/app/main.py:10` (`allow_credentials=True`). | Riesgo alto de exposición a solicitudes cross-origin no confiables y robo de sesión/tokens en escenarios mal configurados. Incumple regla `02-security-cors.md`. | Definir orígenes explícitos por variable de entorno (ej. `FRONTEND_URL`) y eliminar wildcard cuando `allow_credentials=True`. |
| Alto | Frontend performance/arquitectura | Data fetching inicial con `useEffect`, explícitamente prohibido por reglas internas y desalineado con `vercel-practices`. | `frontend/src/App.tsx:29` (`useEffect(() => { ... fetch ... })`) y `frontend/src/App.tsx:16`. | Posibles condiciones de carrera, manejo incompleto de cancelación y mayor complejidad de estado. Incumple `01-data-fetching.md` y criterio 4 de `vercel-practices`. | Migrar a custom hook con cancelación (`AbortController`) o librería de server-state (React Query). |
| Alto | SEO frontend | Head incompleto para SEO: título genérico y falta de meta description. | `frontend/index.html:7` (`<title>frontend</title>`), sin `<meta name="description" ...>`. | Peor indexación, CTR y claridad semántica en buscadores/social previews. Incumple criterio SEO de `vercel-practices`. | Definir `title` descriptivo del producto y `description` única y relevante. |
| Alto | Operabilidad/UX + regla dominio | Modo oscuro forzado desde markup, acoplando tema y comportamiento visual. | `frontend/src/App.tsx:46` (`className="dark ..."`). | Reduce control del usuario y dificulta consistencia visual configurable. Ya identificado como deuda técnica en `memory-bank/current-state.md`. | Extraer preferencia de tema a configuración/estado global, respetando preferencias del usuario. |
| Bajo | Mantenibilidad (single source of truth) | Inconsistencia de string de período (guion normal vs em dash) entre componentes. | `frontend/src/App.tsx:49` (`2024 - Full Year`) vs `frontend/src/components/dashboard/dashboard-header.tsx:7` (`2024 — Full Year`). | Inconsistencia de UI y potenciales bugs en filtros/comparaciones por texto. Incumple `03-magic-strings.md`. | Centralizar constantes de dominio (`constants.ts`) y reutilizarlas en UI. |
| Bajo | Accesibilidad (Robust/Perceivable) | Iconos decorativos sin marcar explícitamente como decorativos (`aria-hidden`). | `frontend/src/components/dashboard/dashboard-header.tsx:12` y `frontend/src/components/dashboard/kpi-card.tsx:60`. | Ruido en lectores de pantalla según componente SVG/librería. | Añadir `aria-hidden="true"` a iconos decorativos y evitar que compitan con el texto semántico. |
| Bajo | Internacionalización y comprensibilidad | Mezcla de idioma en mensajes de UI (inglés/español) sin estrategia de i18n. | Ejemplos: error en español `frontend/src/App.tsx:37`; etiquetas y descripciones en inglés en componentes dashboard. | Menor consistencia y comprensión para usuarios finales. | Definir idioma primario y extraer textos a catálogo i18n. |
| Bajo | Criterios Vercel específicos de Next.js | Reglas `next/image` y `next/font` no aplicadas por stack actual (Vite SPA). | Proyecto usa Vite/React (no Next.js). Fuente declarada en `frontend/src/index.css:79`. | No es fallo funcional directo, pero sí una brecha respecto al skill si el objetivo es despliegue optimizado en Vercel con enfoque Next.js. | Si se mantiene Vite: documentar excepción. Si se migra a Next.js: adoptar `next/image` y `next/font`. |

## Observaciones de Accesibilidad (sin severidad alta detectada)
- Se observa uso de etiquetas semánticas útiles (`<main>`, `<section>`, `<header>`), lo cual es positivo.
- No se detectaron `onClick` en elementos no interactivos ni supresión agresiva de foco (`outline: none`) en el alcance auditado.
- Riesgo residual: los gráficos (`recharts`) no exponen alternativa textual/tabla de datos para lectores de pantalla.

## Riesgos de Validación Pendientes
- No se pudo completar una validación funcional integral de build/tests por condiciones de entorno:
  - Frontend: faltan definiciones de tipos y permisos de escritura en `node_modules/.tmp`.
  - Backend: falta instalación de `fastapi` en el entorno actual.

## Priorización Recomendada
1. Corregir CORS en backend (Crítico).
2. Reemplazar data-fetching en `useEffect` por patrón de server-state o custom hook robusto (Alto).
3. Corregir metadatos SEO base (`title`, `description`) y estrategia de tema configurable (Alto).
4. Resolver `magic strings`, atributos `aria-hidden` en iconos y consistencia de idioma (Bajo).
