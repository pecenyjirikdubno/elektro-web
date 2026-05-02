import ServiceDetail from "../ServiceDetail";

export default function Page() {
  return (
    <ServiceDetail
      title="Elektromontáže VN/NN"
      subtitle="Realizace silnoproudých rozvodů, kabelových tras, rozvaděčů a technologických celků."
      image="/images/montaze.png"
      paragraphs={[
        "Provádíme elektromontáže VN/NN pro firmy, průmyslové objekty, veřejné budovy i technickou infrastrukturu.",
        "Realizujeme kabelové trasy, silnoproudé rozvody, rozvaděče, napojení technologií a osvětlení.",
        "Práce provádíme s důrazem na bezpečnost, kvalitu a dlouhodobou spolehlivost.",
      ]}
    />
  );
}