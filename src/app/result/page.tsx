// Result Page Stylesheets
import "@/stylesheets/pages/result.css";
// Result Page Requirements
import { Page } from "@/components";
import { Metadata } from "next";
import {
  GetFirstTimeIntervalt1,
  GetFourthTimeIntervalt4,
  GetFrequencyBetweenTwoProductionRunsf,
  GetMaxDeficit,
  GetMaxInventoryLevelS,
  GetOptimalProductionLotSizeQ,
  GetSecondTimeIntervalt2,
  GetThirdTimeIntervalt3,
  GetTimeBetweenTwoProductionRunsT,
  GetTotalDeficitCost,
  GetTotalInventoryMaintenanceCost,
  GetTotalProductionCost,
  GetTotalUnitCost,
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
// Model Record to display the model name using the submitted model code
const modelsRecord: Record<string, string> = {
  "epq-w-d": "EPQ con Déficit (Con Faltantes)",
  "epq-wo-d": "EPQ sin Déficit (Sin Faltantes)",
  "eoq-w-d": "EOQ con Déficit (Con Faltantes)",
};
// Result Page Main Function
function ResultPage({ searchParams }: Props) {
  // Transform String Param to Number
  const GetNumberFromParam = (param: string): number => {
    return typeof searchParams[param] === "string"
      ? Number.parseFloat(searchParams[param])
      : 0;
  };
  // Get every param
  // If it is a correct model, use it, if not, use a correct one
  const model =
    typeof searchParams["model"] === "string"
      ? searchParams["model"]
      : modelsRecord["epq-w-d"];
  const r = GetNumberFromParam("r");
  const a = GetNumberFromParam("a");
  const c = GetNumberFromParam("c");
  const h = GetNumberFromParam("h");
  const k = GetNumberFromParam("k");
  // If the model is a deficit model, get the number of the string parameter, otherwise set u to 0
  const u = model.endsWith("w-d") ? GetNumberFromParam("u") : 0;
  // Get Results
  const Q = GetOptimalProductionLotSizeQ(model, a, k, h, r, u);
  const d = GetMaxDeficit(a, h, k, r, u);
  const t2 = GetSecondTimeIntervalt2(model, u, k, a, r, h);
  const S = GetMaxInventoryLevelS(model, a, t2, Q);
  const t1 = GetFirstTimeIntervalt1(S, r, a);
  // If u is not 0, get T3 and T4, if not, set t3 and t4 to 0
  const t3 = u !== 0 ? GetThirdTimeIntervalt3(h, k, a, r, u) : 0;
  const t4 = u !== 0 ? GetFourthTimeIntervalt4(d, r, a) : 0;
  const T = GetTimeBetweenTwoProductionRunsT(Q, a);
  const f = GetFrequencyBetweenTwoProductionRunsf(T);
  const CI = GetTotalInventoryMaintenanceCost(h, S, t1, t2);
  // If u is not 0, get the total deficit cost, if not, set CD to 0
  const CD = u !== 0 ? GetTotalDeficitCost(u, d, t3, t4) : 0;
  const CP = GetTotalProductionCost(k, f);
  const CU = GetTotalUnitCost(a, c);
  const CT = CI + CD + CP + CU;
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
            <strong>Modelo Seleccionado:</strong> {modelsRecord[model]}
          </li>
          {r !== 0 && (
            <li>
              {/* Constant Production Ratio */}
              <strong>Razón de Producción Constante (r):</strong> {r} unidades
              físicas
            </li>
          )}
          <li>
            {/* Constant Demand */}
            <strong>Demanda Constante (a):</strong> {a} unidades físicas
          </li>
          <li>
            {/* Unit Production Cost */}
            <strong>Costo Unitario de Producción (c):</strong> ${c}
          </li>
          <li>
            {/* Unit Cost to Hold in Inventory */}
            <strong>Costo Unitario por Mantener en Inventario (h):</strong> ${h}
          </li>
          <li>
            {/* Unit Release Cost */}
            <strong>Costo Unitario por Lanzamiento (k):</strong> ${k}
          </li>
          {u !== 0 && (
            <li>
              {/* Unit Deficit Cost */}
              <strong>Costo Unitario por Déficit (u):</strong> ${u}
            </li>
          )}
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
            unidades de tiempo
          </li>
          <li>
            {/* Frequency between two Production Runs */}
            <strong>
              Frecuencia entre dos Corridas de Producción (f):
            </strong>{" "}
            {f} veces
          </li>
          {u !== 0 && (
            <li>
              {/* Maximum deficit */}
              <strong>Déficit máximo (d):</strong> {d} unidades físicas
            </li>
          )}
          <li>
            {/* Maximum Inventory Level */}
            <strong>Nivel de Inventario Máximo (S):</strong> {S} unidades
            físicas
          </li>
          <li>
            {/* Time Interval T1 */}
            <strong>Intervalo de Tiempo (T1):</strong> {t1} unidades de tiempo
          </li>
          <li>
            {/* Time Interval T2 */}
            <strong>Intervalo de Tiempo (T2):</strong> {t2} unidades de tiempo
          </li>
          {u !== 0 && (
            <>
              <li>
                {/* Time Interval T3 */}
                <strong>Intervalo de Tiempo (T3):</strong> {t3} unidades de
                tiempo
              </li>
              <li>
                {/* Time Interval T4 */}
                <strong>Intervalo de Tiempo (T4):</strong> {t4} unidades de
                tiempo
              </li>
            </>
          )}
          <li>
            {/* Total Inventory Maintenance Cost */}
            <strong>Costo Total por Mantener en Inventario (C(I)):</strong> $
            {CI}
          </li>
          {u !== 0 && (
            <li>
              {/* Total Deficit Cost */}
              <strong>Costo Total por Déficit (C(D)):</strong> ${CD}
            </li>
          )}
          <li>
            {/* Total Production Cost */}
            <strong>Costo Total por Producción Total (C(P)):</strong> ${CP}
          </li>
          <li>
            {/* Total Unit Production Cost */}
            <strong>Costo Total por Unidad de Producción (C(U)):</strong> ${CU}
          </li>
          <li>
            {/* Total Cost */}
            <strong>Costo Total (C(T)):</strong> ${CT}
          </li>
        </ul>
      </section>
    </Page>
  );
}

export default ResultPage;
