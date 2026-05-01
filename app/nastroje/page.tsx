"use client";

import React from "react";
import kabely from "@/data/kabely.json";

type Phase = "1f" | "3f";
type Material = "Cu" | "Al";

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

  // ================= FILTER =================

  const cableTypes = ["Vše", ...Array.from(new Set(kabely.map((k) => k.type)))];

  const filteredKabely = kabely.filter((k) => {
    const query = search.toLowerCase();

    const matchesSearch =
      k.name.toLowerCase().includes(query) ||
      k.type.toLowerCase().includes(query) ||
      k.use.toLowerCase().includes(query) ||
      k.replacement.toLowerCase().includes(query);

    const matchesType = activeType === "Vše" || k.type === activeType;

    return matchesSearch && matchesType;
  });

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* HEADER */}
      <header className="border-b border-amber-500/20 bg-slate-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="/" className="flex items-center gap-3">
            <img src="/logo.svg" className="h-11 w-11 bg-white rounded-xl p-1" />
            <div>
              <div className="font-bold">JZ ELEKTRO</div>
              <div className="text-xs text-slate-400">Elektro nástroje</div>
            </div>
          </a>

          <a href="/#kontakt" className="bg-amber-400 px-5 py-2 rounded-xl text-black font-bold">
            Konzultace
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold">
          Elektro výpočty a nástroje
        </h1>
        <p className="mt-4 text-slate-400 max-w-xl">
          Výpočty proudu, úbytku napětí a srovnávač kabelů pro rychlou orientaci.
        </p>
      </section>

      {/* KALKULAČKA */}
      <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-16 lg:grid-cols-[1fr_0.85fr]">

        {/* INPUT */}
        <div className="bg-slate-900 p-6 rounded-3xl">
          <h2 className="text-xl font-bold">Vstupní údaje</h2>

          <div className="mt-6 grid gap-4">
            <input value={powerKw} onChange={(e) => setPowerKw(e.target.value)} placeholder="Výkon kW" className="p-3 rounded-xl bg-slate-950"/>
            <input value={voltage} onChange={(e) => setVoltage(e.target.value)} placeholder="Napětí V" className="p-3 rounded-xl bg-slate-950"/>
            <input value={cosPhi} onChange={(e) => setCosPhi(e.target.value)} placeholder="cos φ" className="p-3 rounded-xl bg-slate-950"/>
            <input value={efficiency} onChange={(e) => setEfficiency(e.target.value)} placeholder="Účinnost" className="p-3 rounded-xl bg-slate-950"/>
            <input value={lengthM} onChange={(e) => setLengthM(e.target.value)} placeholder="Délka m" className="p-3 rounded-xl bg-slate-950"/>
            <input value={crossSection} onChange={(e) => setCrossSection(e.target.value)} placeholder="Průřez mm2" className="p-3 rounded-xl bg-slate-950"/>
          </div>
        </div>

        {/* OUTPUT */}
        <div className="bg-slate-900 p-6 rounded-3xl">
          <h2 className="text-xl font-bold">Výsledek</h2>

          {isValid && (
            <div className="mt-6 space-y-4">
              <div>Proud: <b>{current.toFixed(1)} A</b></div>
              <div>Jistič: <b>{recommendedBreaker} A</b></div>
              <div>
                Úbytek: <b>{voltageDrop.toFixed(2)} V</b> ({voltageDropPercent.toFixed(2)} %)
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ================= KABELY ================= */}
      <section className="max-w-7xl mx-auto px-6 pb-24">

        <h2 className="text-3xl font-bold">Srovnávač kabelů</h2>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Hledat kabel..."
          className="mt-4 w-full p-3 rounded-xl bg-slate-900"
        />

        {/* FILTER */}
        <div className="mt-4 flex gap-2 flex-wrap">
          {cableTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-4 py-2 rounded-xl ${
                activeType === type ? "bg-amber-400 text-black" : "bg-slate-800"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {filteredKabely.map((k) => (
            <div key={k.name} className="bg-slate-900 p-5 rounded-2xl">

              {k.image && (
                <img src={k.image} className="h-20 mx-auto mb-3"/>
              )}

              <div className="font-bold text-lg">{k.name}</div>
              <div className="text-sm text-slate-400">{k.type}</div>

              <div className="mt-2 text-sm">{k.use}</div>

              <div className="mt-3 text-xs text-slate-400">
                {k.voltage} • {k.material}
              </div>

              <div className="mt-2 text-xs text-amber-300">
                {k.replacement}
              </div>

            </div>
          ))}
        </div>

        {filteredKabely.length === 0 && (
          <p className="mt-6 text-slate-500">
            Nic nenalezeno
          </p>
        )}

      </section>

    </main>
  );
}