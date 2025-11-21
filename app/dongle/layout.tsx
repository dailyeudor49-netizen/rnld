import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Antenna Smart TV Premium - TV Gratis Senza Abbonamenti | Ketronica",
  description: "Guarda la TV gratis in 4K/HD senza abbonamenti. Antenna Smart TV con ricezione 360°, installazione facile. Spedizione gratuita, pagamento alla consegna.",
};

export default function DongleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
