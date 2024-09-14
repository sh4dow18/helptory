// Home Page Requirements
import { ModelCard } from "@/components";
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
    <>
      {/* Title Section */}
      <section className="title-section-container">
        {/* Title Name */}
        <h1>{TITLE}</h1>
        {/* Title Split */}
        <hr />
        {/* Title Description */}
        <p>{DESCRIPTION}</p>
      </section>
      <div>
        <section>
          {/* Select Model Title */}
          <h2>Selecciona el Modelo</h2>
          {/* Model Cards Lists */}
          <div className="model-cards-list">
            {/* EPQ with Déficit Model Card */}
            <ModelCard
              image="epq_model_with_deficit"
              name="EPQ con Déficit"
              status="selected"
            />
            {/* Soon Model Card */}
            <ModelCard image="soon" name="Próximamente" status="soon" />
            {/* Soon Model Card */}
            <ModelCard image="soon" name="Próximamente" status="soon" />
            {/* Soon Model Card */}
            <ModelCard image="soon" name="Próximamente" status="soon" />
          </div>
          {/* Model Select in Mobile */}
          <select name="models">
            <option value="epq_model_with_deficit">EPQ con Déficit</option>
          </select>
        </section>
      </div>
    </>
  );
}
