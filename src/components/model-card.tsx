// Model Card Stylesheets
import "@/stylesheets/components/model-card.css"
// Model Card Requirements
import Image from "next/image";
// Model Card Props
interface Props {
  image: string;
  name: string;
  status?: "selected" | "soon";
}
// Model Card Main Function
function ModelCard({ image, name, status }: Props) {
  // Returns Model Card Component
  return (
    // Model Card Container
    <article
      className={`model-card-container ${status ? status : ""}`.trimEnd()}
    >
      {/* Model Card Image */}
      <Image src={`/${image}.jpg`} alt={name} width={250} height={140} />
      {/* Model Card Name */}
      <p>{name}</p>
    </article>
  );
}

export default ModelCard;
