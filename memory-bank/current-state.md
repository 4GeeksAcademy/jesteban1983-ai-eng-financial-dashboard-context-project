# Estado Actual del Proyecto

## Funcionalidades Implementadas
- Renderizado del Dashboard principal con cálculo de KPIs.
- Conexión básica entre el cliente (React) y el servidor (Python) para el consumo de datos asíncronos.
- Soporte para variables de entorno para desacoplar las URLs de las APIs.

## Gaps Conocidos y Deuda Técnica (Siguientes Prioridades)
- **Seguridad:** El backend tiene una configuración CORS insegura (`allow_origins=["*"]` con credenciales) que debe ser parchada inmediatamente.
- **Confiabilidad:** Las peticiones asíncronas en el frontend carecen de cancelación (`AbortController`) y de un manejo de errores robusto, lo que destruye la traza del error en la UI.
- **Mantenibilidad:** Existen *Magic Strings* y estilos *hardcodeados* (como el modo oscuro forzado) que deben extraerse a archivos de configuración globales.

## Aplicación de Skills
- **Skill aplicada:** `performance`.
- **Motivo:** El build de frontend reportó advertencia por chunk JS grande, y los componentes de gráficos (`recharts`) concentran buena parte del peso inicial.
- **Acción implementada:**
	- Code splitting con `React.lazy` + `Suspense` en la vista principal para cargar `IncomeOutcomeChart` y `ProfitPercentChart` bajo demanda.
	- Migración de data fetching inicial de `useEffect` a `React Query` (`useQuery`) para estandarizar manejo de cache/estado/error en server-state.
- **Impacto esperado:** Menor tamaño del bundle inicial y mejor control de la capa asíncrona sin anti-patrón de `useEffect` para fetch inicial.

- **Skill aplicada:** `seo`.
- **Motivo:** Aunque el dashboard funciona bien técnicamente, sin metadatos sociales y canónicos se pierde visibilidad en buscadores y se comparte "pobre" en canales como Slack/LinkedIn.
- **Acción implementada:** Se reforzó el `head` en `frontend/index.html` con `robots`, `canonical`, etiquetas Open Graph y Twitter Card.
- **Impacto esperado:** Mejor indexación y previews más claros/atractivos al compartir enlaces del producto.

### Comentario humanizado
Si alguien descubre este dashboard por un link compartido o por Google, el primer contacto no debería sentirse genérico. Esta mejora de SEO no cambia la lógica del negocio, pero sí mejora la forma en que el producto "se presenta" al mundo, que en la práctica termina impactando adopción.