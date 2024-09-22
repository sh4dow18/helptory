import "@/stylesheets/pages/home.css";
// Home Page Requirements
import { ModelCard, Page } from "@/components";
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
      <section className="models-cards-list-container">
        {/* Available Models */}
        <h2>Modelos Disponibles</h2>
        {/* Model Cards Lists */}
        <div>
          {/* EPQ with Deficit Model Card */}
          <ModelCard code="epq-w-d" name="EPQ con Déficit (Con Faltantes)" />
          {/* EPQ without Deficit Model Card */}
          <ModelCard code="epq-wo-d" name="EPQ sin Déficit (Sin Faltantes)" />
          {/* EOQ with Deficit Model Card */}
          <ModelCard code="eoq-w-d" name="EOQ con Déficit (Con Faltantes)" />
          {/* EOQ without Deficit Model Card */}
          <ModelCard code="eoq-wo-d" name="EOQ sin Déficit (Sin Faltantes)" />
        </div>
      </section>
    </Page>
  );
}
