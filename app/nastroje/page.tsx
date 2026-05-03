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

type SectionCapacity = {
  section: number;
  capacity: number;
};

const kabely = kabelyData as Cable[];

const capacityTable: Record<Material, SectionCapacity[]> = {
  Cu: [
    { section: 1.5, capacity: 13 },
    { section: 2.5, capacity: 20 },
    { section: 4, capacity: 26 },
    { section: 6, capacity: 34 },
    { section: 10, capacity: 46 },
    { section: 16, capacity: 61 },
    { section: 25, capacity: 80 },
    { section: 35, capacity: 99 },
    { section: 50, capacity: 119 },
    { section: 70, capacity: 151 },
    { section: 95, capacity: 182 },
    { section: 120, capacity: 210 },
    { section: 150, capacity: 240 },
    { section: 185, capacity: 273 },
    { section: 240, capacity: 321 },
  ],
  Al: [
    { section: 16, capacity: 48 },
    { section: 25, capacity: 64 },
    { section: 35, capacity: 78 },
    { section: 50, capacity: 95 },
    { section: 70, capacity: 121 },
    { section: 95, capacity: 146 },
    { section: 120, capacity: 170 },
    { section: 150, capacity: 194 },
    { section: 185, capacity: 220 },
    { section: 240, capacity: 260 },
  ],
};

export default function NastrojePage() {
  const [search, setSearch] = React.useState("");
  const [activeType, setActiveType] = React.useState("Vše");
  const [isExporting, setIsExporting] = React.useState(false);
  const exportRef = React.useRef<HTMLDivElement>(null);

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

  const selectedCapacity = capacityTable[material].find(
    (item) => item.section === Number(crossSection)
  );
  const recommendedSection = capacityTable[material].find(
    (item) => item.capacity >= current * 1.25
  );
  const selectedSectionOk = selectedCapacity ? selectedCapacity.capacity >= current : false;
  const voltageDropOk = voltageDropPercent <= 3;
  const breakerOk = selectedCapacity ? recommendedBreaker <= selectedCapacity.capacity : false;

  const overallStatus =
    isValid && selectedSectionOk && voltageDropOk && breakerOk
      ? "ok"
      : isValid
      ? "warning"
      : "error";

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

  async function handleExportPdf() {
    if (!exportRef.current || !isValid) return;

    try {
      setIsExporting(true);
      const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
        import("jspdf"),
        import("html2canvas"),
      ]);

      const canvas = await html2canvas(exportRef.current, {
        scale: 2,
        backgroundColor: "#020617",
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth - 20;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 10;

      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight - 20;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight + 10;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight - 20;
      }

      pdf.save("jz-elektro-vypocet-kabelu.pdf");
    } finally {
      setIsExporting(false);
    }
  }

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
              info="Třífázová soustava se typicky používá pro motory, stroje a větší odběry."
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

            <InputRow
              label="Výkon"
              unit="kW"
              description="Jmenovitý výkon zařízení nebo stroje."
              info="Zadejte výkon ze štítku zařízení. Pokud máte výkon ve W, vydělte hodnotu číslem 1000."
            >
              <input
                value={powerKw}
                onChange={(e) => setPowerKw(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              />
            </InputRow>

            <InputRow
              label="Napětí"
              unit="V"
              description="Napětí elektrické sítě."
              info="Pro běžnou třífázovou síť zadejte 400 V, pro jednofázovou 230 V."
            >
              <input
                value={voltage}
                onChange={(e) => setVoltage(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              />
            </InputRow>

            <InputRow
              label="cos φ"
              unit="—"
              description="Účiník zařízení. U motorů bývá často 0,8–0,9."
              info="Nižší účiník znamená vyšší proud při stejném výkonu. Pokud hodnotu neznáte, ponechte orientačně 0,85."
            >
              <input
                value={cosPhi}
                onChange={(e) => setCosPhi(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              />
            </InputRow>

            <InputRow
              label="Účinnost"
              unit="η"
              description="Účinnost zařízení. Hodnota 0,95 odpovídá 95 %."
              info="U menších motorů může být účinnost nižší, u moderních motorů vyšší."
            >
              <input
                value={efficiency}
                onChange={(e) => setEfficiency(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              />
            </InputRow>

            <InputRow
              label="Materiál vodiče"
              unit="—"
              description="Materiál jádra kabelu – měď nebo hliník."
              info="Měď má nižší odpor než hliník, proto má při stejném průřezu obvykle lepší vlastnosti."
            >
              <select
                value={material}
                onChange={(e) => setMaterial(e.target.value as Material)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              >
                <option value="Cu">Cu</option>
                <option value="Al">Al</option>
              </select>
            </InputRow>

            <InputRow
              label="Délka vedení"
              unit="m"
              description="Délka kabelového vedení od zdroje ke spotřebiči."
              info="Delší vedení zvyšuje úbytek napětí. Zadává se fyzická délka trasy kabelu."
            >
              <input
                value={lengthM}
                onChange={(e) => setLengthM(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              />
            </InputRow>

            <InputRow
              label="Průřez vodiče"
              unit="mm²"
              description="Uvažovaný průřez žíly kabelu."
              info="Výsledky porovnávají zadaný průřez s orientační proudovou zatížitelností."
            >
              <input
                value={crossSection}
                onChange={(e) => setCrossSection(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-amber-400"
              />
            </InputRow>
          </div>
        </div>

        <div
          ref={exportRef}
          className="rounded-3xl border border-amber-400/20 bg-slate-900 p-6 shadow-2xl"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Výsledek</h2>
              <p className="mt-1 text-sm text-slate-400">JZ ELEKTRO – orientační výpočet</p>
            </div>
            <StatusBadge status={overallStatus} />
          </div>

          {isValid ? (
            <div className="mt-6 space-y-5">
              <ResultBox label="Orientační proud" value={`${current.toFixed(1)} A`} />
              <ResultBox label="Doporučené jištění" value={`${recommendedBreaker} A`} />
              <ResultBox
                label="Doporučený průřez"
                value={
                  recommendedSection
                    ? `${recommendedSection.section} mm² ${material}`
                    : `nad ${capacityTable[material][capacityTable[material].length - 1].section} mm² ${material}`
                }
              />

              <CheckBox
                title="Zadaný průřez"
                ok={selectedSectionOk}
                text={
                  selectedCapacity
                    ? selectedSectionOk
                      ? `Zadaný průřez ${crossSection} mm² orientačně proudově vyhovuje.`
                      : `Zadaný průřez ${crossSection} mm² může být proudově nedostatečný.`
                    : `Pro průřez ${crossSection} mm² nemáme v orientační tabulce hodnotu.`
                }
              />

              <div className="rounded-2xl bg-slate-950 p-5">
                <div className="text-sm text-slate-400">Úbytek napětí</div>
                <div className="mt-1 text-3xl font-bold">
                  {voltageDrop.toFixed(2)} V
                </div>
                <div className={voltageDropOk ? "mt-1 text-green-400" : "mt-1 text-red-400"}>
                  {voltageDropPercent.toFixed(2)} %
                  {voltageDropOk
                    ? " – orientačně v pořádku"
                    : " – doporučuji zvětšit průřez nebo zkrátit trasu"}
                </div>
              </div>

              <CheckBox
                title="Jištění vs. průřez"
                ok={breakerOk}
                text={
                  breakerOk
                    ? "Doporučené jištění je orientačně v rozsahu zadaného průřezu."
                    : "Doporučuji ověřit jištění, způsob uložení a proudovou zatížitelnost kabelu."
                }
              />

              <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-5">
                <h3 className="font-bold text-amber-300">Doporučení</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Výsledek berte jako orientační. Pro finální návrh je potřeba ověřit způsob uložení,
                  okolní teplotu, seskupení kabelů, impedanci poruchové smyčky, selektivitu a platné normové požadavky.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href="/#kontakt"
                  className="block rounded-2xl bg-amber-400 px-6 py-3 text-center font-semibold text-slate-950 hover:bg-amber-300"
                >
                  Nechte návrh zkontrolovat odborníkem
                </a>
                <a
                  href="/sluzby/elektromontaze"
                  className="block rounded-2xl border border-slate-700 px-6 py-3 text-center font-semibold text-white hover:border-amber-400"
                >
                  Potřebuji realizaci elektromontáže
                </a>
              </div>

              <button
                type="button"
                onClick={handleExportPdf}
                disabled={isExporting}
                className="w-full rounded-2xl border border-amber-400/50 px-6 py-3 font-semibold text-amber-300 hover:bg-amber-400/10 disabled:opacity-60"
              >
                {isExporting ? "Připravuji PDF..." : "Export do PDF"}
              </button>
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
  info,
  children,
}: {
  label: string;
  unit: string;
  description: string;
  info: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-3 border-b border-slate-800 p-4 last:border-b-0 md:grid-cols-[150px_70px_1fr_1.2fr] md:items-center">
      <div className="flex items-center gap-2 font-semibold text-white">
        {label}
        <span className="group relative inline-flex h-5 w-5 cursor-help items-center justify-center rounded-full border border-slate-600 text-xs text-slate-400">
          i
          <span className="pointer-events-none absolute left-1/2 top-7 z-20 hidden w-64 -translate-x-1/2 rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs font-normal leading-5 text-slate-300 shadow-2xl group-hover:block">
            {info}
          </span>
        </span>
      </div>
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

function CheckBox({ title, ok, text }: { title: string; ok: boolean; text: string }) {
  return (
    <div className="rounded-2xl bg-slate-950 p-5">
      <div className="flex items-center gap-2">
        <span className={ok ? "text-green-400" : "text-red-400"}>
          {ok ? "●" : "●"}
        </span>
        <div className="font-semibold">{title}</div>
      </div>
      <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: "ok" | "warning" | "error" }) {
  if (status === "ok") {
    return <span className="rounded-full bg-green-500/15 px-4 py-2 text-sm font-semibold text-green-400">Orientačně OK</span>;
  }

  if (status === "warning") {
    return <span className="rounded-full bg-amber-400/15 px-4 py-2 text-sm font-semibold text-amber-300">Nutné ověřit</span>;
  }

  return <span className="rounded-full bg-red-500/15 px-4 py-2 text-sm font-semibold text-red-400">Chyba vstupu</span>;
}
