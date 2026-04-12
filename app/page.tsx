"use client";
import React from "react";

export default function HomePage() {
  const rotatingTexts = [
    "Máme více než 15 let zkušeností v oblasti silnoproudé elektrotechniky",
    "Montáž a dodávky silnoproudých zařízení od projekce až po revizi",
    "Montáž elektrických rozvodů NN/VN",
    "Montáž hromosvodů",
  ];

  const [currentText, setCurrentText] = React.useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [heroVisible, setHeroVisible] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const menuItems = [
    { label: "Úvod", href: "#home" },
    { label: "Projekce elektro", href: "#projekce" },
    { label: "Revize VN/NN", href: "#revize" },
    { label: "Elektromontáže VN/NN", href: "#montaze" },
    { label: "Trafostanice", href: "#trafostanice" },
    { label: "Kontaktujte nás", href: "#kontakt" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-amber-500/20 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <div className="text-xl font-bold tracking-tight text-white">JZ ELEKTRO</div>
            <div className="text-sm text-slate-400">VN / NN / Projekce / Revize</div>
          </div>

          <nav className="hidden gap-6 md:flex">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-slate-300 transition hover:text-amber-400"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            aria-label="Otevřít menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-400/20 bg-slate-900 text-white md:hidden"
          >
            <div className="flex flex-col gap-1.5">
              <span className={`h-0.5 w-5 bg-white transition ${mobileMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`h-0.5 w-5 bg-white transition ${mobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-5 bg-white transition ${mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-amber-500/20 bg-slate-950 px-6 py-4 md:hidden">
            <nav className="flex flex-col gap-4">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-2 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-900 hover:text-amber-400"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main>
        <section
}