import { services } from "@/data/sluzby";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ServiceDetailPage({ params }: PageProps) {
  const { id } = await params;
  const service = services.find((item) => item.id === id);

  if (!service) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-20 text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold">Služba nenalezena</h1>
          <a href="/" className="mt-8 inline-block text-amber-300">
            Zpět na hlavní stránku
          </a>
        </div>
      </main>
    );
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
              <div className="text-xs text-slate-400">Detail služby</div>
            </div>
          </a>

          <a
            href="/#kontakt"
            className="rounded-xl bg-amber-400 px-5 py-2 font-bold text-black hover:bg-amber-300"
          >
            Poptávka
          </a>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="overflow-hidden rounded-3xl bg-slate-900">
          <img
            src={service.image}
            alt={service.title}
            className="h-full min-h-[320px] w-full object-cover"
          />
        </div>

        <div>
          <a href="/#sluzby" className="text-sm font-semibold text-amber-300">
            ← Zpět na služby
          </a>

          <h1 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
            {service.title}
          </h1>

          <p className="mt-6 text-xl leading-8 text-slate-300">
            {service.shortText}
          </p>

          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-300">
            {service.content
              .trim()
              .split("\n\n")
              .map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="/#kontakt"
              className="rounded-xl bg-amber-400 px-6 py-3 font-bold text-black hover:bg-amber-300"
            >
              Poptat službu
            </a>

            <a
              href="tel:+420720298279"
              className="rounded-xl border border-slate-700 px-6 py-3 font-bold text-white hover:border-amber-400"
            >
              Zavolat
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export function generateStaticParams() {
  return services.map((service) => ({
    id: service.id,
  }));
}