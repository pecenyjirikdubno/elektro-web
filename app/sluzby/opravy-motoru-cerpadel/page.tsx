import ServiceDetail from "../ServiceDetail";

export default function Page() {
  return (
    <ServiceDetail
      title="Opravy elektromotorů a čerpadel"
      subtitle="Diagnostika, opravy a servis elektromotorů, čerpadel a pohonů."
      image="/images/motor.png"
      paragraphs={[
        "Zajišťujeme diagnostiku, opravy a servis elektromotorů, čerpadel a souvisejících pohonů.",
        "Pomáháme řešit poruchy, problémy se spouštěním, hlučností, přehříváním nebo mechanickým opotřebením.",
        "Cílem je rychlé posouzení závady a návrh vhodného technického řešení.",
      ]}
    />
  );
}