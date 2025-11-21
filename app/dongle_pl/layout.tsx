import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Antena Smart TV Premium - Darmowa TV Bez Abonamentu | Ketronica",
  description: "Oglądaj TV za darmo w 4K/HD bez abonamentu. Antena Smart TV z odbiorem 360°, łatwa instalacja. Darmowa wysyłka, płatność przy odbiorze.",
};

export default function DongleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
