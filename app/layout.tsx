import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Création site web Maroc | EngiGrowth",
  description:
    "Création de sites internet professionnels au Maroc : site vitrine, e-commerce, landing page et refonte pour transformer vos visiteurs en clients.",
  keywords: [
    "création site internet Maroc",
    "création site web Maroc",
    "agence web Maroc",
    "création site vitrine",
    "création site e-commerce",
    "refonte site internet",
  ],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "Création site web Maroc | EngiGrowth",
    description:
      "Un site web professionnel, rapide et pensé pour convertir vos visiteurs en clients.",
    type: "website",
    locale: "fr_MA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
