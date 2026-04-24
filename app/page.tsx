"use client";

export default function Home() {
  return (
    <main className="bg-slate-950 text-white">

      {/* HERO */}
      <section className="py-20 text-center">
        <img
          src="/logo.png"
          alt="JZ Elektro"
          className="mx-auto mb-6 h-20"
        />

        <h1 className="text-4xl md:text-5xl font-bold">
          Elektroinstalace & Projekce
        </h1>

        <p className="mt-4 text-slate-400 max-w-xl mx-auto">
          Profesionální elektromontáže, projekce a trafostanice VN/NN.
        </p>

        <a
          href="#kontakt"
          className="mt-6 inline-block rounded-xl bg-amber-500 px-6 py-3 font-semibold text-black hover:bg-amber-400"
        >
          Nezávazná poptávka
        </a>
      </section>

      {/* SLUŽBY */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">

        {/* Projekce */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <img
            src="/images/projekce.png"
            className="rounded-xl mb-4"
            alt="Projekce elektro"
          />
          <h3 className="text-xl font-semibold">Projekce elektro</h3>
          <p className="text-slate-400 mt-2">
            Projektová dokumentace elektroinstalací, VN/NN řešení a technické návrhy.
          </p>
        </div>

        {/* Montáže */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <img
            src="/images/montaz.png"
            className="rounded-xl mb-4"
            alt="Elektromontáže"
          />
          <h3 className="text-xl font-semibold">Elektromontáže</h3>
          <p className="text-slate-400 mt-2">
            Realizace elektroinstalací, rozvaděčů a silnoproudých rozvodů.
          </p>
        </div>

        {/* Trafostanice */}
        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <img
            src="/images/trafostanice.png"
            className="rounded-xl mb-4"
            alt="Trafostanice"
          />
          <h3 className="text-xl font-semibold">Trafostanice</h3>
          <p className="text-slate-400 mt-2">
            Dodávka, montáž a servis trafostanic 22/0,4 kV.
          </p>
        </div>

      </section>

      {/* REFERENCE */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8">Reference</h2>

          <div className="grid md:grid-cols-2 gap-6 text-slate-300">

            <div>
              <strong>Svatý Kříž u Chebu</strong><br />
              Výstavba kioskové trafostanice 1250 kW
            </div>

            <div>
              <strong>MŠ Kovářská Praha</strong><br />
              Rekonstrukce elektroinstalace a osvětlení
            </div>

            <div>
              <strong>KB Brno</strong><br />
              Trafostanice + silnoproudé rozvody
            </div>

            <div>
              <strong>Třebestovice</strong><br />
              Stožárová trafostanice 100 kW
            </div>

            <div>
              <strong>Pekárna Luka Praha</strong><br />
              Rozvody NN
            </div>

          </div>
        </div>
      </section>

      {/* WHATSAPP */}
      <a
        href="https://wa.me/420720298279"
        target="_blank"
        className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full shadow-lg hover:bg-green-400"
      >
        💬
      </a>

      {/* KONTAKT */}
      <section id="kontakt" className="py-20 text-center">
        <h2 className="text-3xl font-bold">Kontakt</h2>

        <p className="mt-4 text-slate-400">
          Ing. Bc. Jiří Pečený
        </p>

        <p className="mt-2">
          <a href="tel:+420720298279">+420 720 298 279</a>
        </p>

        <p>
          <a href="mailto:info@jzelektro.cz">
            info@jzelektro.cz
          </a>
        </p>

        <p className="text-slate-500 mt-2">
          Dubno 91, 261 01
        </p>
      </section>

    </main>
  );
}