import ServiceDetail from "../ServiceDetail";

export default function Page() {
  return (
    <ServiceDetail
      title="Trafostanice"
      subtitle="Dodávka, montáž a servis trafostanic 22/0,4 kV včetně uvedení do provozu."
      image="/images/trafostanice.png"
      paragraphs={[
        "Zajišťujeme dodávku, montáž a servis trafostanic 22/0,4 kV.",
        "Realizujeme kioskové i stožárové trafostanice, kabelové napojení a související silnoproudé rozvody.",
        "Trafostanice řešíme od technického návrhu až po uvedení zařízení do provozu.",
      ]}
    />
  );
}