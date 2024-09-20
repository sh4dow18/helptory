// Result Page Stylesheets
import "@/stylesheets/pages/result.css";
// Result Page Requirements
import { Page } from "@/components";
import { Metadata } from "next";
import {
  GetDeficitCost,
  GetFirstTimeIntervalt1,
  GetFourthTimeIntervalt4,
  GetFrequencyBetweenTwoProductionRunsf,
  GetInventoryCost,
  GetMaxDeficit,
  GetMaxInventoryLevelS,
  GetOptimalProductionLotSizeQ,
  GetSecondTimeIntervalt2,
  GetThirdTimeIntervalt3,
  GetTimeBetweenTwoProductionRunsT,
} from "@/libs/math";
// Result Page  Constants
const TITLE = "Resultados";
const DESCRIPTION = "Solución Encontrada al Problema Indicado";
// Result Page Metadata
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
};
// Result Page Props
type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};
// Force dynamism to ensure the correct calculation
export const dynamic = "force-dynamic";
// Result Page Main Function
function ResultPage({ searchParams }: Props) {
  // Transform String Param to Number
  const GetNumberFromParam = (param: string): number => {
    return typeof searchParams[param] === "string"
      ? Number.parseInt(searchParams[param])
      : 0;
  };
  // Get every param
  const r = GetNumberFromParam("r");
  const a = GetNumberFromParam("a");
  const c = GetNumberFromParam("c");
  const h = GetNumberFromParam("h");
  const u = GetNumberFromParam("u");
  const k = GetNumberFromParam("k");
  // Get Results
  const Q = GetOptimalProductionLotSizeQ(a, k, h, r, u);
  const d = GetMaxDeficit(a, h, k, r, u);
  const t2 = GetSecondTimeIntervalt2(u, k, a, r, h);
  const S = GetMaxInventoryLevelS(a, t2);
  const t1 = GetFirstTimeIntervalt1(S, r, a);
  const t3 = GetThirdTimeIntervalt3(h, k, a, r, u);
  const t4 = GetFourthTimeIntervalt4(d, r, a);
  const T = GetTimeBetweenTwoProductionRunsT(t1, t2, t3, t4);
  const f = GetFrequencyBetweenTwoProductionRunsf(T);
  const CI = GetInventoryCost(h, S, t1, t2);
  const CD = GetDeficitCost(u, d, t3, t4);
  // Returns Result Page
  return (
    // Result Page Container with Main Title
    <Page className="results-container" title={TITLE} description={DESCRIPTION}>
      <section>
        {/* Data Entered Title */}
        <h2>Datos Ingresados</h2>
        <ul>
          <li>
            {/* Selected Model */}
            <strong>Modelo Seleccionado:</strong> {searchParams["model"]}
          </li>
          <li>
            {/* Constant Production Ratio */}
            <strong>Razón de Producción Constante (r):</strong> {r} unidades
            físicas
          </li>
          <li>
            {/* Constant Demand */}
            <strong>Demanda Constante (a):</strong> {a} unidades físicas
          </li>
          <li>
            {/* Unit Production Cost */}
            <strong>Costo Unitario de Producción (c):</strong> ${c}
          </li>
          <li>
            {/* Cost of Holding in Inventory */}
            <strong>Costo por Mantener en Inventario (h):</strong> ${h}
          </li>
          <li>
            {/* Deficit Cost */}
            <strong>Costo por Déficit (u):</strong> ${u}
          </li>
          <li>
            {/* Release Cost */}
            <strong>Costo por Lanzamiento (k):</strong> ${k}
          </li>
        </ul>
      </section>
      <section>
        {/* Results Obtained */}
        <h2>Resultados Obtenidos</h2>
        <ul>
          <li>
            {/* Optimal Production Lot Size */}
            <strong>Tamaño óptimo del Lote de Producción (Q):</strong> {Q}{" "}
            unidades físicas
          </li>
          <li>
            {/* Time between two production runs */}
            <strong>Tiempo entre dos corridas de producción (T):</strong> {T}{" "}
            días
          </li>
          <li>
            {/* Frequency between two Production Runs */}
            <strong>
              Frecuencia entre dos Corridas de Producción (f):
            </strong>{" "}
            {f}
          </li>
          <li>
            {/* Maximum deficit */}
            <strong>Déficit máximo (d):</strong> {d} unidades físicas
          </li>
          <li>
            {/* Maximum Inventory Level */}
            <strong>Nivel de Inventario Máximo (S):</strong> {S} unidades
            físicas
          </li>
          <li>
            {/* Time Interval T1 */}
            <strong>Intervalo de Tiempo (T1):</strong> {t1} días
          </li>
          <li>
            {/* Time Interval T2 */}
            <strong>Intervalo de Tiempo (T2):</strong> {t2} días
          </li>
          <li>
            {/* Time Interval T3 */}
            <strong>Intervalo de Tiempo (T3):</strong> {t3} días
          </li>
          <li>
            {/* Time Interval T4 */}
            <strong>Intervalo de Tiempo (T4):</strong> {t4} días
          </li>
          <li>
            {/* Time Interval T4 */}
            <strong>Costo por Mantener en Inventario (C(I)):</strong> ${CI}
          </li>
          <li>
            {/* Total Deficit Cost */}
            <strong>Costo por Déficit (C(D)):</strong> ${CD}
          </li>
        </ul>
      </section>
    </Page>
  );
}

export default ResultPage;
