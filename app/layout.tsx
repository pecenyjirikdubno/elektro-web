import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JZ ELEKTRO | Elektromontáže VN/NN, revize elektro a trafostanice",
  description:
    "JZ ELEKTRO zajišťuje projekce elektro, elektromontáže VN/NN, revize elektrických zařízení, trafostanice a montáž hromosvodů. Spolehlivá silnoproudá řešení pro firmy, průmysl i veřejné objekty.",
  keywords: [
    "JZ ELEKTRO",
    "elektromontáže VN",
    "elektromontáže NN",
    "revize elektro",
    "trafostanice",
    "projekce elektro",
    "silnoproud",
    "elektrické rozvody",
    "montáž hromosvodů",
    "Dubno",
    "Příbram",
    "Praha",
    "Brno",
  ],
  authors: [{ name: "JZ ELEKTRO" }],
  creator: "JZ ELEKTRO",
  publisher: "JZ ELEKTRO",
  metadataBase: new URL("https://elektro-web-xi.vercel.app"),
  openGraph: {
    title: "JZ ELEKTRO | Elektromontáže VN/NN, revize elektro a trafostanice",
    description:
      "Komplexní služby v oblasti silnoproudé elektrotechniky – projekce elektro, elektromontáže VN/NN, revize, trafostanice a hromosvody.",
    url: "https://elektro-web-xi.vercel.app",
    siteName: "JZ ELEKTRO",
    locale: "cs_CZ",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },

  // Sem později vložíš token ze Search Console:
  verification: {
    google: "googleae861fc6be16bbca.html",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body>{children}</body>
    </html>
  );
}