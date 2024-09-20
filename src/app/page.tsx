// Home Page Requirements
import { Form, Input, Page, Select } from "@/components";
import { Metadata } from "next";
// Home Page Constants
const TITLE = "Helptory";
const DESCRIPTION =
  "Soluciona Problemas Fáciles de Teoría de Inventarios con unos Cuantos Clics";
// Home Page Metadata
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
};
// Home Page Main Function
export default function Home() {
  // Returns Home Page
  return (
    <Page title={TITLE} description={DESCRIPTION}>
      <section>
        {/* Set Variables */}
        <h2>Establecer Variables</h2>
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
            {/* Model Select */}
            <Select
              label="Modelo"
              name="model"
              optionsList={[
                {
                  name: "EPQ con Déficit (Con Faltantes)",
                  value: "epq-w-d",
                },
                {
                  name: "EPQ sin Déficit (Sin Faltantes)",
                  value: "epq-wo-d",
                },
              ]}
              help="Elige el Modelo a Usar"
            />
            {/* Constant Production Ratio */}
            <Input
              label="Razón de Producción Constante (r)"
              type="text"
              name="r"
              example="8000"
              help="Números Positivos Solamente"
              validation="number"
            />
          </div>
          <div>
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
          </div>
          <div>
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
          </div>
          <div>
            {/* Cost of Deficit in Dollars */}
            <Input
              label="Costo por Déficit en Dólares (u)"
              type="text"
              name="u"
              example="2"
              help="Números Positivos Solamente"
              validation="number"
            />
          </div>
        </Form>
      </section>
    </Page>
  );
}
