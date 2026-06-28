/**
 * Filtro de rango opcional compartido por varias vistas. 
 * Solo incluir en la query las claves que el usuario haya definido. 
 */
export interface DateRangeFilter {
  /** Inicio inclusive; formato ISO YYYY-MM-DD */
  start_date?: string;
  /** Fin inclusive; formato ISO YYYY-MM-DD */
  end_date?: string;
}

/**
 * Parámetros para la tabla de alertas de anomalías.
 * Hereda los filtros de fecha.
 */
export interface AlertsParams extends DateRangeFilter {
  /** Ratio de umbral; rango permitido en UI 0.01–1.0 */
  threshold: number;
}

/**
 * Parámetros para la vista comparativa B2B vs B2C.
 * Hereda los filtros de fecha.
 */
export interface TopCategoriesParams extends DateRangeFilter {
  /** Filtrar por ingresos o gastos */
  operation_type: "income" | "outcome";
  /** Entre 1 y el máximo que permita la API (ej. 5 o 20) */
  limit: number;
  /** Filtra movimientos de la línea de negocio antes de agregar */
  business_type: "B2B" | "B2C";
}