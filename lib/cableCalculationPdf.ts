import { jsPDF } from "jspdf";

export interface CableCalculationPdfData {
  phase: string;
  powerKw: string;
  voltage: string;
  cosPhi: string;
  efficiency: string;
  material: string;
  lengthM: string;
  crossSection: string;
  current: number;
  recommendedBreaker: number;
  recommendedSection: string;
  voltageDrop: number;
  voltageDropPercent: number;
  selectedSectionOk: boolean;
  voltageDropOk: boolean;
  breakerOk: boolean;
}

async function loadFont(path: string): Promise<string> {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Font nelze načíst: ${path}`);
  }

  const buffer = await response.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const chunkSize = 0x8000;
  let binary = "";

  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }

  return btoa(binary);
}

export async function exportCableCalculationPdf(
  data: CableCalculationPdfData
): Promise<void> {
  const [regularFont, boldFont] = await Promise.all([
    loadFont("/fonts/pdf/DejaVuSans.ttf"),
    loadFont("/fonts/pdf/DejaVuSans-Bold.ttf"),
  ]);

  const pdf = new jsPDF("p", "mm", "a4");

  pdf.addFileToVFS("DejaVuSans.ttf", regularFont);
  pdf.addFont("DejaVuSans.ttf", "DejaVu", "normal");

  pdf.addFileToVFS("DejaVuSans-Bold.ttf", boldFont);
  pdf.addFont("DejaVuSans-Bold.ttf", "DejaVu", "bold");

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 18;
  const contentWidth = pageWidth - 2 * margin;
  let y = 20;

  const newPageIfNeeded = (height: number) => {
    if (y + height > pageHeight - 20) {
      pdf.addPage();
      y = 20;
    }
  };

  const line = (label: string, value: string) => {
    newPageIfNeeded(9);

    pdf.setFont("DejaVu", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(65, 75, 90);
    pdf.text(label, margin, y);

    pdf.setFont("DejaVu", "bold");
    pdf.setTextColor(15, 23, 42);
    pdf.text(value, pageWidth - margin, y, { align: "right" });

    y += 8;
  };

  const heading = (text: string) => {
    newPageIfNeeded(16);

    y += 4;
    pdf.setFont("DejaVu", "bold");
    pdf.setFontSize(12);
    pdf.setTextColor(20, 60, 110);
    pdf.text(text, margin, y);

    y += 9;
  };

  const paragraph = (text: string) => {
    pdf.setFont("DejaVu", "normal");
    pdf.setFontSize(8.5);
    pdf.setTextColor(55, 65, 80);

    const lines = pdf.splitTextToSize(text, contentWidth);

    for (const textLine of lines) {
      newPageIfNeeded(5);
      pdf.text(textLine, margin, y);
      y += 5;
    }

    y += 3;
  };

  pdf.setFillColor(15, 23, 42);
  pdf.rect(0, 0, pageWidth, 34, "F");

  pdf.setFont("DejaVu", "bold");
  pdf.setFontSize(17);
  pdf.setTextColor(255, 255, 255);
  pdf.text("JZ ELEKTRO", margin, 16);

  pdf.setFont("DejaVu", "normal");
  pdf.setFontSize(9);
  pdf.text("Orientační výpočet elektrického vedení", margin, 24);

  y = 43;

  heading("Vstupní údaje");

  line("Soustava", data.phase);
  line("Výkon", `${data.powerKw} kW`);
  line("Napětí", `${data.voltage} V`);
  line("Účiník", data.cosPhi);
  line("Účinnost", data.efficiency);
  line("Materiál vodiče", data.material);
  line("Délka vedení", `${data.lengthM} m`);
  line("Průřez vodiče", `${data.crossSection} mm²`);

  heading("Výsledky výpočtu");

  line("Orientační proud", `${data.current.toFixed(1)} A`);
  line("Doporučené jištění", `${data.recommendedBreaker} A`);
  line("Doporučený průřez", data.recommendedSection);
  line("Úbytek napětí", `${data.voltageDrop.toFixed(2)} V`);
  line("Relativní úbytek napětí", `${data.voltageDropPercent.toFixed(2)} %`);

  heading("Orientační vyhodnocení");

  line(
    "Zadaný průřez",
    data.selectedSectionOk ? "Vyhovuje" : "Nutno ověřit"
  );

  line(
    "Úbytek napětí",
    data.voltageDropOk ? "Orientačně vyhovuje" : "Nutno upravit"
  );

  line(
    "Jištění a průřez",
    data.breakerOk ? "Orientačně vyhovuje" : "Nutno ověřit"
  );

  heading("Technické upozornění");

  paragraph(
    "Výpočet je pouze orientační. Pro konečný návrh elektrického " +
    "vedení je nutné ověřit způsob uložení, okolní teplotu, " +
    "seskupení kabelů, proudovou zatížitelnost, impedanci " +
    "poruchové smyčky, ochranu před úrazem elektrickým proudem, " +
    "selektivitu jištění a příslušné normové požadavky."
  );

  const totalPages = pdf.getNumberOfPages();

  for (let page = 1; page <= totalPages; page++) {
    pdf.setPage(page);
    pdf.setFont("DejaVu", "normal");
    pdf.setFontSize(8);
    pdf.setTextColor(110, 120, 130);

    pdf.text(
      `JZ ELEKTRO | Strana ${page} / ${totalPages}`,
      margin,
      pageHeight - 12
    );
  }

  pdf.save("jz-elektro-vypocet-kabelu.pdf");
}
