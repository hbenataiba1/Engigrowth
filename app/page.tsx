import type { Metadata } from "next";

import SitePage from "@/components/site-page";
import { dictionaries } from "@/lib/i18n";

const t = dictionaries.fr;

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  keywords: t.meta.keywords,
  alternates: { canonical: "/", languages: { fr: "/", en: "/en" } },
  openGraph: {
    title: t.meta.title,
    description: t.meta.ogDescription,
    type: "website",
    locale: t.ogLocale,
    alternateLocale: dictionaries.en.ogLocale,
  },
};

export default function Page() {
  return <SitePage locale="fr" />;
}
