"use client";

import React from "react";
import { services } from "@/data/sluzby";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window !== "undefined") {
    window.gtag?.("event", name, params);
  }
}

export default function HomePage() {
  const [formState, setFormState] = React.useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [formMessage, setFormMessage] = React.useState("");
  const [quickPhone, setQuickPhone] = React.useState("");
  const [attachments, setAttachments] = React.useState<FileList | null>(null);

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

  async function sendJsonContact(payload: typeof formData) {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        pageUrl: window.location.href,
        referrer: document.referrer,
      }),
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
    trackEvent("lead_form_submit_start", { service: formData.service });

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("phone", formData.phone);
      form.append("email", formData.email);
      form.append("service", formData.service);
      form.append("message", formData.message);
      form.append("pageUrl", window.location.href);
      form.append("referrer", document.referrer);

      if (attachments) {
        Array.from(attachments).forEach((file) => {
          form.append("attachments", file);
        });
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        body: form,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Nepodařilo se odeslat formulář.");
      }

      setFormState("success");
      setFormMessage("Děkujeme, vaše poptávka byla odeslána.");
      trackEvent("lead_form_submit_success", {
        service: formData.service,
        attachments_count: attachments?.length || 0,
      });
      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "Projekce elektro",
        message: "",
      });
      setAttachments(null);
      e.currentTarget.reset();
    } catch (error) {
      setFormState("error");
      setFormMessage(
        error instanceof Error ? error.message : "Došlo k chybě při odesílání."
      );
      trackEvent("lead_form_submit_error", { service: formData.service });
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
    trackEvent("quick_phone_submit_start");

    try {
      await sendJsonContact({
        name: "Rychlá poptávka z webu",
        phone: quickPhone,
        email: "neuvedeno@jzelektro.cz",
        service: "Zavolejte mi zpět",
        message: `Prosím zavolat zpět na telefon: ${quickPhone}`,
      });

      setQuickPhone("");
      setFormState("success");
      setFormMessage("Děkujeme, ozveme se Vám zpět.");
      trackEvent("quick_phone_submit_success");
    } catch (error) {
      setFormState("error");
      setFormMessage(
        error instanceof Error ? error.message : "Došlo k chybě při odesílání."
      );
      trackEvent("quick_phone_submit_error");
    }
  }

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
            <a href="#home" className="hover:text-amber-300">Úvod</a>
            <a href="#sluzby" className="hover:text-amber-300">Co nabízíme</a>
            <a href="#reference" className="hover:text-amber-300">Reference</a>
            <a href="#kontakt" className="hover:text-amber-300">Kontakt</a>
            <a
              href="/nastroje"
              onClick={() => trackEvent("nav_tools_click")}
              className="text-amber-300 hover:text-amber-200"
            >
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

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#kontakt"
            onClick={() => trackEvent("hero_contact_click")}
            className="rounded-xl bg-amber-400 px-6 py-3 font-bold text-black hover:bg-amber-300"
          >
            Nezávazná poptávka
          </a>
          <a
            href="/nastroje"
            onClick={() => trackEvent("hero_tools_click")}
            className="rounded-xl border border-slate-700 px-6 py-3 font-bold text-white hover:border-amber-400 hover:text-amber-300"
          >
            Spočítat kabel / výkon → Elektro nástroje
          </a>
        </div>

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

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <a
              id={service.id}
              key={service.id}
              href={`/sluzby/${service.id}`}
              onClick={() => trackEvent("service_card_click", { service: service.title })}
              className="group scroll-mt-28 overflow-hidden rounded-2xl bg-slate-900 transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <img
                src={service.image}
                alt={service.title}
                className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold group-hover:text-amber-300">
                  {service.title}
                </h3>
                <p className="mt-3 text-slate-400">{service.shortText}</p>
                <div className="mt-5 text-sm font-semibold text-amber-300">
                  Zobrazit detail →
                </div>
              </div>
            </a>
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
              <a
                href="tel:+420720298279"
                onClick={() => trackEvent("phone_click")}
                className="hover:text-amber-300"
              >
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
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl bg-slate-950 p-3 outline-none focus:ring-2 focus:ring-amber-400"
            />
            <input
              name="phone"
              placeholder="Telefon"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-xl bg-slate-950 p-3 outline-none focus:ring-2 focus:ring-amber-400"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl bg-slate-950 p-3 outline-none focus:ring-2 focus:ring-amber-400"
            />
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full rounded-xl bg-slate-950 p-3 outline-none focus:ring-2 focus:ring-amber-400"
            >
              {services.map((service) => (
                <option key={service.id}>{service.title}</option>
              ))}
              <option>Jiná poptávka</option>
            </select>
            <textarea
              name="message"
              placeholder="Zpráva"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full rounded-xl bg-slate-950 p-3 outline-none focus:ring-2 focus:ring-amber-400"
            />

            <label className="block rounded-xl border border-dashed border-slate-700 bg-slate-950 p-4 text-sm text-slate-300">
              <span className="font-semibold text-amber-300">Přílohy k poptávce</span>
              <span className="mt-1 block text-slate-500">
                Můžete přiložit projekt, fotografii nebo PDF. Maximálně 4 soubory, každý do 8 MB.
              </span>
              <input
                name="attachments"
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx,.xls,.xlsx"
                onChange={(e) => setAttachments(e.target.files)}
                className="mt-3 block w-full text-sm text-slate-400 file:mr-4 file:rounded-lg file:border-0 file:bg-amber-400 file:px-4 file:py-2 file:font-semibold file:text-black hover:file:bg-amber-300"
              />
            </label>

            <button
              disabled={formState === "sending"}
              className="rounded-xl bg-amber-400 px-6 py-3 font-bold text-black hover:bg-amber-300 disabled:opacity-70"
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
        onClick={() => trackEvent("whatsapp_click")}
        className="fixed bottom-5 right-5 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-2xl shadow-2xl hover:bg-green-400"
        aria-label="Napsat na WhatsApp"
      >
        💬
      </a>
    </main>
  );
}
