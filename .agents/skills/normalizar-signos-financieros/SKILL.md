---
name: normalizar-signos-financieros
description: Normaliza montos y valida reglas de signo para mantener consistencia contable en el dashboard financiero.
---

# Normalizar Signos Financieros

## Objetivo
Garantizar consistencia contable en el dashboard financiero aplicando una regla unica de signos:
- `amount` siempre positivo en origen.
- El sentido contable lo define `operation_type` (`income` o `outcome`).

Esta skill evita errores de KPI por doble signo y estandariza el tratamiento de datos antes de calcular metricas.

## Inputs Definidos
1. `movements`: lista de movimientos con la estructura `FinancialMovement`.
2. `strictMode` (opcional, boolean):
- `true`: rechaza registros invalidos.
- `false`: corrige registros cuando sea posible y reporta advertencias.
3. `source` (opcional, string): origen del dataset (`api`, `mock`, `csv`, etc.).

## Output Esperado
Un objeto con:
1. `normalizedMovements`: movimientos normalizados y listos para `computeKPIs`/`computeMonthlyData`.
2. `summary`:
- `totalRecords`
- `normalizedRecords`
- `rejectedRecords`
- `warningsCount`
3. `issues`: lista detallada de inconsistencias detectadas por registro.
4. `status`: `ok` | `warning` | `error`.

## Reglas de Normalizacion
1. Si `operation_type` es `income`, `amount` debe quedar positivo.
2. Si `operation_type` es `outcome`, `amount` debe quedar positivo (no negativo).
3. Si `amount` es `0`, marcar advertencia (movimiento no aporta al KPI).
4. Si `operation_type` no pertenece a `income|outcome`, rechazar el registro.
5. No mezclar semantica de signo con semantica de tipo (prohibido representar egresos con monto negativo).

## Criterios de Aceptacion
1. El 100% de `normalizedMovements` cumple `amount > 0` y `operation_type` valido.
2. El calculo de `profit` sigue la formula `totalIncome - totalOutcome` sin ajustes de signo adicionales.
3. Cualquier inconsistencia queda trazada en `issues` con motivo y accion tomada.
4. En `strictMode=true`, los registros invalidos no se incluyen en salida final.
5. La salida es deterministicamente reproducible para el mismo input.

## Uso Recomendado en el Proyecto
1. Ejecutar esta skill antes de `computeKPIs` y `computeMonthlyData`.
2. Aplicarla tanto en datos de backend (`/api/metrics`) como en datasets de prueba.
3. Registrar `warnings` en logs de QA cuando se detecten desalineaciones entre `amount` y `operation_type`.
