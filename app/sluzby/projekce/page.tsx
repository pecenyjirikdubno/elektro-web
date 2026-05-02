import ServiceDetail from "../ServiceDetail";

export default function Page() {
  return (
    <ServiceDetail
      title="Projekce elektro"
      subtitle="Projektová dokumentace elektroinstalací, rozvodů VN/NN a technická řešení."
      image="/images/projekce.png"
      paragraphs={[
        "Zajišťujeme projektovou dokumentaci elektroinstalací pro nové i rekonstruované objekty.",
        "Navrhujeme silnoproudé rozvody, rozvaděče, kabelové trasy, osvětlení, uzemnění a související technická řešení.",
        "Řešení připravujeme s důrazem na bezpečnost, provozní spolehlivost a následnou realizaci.",
      ]}
    />
  );
}