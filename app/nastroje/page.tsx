"use client";

import React from "react";
import kabelyData from "@/data/kabely.json";

type Phase = "1f" | "3f";
type Material = "Cu" | "Al";

type Cable = {
  name: string;
  type: string;
  use: string;
  material: string;
  voltage: string;
  image?: string;
  replacement?: string;
};

const kabely = kabelyData as Cable[];

export default function NastrojePage() {
  const [search, setSearch] = React.useState("");
  const [activeType, setActiveType] = React.useState("Vše");

  const [phase, setPhase] = React.useState<Phase>("3f");
  const [powerKw, setPowerKw] = React.useState("15");
  const [voltage, setVoltage] = React.useState("400");
  const [cosPhi, setCosPhi] = React.useState("0.85");
  const [efficiency, setEfficiency] = React.useState("0.95");
  const [material, setMaterial] = React.useState<Material>("Cu");
  const [lengthM, setLengthM] = React.useState("30");
  const [crossSection, setCrossSection] = React.useState("10");

  const p = Number(powerKw) * 1000;
  const u = Number(voltage);
  const cos = Number(cosPhi);
  const eta = Number(efficiency);
  const length = Number(lengthM);
  const s = Number(crossSection);

  const current =
    phase === "3f"
      ? p / (Math.sqrt(3) * u * cos * eta)
      : p / (u * cos * eta);

  const rho = material === "Cu" ? 0.0175 : 0.0282;

  const voltageDrop =
    phase === "3f"
      ? (Math.sqrt(3) * current * rho * length) / s
      : (2 * current * rho * length) / s;

  const voltageDropPercent = (voltageDrop / u) * 100;

  const breakers = [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250];
  const recommendedBreaker =
    breakers.find((b) => b >= current) || breakers[breakers.length - 1];

  const isValid =
    Number.isFinite(current) &&
    current > 0 &&
    Number.isFinite(voltageDrop) &&
    voltageDrop >= 0;

  const cableTypes = ["Vše", ...Array.from(new Set(kabely.map((k) => k.type)))];

  const filteredKabely = kabely.filter((k) => {
    const query = search.toLowerCase();

    const matchesSearch =
      k.name.toLowerCase().includes(query) ||
      k.type.toLowerCase().includes(query) ||
      k.use.toLowerCase().includes(query) ||
      k.material.toLowerCase().includes(query) ||
      k.voltage.toLowerCase().includes(query) ||
      (k.replacement || "").toLowerCase().includes(query);

    const matchesType = activeType === "Vše" || k.type === activeType;

    return matchesSearch && matchesType;
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-amber-500/20 bg-slate-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="/" className="flex items-center gap-3">
            <img
              src="/logo.svg"
              alt="JZ ELEKTRO"
              className="h-11 w-11 rounded-xl bg-white p-1"
            />
            <div>
              <div className="font-bold">JZ ELEKTRO</div>
              <div className="text-xs text-slate-400">Elektro nástroje</div>
            </div>
          </a>

          <a
            href="/#kontakt"
            className="rounded-xl bg-amber-400 px-5 py-2 font-bold text-black hover:bg-amber-300"
          >
            Konzultace
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-3xl">
          <div className="text-sm uppercase tracking-[0.25em] text-amber-300">
            Výpočtové pomůcky
          </div>
          <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
            Elektro nástroje pro orientační návrh
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Spočítejte orientační proud stroje, úbytek napětí vedení a doporučenou
            hodnotu jištění. Výpočet je informativní a nenahrazuje projektovou dokumentaci
            ani revizi elektrického zařízení.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-16 lg:grid-cols-[1fr_0.85fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Výpočet kabelu / výkonu</h2>

          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-800">
            <InputRow
              label="Soustava"
              unit="—"
              description="Volba jednofázové nebo třífázové soustavy."
            >
              <select
                value={phase}
                onChange={(e) => setPhase(e.target.value as Phase)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              >
                <option value="3f">3f / 400 V</option>
                <option value="1f">1f / 230 V</option>
              </select>
            </InputRow>

            <InputRow label="Výkon" unit="kW" description="Jmenovitý výkon zařízení nebo stroje.">
              <input
                value={powerKw}
                onChange={(e) => setPowerKw(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              />
            </InputRow>

            <InputRow label="Napětí" unit="V" description="Napětí elektrické sítě.">
              <input
                value={voltage}
                onChange={(e) => setVoltage(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              />
            </InputRow>

            <InputRow label="cos φ" unit="—" description="Účiník zařízení. U motorů bývá často 0,8–0,9.">
              <input
                value={cosPhi}
                onChange={(e) => setCosPhi(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              />
            </InputRow>

            <InputRow label="Účinnost" unit="η" description="Účinnost zařízení. Hodnota 0,95 odpovídá 95 %.">
              <input
                value={efficiency}
                onChange={(e) => setEfficiency(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              />
            </InputRow>

            <InputRow label="Materiál vodiče" unit="—" description="Materiál jádra kabelu – měď nebo hliník.">
              <select
                value={material}
                onChange={(e) => setMaterial(e.target.value as Material)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              >
                <option value="Cu">Cu</option>
                <option value="Al">Al</option>
              </select>
            </InputRow>

            <InputRow label="Délka vedení" unit="m" description="Délka kabelového vedení od zdroje ke spotřebiči.">
              <input
                value={lengthM}
                onChange={(e) => setLengthM(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              />
            </InputRow>

            <InputRow label="Průřez vodiče" unit="mm²" description="Uvažovaný průřez žíly kabelu.">
              <input
                value={crossSection}
                onChange={(e) => setCrossSection(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              />
            </InputRow>
          </div>
        </div>

        <div className="rounded-3xl border border-amber-400/20 bg-slate-900 p-6 shadow-2xl">
          <h2 className="text-2xl font-bold">Výsledek</h2>

          {isValid ? (
            <div className="mt-6 space-y-5">
              <ResultBox label="Orientační proud" value={`${current.toFixed(1)} A`} />
              <ResultBox label="Doporučené jištění" value={`${recommendedBreaker} A`} />
              <div className="rounded-2xl bg-slate-950 p-5">
                <div className="text-sm text-slate-400">Úbytek napětí</div>
                <div className="mt-1 text-3xl font-bold">
                  {voltageDrop.toFixed(2)} V
                </div>
                <div className={voltageDropPercent <= 3 ? "mt-1 text-green-400" : "mt-1 text-red-400"}>
                  {voltageDropPercent.toFixed(2)} %
                  {voltageDropPercent <= 3
                    ? " – orientačně v pořádku"
                    : " – doporučuji zvětšit průřez"}
                </div>
              </div>

              <a
                href="/#kontakt"
                className="block rounded-2xl bg-amber-400 px-6 py-3 text-center font-semibold text-slate-950 hover:bg-amber-300"
              >
                Chci ověřit návrh odborně
              </a>
            </div>
          ) : (
            <p className="mt-6 text-red-400">
              Zkontrolujte prosím zadané hodnoty.
            </p>
          )}

          <p className="mt-6 text-sm leading-6 text-slate-500">
            Výpočet je orientační. Skutečný návrh musí zohlednit způsob uložení,
            jištění, impedanci poruchové smyčky, dovolené zatížení kabelu, selektivitu,
            normové požadavky a konkrétní podmínky instalace.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
          <div className="mb-6">
            <h2 className="text-3xl font-bold">Srovnávač kabelů</h2>
            <p className="mt-2 text-slate-400">
              Vyhledejte kabel, zobrazte jeho použití a možné náhrady.
            </p>
          </div>

          <input
            type="text"
            placeholder="Zadejte např. CYKY, AYKY, H07RN-F..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
          />

          <div className="mt-5 flex flex-wrap gap-2">
            {cableTypes.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setActiveType(type)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeType === type
                    ? "bg-amber-400 text-slate-950"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {filteredKabely.map((k) => (
              <div
                key={k.name}
                className="group rounded-3xl border border-slate-800 bg-slate-950 p-5 transition hover:-translate-y-1 hover:border-amber-400/40 hover:shadow-2xl"
              >
                {k.image && (
                  <div className="mb-4 flex justify-center">
                    <img
                      src={k.image}
                      alt={k.name}
                      className="h-24 object-contain opacity-90 group-hover:opacity-100"
                    />
                  </div>
                )}

                <div className="text-xl font-bold text-white">{k.name}</div>
                <div className="mt-1 text-sm text-slate-400">{k.type}</div>
                <div className="mt-3 text-sm text-slate-300">{k.use}</div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-800 px-3 py-1 text-xs">
                    {k.voltage}
                  </span>
                  <span className="rounded-full bg-amber-500/90 px-3 py-1 text-xs text-black">
                    {k.material}
                  </span>
                </div>

                {k.replacement && (
                  <div className="mt-4 text-xs text-slate-500">
                    Náhrada: <span className="text-amber-300">{k.replacement}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredKabely.length === 0 && (
            <p className="mt-6 text-sm text-slate-500">
              Nebyl nalezen žádný kabel. Zkuste zadat například CYKY, AYKY nebo H07RN-F.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}

function InputRow({
  label,
  unit,
  description,
  children,
}: {
  label: string;
  unit: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-3 border-b border-slate-800 p-4 last:border-b-0 md:grid-cols-[150px_70px_1fr_1.2fr] md:items-center">
      <div className="font-semibold text-white">{label}</div>
      <div className="font-bold text-amber-300">{unit}</div>
      <div>{children}</div>
      <div className="text-sm leading-6 text-slate-400">{description}</div>
    </div>
  );
}

function ResultBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-950 p-5">
      <div className="text-sm text-slate-400">{label}</div>
      <div className="mt-1 text-4xl font-bold text-amber-300">{value}</div>
    </div>
  );
}