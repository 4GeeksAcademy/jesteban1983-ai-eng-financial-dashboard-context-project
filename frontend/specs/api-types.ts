/**
 * Respuesta de GET /api/metrics/facets.
 * Contiene los metadatos y rangos disponibles en la base de datos.
 */
export interface FacetsResponse {
  /** Valores posibles de operación en el dataset */
  operation_types: ("income" | "outcome")[];
  /** Líneas de negocio presentes (p. ej. B2B, B2C) */
  business_types: string[];
  /** Categorías presentes en los movimientos */
  categories: string[];
  /** Fecha mínima con datos (formato ISO YYYY-MM-DD) */
  min_date: string;
  /** Fecha máxima con datos (formato ISO YYYY-MM-DD) */
  max_date: string;
}

/** * Una fila devuelta por GET /api/metrics/alerts 
 */
export interface AlertEntry {
  /** Etiqueta del período (p. ej. mes o semana según group_by) */
  period: string;
  /** Total de gastos (outcome) en ese período */
  outcome_total: number;
  /** Media de gastos de los 3 períodos anteriores */
  baseline_average: number;
  /** Ratio de aumento respecto a la baseline (ej. 0.15 para 15%) */
  increase_ratio: number;
}

/** La API devuelve un array de alertas (puede ser vacío []) */
export type AlertsResponse = AlertEntry[];

/** * Elemento de GET /api/metrics/categories/top 
 */
export interface CategoryEntry {
  /** Nombre de la categoría (ej. 'Software Subscriptions') */
  category: string;
  /** Tipo de operación */
  operation_type: "income" | "outcome";
  /** Monto total acumulado en esa categoría */
  total_amount: number;
}

/** Array con el top de categorías solicitado */
export type TopCategoriesResponse = CategoryEntry[];