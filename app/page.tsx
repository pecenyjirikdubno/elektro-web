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

  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    email: "",
    service: "Projekce elektro",
    message: "",
  });

  const [formState, setFormState] = React.useState<"idle" | "sending" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = React.useState("");

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
    { label: "Reference", href: "#reference" },
    { label: "Oprávnění TIČR", href: "#opravneni" },
    { label: "Kontaktujte nás", href: "#kontakt" },
  ];

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormState("sending");
    setFormMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Nepodařilo se odeslat formulář.");
      }

      setFormState("success");
      setFormMessage("Děkujeme, vaše poptávka byla odeslána.");
      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "Projekce elektro",
        message: "",
      });
    } catch (error) {
      setFormState("error");
      setFormMessage(
        error instanceof Error ? error.message : "Došlo k chybě při odesílání."
      );
    }
  }

  const LogoMark = ({ className = "h-9 w-9" }: { className?: string }) => (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <path
        d="M26 18h44L53 45h18L47 78V55H26l17-37Z"
        fill="currentColor"
      />
      <path
        d="M66 18h28L77 45h17L43 102l15-47H44L66 18Z"
        fill="currentColor"
      />
    </svg>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-amber-500/20 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white p-2 text-slate-900 shadow-lg">
              <LogoMark className="h-9 w-9" />
            </div>
            <div>
              <div className="text-xl font-bold tracking-tight text-white">JZ ELEKTRO</div>
              <div className="text-sm text-slate-400">VN / NN / Projekce / Revize</div>
            </div>
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
              <span
                className={`h-0.5 w-5 bg-white transition ${
                  mobileMenuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`h-0.5 w-5 bg-white transition ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-0.5 w-5 bg-white transition ${
                  mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
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
          id="home"
          className="relative overflow-hidden border-b border-amber-500/20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-amber-400 blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-yellow-300 blur-3xl animate-pulse" />
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-24 md:grid-cols-2 md:py-32">
            <div
              className={`flex flex-col justify-center transition-all duration-700 ${
                heroVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-slate-900 shadow-2xl">
                  <LogoMark className="h-14 w-14" />
                </div>
                <div>
                  <div className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                    JZ ELEKTRO
                  </div>
                  <div className="mt-1 text-sm uppercase tracking-[0.25em] text-amber-300">
                    Moderní silnoproudá řešení
                  </div>
                </div>
              </div>

              <div className="mb-4 inline-flex w-fit rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1 text-sm text-amber-300">
                Silnoproudá elektrotechnika pro firmy i průmysl
              </div>

              <h1 className="min-h-[120px] text-4xl font-bold leading-tight text-white transition-all duration-500 md:text-5xl">
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

            <div
              className={`grid gap-4 md:pl-10 transition-all duration-700 delay-150 ${
                heroVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              <div className="rounded-3xl border border-amber-400/20 bg-white/5 p-6 shadow-2xl backdrop-blur-sm transition hover:-translate-y-1">
                <div className="text-sm uppercase tracking-[0.2em] text-amber-300">
                  Co nabízíme
                </div>
                <div className="mt-4 space-y-3 text-lg text-slate-100">
                  <div>• Projekce elektroinstalací</div>
                  <div>• Revize zařízení VN/NN</div>
                  <div>• Elektromontáže VN/NN</div>
                  <div>• Montáž hromosvodů</div>
                </div>
              </div>

              <div className="rounded-3xl border border-amber-400/20 bg-gradient-to-br from-amber-400/10 to-slate-900 p-6 transition hover:-translate-y-1">
                <div className="text-sm text-slate-300">
                  Spolehlivost • Odbornost • Dlouholetá praxe
                </div>
                <div className="mt-3 text-3xl font-bold text-amber-300">
                  15+ let zkušeností
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-amber-500/10 bg-slate-900/60">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Elektromontáže VN/NN, revize elektro a trafostanice
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-300">
                JZ ELEKTRO zajišťuje projekce elektro, elektromontáže VN/NN, revize elektro,
                dodávky trafostanic a montáž hromosvodů. Zaměřujeme se na spolehlivá řešení pro
                firmy, průmyslové objekty, technickou infrastrukturu i nové realizace.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                <div className="text-sm font-semibold text-amber-300">Klíčové služby</div>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Projekce elektro, elektromontáže VN/NN, revize elektrických zařízení a trafostanice.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                <div className="text-sm font-semibold text-amber-300">Pro koho pracujeme</div>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Pro firmy, developery, průmyslové provozy, obce a investory hledající spolehlivého partnera.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                <div className="text-sm font-semibold text-amber-300">Lokalita</div>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Dubno 91, 26101. Realizace elektro zakázek podle rozsahu projektu a požadavků investora.
                </p>
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
                Zpracování projektové dokumentace pro elektroinstalace, rozvody NN/VN a
                související technická řešení.
              </p>
            </section>

            <section
              id="revize"
              className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:border-amber-400/40"
            >
              <h3 className="text-xl font-semibold text-white">Revize VN/NN</h3>
              <p className="mt-3 text-slate-400">
                Výchozí i pravidelné revize elektrických zařízení, měření a kontrola
                bezpečnosti provozu.
              </p>
            </section>

            <section
              id="montaze"
              className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:border-amber-400/40"
            >
              <h3 className="text-xl font-semibold text-white">Elektromontáže VN/NN</h3>
              <p className="mt-3 text-slate-400">
                Realizace montáží elektrických rozvodů, technologických celků a
                hromosvodních soustav.
              </p>
            </section>

            <section
              id="trafostanice"
              className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:border-amber-400/40"
            >
              <h3 className="text-xl font-semibold text-white">Trafostanice</h3>
              <p className="mt-3 text-slate-400">
                Dodávka, montáž a servis trafostanic včetně napojení na VN/NN sítě a
                kompletního uvedení do provozu.
              </p>
            </section>
          </div>
        </section>

        <section id="reference" className="border-t border-amber-500/20 bg-slate-950">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="mb-12 max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-white">Reference</h2>
              <p className="mt-4 text-slate-400">
                Ukázky vybraných realizací z oblasti elektroinstalací, osvětlení a trafostanic.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <article className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-sm">
                <img
                  src="/ref/ms1.jpg"
                  alt="Rekonstrukce elektroinstalace a osvětlení v MŠ Kovářská Praha"
                  className="h-72 w-full object-cover"
                />
                <div className="p-6">
                  <div className="text-sm font-semibold text-amber-300">Praha</div>
                  <h3 className="mt-2 text-2xl font-bold text-white">
                    Rekonstrukce elektrických rozvodů – MŠ Kovářská Praha
                  </h3>
                  <p className="mt-4 text-slate-400">
                    Výměna části elektrických rozvodů a kompletní výměna osvětlení v objektu
                    mateřské školy. Součástí realizace byla instalace nových svítidel,
                    úprava vybraných elektro tras a modernizace části rozvaděče.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-300">
                    <li>• výměna části elektrických rozvodů</li>
                    <li>• kompletní výměna osvětlení</li>
                    <li>• úprava rozvaděče</li>
                    <li>• bezpečnější a modernější provoz objektu</li>
                  </ul>
                </div>
              </article>

              <article className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-sm">
                <img
                  src="/ref/kb1.jpg"
                  alt="Výstavba kioskové trafostanice KB Brno"
                  className="h-72 w-full object-cover"
                />
                <div className="p-6">
                  <div className="text-sm font-semibold text-amber-300">Brno</div>
                  <h3 className="mt-2 text-2xl font-bold text-white">
                    Výstavba kioskové trafostanice – KB Brno
                  </h3>
                  <p className="mt-4 text-slate-400">
                    Dodávka a montáž trafostanice 22/0,4 kV včetně silnoproudých rozvodů,
                    kabelových tras a technologického napojení. Realizace zahrnovala
                    profesionální vedení kabelů, montáž rozvaděčů a přípravu zařízení
                    pro spolehlivý dlouhodobý provoz.
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-slate-300">
                    <li>• dodávka a montáž trafostanice 22/0,4 kV</li>
                    <li>• instalace silnoproudých rozvodů</li>
                    <li>• pokládka a vedení kabelových tras</li>
                    <li>• montáž rozvaděčů a jištění</li>
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="opravneni" className="border-t border-amber-500/20 bg-slate-900">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Oprávnění TIČR
              </h2>
              <p className="mt-4 text-slate-400">
                Společnost JZ ELEKTRO s.r.o. disponuje oprávněním vydaným Technickou
                inspekcí České republiky pro montáže, opravy, revize a zkoušky
                vyhrazených elektrických zařízení.
              </p>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <a
                href="/docs/ticr-1.pdf"
                target="_blank"
                rel="noreferrer"
                className="rounded-3xl border border-slate-800 bg-slate-950 p-6 transition hover:-translate-y-1 hover:border-amber-400/40"
              >
                <div className="text-sm font-semibold text-amber-300">Strana 1</div>
                <h3 className="mt-2 text-xl font-semibold text-white">
                  Rozhodnutí o vydání oprávnění
                </h3>
                <p className="mt-3 text-slate-400">
                  Oficiální dokument TIČR – první strana rozhodnutí.
                </p>
              </a>

              <a
                href="/docs/ticr-2.pdf"
                target="_blank"
                rel="noreferrer"
                className="rounded-3xl border border-slate-800 bg-slate-950 p-6 transition hover:-translate-y-1 hover:border-amber-400/40"
              >
                <div className="text-sm font-semibold text-amber-300">Strana 2</div>
                <h3 className="mt-2 text-xl font-semibold text-white">
                  Rozsah oprávnění a platnost
                </h3>
                <p className="mt-3 text-slate-400">
                  Rozsah činností E1A a další náležitosti oprávnění.
                </p>
              </a>
            </div>
          </div>
        </section>

        <section id="kontakt" className="border-t border-amber-500/20 bg-slate-900 pb-28 md:pb-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2">
            <div>
              <div className="inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1 text-sm text-amber-300">
                Rychlá poptávka
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">
                Kontaktujte nás
              </h2>
              <p className="mt-4 max-w-xl text-slate-400">
                Pošlete nám základní informace o projektu a ozveme se Vám zpět.
              </p>

              <div className="mt-8 space-y-5 rounded-3xl border border-slate-800 bg-slate-950 p-6">
                <div>
                  <div className="text-sm text-slate-500">Telefon</div>
                  <a
                    href="tel:+420720298279"
                    className="font-medium text-white transition hover:text-amber-300"
                  >
                    +420 720 298 279
                  </a>
                </div>
                <div>
                  <div className="text-sm text-slate-500">E-mail</div>
                  <a
                    href="mailto:info@jzelektro.cz"
                    className="font-medium text-white transition hover:text-amber-300"
                  >
                    info@jzelektro.cz
                  </a>
                </div>
                <div>
                  <div className="text-sm text-slate-500">Adresa</div>
                  <div className="font-medium text-white">Dubno 91, 26101</div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-amber-400/20 bg-slate-950 p-6 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Jméno a příjmení
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Např. Jan Novák"
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-400"
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+420 ..."
                      className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">
                      E-mail
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="vas@email.cz"
                      className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Typ služby
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-amber-400"
                  >
                    <option>Projekce elektro</option>
                    <option>Revize VN/NN</option>
                    <option>Elektromontáže VN/NN</option>
                    <option>Trafostanice</option>
                    <option>Jiná poptávka</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Zpráva
                  </label>
                  <textarea
                    rows={5}
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Stručně popište, co potřebujete zajistit..."
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formState === "sending"}
                  className="w-full rounded-2xl bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {formState === "sending" ? "Odesílám..." : "Odeslat poptávku"}
                </button>

                {formMessage && (
                  <p
                    className={`text-sm ${
                      formState === "success" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {formMessage}
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      <a
        href="https://wa.me/420720298279?text=Dobr%C3%BD%20den%2C%20m%C3%A1m%20z%C3%A1jem%20o%20nez%C3%A1vaznou%20konzultaci."
        target="_blank"
        rel="noreferrer"
        aria-label="Napsat na WhatsApp"
        className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl transition hover:scale-105 hover:bg-green-400"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden="true">
          <path d="M20.52 3.48A11.82 11.82 0 0 0 12.09 0C5.5 0 .14 5.36.14 11.95c0 2.1.55 4.15 1.59 5.95L0 24l6.27-1.64a11.9 11.9 0 0 0 5.82 1.48h.01c6.58 0 11.95-5.36 11.95-11.95 0-3.19-1.24-6.18-3.53-8.41Zm-8.43 18.34h-.01a9.94 9.94 0 0 1-5.06-1.39l-.36-.21-3.72.97 1-3.62-.23-.37a9.93 9.93 0 0 1-1.53-5.25c0-5.49 4.47 9.96 9.97 9.96 2.66 0 5.16 1.03 7.04 2.92a9.88 9.88 0 0 1 2.91 7.04c0 5.49-4.47 9.96-9.96 9.96Zm5.46-7.45c-.3-.15-1.78-.88-2.05-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.23-.65.08-.3-.15-1.27-.47-2.42-1.5a9.1 9.1 0 0 1-1.68-2.08c-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.68-1.64-.93-2.24-.25-.6-.5-.51-.68-.52h-.58c-.2 0-.53.08-.8.38-.28.3-1.06 1.03-1.06 2.5 0 1.48 1.08 2.9 1.23 3.1.15.2 2.12 3.24 5.13 4.54.72.31 1.28.5 1.72.64.72.23 1.38.2 1.89.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.31.18-1.43-.08-.13-.28-.2-.58-.35Z" />
        </svg>
      </a>

      <a
        href="#kontakt"
        className="fixed bottom-4 left-4 right-24 z-40 rounded-2xl bg-amber-400 px-6 py-4 text-center text-sm font-semibold text-slate-950 shadow-2xl transition hover:bg-amber-300 md:hidden"
      >
        Nezávazná poptávka
      </a>
    </div>
  );
}
//