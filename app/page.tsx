use client";
import React from "react";

export default function HomePage() {
  const rotatingTexts = [
    "Máme více než 15 let zkušeností v oblasti silnoproudé elektrotechniky",
    "Montáž a dodávky silnoproudých zařízení od projekce až po revizi",
    "Montáž elektrických rozvodů NN/VN",
    "Montáž hromosvodů",
  ];

  const [currentText, setCurrentText] = React.useState(0);

  const [formData, setFormData] = React.useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Poptávka byla odeslána 👍");
      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        message: "",
      });
    } else {
      alert("Chyba při odeslání ❌");
    }
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* HERO */}
      <section className="bg-slate-950 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold min-h-[120px]">
              {rotatingTexts[currentText]}
            </h1>

            <p className="mt-6 text-slate-300">
              Elektromontáže VN/NN, projekce elektro, revize zařízení a
              dodávky trafostanic pro firmy i průmysl.
            </p>
          </div>
        </div>
      </section>

      {/* SEO TEXT */}
      <section className="bg-slate-100 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold">
            Elektromontáže VN/NN, revize elektro a trafostanice
          </h2>

          <p className="mt-4 text-slate-700 leading-7">
            JZ ELEKTRO zajišťuje projekce elektro, elektromontáže VN/NN,
            revize elektrických zařízení a dodávky trafostanic.
            Realizujeme zakázky pro průmysl, firmy, obce i veřejné objekty.
          </p>
        </div>
      </section>

      {/* SLUŽBY */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-8">

        {/* Projekce */}
        <div className="border p-6 rounded-2xl">
          <img src="/images/projekce.png" className="rounded-xl mb-4" />
          <h3 className="text-xl font-semibold">Projekce elektro</h3>
          <p className="mt-2 text-slate-600">
            Projektová dokumentace elektroinstalací a rozvodů NN/VN.
          </p>
        </div>

        {/* Revize */}
        <div className="border p-6 rounded-2xl">
          <h3 className="text-xl font-semibold">Revize VN/NN</h3>
          <p className="mt-2 text-slate-600">
            Výchozí i pravidelné revize elektrických zařízení.
          </p>
        </div>

        {/* Montáže */}
        <div className="border p-6 rounded-2xl">
          <h3 className="text-xl font-semibold">Elektromontáže</h3>
          <p className="mt-2 text-slate-600">
            Realizace silnoproudých rozvodů a technologických celků.
          </p>
        </div>

        {/* Trafostanice */}
        <div className="border p-6 rounded-2xl">
          <h3 className="text-xl font-semibold">Trafostanice</h3>
          <p className="mt-2 text-slate-600">
            Dodávka a montáž trafostanic 22/0,4 kV.
          </p>
        </div>

      </section>

      {/* KONTAKT + FORM */}
      <section id="kontakt" className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10">

          {/* Info */}
          <div>
            <h2 className="text-3xl font-bold">Kontakt</h2>

            <p className="mt-4">Ing. Bc. Jiří Pečený</p>
            <p className="mt-2">📞 +420 720 298 279</p>
            <p>📧 info@jzelektro.cz</p>
            <p className="text-slate-400 mt-2">Dubno 91, 261 01</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              placeholder="Jméno"
              className="w-full p-3 rounded bg-slate-800"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <input
              placeholder="Telefon"
              className="w-full p-3 rounded bg-slate-800"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />

            <input
              placeholder="E-mail"
              className="w-full p-3 rounded bg-slate-800"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <textarea
              placeholder="Zpráva"
              className="w-full p-3 rounded bg-slate-800"
              rows={4}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />

            <button className="bg-amber-500 px-6 py-3 rounded font-semibold text-black">
              Odeslat poptávku
            </button>

          </form>
        </div>
      </section>

      {/* WHATSAPP */}
      <a
        href="https://wa.me/420720298279"
        className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full text-white"
      >
        💬
      </a>

    </div>
  );
}