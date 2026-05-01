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
      text: "Projektová dokumentace elektroinstalací, rozvodů NN/VN a technická řešení.",
      image: "/images/projekce.png",
    },
    {
      id: "revize",
      title: "Revize VN/NN",
      text: "Výchozí i pravidelné revize elektrických zařízení.",
    },
    {
      id: "montaze",
      title: "Elektromontáže VN/NN",
      text: "Realizace silnoproudých rozvodů a kabelových tras.",
    },
    {
      id: "trafostanice",
      title: "Trafostanice",
      text: "Dodávka a montáž trafostanic 22/0,4 kV.",
    },
    {
      id: "hromosvody",
      title: "Hromosvody",
      text: "Montáž hromosvodů a silnoproudých rozvodů.",
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
              className="h-12 w-12 rounded-xl bg-white p-1"
            />
            <div>
              <div className="text-lg font-bold">JZ ELEKTRO</div>
              <div className="text-xs text-slate-400">VN / NN</div>
            </div>
          </a>

          <nav className="hidden gap-5 text-sm text-slate-300 md:flex">
            <a href="#home" className="hover:text-amber-300">
              Úvod
            </a>
            <a href="#sluzby" className="hover:text-amber-300">
              Co nabízíme
            </a>
            <a href="#reference" className="hover:text-amber-300">
              Reference
            </a>
            <a href="#kontakt" className="hover:text-amber-300">
              Kontakt
            </a>
            <a href="/nastroje" className="text-amber-300 hover:text-amber-200">
              Elektro nástroje
            </a>
          </nav>
        </div>
      </header>

      <section id="home" className="mx-auto max-w-7xl px-6 py-24">
        <h1 className="max-w-4xl text-5xl font-bold leading-tight">
          Elektromontáže VN/NN a revize elektro
        </h1>

        <p className="mt-6 max-w-xl text-slate-300">
          Profesionální elektro služby po celé ČR. Rychlá realizace a dlouholetá praxe.
        </p>

        <form onSubmit={handleQuickSubmit} className="mt-8 max-w-xl">
          <div className="mb-3 text-sm font-semibold text-amber-300">
            Zadejte Vaše telefonní číslo a my se Vám ozveme zpět.
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={quickPhone}
              onChange={(e) => setQuickPhone(e.target.value)}
              placeholder="Telefon"
              className="flex-1 rounded-xl bg-slate-900 px-4 py-3 outline-none focus:ring-2 focus:ring-amber-400"
            />
            <button className="rounded-xl bg-amber-400 px-5 py-3 font-bold text-black hover:bg-amber-300">
              Odeslat telefon
            </button>
          </div>
        </form>
      </section>

      <section id="sluzby" className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="mb-10 text-3xl font-bold">Co nabízíme</h2>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <div id={s.id} key={s.id} className="rounded-xl bg-slate-900 p-6 scroll-mt-28">
              {s.image && (
                <img
                  src={s.image}
                  alt={s.title}
                  className="mb-5 h-44 w-full rounded-xl object-cover"
                />
              )}
              <h3 className="text-xl font-bold">{s.title}</h3>
              <p className="mt-3 text-slate-400">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="reference" className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="mb-10 text-3xl font-bold">Reference</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <article className="overflow-hidden rounded-2xl bg-slate-900">
            <img
              src="/ref/ms1.jpg"
              alt="Rekonstrukce elektrických rozvodů MŠ Kovářská Praha"
              className="h-72 w-full object-cover"
            />
            <div className="p-6">
              <div className="text-sm font-semibold text-amber-300">Praha</div>
              <h3 className="mt-2 text-2xl font-bold">
                Rekonstrukce elektrických rozvodů – MŠ Kovářská
              </h3>
              <p className="mt-4 text-slate-400">
                Výměna části elektrických rozvodů a kompletní výměna osvětlení v objektu mateřské školy.
              </p>
            </div>
          </article>

          <article className="overflow-hidden rounded-2xl bg-slate-900">
            <img
              src="/ref/kb1.jpg"
              alt="Výstavba kioskové trafostanice KB Brno"
              className="h-72 w-full object-cover"
            />
            <div className="p-6">
              <div className="text-sm font-semibold text-amber-300">Brno</div>
              <h3 className="mt-2 text-2xl font-bold">
                Výstavba kioskové trafostanice – KB Brno
              </h3>
              <p className="mt-4 text-slate-400">
                Dodávka a montáž trafostanice 22/0,4 kV včetně silnoproudých rozvodů a kabelových tras.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section id="kontakt" className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-3xl font-bold">Kontakt</h2>

        <div className="mt-6 grid gap-10 lg:grid-cols-2">
          <div className="space-y-4 rounded-2xl bg-slate-900 p-6">
            <div>
              <div className="text-sm text-slate-500">Telefon</div>
              <a href="tel:+420720298279" className="hover:text-amber-300">
                +420 720 298 279
              </a>
            </div>
            <div>
              <div className="text-sm text-slate-500">E-mail</div>
              <a href="mailto:info@jzelektro.cz" className="hover:text-amber-300">
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

          <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-slate-900 p-6">
            <input
              name="name"
              placeholder="Jméno"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl bg-slate-950 p-3 outline-none focus:ring-2 focus:ring-amber-400"
            />
            <input
              name="phone"
              placeholder="Telefon"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-xl bg-slate-950 p-3 outline-none focus:ring-2 focus:ring-amber-400"
            />
            <input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl bg-slate-950 p-3 outline-none focus:ring-2 focus:ring-amber-400"
            />
            <textarea
              name="message"
              placeholder="Zpráva"
              value={formData.message}
              onChange={handleChange}
              className="w-full rounded-xl bg-slate-950 p-3 outline-none focus:ring-2 focus:ring-amber-400"
            />

            <button className="rounded-xl bg-amber-400 px-6 py-3 font-bold text-black hover:bg-amber-300">
              Odeslat
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
        className="fixed bottom-5 right-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-2xl shadow-2xl hover:bg-green-400"
        aria-label="Napsat na WhatsApp"
      >
        💬
      </a>
    </main>
  );
}