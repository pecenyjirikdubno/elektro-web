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

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    { label: "Home", href: "#home" },
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
            <div className="text-xl font-bold tracking-tight text-white">ELEKTRO SERVIS</div>
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
        </div>
      </header>

      <main>
        <section
          id="home"
          className="relative overflow-hidden border-b border-amber-500/20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-amber-400 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-yellow-300 blur-3xl" />
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-24 md:grid-cols-2 md:py-32">
            <div className="flex flex-col justify-center">
              <div className="mb-4 inline-flex w-fit rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1 text-sm text-amber-300">
                Silnoproudá elektrotechnika pro firmy i průmysl
              </div>

              <h1 className="min-h-[120px] text-4xl font-bold leading-tight text-white md:text-5xl">
                {rotatingTexts[currentText]}
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-slate-300">
                Zajišťujeme komplexní služby v oblasti VN a NN. Od návrhu řešení,
                přes dodávku a montáž až po výchozí i pravidelné revize.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
