import ServiceDetail from "../ServiceDetail";

export default function Page() {
  return (
    <ServiceDetail
      title="Revize NN"
      subtitle="Výchozí i pravidelné revize elektrických zařízení nízkého napětí."
      image="/images/revize.png"
      paragraphs={[
        "Provádíme výchozí i pravidelné revize elektrických zařízení nízkého napětí.",
        "Revize NN pomáhají zajistit bezpečný provoz elektroinstalace a splnění zákonných požadavků.",
        "Kontrolujeme elektroinstalace, rozvaděče, zásuvkové obvody, osvětlení i strojní zařízení.",
      ]}
    />
  );
}