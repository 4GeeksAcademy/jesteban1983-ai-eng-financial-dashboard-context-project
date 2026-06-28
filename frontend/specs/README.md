# Especificación de Funcionalidades (Specs)

## 1. Filtro de Fechas
- **Endpoints:** `GET /api/metrics/facets` (carga inicial).
- **Parámetros:** `start_date`, `end_date` (opcionales, formato YYYY-MM-DD).
- **Edge Cases:**
  - **Fecha inicio > Fecha fin:** La UI debe deshabilitar el botón de búsqueda y mostrar: "El rango de fechas es inválido".
  - **Datos inexistentes en rango:** Si el backend responde 200 OK pero con campos vacíos/nulos, el dashboard debe mostrar "No hay datos disponibles en este período".

## 2. Tabla de Alertas (Anomalías)
- **Endpoints:** `GET /api/metrics/alerts`.
- **Parámetros:** `threshold` (0.01 - 1.0; default 0.3), `start_date`, `end_date`.
- **Edge Cases:**
  - **Array vacío:** No ocultar la tabla. Renderizar un mensaje: "No se detectaron anomalías con el umbral actual".
  - **Threshold fuera de rango:** Si el usuario ingresa un valor (ej: 1.5), bloquear el formulario y mostrar: "El umbral debe estar entre 0.01 y 1.0".

## 3. Vista Comparativa (B2B vs B2C)
- **Endpoints:** `GET /api/metrics/categories/top`.
- **Parámetros:** `operation_type`, `limit`, `business_type`, `start_date`, `end_date`.
- **Edge Cases:**
  - **Cálculo de porcentajes:** Si la API no retorna el % de participación, el frontend calculará: `(total_amount / suma_total_linea_negocio) * 100`.
  - **Categorías insuficientes:** Si la línea de negocio tiene menos de 5 categorías, mostrar tantas como existan sin completar con ceros.