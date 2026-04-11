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
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <div className="text-xl font-bold tracking-tight">ELEKTRO SERVIS</div>
            <div className="text-sm text-slate-500">VN / NN / Projekce / Revize</div>
          </div>

          <nav className="hidden gap-6 md:flex">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-slate-700 transition hover:text-slate-950"
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
          className="relative overflow-hidden border-b border-slate-200 bg-slate-950 text-white"
        >
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-24 md:grid-cols-2 md:py-32">
            <div className="flex flex-col justify-center">
              <div className="mb-4 inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm">
                Silnoproudá elektrotechnika pro firmy i průmysl
              </div>

              <h1 className="min-h-[120px] text-4xl font-bold leading-tight md:text-5xl">
                {rotatingTexts[currentText]}
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-slate-300">
                Zajišťujeme komplexní služby v oblasti VN a NN. Od návrhu řešení,
                přes dodávku a montáž až po výchozí i pravidelné revize.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#kontakt"
                  className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg transition hover:-translate-y-0.5"
                >
                  Nezávazná poptávka
                </a>

                <a
                  href="#sluzby"
                  className="rounded-2xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Naše služby
                </a>
              </div>
            </div>

            <div className="grid gap-4 md:pl-10">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
                <div className="text-sm uppercase tracking-[0.2em] text-slate-400">
                  Co nabízíme
                </div>

                <div className="mt-4 space-y-3 text-lg">
                  <div>• Projekce elektroinstalací</div>
                  <div>• Revize zařízení VN/NN</div>
                  <div>• Elektromontáže VN/NN</div>
                  <div>• Montáž hromosvodů</div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-800 to-slate-900 p-6">
                <div className="text-sm text-slate-400">
                  Spolehlivost • Odbornost • Dlouholetá praxe
                </div>
                <div className="mt-3 text-3xl font-bold">15+ let zkušeností</div>
              </div>
            </div>
          </div>
        </section>

        <section id="sluzby" className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-12 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight">Naše služby</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <section id="projekce" className="rounded-3xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Projekce elektro</h3>
            </section>

            <section id="revize" className="rounded-3xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Revize VN/NN</h3>
            </section>

            <section id="montaze" className="rounded-3xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Elektromontáže VN/NN</h3>
            </section>

            <section id="trafostanice" className="rounded-3xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold">Trafostanice</h3>
            </section>
          </div>
        </section>

        <section id="kontakt" className="border-t border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <h2 className="text-3xl font-bold">Kontaktujte nás</h2>
          </div>
        </section>
      </main>
    </div>
  );
}