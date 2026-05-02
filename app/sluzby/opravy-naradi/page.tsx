import ServiceDetail from "../ServiceDetail";

export default function Page() {
  return (
    <ServiceDetail
      title="Opravy el. nářadí"
      subtitle="Servis, diagnostika a opravy elektrického nářadí pro řemeslníky, firmy i provozy."
      image="/images/naradi.png"
      paragraphs={[
        "Provádíme servis, diagnostiku a opravy elektrického nářadí.",
        "Služba je vhodná pro řemeslníky, firmy, dílny i provozy, které potřebují rychle vrátit nářadí zpět do provozu.",
        "Zajišťujeme základní diagnostiku závad, opravy, výměnu vadných částí a posouzení ekonomické vhodnosti opravy.",
      ]}
    />
  );
}