import ServiceDetail from "../ServiceDetail";

export default function Page() {
  return (
    <ServiceDetail
      title="Revize VN"
      subtitle="Revize a kontroly zařízení vysokého napětí včetně měření a diagnostiky."
      image="/images/revize.png"
      paragraphs={[
        "Zajišťujeme revize a kontroly zařízení vysokého napětí.",
        "Služba je vhodná pro trafostanice, průmyslové areály a provozy s technologií VN.",
        "Součástí je kontrola technického stavu, měření a posouzení provozní bezpečnosti zařízení.",
      ]}
    />
  );
}