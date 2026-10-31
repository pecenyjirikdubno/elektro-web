import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "JZ ELEKTRO | Elektromontáže, LPS a průmyslový servis",
  description:
    "JZ ELEKTRO realizuje elektroinstalace rodinných domů, průmyslové elektromontáže, LPS, veřejné osvětlení a servis elektrického nářadí, čerpadel a elektromotorů. Příbram, Praha, Plzeň.",
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="cs"><body className="bg-slate-950 text-white antialiased">{GA_ID && <><Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive"/><Script id="ga4-init" strategy="afterInteractive">{`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_ID}');`}</Script></>}{children}</body></html>;
}
