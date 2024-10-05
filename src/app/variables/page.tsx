// Create this Page with Client Side Rendering
"use client";
// Variables Page Requirements
import { Form, Input, Page } from "@/components";
// Variables Page Props
type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};
// Variables Page Main Function
function VariablesPage({ searchParams }: Props) {
  // Get Model from Param
  const MODEL =
    typeof searchParams["model"] === "string"
      ? searchParams["model"]
      : "epq-w-d";
  // Returns Variables Page
  return (
    <Page
      title="Variables"
      description="Aquí se agregan los valores a las variables para el resultado final"
    >
      <section>
        {/* Set Values */}
        <h2>Establecer Valores</h2>
        {/* Variables Form */}
        <Form
          api="result"
          method="GET"
          button="Calcular"
          modal={{
            success: "Se han Calculado las Nuevas Variables",
            error: "No se han podido calcular las Nuevas Variables",
            loading: "Obteniendo Variables",
          }}
        >
          <div>
            {/* Invisible Input that has Model Code and it is Read Only */}
            <input
              className="invisible"
              type="text"
              name="model"
              value={MODEL}
              readOnly
            />
            {/* Display Constant Production Ratio Input if it is an EPQ Model */}
            {MODEL.startsWith("epq") && (
              // Constant Production Ratio Input
              <Input
                label="Razón de Producción Constante (r)"
                type="text"
                name="r"
                example="8000"
                help="Números Positivos Solamente"
                validation="number"
              />
            )}
            {/* Constant Demand Input */}
            <Input
              label="Demanda Constante (a)"
              type="text"
              name="a"
              example="3000"
              help="Números Positivos Solamente"
              validation="number"
            />
            {/* Unit Cost of Production in Dollars */}
            <Input
              label="Costo Unitario de Producción en Dólares (c)"
              type="text"
              name="c"
              example="4"
              help="Números Positivos Solamente"
              validation="number"
            />
            {/* Cost of Holding Inventory in Dollars */}
            <Input
              label="Costo por Mantener en Inventario en Dólares (h)"
              type="text"
              name="h"
              example="3"
              help="Números Positivos Solamente"
              validation="number"
            />
            {/* Launch Cost in Dollars */}
            <Input
              label="Costo de Lanzamiento en Dólares (k)"
              type="text"
              name="k"
              example="100"
              help="Números Positivos Solamente"
              validation="number"
            />
            {/* Display Deficit Cost Input if it is a Deficit Model */}
            {MODEL.endsWith("w-d") && (
              // Deficit Cost Input
              <Input
                label="Costo por Déficit en Dólares (u)"
                type="text"
                name="u"
                example="2"
                help="Números Positivos Solamente"
                validation="number"
              />
            )}
            {/* Number of Decimals Input */}
            <Input
              label="Cantidad de Decimales"
              type="text"
              name="decimals"
              example="2"
              help="Números Positivos Solamente"
              validation="number"
            />
            {/* Physics Units Rounded Checkbox Input */}
            <section>
              <label htmlFor="rounded">
                Unidades Físicas
                <div>
                  <input id="rounded" name="rounded" type="checkbox" />
                  <p>Redondear</p>
                </div>
              </label>
              <small>Si no se marca, se muestra con decimales si posee</small>
            </section>
          </div>
        </Form>
      </section>
    </Page>
  );
}

export default VariablesPage;
