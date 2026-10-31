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
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [attachments, setAttachments] = React.useState<FileList | null>(null);

  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    email: "",
    service: "Elektroinstalace rodinného domu",
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
        service: "Elektroinstalace rodinného domu",
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
    <main className="min-h-screen bg-white text-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <a href="#home" className="flex min-w-0 items-center gap-2 sm:gap-3">
            <img src="/logo.svg" alt="JZ ELEKTRO" className="h-12 w-12 shrink-0 rounded-lg" />
            <div className="text-lg font-black leading-tight tracking-tight sm:text-xl">JZ <span className="text-red-600">ELEKTRO</span></div>
          </a>
          <nav className="hidden items-center gap-6 text-sm font-semibold lg:flex">
            <a href="#home" className="hover:text-red-600">Domů</a><a href="#sluzby" className="hover:text-red-600">Naše služby</a><a href="/eshop" className="hover:text-red-600">E-shop</a><a href="#reference" className="hover:text-red-600">Realizace</a><a href="/nastroje" className="hover:text-red-600">Elektro nástroje</a><a href="#proc" className="hover:text-red-600">O nás</a><a href="#kontakt" className="hover:text-red-600">Kontakt</a>
          </nav>
          <a href="#kontakt" className="shrink-0 rounded-lg bg-red-600 px-3 py-3 text-xs font-bold text-white hover:bg-red-700 sm:px-5 sm:text-sm">Nezávazná poptávka →</a>
        </div>

        <div className="mx-auto max-w-7xl px-4 pb-3 lg:hidden">
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Zavřít menu" : "Otevřít menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-800"
          >
            {mobileMenuOpen ? "✕ Zavřít menu" : "☰ Menu"}
          </button>
          {mobileMenuOpen && (
            <nav id="mobile-navigation" aria-label="Mobiln? navigace" className="mt-3 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
            <a href="#home" onClick={() => setMobileMenuOpen(false)} className="block rounded-lg px-4 py-3 font-semibold text-slate-800 hover:bg-red-50 hover:text-red-600">Domů</a>
            <a href="#sluzby" onClick={() => setMobileMenuOpen(false)} className="block rounded-lg px-4 py-3 font-semibold text-slate-800 hover:bg-red-50 hover:text-red-600">Naše služby</a>
            <a href="/eshop" onClick={() => setMobileMenuOpen(false)} className="block rounded-lg px-4 py-3 font-semibold text-slate-800 hover:bg-red-50 hover:text-red-600">E-shop</a>
            <a href="#reference" onClick={() => setMobileMenuOpen(false)} className="block rounded-lg px-4 py-3 font-semibold text-slate-800 hover:bg-red-50 hover:text-red-600">Realizace</a>
            <a href="/nastroje" onClick={() => setMobileMenuOpen(false)} className="block rounded-lg px-4 py-3 font-semibold text-slate-800 hover:bg-red-50 hover:text-red-600">Elektro nástroje</a>
            <a href="#proc" onClick={() => setMobileMenuOpen(false)} className="block rounded-lg px-4 py-3 font-semibold text-slate-800 hover:bg-red-50 hover:text-red-600">O nás</a>
            <a href="#kontakt" onClick={() => setMobileMenuOpen(false)} className="block rounded-lg px-4 py-3 font-semibold text-slate-800 hover:bg-red-50 hover:text-red-600">Kontakt</a>
            </nav>
          )}
        </div>
      </header>

      <section id="home" className="relative overflow-hidden bg-slate-950">
        <img src="/marketing-v2/rd.jpg" alt="Elektromontáž JZ ELEKTRO" className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/15" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 text-white sm:py-20 md:py-32">
          <div className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-red-400">JZ ELEKTRO • realizace + servis</div>
          <h1 className="max-w-3xl break-words text-4xl font-black leading-[1.08] sm:text-5xl md:text-6xl">Komplexní elektrotechnické služby</h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-slate-200">Elektromontáže, LPS, veřejné osvětlení a servis elektrických zařízení pro domy, firmy, průmysl a obce.</p>
          <p className="mt-3 text-sm font-semibold text-slate-300">Příbram + 50 km • Praha • Plzeň • větší průmyslové a VN zakázky po celé ČR</p>
          <div className="mt-8 flex flex-wrap gap-4"><a href="#sluzby" className="rounded-lg bg-red-600 px-6 py-3 font-bold hover:bg-red-700">Naše služby →</a><a href="#kontakt" className="rounded-lg border border-white/70 px-6 py-3 font-bold hover:bg-white hover:text-black">Kontaktujte nás →</a></div>
          <form onSubmit={handleQuickSubmit} className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"><input value={quickPhone} onChange={(e)=>setQuickPhone(e.target.value)} placeholder="Telefon – zavoláme vám zpět" className="flex-1 rounded-lg bg-white/95 px-4 py-3 text-slate-950 outline-none ring-red-500 focus:ring-2"/><button className="rounded-lg bg-white px-5 py-3 font-bold text-slate-950 hover:bg-slate-100">Odeslat telefon</button></form>
        </div>
      </section>

      <section id="sluzby" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-9"><div className="text-sm font-bold uppercase tracking-[0.2em] text-red-600">Hlavní realizační služby</div><h2 className="mt-2 text-3xl font-black">S čím vám pomůžeme</h2></div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["elektroinstalace-rd","Elektroinstalace rodinných domů","Nové instalace, rekonstrukce, rozvaděče a příprava technologií.","/marketing-v2/rd.jpg"],
            ["prumyslove-elektromontaze","Průmyslové elektromontáže","Kabelové trasy, rozvaděče, osvětlení a připojení technologií.","/marketing-v2/prumysl.jpg"],
            ["hromosvody","LPS – ochrana před bleskem","Návrh, výstavba, opravy a rekonstrukce LPS.","/marketing-v2/lps.jpg"],
            ["verejne-osvetleni","Veřejné osvětlení","Výstavba, rekonstrukce, opravy a servis pro obce a areály.","/marketing-v2/vo.jpg"]
          ].map(([id,title,text,image])=><a key={id} href={`/sluzby/${id}`} onClick={()=>trackEvent("priority_service_click",{service:title})} className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"><img src={image} alt={title} className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"/><div className="p-5"><h3 className="text-lg font-black leading-tight group-hover:text-red-600">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p><div className="mt-4 font-bold text-red-600">Více →</div></div></a>)}
        </div>

        <div id="servis" className="mt-5 grid gap-5 md:grid-cols-3">
          {[
            ["opravy-motoru-cerpadel","Opravy čerpadel","Diagnostika, opravy, servis, montáž a uvedení do provozu.","/marketing-v2/cerpadla.jpg"],
            ["opravy-motoru-cerpadel","Opravy elektromotorů","Servis a opravy asynchronních a synchronních motorů.","/marketing-v2/motory.jpg"],
            ["opravy-naradi","Opravy elektrického nářadí","Diagnostika, opravy a údržba ručního elektrického nářadí.","/marketing-v2/naradi.jpg"]
          ].map(([id,title,text,image])=><a key={title} href={`/sluzby/${id}`} className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-xl"><img src={image} alt={title} className="h-52 w-full object-cover"/><div className="p-5"><h3 className="text-xl font-black group-hover:text-red-600">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p></div></a>)}
        </div>
      </section>

      <section id="proc" className="bg-slate-950 text-white"><div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 md:grid-cols-4">{[["Od návrhu po servis","Projekce, realizace, revize i následný servis."],["Odborná kvalifikace","Technické řešení a realizace s důrazem na bezpečnost."],["Vlastní montážní kapacita","Elektromontáže i servis zajišťujeme vlastními pracovníky."],["Příbram • Praha • Plzeň","U větších průmyslových a VN zakázek působíme po celé ČR."]].map(([a,b])=><div key={a}><div className="mb-3 h-1 w-10 bg-red-600"/><h3 className="text-xl font-black">{a}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{b}</p></div>)}</div></section>

      <section className="mx-auto max-w-7xl px-6 py-16"><div className="grid gap-8 rounded-2xl bg-slate-100 p-8 lg:grid-cols-2 lg:p-12"><div><div className="text-sm font-bold uppercase tracking-[0.2em] text-red-600">Pro firmy a průmysl</div><h2 className="mt-3 text-3xl font-black">Elektro od projektu až po provoz</h2><p className="mt-5 text-lg leading-8 text-slate-600">Jeden partner pro elektrické zařízení: projektové řešení → realizace → revize → servis → opravy.</p></div><div className="grid grid-cols-2 gap-3">{["Projekce","Realizace","Revize","Servis a opravy"].map(x=><div key={x} className="flex items-center rounded-xl bg-white p-5 font-black shadow-sm"><span className="mr-3 text-red-600">✓</span>{x}</div>)}</div></div></section>

      <section id="reference" className="mx-auto max-w-7xl px-6 py-16"><div className="mb-8"><div className="text-sm font-bold uppercase tracking-[0.2em] text-red-600">Vybrané realizace</div><h2 className="mt-2 text-3xl font-black">Reference</h2></div><div className="grid gap-6 md:grid-cols-2"><article className="overflow-hidden rounded-xl border border-slate-200"><img src="/ref/ms1.jpg" alt="Rekonstrukce elektrických rozvodů MŠ Kovářská Praha" className="h-72 w-full object-cover"/><div className="p-6"><div className="text-sm font-bold text-red-600">Praha</div><h3 className="mt-2 text-2xl font-black">Rekonstrukce elektrických rozvodů – MŠ Kovářská</h3><p className="mt-3 text-slate-600">Výměna části elektrických rozvodů a kompletní výměna osvětlení.</p></div></article><article className="overflow-hidden rounded-xl border border-slate-200"><img src="/ref/kb1.jpg" alt="Výstavba kioskové trafostanice KB Brno" className="h-72 w-full object-cover"/><div className="p-6"><div className="text-sm font-bold text-red-600">Brno</div><h3 className="mt-2 text-2xl font-black">Výstavba kioskové trafostanice – KB Brno</h3><p className="mt-3 text-slate-600">Dodávka a montáž trafostanice 22/0,4 kV včetně silnoproudých rozvodů a kabelových tras.</p></div></article></div></section>

      <section className="bg-slate-100"><div className="mx-auto max-w-7xl px-6 py-14"><h2 className="text-3xl font-black">Kde realizujeme zakázky</h2><div className="mt-7 grid gap-5 md:grid-cols-3">{[["Příbram + 50 km","Elektromontáže, LPS, servis a opravy."],["Praha","Elektromontáže, průmyslové realizace, LPS a rekonstrukce."],["Plzeň a okolí","Průmyslové elektromontáže, LPS a servis."]].map(([a,b])=><div key={a} className="rounded-xl bg-white p-6 shadow-sm"><h3 className="text-xl font-black text-red-600">{a}</h3><p className="mt-2 text-slate-600">{b}</p></div>)}</div></div></section>

      <section id="kontakt" className="mx-auto max-w-7xl px-6 py-16"><div className="text-sm font-bold uppercase tracking-[0.2em] text-red-600">Nezávazná poptávka</div><h2 className="mt-2 text-3xl font-black">Máte projekt, fotografie nebo soupis prací?</h2><p className="mt-3 max-w-3xl text-slate-600">Přiložte je k poptávce. Podklady předběžně posoudíme a ozveme se vám.</p><div className="mt-8 grid gap-8 lg:grid-cols-2"><div className="rounded-xl bg-slate-950 p-7 text-white"><h3 className="text-2xl font-black">JZ ELEKTRO</h3><div className="mt-6 space-y-5 text-slate-300"><div><div className="text-xs uppercase text-slate-500">Telefon</div><a href="tel:+420720298279" onClick={()=>trackEvent("phone_click")} className="text-lg font-bold hover:text-red-400">+420 720 298 279</a></div><div><div className="text-xs uppercase text-slate-500">E-mail</div><a href="mailto:info@jzelektro.cz" className="font-bold hover:text-red-400">info@jzelektro.cz</a></div><div><div className="text-xs uppercase text-slate-500">Adresa</div><div>Dubno 91, 261 01</div></div><div><div className="text-xs uppercase text-slate-500">IČ</div><div>24312800</div></div></div></div>
      <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-slate-200 p-7 shadow-sm">{[["name","Jméno","text"],["phone","Telefon","text"],["email","Email","email"]].map(([name,placeholder,type])=><input key={name} name={name} type={type} placeholder={placeholder} required value={formData[name as keyof typeof formData]} onChange={handleChange} className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"/>)}<select name="service" value={formData.service} onChange={handleChange} className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-red-500"><option>Elektroinstalace rodinného domu</option><option>Průmyslová elektromontáž</option><option>LPS / hromosvod</option><option>Veřejné osvětlení</option><option>Oprava čerpadla</option><option>Oprava elektromotoru</option><option>Oprava elektrického nářadí</option><option>Trafostanice / VN</option><option>Projekce elektro</option><option>Revize</option><option>Jiná poptávka</option></select><textarea name="message" placeholder="Zpráva" required value={formData.message} onChange={handleChange} className="min-h-32 w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-red-500"/><label className="block rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-sm"><span className="font-bold text-red-600">Přílohy k poptávce</span><span className="mt-1 block text-slate-500">Projekt, fotografie, PDF nebo tabulka. Max. 4 soubory, každý do 8 MB.</span><input name="attachments" type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx,.xls,.xlsx" onChange={(e)=>setAttachments(e.target.files)} className="mt-3 block w-full text-sm"/></label><button disabled={formState==="sending"} className="rounded-lg bg-red-600 px-6 py-3 font-bold text-white hover:bg-red-700 disabled:opacity-60">{formState==="sending"?"Odesílám...":"Odeslat poptávku"}</button>{formMessage&&<p className={formState==="success"?"text-green-600":"text-red-600"}>{formMessage}</p>}</form></div></section>
      <footer className="border-t border-slate-200 bg-white"><div className="mx-auto max-w-7xl px-6 py-8 text-sm text-slate-500">© JZ ELEKTRO • Elektromontáže • LPS • veřejné osvětlení • průmyslový servis</div></footer>
      <a href="https://wa.me/420720298279" target="_blank" rel="noreferrer" onClick={()=>trackEvent("whatsapp_click")} className="fixed bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-xl text-white shadow-2xl hover:bg-green-600 sm:bottom-5 sm:right-5 sm:h-14 sm:w-14 sm:text-2xl" aria-label="Napsat na WhatsApp">💬</a>
    </main>
  );
}
