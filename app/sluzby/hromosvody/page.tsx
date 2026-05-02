import ServiceDetail from "../ServiceDetail";

export default function Page() {
  return (
    <ServiceDetail
      title="Hromosvody"
      subtitle="Montáž hromosvodů, uzemnění a ochrany proti přepětí."
      image="/images/hromosvod.png"
      paragraphs={[
        "Provádíme montáž hromosvodů, uzemnění a souvisejících ochranných prvků.",
        "Správně navržený hromosvod chrání objekt, technologie i osoby před účinky blesku a přepětí.",
        "Realizujeme řešení pro rodinné domy, průmyslové objekty, veřejné budovy i technologické celky.",
      ]}
    />
  );
}