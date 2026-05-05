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
      image: "/images/revize.png",
    },
    {
      id: "montaze",
      title: "Elektromontáže VN/NN",
      text: "Realizace silnoproudých rozvodů a kabelových tras.",
      image: "/images/montaze.png",
    },
    {
      id: "trafostanice",
      title: "Trafostanice",
      text: "Dodávka a montáž trafostanic 22/0,4 kV.",
      image: "/images/trafostanice.png",
    },
    {
      id: "hromosvody",
      title: "Hromosvody",
      text: "Montáž hromosvodů a silnoproudých rozvodů.",
      image: "/images/hromosvody.png",
    },

    // 🔥 NOVÁ SLUŽBA
    {
      id: "bytove-instalace",
      title: "Elektroinstalace byty a RD",
      text: "Kompletní dodávky elektroinstalací v bytech a rodinných domech – rekonstrukce i novostavby.",
      image: "/images/byty.png",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* HERO */}
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold">
          Elektromontáže VN/NN a revize elektro
        </h1>

        <p className="mt-6 text-slate-300 max-w-xl">
          Profesionální elektro služby po celé ČR. Rychlá realizace a dlouholetá praxe.
        </p>

        <div className="mt-6 text-sm text-slate-400">
          Zadejte Vaše telefonní číslo a my se Vám ozveme zpět.
        </div>

        <form onSubmit={handleQuickSubmit} className="mt-4 flex gap-3">
          <input
            value={quickPhone}
            onChange={(e) => setQuickPhone(e.target.value)}
            placeholder="Telefon"
            className="px-4 py-3 rounded-xl bg-slate-900"
          />
          <button className="bg-amber-400 px-5 py-3 rounded-xl text-black font-bold">
            Odeslat telefon
          </button>
        </form>
      </section>

      {/* SLUŽBY */}
      <section id="sluzby" className="px-6 py-20 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10">Co nabízíme</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.id} className="bg-slate-900 p-6 rounded-xl">
              {s.image && (
                <img src={s.image} className="mb-4 h-40 w-full object-cover rounded-xl" />
              )}
              <h3 className="text-xl font-bold">{s.title}</h3>
              <p className="mt-3 text-slate-400">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* KONTAKT */}
      <section id="kontakt" className="px-6 py-20 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold">Kontakt</h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4 max-w-md">
          <input name="name" placeholder="Jméno" value={formData.name} onChange={handleChange} className="w-full p-3 bg-slate-900 rounded-xl"/>
          <input name="phone" placeholder="Telefon" value={formData.phone} onChange={handleChange} className="w-full p-3 bg-slate-900 rounded-xl"/>
          <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-3 bg-slate-900 rounded-xl"/>
          <textarea name="message" placeholder="Zpráva" value={formData.message} onChange={handleChange} className="w-full p-3 bg-slate-900 rounded-xl"/>

          <button className="bg-amber-400 px-6 py-3 rounded-xl text-black font-bold">
            Odeslat
          </button>

          {formMessage && <p>{formMessage}</p>}
        </form>
      </section>

    </main>
  );
}