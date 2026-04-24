import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JZ ELEKTRO | Elektromontáže VN/NN, revize elektro a trafostanice",
  description:
    "JZ ELEKTRO zajišťuje projekce elektro, elektromontáže VN/NN, revize elektrických zařízení, trafostanice a silnoproudá řešení pro firmy i průmysl.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body className="bg-slate-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}