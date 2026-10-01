import type { Metadata } from "next";
import "./globals.css";
import { LenisProvider } from "@/components/lenis-provider";

export const metadata: Metadata = {
  title: "Création site web professionnel | EngiGrowth",
  description:
    "Création de sites internet professionnels : site vitrine, e-commerce, landing page et refonte pour transformer vos visiteurs en clients.",
  keywords: [
    "création site internet",
    "création site web",
    "agence web",
    "création site vitrine",
    "création site e-commerce",
    "refonte site internet",
  ],
  openGraph: {
    title: "Création site web professionnel | EngiGrowth",
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
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="antialiased">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
