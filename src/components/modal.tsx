// Set this component as a client component
"use client";
// Modal Stylesheets
import "@/stylesheets/components/modal.css";
// Modal Requirements
import Image from "next/image";
// Modal Props
type Props = {
  status: "success" | "error" | "loading";
  children: string;
  Close: () => void;
};
// Status Titles Record
const STATUS_TITLES: Record<string, string> = {
  success: "¡Éxito!",
  error: "¡Error!",
  loading: "Cargando...",
};
// Modal Main Function
function Modal({ status, Close, children }: Props) {
  // Returns Modal Component
  return (
    <dialog className={`modal-container ${status}`} open>
      {/* Modal Main Image */}
      <Image
        src={`/modal/${status}.gif`}
        alt={`Imagen de ${STATUS_TITLES[status]}`}
        width={120}
        height={120}
      />
      {/* Modal Title */}
      <h3>{STATUS_TITLES[status]}</h3>
      {/* Modal Message */}
      <p>{children}</p>
      {/* Close Button */}
      <button onClick={Close}>Cerrar</button>
    </dialog>
  );
}

export default Modal;
