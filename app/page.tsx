"use client";

import React from "react";

export default function HomePage() {
  const [formState, setFormState] = React.useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [formMessage, setFormMessage] = React.useState("");
  const [quickPhone, setQuickPhone] = React.useState("");

  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    email: "",
    service: "Projekce elektro",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function sendContact(payload: typeof formData) {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Nepodařilo se odeslat formulář.");
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState("sending");
    setFormMessage("");

    try {
      await sendContact(formData);
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

  async function handleQuickSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!quickPhone.trim()) {
      setFormState("error");
      setFormMessage("Zadejte prosím telefon.");
      return;
    }

    setFormState("sending");
    setFormMessage("");

    try {
      await sendContact({
        name: "Rychlá poptávka z webu",
        phone: quickPhone,
        email: "neuvedeno@jzelektro.cz",
        service: "Zavolejte mi zpět",
        message: `Prosím zavolat zpět na telefon: ${quickPhone}`,
      });

      setQuickPhone("");
      setFormState("success");
      setFormMessage("Děkujeme, ozveme se Vám zpět.");
    } catch (error) {
      setFormState("error");
      setFormMessage(
        error instanceof Error ? error.message : "Došlo k chybě při odesílání."
      );
    }
  }

  const services = [
    {
      id: "projekce",
      title: "Projekce elektro",
      text: "Projektová dokumentace elektroinstalací, rozvodů NN/VN a technická řešení pro nové i rekonstruované objekty.",
      image: "/images/projekce.png",
    },
    {
      id: "revize",
      title: "Revize VN/NN",
      text: "Výchozí i pravidelné revize elektrických zařízení, měření a kontrola bezpečnosti provozu.",
    },
    {
      id: "montaze",
      title: "Elektromontáže VN/NN",
      text: "Realizace silnoproudých rozvodů, kabelových tras, rozvaděčů a technologických celků.",
    },
    {
      id: "trafostanice",
      title: "Trafostanice",
      text: "Dodávka, montáž a servis trafostanic 22/0,4 kV včetně uvedení do provozu.",
    },
    {
      id: "hromosvody",
      title: "Hromosvody a silnoproud",
      text: "Montáž hromosvodů, silnoproudých rozvodů a souvisejících technických řešení.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-50 border-b border-amber-500/20 bg-slate-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#home" className="flex items-center gap-3">
            <img
              src="/logo.svg"
              alt="JZ ELEKTRO"
              className="h-12 w-12 rounded-2xl bg-white p-1"
            />
            <div>
              <div className="text-xl font-bold">JZ ELEKTRO</div>
              <div className="text-xs uppercase tracking-[0.25em] text-slate-400">
                VN / NN / Revize
              </div>
            </div>
          </a>

          <nav className="hidden gap-5 text-sm text-slate-300 md:flex">
            <a href="#home" className="hover:text-amber-300">
              Úvod
            </a>
            <a href="#sluzby" className="hover:text-amber-300">
              Služby
            </a>
            <a href="#reference" className="hover:text-amber-300">
              Reference
            </a>
            <a href="#opravneni" className="hover:text-amber-300">
              Oprávnění TIČR
            </a>
            <a href="#kontakt" className="hover:text-amber-300">
              Kontakt
	    <a href="/nastroje" className="hover:text-amber-300">Elektro nástroje</a>
            </a>
          </nav>

          <a
            href="#kontakt"
            className="hidden rounded-2xl bg-amber-400 px-5 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-300 md:block"
          >
            Poptávka
          </a>
        </div>
      </header>

      <section id="home" className="relative overflow-hidden border-b border-amber-500/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.20),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.15),transparent_30%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-24 md:grid-cols-2 md:py-32">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <img
                src="/logo.svg"
                alt="JZ ELEKTRO"
                className="h-20 w-20 rounded-3xl bg-white p-2 shadow-2xl"
              />
              <div>
                <div className="text-4xl font-bold">JZ ELEKTRO</div>
                <div className="mt-1 text-sm uppercase tracking-[0.25em] text-amber-300">
                  Silnoproudá řešení
                </div>
              </div>
            </div>

            <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
              Elektromontáže VN/NN, revize elektro a trafostanice
            </h1>

            <p className="mt-6 max-w-xl text-lg text-slate-300">
              Elektromontáže VN/NN, trafostanice a revize elektro po celé ČR.
              Rychlá realizace, profesionální přístup a dlouholetá praxe.
            </p>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Zajišťujeme projekce elektro, elektromontáže VN/NN, revize elektrických
              zařízení, dodávky trafostanic a montáž hromosvodů. Spolehlivá
              technická řešení pro firmy, průmysl i veřejné objekty.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#kontakt"
                className="rounded-2xl bg-amber-400 px-6 py-3 font-semibold text-slate-950 shadow-lg hover:bg-amber-300"
              >
                Nezávazná poptávka
              </a>
              <a
                href="#reference"
                className="rounded-2xl border border-slate-700 px-6 py-3 font-semibold text-white hover:border-amber-400/40"
              >
                Zobrazit reference
              </a>
            </div>

            <form
              onSubmit={handleQuickSubmit}
              className="mt-8 max-w-xl rounded-3xl border border-amber-400/20 bg-slate-900/90 p-5 shadow-2xl"
            >
              <div className="mb-3 text-sm font-semibold text-amber-300">
                Rychlá poptávka — zavolejte mi zpět
              </div>
              <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                <input
                  type="tel"
                  value={quickPhone}
                  onChange={(e) => setQuickPhone(e.target.value)}
                  placeholder="Váš telefon"
                  className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none placeholder:text-slate-500 focus:border-amber-400"
                />
                <button
                  type="submit"
                  disabled={formState === "sending"}
                  className="rounded-2xl bg-amber-400 px-6 py-3 font-semibold text-slate-950 hover:bg-amber-300 disabled:opacity-70"
                >
                  Zavolejte mi
                </button>
              </div>
            </form>
          </div>

          <div className="grid gap-5">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl">
              <div className="text-sm uppercase tracking-[0.25em] text-amber-300">
                Co děláme
              </div>
              <div className="mt-5 space-y-3 text-slate-200">
                <a href="#projekce" className="block transition hover:text-amber-300">
                  ⚡ Projekce elektroinstalací
                </a>
                <a href="#revize" className="block transition hover:text-amber-300">
                  ⚡ Revize VN/NN
                </a>
                <a href="#montaze" className="block transition hover:text-amber-300">
                  ⚡ Elektromontáže VN/NN
                </a>
                <a href="#trafostanice" className="block transition hover:text-amber-300">
                  ⚡ Trafostanice 22/0,4 kV
                </a>
                <a href="#hromosvody" className="block transition hover:text-amber-300">
                  ⚡ Hromosvody a silnoproudé rozvody
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-amber-400/20 bg-amber-400/10 p-6">
              <div className="text-sm text-slate-300">Praxe v oboru</div>
              <div className="mt-2 text-4xl font-bold text-amber-300">15+ let</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-800 bg-slate-900/60">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="text-3xl font-bold">
            Silnoproudá elektrotechnika od návrhu po revizi
          </h2>
          <p className="mt-4 max-w-4xl leading-8 text-slate-300">
            Díky zkušenostem v projektování, montážích a revizích dokážeme zajistit
            kompletní elektro řešení od prvotního návrhu až po uvedení zařízení do
            provozu. Realizujeme rozvody NN a VN, trafostanice, rozvaděče, kabelové
            trasy, osvětlení i pravidelné kontroly elektrických zařízení.
          </p>
        </div>
      </section>

      <section id="sluzby" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 max-w-2xl">
          <div className="text-sm uppercase tracking-[0.25em] text-amber-300">
            Služby
          </div>
          <h2 className="mt-3 text-3xl font-bold">Naše služby</h2>
          <p className="mt-4 text-slate-400">
            Kompletní dodávky a realizace silnoproudých technologií.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {services.map((service) => (
            <article
              id={service.id}
              key={service.title}
              className="scroll-mt-28 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-sm transition hover:-translate-y-1 hover:border-amber-400/40"
            >
              {service.image && (
                <img
                  src={service.image}
                  alt={service.title}
                  className="mb-5 h-44 w-full rounded-2xl object-cover"
                />
              )}
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="mt-3 text-slate-400">{service.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="reference" className="border-t border-amber-500/20 bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-12 max-w-2xl">
            <div className="text-sm uppercase tracking-[0.25em] text-amber-300">
              Reference
            </div>
            <h2 className="mt-3 text-3xl font-bold">Vybrané realizace</h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <article className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
              <img
                src="/ref/ms1.jpg"
                alt="MŠ Kovářská Praha"
                className="h-72 w-full object-cover"
              />
              <div className="p-6">
                <div className="text-sm font-semibold text-amber-300">Praha</div>
                <h3 className="mt-2 text-2xl font-bold">
                  Rekonstrukce elektrických rozvodů – MŠ Kovářská
                </h3>
                <p className="mt-4 text-slate-400">
                  Výměna části elektrických rozvodů a kompletní výměna osvětlení v
                  objektu mateřské školy.
                </p>
              </div>
            </article>

            <article className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
              <img
                src="/ref/kb1.jpg"
                alt="Trafostanice KB Brno"
                className="h-72 w-full object-cover"
              />
              <div className="p-6">
                <div className="text-sm font-semibold text-amber-300">Brno</div>
                <h3 className="mt-2 text-2xl font-bold">
                  Výstavba kioskové trafostanice – KB Brno
                </h3>
                <p className="mt-4 text-slate-400">
                  Dodávka a montáž trafostanice 22/0,4 kV včetně silnoproudých
                  rozvodů a kabelových tras.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="opravneni" className="border-t border-amber-500/20 bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="text-3xl font-bold">Oprávnění TIČR</h2>
          <p className="mt-4 max-w-3xl text-slate-400">
            Společnost JZ ELEKTRO s.r.o. disponuje oprávněním vydaným Technickou
            inspekcí České republiky.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <a
              href="/docs/ticr-1.pdf"
              target="_blank"
              rel="noreferrer"
              className="rounded-3xl border border-slate-800 bg-slate-950 p-6 hover:border-amber-400/40"
            >
              <div className="text-sm text-amber-300">Strana 1</div>
              <h3 className="mt-2 text-xl font-semibold">
                Rozhodnutí o vydání oprávnění
              </h3>
            </a>

            <a
              href="/docs/ticr-2.pdf"
              target="_blank"
              rel="noreferrer"
              className="rounded-3xl border border-slate-800 bg-slate-950 p-6 hover:border-amber-400/40"
            >
              <div className="text-sm text-amber-300">Strana 2</div>
              <h3 className="mt-2 text-xl font-semibold">
                Rozsah oprávnění a platnost
              </h3>
            </a>
          </div>
        </div>
      </section>

      <section id="kontakt" className="border-t border-amber-500/20 bg-slate-900 pb-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold">Kontaktujte nás</h2>
            <p className="mt-4 text-slate-400">
              Pošlete nám základní informace o projektu a ozveme se Vám zpět.
            </p>

            <div className="mt-8 space-y-5 rounded-3xl border border-slate-800 bg-slate-950 p-6">
              <div>
                <div className="text-sm text-slate-500">Telefon</div>
                <a href="tel:+420720298279" className="font-medium hover:text-amber-300">
                  +420 720 298 279
                </a>
              </div>
              <div>
                <div className="text-sm text-slate-500">E-mail</div>
                <a
                  href="mailto:info@jzelektro.cz"
                  className="font-medium hover:text-amber-300"
                >
                  info@jzelektro.cz
                </a>
              </div>
              <div>
                <div className="text-sm text-slate-500">Adresa</div>
                <div>Dubno 91, 261 01</div>
              </div>
              <div>
                <div className="text-sm text-slate-500">IČ</div>
                <div>24312800</div>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-3xl border border-slate-800 bg-slate-950 p-6"
          >
            <input
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Jméno a příjmení"
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-amber-400"
            />
            <input
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="Telefon"
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-amber-400"
            />
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="E-mail"
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-amber-400"
            />

            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-amber-400"
            >
              <option>Projekce elektro</option>
              <option>Revize VN/NN</option>
              <option>Elektromontáže VN/NN</option>
              <option>Trafostanice</option>
              <option>Jiná poptávka</option>
            </select>

            <textarea
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Zpráva"
              className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-amber-400"
            />

            <button
              disabled={formState === "sending"}
              className="w-full rounded-2xl bg-amber-400 px-6 py-3 font-semibold text-slate-950 hover:bg-amber-300 disabled:opacity-70"
            >
              {formState === "sending" ? "Odesílám..." : "Odeslat poptávku"}
            </button>

            {formMessage && (
              <p className={formState === "success" ? "text-green-400" : "text-red-400"}>
                {formMessage}
              </p>
            )}
          </form>
        </div>
      </section>

      <a
        href="https://wa.me/420720298279"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-2xl shadow-2xl hover:bg-green-400"
        aria-label="Napsat na WhatsApp"
      >
        💬
      </a>
    </main>
  );
}