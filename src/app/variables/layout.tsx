// Variables Layout Requirements
import { Metadata } from "next";
// Variables Layout Metadata
export const metadata: Metadata = {
  title: "Variables",
  description:
    "Aquí se agregan los valores a las variables para el resultado final",
};
// Variables Layout Main Function
function VariablesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Variables Layout Children
  return children;
}

export default VariablesLayout;
