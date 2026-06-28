# Especificación de Componentes

## 1. Feature: Filtro de Fechas
### Componente: `DateRangeFilterBar`
- **Props:** - `value: DateRangeFilter` (Estado controlado)
  - `onChange: (next: DateRangeFilter) => void`
  - `facets: FacetsResponse | null` (Hint de rango disponible)
- **Layout:** Fila superior con dos inputs tipo fecha y un texto de ayuda inferior.
- **Reglas de Negocio:**
  - Si `facets` es `null`, mostrar "Cargando fechas...".
  - Si ambos campos están vacíos, no enviar parámetros a la API.
  - Si solo uno está relleno, mostrar mensaje de advertencia: "Seleccione ambas fechas para filtrar".
  - **Hint de UI:** Mostrar "Datos disponibles desde {facets.min_date} hasta {facets.max_date}".

## 2. Feature: Tabla de Anomalías
### Componente: `OutcomeAlertsTable`
- **Props:** - `alerts: AlertEntry[]`
  - `threshold: number`
  - `onThresholdChange: (val: number) => void`
  - `dateFilter: DateRangeFilter`
- **Reglas de UI:**
  - **Empty State:** Si `alerts.length === 0`, renderizar componente `EmptyState` con título "No hay anomalías" y texto explicativo del umbral actual.
  - **Validación de Threshold:** Si el usuario ingresa un valor < 0.01 o > 1.0, deshabilitar el botón de búsqueda y mostrar mensaje: "El umbral debe estar entre 0.01 y 1.0".
  - **Renderizado:** Columnas obligatorias: `Período`, `Gasto`, `Media Móvil` (baseline), `Incremento` (ratio).

## 3. Feature: Vista Comparativa B2B vs B2C
### Componente: `BusinessComparisonDashboard`
- **Layout:** Grid de dos columnas (B2B / B2C).
- **Componentes internos:**
  - 2x `TopCategoriesTable` (Props: `data: CategoryEntry[]`, `title: string`).
  - 1x `ComparisonChart` (Renderiza la suma de ingresos B2B vs B2C).
- **Regla de Cálculo:** Si la API no retorna el porcentaje, el componente debe calcularlo internamente: `(total_amount / sum(totals)) * 100`.