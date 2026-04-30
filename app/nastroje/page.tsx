"use client";

import React from "react";

type Phase = "1f" | "3f";
type Material = "Cu" | "Al";

export default function NastrojePage() {
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
  const recommendedBreaker = breakers.find((b) => b >= current) || breakers[breakers.length - 1];

  const isValid =
    Number.isFinite(current) &&
    current > 0 &&
    Number.isFinite(voltageDrop) &&
    voltageDrop >= 0;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-amber-500/20 bg-slate-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="/" className="flex items-center gap-3">
            <img src="/logo.svg" alt="JZ ELEKTRO" className="h-11 w-11 rounded-2xl bg-white p-1" />
            <div>
              <div className="text-lg font-bold">JZ ELEKTRO</div>
              <div className="text-xs uppercase tracking-[0.25em] text-slate-400">
                Elektro nástroje
              </div>
            </div>
          </a>

          <a
            href="/#kontakt"
            className="rounded-2xl bg-amber-400 px-5 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-300"
          >
            Konzultace
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.20),transparent_30%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-16">
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
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-[1fr_0.85fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Vstupní údaje</h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm text-slate-400">Soustava</span>
              <select
                value={phase}
                onChange={(e) => setPhase(e.target.value as Phase)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              >
                <option value="3f">3f / 400 V</option>
                <option value="1f">1f / 230 V</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-slate-400">Výkon stroje [kW]</span>
              <input
                value={powerKw}
                onChange={(e) => setPowerKw(e.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-slate-400">Napětí [V]</span>
              <input
                value={voltage}
                onChange={(e) => setVoltage(e.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-slate-400">cos φ</span>
              <input
                value={cosPhi}
                onChange={(e) => setCosPhi(e.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-slate-400">Účinnost η</span>
              <input
                value={efficiency}
                onChange={(e) => setEfficiency(e.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-slate-400">Materiál vodiče</span>
              <select
                value={material}
                onChange={(e) => setMaterial(e.target.value as Material)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              >
                <option value="Cu">Cu</option>
                <option value="Al">Al</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-slate-400">Délka vedení [m]</span>
              <input
                value={lengthM}
                onChange={(e) => setLengthM(e.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-slate-400">Průřez vodiče [mm²]</span>
              <input
                value={crossSection}
                onChange={(e) => setCrossSection(e.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              />
            </label>
          </div>
        </div>

        <div className="rounded-3xl border border-amber-400/20 bg-slate-900 p-6 shadow-2xl">
          <h2 className="text-2xl font-bold">Výsledek</h2>

          {isValid ? (
            <div className="mt-6 space-y-5">
              <div className="rounded-2xl bg-slate-950 p-5">
                <div className="text-sm text-slate-400">Orientační proud</div>
                <div className="mt-1 text-4xl font-bold text-amber-300">
                  {current.toFixed(1)} A
                </div>
              </div>

              <div className="rounded-2xl bg-slate-950 p-5">
                <div className="text-sm text-slate-400">Doporučené jištění</div>
                <div className="mt-1 text-4xl font-bold text-amber-300">
                  {recommendedBreaker} A
                </div>
              </div>

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
    </main>
  );
}