import type { MetadataRoute } from "next";
import { services } from "@/data/sluzby";
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.jzelektro.cz";
  const priority = ["elektroinstalace-rd","prumyslove-elektromontaze","hromosvody","verejne-osvetleni"];
  const ids = [...priority, ...services.map(s=>s.id)].filter((id,i,a)=>a.indexOf(id)===i);
  return [{url:`${baseUrl}/`,lastModified:new Date(),changeFrequency:"weekly",priority:1}, ...ids.map(id=>({url:`${baseUrl}/sluzby/${id}`,lastModified:new Date(),changeFrequency:"monthly" as const,priority:priority.includes(id)?0.9:0.7}))];
}
