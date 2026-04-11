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
                <a
                  href="#kontakt"
                  className="rounded-2xl bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-amber-300"
                >
                  Nezávazná poptávka
                </a>

                <a
                  href="#sluzby"
                  className="rounded-2xl border border-amber-400/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-400/10"
                >
                  Naše služby
                </a>
              </div>
            </div>

            <div className="grid gap-4 md:pl-10">
              <div className="rounded-3xl border border-amber-400/20 bg-white/5 p-6 shadow-2xl backdrop-blur-sm">
                <div className="text-sm uppercase tracking-[0.2em] text-amber-300">Co nabízíme</div>
                <div className="mt-4 space-y-3 text-lg text-slate-100">
                  <div>• Projekce elektroinstalací</div>
                  <div>• Revize zařízení VN/NN</div>
                  <div>• Elektromontáže VN/NN</div>
                  <div>• Montáž hromosvodů</div>
                </div>
              </div>

              <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-amber-400/10 to-slate-900 p-6">
                <div className="text-sm text-slate-300">Spolehlivost • Odbornost • Dlouholetá praxe</div>
                <div className="mt-3 text-3xl font-bold text-amber-300">15+ let zkušeností</div>
              </div>
            </div>
          </div>
        </section>

        <section id="sluzby" className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-12 max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-white">Naše služby</h2>
            <p className="mt-4 text-slate-400">
              Kompletní dodávky a realizace silnoproudých technologií pro komerční,
              průmyslové i veřejné objekty.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <section
              id="projekce"
              className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:border-amber-400/40"
            >
              <h3 className="text-xl font-semibold text-white">Projekce elektro</h3>
              <p className="mt-3 text-slate-400">
                Zpracování projektové dokumentace pro elektroinstalace, rozvody NN/VN a související technická řešení.
              </p>
            </section>

            <section
              id="revize"
              className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:border-amber-400/40"
            >
              <h3 className="text-xl font-semibold text-white">Revize VN/NN</h3>
              <p className="mt-3 text-slate-400">
                Výchozí i pravidelné revize elektrických zařízení, měření a kontrola bezpečnosti provozu.
              </p>
            </section>

            <section
              id="montaze"
              className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:border-amber-400/40"
            >
              <h3 className="text-xl font-semibold text-white">Elektromontáže VN/NN</h3>
              <p className="mt-3 text-slate-400">
                Realizace montáží elektrických rozvodů, technologických celků a hromosvodních soustav.
              </p>
            </section>

            <section
              id="trafostanice"
              className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:border-amber-400/40"
            >
              <h3 className="text-xl font-semibold text-white">Trafostanice</h3>
              <p className="mt-3 text-slate-400">
                Dodávka, montáž a servis trafostanic včetně napojení na VN/NN sítě a kompletního uvedení do provozu.
              </p>
            </section>
          </div>
        </section>

        <section id="kontakt" className="border-t border-amber-500/20 bg-slate-900">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2">
            <div>
              <div className="inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1 text-sm text-amber-300">
                Rychlá poptávka
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">Kontaktujte nás</h2>
              <p className="mt-4 max-w-xl text-slate-400">
                Pošlete nám základní informace o projektu a ozveme se Vám zpět. Formulář je připravený pro rychlé odeslání poptávky.
              </p>

              <div className="mt-8 space-y-5 rounded-3xl border border-slate-800 bg-slate-950 p-6">
                <div>
                  <div className="text-sm text-slate-500">Telefon</div>
                  <div className="font-medium text-white">+420 123 456 789</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">E-mail</div>
                  <div className="font-medium text-white">info@elektroservis.cz</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">Adresa</div>
                  <div className="font-medium text-white">Doplňte firemní adresu</div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-amber-400/20 bg-slate-950 p-6 shadow-2xl">
              <form className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Jméno a příjmení</label>
                  <input
                    type="text"
                    placeholder="Např. Jan Novák"
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-400"
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">Telefon</label>
                    <input
                      type="tel"
                      placeholder="+420 ..."
                      className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">E-mail</label>
                    <input
                      type="email"
                      placeholder="vas@email.cz"
                      className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Typ služby</label>
                  <select className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-amber-400">
                    <option>Projekce elektro</option>
                    <option>Revize VN/NN</option>
                    <option>Elektromontáže VN/NN</option>
                    <option>Trafostanice</option>
                    <option>Jiná poptávka</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Zpráva</label>
                  <textarea
                    rows={5}
                    placeholder="Stručně popište, co potřebujete zajistit..."
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
                >
                  Odeslat poptávku
                </button>

                <p className="text-sm text-slate-500">
                  Formulář je nyní připravený vizuálně. V dalším kroku ho můžeme napojit, aby skutečně posílal e-maily.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}