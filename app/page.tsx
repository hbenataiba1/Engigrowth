"use client";

import { type FormEvent, type ReactNode, useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  ChevronRight,
  ExternalLink,
  Gauge,
  LayoutTemplate,
  type LucideIcon,
  MessageCircle,
  MousePointerClick,
  Search,
  Send,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Target,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { submitLead, type LeadPayload } from "@/lib/leads";
import { SITE_CONFIG } from "@/lib/site-config";
import { trackConversion } from "@/lib/tracking";

type FieldErrors = Partial<Record<keyof LeadPayload, string>>;

type IconCard = {
  title: string;
  description: string;
  icon: LucideIcon;
  tag: string;
};

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Réalisations", href: "#realisations" },
  { label: "Méthode", href: "#processus" },
  { label: "Contact", href: "#contact" },
];

const services: IconCard[] = [
  {
    title: "Site vitrine",
    description:
      "Présentez votre activité avec une page claire, crédible et facile à parcourir.",
    icon: LayoutTemplate,
    tag: "Crédibilité",
  },
  {
    title: "E-commerce",
    description:
      "Mettez vos produits en valeur avec un parcours simple du catalogue au contact.",
    icon: ShoppingBag,
    tag: "Vente",
  },
  {
    title: "Landing page",
    description:
      "Transformez le trafic de vos campagnes en demandes de devis plus qualifiées.",
    icon: Target,
    tag: "Conversion",
  },
  {
    title: "Refonte",
    description:
      "Modernisez votre site existant pour mieux refléter la qualité de votre entreprise.",
    icon: Sparkles,
    tag: "Image",
  },
];

const outcomes: IconCard[] = [
  {
    title: "Message plus lisible",
    description:
      "Vos visiteurs comprennent plus vite votre offre, vos avantages et la prochaine action.",
    icon: Search,
    tag: "Clarté",
  },
  {
    title: "Confiance renforcée",
    description:
      "Vos preuves, services et coordonnées deviennent plus visibles et plus rassurants.",
    icon: ShieldCheck,
    tag: "Preuve",
  },
  {
    title: "Parcours fluide",
    description:
      "Chaque section guide naturellement le visiteur vers une demande de contact.",
    icon: MousePointerClick,
    tag: "Contact",
  },
  {
    title: "Base propre",
    description:
      "Le site est pensé pour la rapidité, le mobile et les bases du référencement.",
    icon: Gauge,
    tag: "Technique",
  },
];

const projects = [
  {
    name: "Atlas Conseil",
    industry: "Cabinet de conseil",
    description: "Site vitrine premium orienté prise de rendez-vous B2B.",
    palette: "from-[#e2f7ee] via-[#fff1d8] to-[#ffe6d7]",
  },
  {
    name: "Casa Home",
    industry: "Immobilier",
    description: "Landing page claire pour rassurer et générer des demandes.",
    palette: "from-[#fff8e7] via-[#e7edff] to-[#dff6ee]",
  },
  {
    name: "Marrakech Atelier",
    industry: "Commerce en ligne",
    description: "Parcours e-commerce simple avec une marque bien mise en avant.",
    palette: "from-[#ffe0d2] via-[#fff0bd] to-[#e2f7ee]",
  },
  {
    name: "Nour Santé",
    industry: "Service médical",
    description: "Interface rassurante, rapide sur mobile, pensée pour le contact.",
    palette: "from-[#ddf7ee] via-[#fff7ea] to-[#ffe6d7]",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Parlez-nous de votre projet",
    description:
      "Expliquez-nous votre activité, vos objectifs et vos besoins.",
  },
  {
    number: "02",
    title: "Recevez votre proposition",
    description:
      "Nous définissons la solution, le périmètre et une proposition adaptée.",
  },
  {
    number: "03",
    title: "Nous créons votre site",
    description:
      "Design, développement, optimisation et mise en ligne.",
  },
];

const metricRows = [
  ["100%", "mobile-first", "Votre site reste lisible sur les écrans de vos clients."],
  ["4", "formats de site", "Vitrine, e-commerce, landing page ou refonte."],
  ["48H", "pour cadrer", "Une proposition claire pour décider vite."],
  ["24/7", "présence en ligne", "Votre entreprise reste trouvable et contactable."],
];

const siteTypes = [
  "Site vitrine",
  "E-commerce",
  "Landing page",
  "Refonte",
  "Je ne sais pas encore",
];

import { motion, useScroll, useTransform, useReducedMotion, Variants } from "framer-motion";
import { useRef } from "react";

function getAnimationVariants(reduceMotion: boolean | null) {
  return {
    fadeUpVariant: {
      hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 },
      visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
      }
    } as Variants,
    staggerContainer: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: reduceMotion ? 0 : 0.12,
          delayChildren: 0.1,
        }
      }
    } as Variants,
    sectionVariant: {
      hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 50, scale: 0.98, filter: "blur(10px)" },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
      }
    } as Variants
  };
}

function TextReveal({ children, className, as: Component = "h1" }: { children: string; className?: string; as?: any }) {
  const words = children.split(" ");
  const MotionComponent = motion(Component) as any;
  return (
    <MotionComponent 
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.2 } }
      }}
      className={className}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden" style={{ verticalAlign: "top" }}>
          <motion.span
            variants={{
              hidden: { opacity: 0, y: "100%", rotate: 2 },
              visible: { 
                opacity: 1, 
                y: "0%", 
                rotate: 0,
                transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
              }
            }}
            className="inline-block origin-bottom-left"
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </MotionComponent>
  );
}

export default function Home() {
  const reduceMotion = useReducedMotion();
  const { fadeUpVariant, staggerContainer, sectionVariant } = getAnimationVariants(reduceMotion);
  const { scrollYProgress } = useScroll();

  return (

    <main className="relative min-h-screen overflow-x-hidden bg-[#fbf7ef] text-[#17211c]">
      <SiteBackground />
      <Header />

      <section
        id="accueil"
        className="relative mx-auto w-full max-w-7xl px-5 pb-28 pt-28 sm:px-8 sm:pt-32 lg:px-10 lg:pb-32"
      >
        <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.15, delayChildren: 0.1 }
              }
            }}
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e2d8c9] bg-white/76 px-3 py-2 text-sm font-medium shadow-[0_14px_45px_rgba(72,48,30,0.08)] backdrop-blur"
            >
              <Sparkles className="size-4 text-[#ff6b4a]" aria-hidden="true" />
              Studio web pour entreprises ambitieuses au Maroc
            </motion.div>
            <TextReveal className="max-w-4xl text-balance text-5xl font-semibold leading-[0.92] tracking-normal sm:text-6xl lg:text-7xl">
              Des sites qui donnent à votre entreprise une vraie présence.
            </TextReveal>
            <motion.p 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}
              className="mt-6 max-w-2xl text-base leading-7 text-[#5f665d] sm:text-lg sm:leading-8"
            >
              EngiGrowth transforme votre offre en expérience claire, élégante et
              convaincante, avec une direction visuelle propre à votre activité.
            </motion.p>
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Button
                asChild
                className="h-12 rounded-full bg-[#ff6b4a] px-6 font-semibold text-white shadow-[0_12px_32px_rgba(255,107,74,0.24)] hover:bg-[#ec5738]"
                onClick={() =>
                  trackConversion("proposal_cta_click", { placement: "hero" })
                }
              >
                <a href="#contact">
                  Recevoir une proposition
                  <ArrowRight className="size-4" aria-hidden="true" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroVisual />
          </motion.div>
        </div>
      </section>


      <motion.section
        id="services"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={sectionVariant}
        className="relative scroll-mt-24 bg-[#fffaf2] py-20"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <motion.div variants={fadeUpVariant} className="max-w-3xl">
            <SectionEyebrow>Solutions</SectionEyebrow>
            <TextReveal as="h2" className="text-balance text-4xl font-semibold leading-[0.96] sm:text-5xl">
              Des pages qui rendent votre offre évidente.
            </TextReveal>
          </motion.div>
          <motion.div variants={fadeUpVariant} className="hidden gap-2 md:flex" aria-hidden="true">
            <span className="flex size-10 items-center justify-center rounded-full border border-[#e2d8c9]">
              <ChevronRight className="size-4 rotate-180" />
            </span>
            <span className="flex size-10 items-center justify-center rounded-full border border-[#e2d8c9]">
              <ChevronRight className="size-4" />
            </span>
          </motion.div>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} className="mt-9 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.div key={service.title} variants={fadeUpVariant}>
              <ServiceCard service={service} index={index} />
            </motion.div>
          ))}
        </motion.div>
        </div>
      </motion.section>

      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={sectionVariant}
        className="relative bg-[#fffaf2] px-5 pb-20 sm:px-8 lg:px-10"
      >
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mx-auto grid w-full max-w-7xl gap-3 rounded-[30px_10px_30px_10px] border border-[#e2d8c9] bg-[#fbf7ef] p-4 shadow-[0_18px_55px_rgba(72,48,30,0.08)] sm:grid-cols-2 lg:grid-cols-4">
          {[
            "Design professionnel",
            "100 % responsive",
            "Rapide & optimisé",
            "Pensé pour la conversion",
          ].map((point, index) => (
            <motion.div
              key={point}
              variants={fadeUpVariant}
              className="rounded-[22px_7px_22px_7px] bg-[#fffaf2] px-5 py-4 text-center text-sm font-semibold text-[#17211c]"
            >
              {point}
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={sectionVariant}
        className="relative"
      >
        <div className="relative overflow-hidden bg-[#17211c] px-5 py-20 text-white sm:px-8 lg:px-10">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mx-auto max-w-7xl">
            <motion.div variants={fadeUpVariant} className="mx-auto max-w-3xl text-center">
              <h2 className="text-balance text-4xl font-semibold leading-[0.96] sm:text-5xl">
                Votre site ne devrait pas simplement exister. Il devrait
                travailler pour votre entreprise.
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/68">
                Un site lent, dépassé ou difficile à comprendre peut faire perdre
                des clients potentiels avant même le premier contact.
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/78">
                Nous combinons stratégie, design et développement pour créer une
                expérience qui présente clairement votre offre et facilite le
                passage à l’action.
              </p>
            </motion.div>
            <motion.div variants={fadeUpVariant} className="mx-auto mt-12 max-w-5xl rounded-[30px_10px_30px_10px] bg-[#fffaf2] p-5 text-[#17211c] shadow-[0_28px_90px_rgba(0,0,0,0.22)] sm:p-7">
              <VisibilityChart />
            </motion.div>
          </motion.div>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-28 bg-[repeating-linear-gradient(135deg,rgba(255,180,95,0.92)_0_3px,transparent_3px_12px)] opacity-80"
          />
        </div>
      </motion.section>

      <motion.section
        id="realisations"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={sectionVariant}
        className="relative scroll-mt-24 bg-[#fbf7ef] py-20"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
        <motion.div variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }} className="max-w-3xl">
          <SectionEyebrow>Réalisations</SectionEyebrow>
          <h2 className="text-balance text-4xl font-semibold leading-[0.96] sm:text-5xl">
            Une direction visuelle adaptée à chaque activité.
          </h2>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-9 grid gap-4 lg:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div key={project.name} variants={fadeUpVariant}>
              <ProjectCard project={project} index={index} />
            </motion.div>
          ))}
        </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="processus"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={sectionVariant}
        className="relative scroll-mt-24 bg-[#fff1d8] py-20"
      >
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-10">
        <motion.div variants={fadeUpVariant} className="lg:sticky lg:top-32 lg:self-start">
          <TextReveal as="h2" className="text-balance text-4xl font-semibold leading-[0.96] sm:text-5xl">
            Votre nouveau site en 3 étapes
          </TextReveal>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-20%" }} className="grid gap-3">
          {processSteps.map((step, index) => (
            <motion.article
              key={step.number}
              variants={fadeUpVariant}
              className="grid gap-4 rounded-[26px_8px_26px_8px] border border-[#e2d8c9] bg-white p-5 sm:grid-cols-[5rem_1fr]"
            >
              <p className="text-4xl font-semibold leading-none text-[#ff6b4a]">
                {step.number}
              </p>
              <div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 leading-7 text-[#53605a]">
                  {step.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
        </div>
      </motion.section>

      <motion.section
        id="contact"
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} variants={sectionVariant}
        className="relative scroll-mt-24 bg-[#17211c] py-20 text-white"
      >
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-10">
        <motion.div variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <SectionEyebrow dark>Démarrer</SectionEyebrow>
          <h2 className="text-balance text-4xl font-semibold leading-[0.96] sm:text-5xl">
            Lancez votre site avec EngiGrowth.
          </h2>
          <p className="mt-5 max-w-md leading-7 text-white/68">
            Décrivez votre projet en quelques mots. Nous vous répondrons avec une
            proposition adaptée à votre activité, votre objectif et votre budget.
          </p>

        </motion.div>
        <motion.div variants={fadeUpVariant} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <LeadForm />
        </motion.div>
        </div>
      </motion.section>

      <Footer />
      <MobileStickyCta />
    </main>
  );
}

function HeroVisual() {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 800], [1, 0.85]);
  const opacity = useTransform(scrollY, [0, 800], [1, 0.4]);

  return (
    <motion.div style={{ scale, opacity }} className="relative pb-8 pt-4 lg:pb-10 lg:pt-0 transform-gpu">
      <div
        aria-hidden="true"
        className="hero-blob absolute -right-6 top-10 size-32 rounded-full bg-[#18c6a4]/18 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="hero-blob hero-delay-2 absolute -left-8 bottom-16 size-36 rounded-full bg-[#ff6b4a]/16 blur-2xl"
      />
      <div className="relative mx-auto max-w-[540px]">
        <img
          src="/hero-engigrowth.png"
          alt="Entrepreneur travaillant sur son ordinateur"
          className="w-full rounded-[34px_10px_34px_10px] object-contain"
        />

        <div className="hero-reveal hero-glass hero-delay-1 absolute -left-5 top-12 hidden rounded-[22px_7px_22px_7px] border border-[#e2d8c9] bg-white/88 px-4 py-3 shadow-[0_18px_45px_rgba(72,48,30,0.14)] backdrop-blur-xl sm:block">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-[14px_4px_14px_4px] bg-[#fff1d8]">
              <Search className="size-4 text-[#ff6b4a]" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold">Message</p>
              <p className="text-xs text-[#6b776f]">Offre claire</p>
            </div>
          </div>
        </div>

        <div className="hero-reveal hero-glass hero-delay-2 absolute -right-4 top-28 hidden rounded-full bg-[#17211c]/92 px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(23,33,28,0.2)] backdrop-blur-xl sm:block">
          Design premium
        </div>

        <div className="hero-reveal hero-glass hero-delay-3 absolute -right-3 bottom-20 hidden rounded-[18px_6px_18px_6px] bg-[#ffb45f]/92 px-4 py-3 text-sm font-semibold text-[#17211c] shadow-[0_18px_45px_rgba(72,48,30,0.16)] backdrop-blur-xl sm:block">
          Prêt à convertir
        </div>

        <div className="hero-reveal hero-glass hero-delay-4 absolute -bottom-24 left-6 hidden w-72 rounded-[24px_8px_24px_8px] border border-[#e2d8c9] bg-[#fffaf2]/92 p-3 shadow-[0_22px_58px_rgba(72,48,30,0.18)] backdrop-blur-xl sm:block">
          <div className="mb-3 flex items-center gap-2 border-b border-[#e2d8c9] pb-2">
            <span className="size-2.5 rounded-full bg-[#ff6b4a]" />
            <span className="size-2.5 rounded-full bg-[#ffb45f]" />
            <span className="size-2.5 rounded-full bg-[#18c6a4]" />
            <span className="ml-2 text-xs font-semibold text-[#6b776f]">
              site moderne
            </span>
          </div>
          <div className="rounded-[18px_6px_18px_6px] bg-[#17211c] p-4 text-white">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-white/55">Votre activité</p>
                <p className="mt-1 text-lg font-semibold leading-tight">
                  Claire, crédible, prête à convertir
                </p>
              </div>
              <span className="rounded-full bg-[#ff6b4a] px-3 py-1 text-xs font-semibold">
                CTA
              </span>
            </div>
            <div className="mt-4 grid grid-cols-[1.1fr_0.9fr] gap-3">
              <div className="space-y-2">
                <span className="block h-2 rounded-full bg-white/60" />
                <span className="block h-2 w-9/12 rounded-full bg-white/25" />
                <span className="mt-3 block h-7 w-24 rounded-full bg-[#18c6a4]" />
              </div>
              <div className="flex h-14 items-end gap-1.5">
                {[38, 54, 46, 72, 62].map((height, index) => (
                  <span
                    key={`${height}-${index}`}
                    className={`flex-1 rounded-t-[6px] ${
                      index % 2 === 0 ? "bg-[#ffb45f]" : "bg-[#18c6a4]"
                    }`}
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 sm:hidden">
        {["Message", "Design", "Conversion"].map((item, index) => (
          <span
            key={item}
            className="hero-reveal hero-glass rounded-[18px_6px_18px_6px] border border-[#e2d8c9] bg-white/88 px-3 py-3 text-center text-xs font-semibold shadow-sm backdrop-blur-xl"
            style={{ animationDelay: `${index * 0.7}s` }}
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="bg-[#17211c] px-5 py-2 text-center text-xs font-semibold text-[#fff7ea]">
        Sites web clairs, rapides et distinctifs pour entreprises au Maroc
      </div>
      <nav className="border-b border-[#e2d8c9]/80 bg-[#fbf7ef]/86 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <a href="#accueil" className="flex items-center gap-3" aria-label="Accueil">
            <img
              src="/logo-engigrowth.png"
              alt=""
              className="size-11 rounded-[16px_5px_16px_5px] bg-[#17211c] object-contain p-1"
            />
            <span className="text-base font-semibold tracking-normal">
              {SITE_CONFIG.brand}
            </span>
          </a>
          <div className="hidden items-center gap-7 text-sm font-medium text-[#4f5b54] md:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition hover:text-[#17211c]">
                {link.label}
              </a>
            ))}
          </div>
          <Button
            asChild
            className="hidden h-10 rounded-full bg-[#17211c] px-5 text-white hover:bg-[#2b372f] md:inline-flex"
            onClick={() =>
              trackConversion("proposal_cta_click", { placement: "nav" })
            }
          >
            <a href="#contact">Recevoir une proposition</a>
          </Button>
          <Button
            asChild
            size="icon"
            variant="outline"
            className="rounded-full border-[#e2d8c9] bg-white text-[#17211c] hover:bg-[#17211c] hover:text-white md:hidden"
          >
            <a href="#contact" aria-label="Recevoir une proposition">
              <Send className="size-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </nav>
    </header>
  );
}

function ServiceCard({ service, index }: { service: IconCard; index: number }) {
  const Icon = service.icon;
  const colors = ["bg-[#e0f7ef]", "bg-[#ffe6d7]", "bg-[#fff0bd]", "bg-[#e7edff]"];

  return (
    <motion.article 
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`${colors[index]} group min-h-[310px] rounded-[28px_8px_28px_8px] border border-[#e2d8c9] p-6 hover:shadow-[0_22px_70px_rgba(72,48,30,0.12)]`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6b5f51]">
            {service.tag}
          </p>
          <h3 className="mt-3 max-w-[13rem] text-2xl font-semibold leading-tight">
            {service.title}
          </h3>
        </div>
        <motion.span 
          className="flex size-9 shrink-0 items-center justify-center rounded-[14px_4px_14px_4px] border border-[#17211c]/15 bg-white/65"
          whileHover={{ rotate: 15, scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </motion.span>
      </div>
      <div className="mt-9 rounded-[22px_7px_22px_7px] border border-white/80 bg-white/65 p-4 shadow-[0_18px_45px_rgba(72,48,30,0.08)]">
        <Icon className="mb-8 size-7 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
        <p className="text-sm leading-6 text-[#5f665d]">{service.description}</p>
      </div>
    </motion.article>
  );
}

function MetricRow({
  value,
  label,
  note,
  active,
}: {
  value: string;
  label: string;
  note: string;
  active: boolean;
}) {
  return (
    <article className={`grid gap-4 rounded-[28px_8px_28px_8px] border p-5 sm:grid-cols-[16rem_1fr] sm:items-center ${active ? "border-[#17211c] bg-[#17211c] text-white" : "border-[#e2d8c9] bg-white/55 text-[#b2a99c]"}`}>
      <div className="flex items-center gap-4">
        <span className={`flex size-16 shrink-0 items-center justify-center rounded-[22px_6px_22px_6px] ${active ? "bg-[#ffb45f] text-[#17211c]" : "bg-[#fff0dc]"}`}>
          <ArrowRight className="-rotate-45 size-8" aria-hidden="true" />
        </span>
        <div>
          <p className="text-5xl font-semibold leading-none sm:text-6xl">{value}</p>
          <p className="mt-1 text-sm">{label}</p>
        </div>
      </div>
      <p className={`max-w-lg text-sm leading-6 ${active ? "text-white/74" : "text-[#a99d8f]"}`}>
        {note}
      </p>
    </article>
  );
}

function VisibilityChart() {
  const rows = [
    ["Clarté de l'offre", 96],
    ["Preuves", 84],
    ["Contact", 91],
    ["Mobile", 88],
    ["Vitesse", 79],
    ["SEO local", 72],
  ] as const;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="font-semibold">Audit de conversion</p>
          <p className="text-xs text-[#6b776f]">Prototype avant mise en ligne</p>
        </div>
        <span className="rounded-full bg-[#ffe6d7] px-3 py-1 text-xs font-semibold text-[#a3422e]">
          Priorisé
        </span>
      </div>
      <div className="space-y-4">
        {rows.map(([label, value], index) => (
          <div key={label} className="grid gap-3 sm:grid-cols-[11rem_1fr_3rem]">
            <p className="text-sm font-medium">{label}</p>
            <div className="h-3 overflow-hidden rounded-full bg-[#f3eadc]">
              <span
                className={`block h-full rounded-full ${index % 2 === 0 ? "bg-[#18c6a4]" : "bg-[#ff6b4a]"}`}
                style={{ width: `${value}%` }}
              />
            </div>
            <p className="text-sm text-[#6b776f]">{value}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  return (
    <motion.article
      tabIndex={0}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onFocus={() => trackConversion("portfolio_view", { project: project.name })}
      onMouseEnter={() =>
        trackConversion("portfolio_view", { project: project.name })
      }
      className="group rounded-[28px_8px_28px_8px] border border-[#e2d8c9] bg-white p-3 outline-none hover:shadow-[0_24px_80px_rgba(72,48,30,0.12)] focus-visible:ring-2 focus-visible:ring-[#ff6b4a]"
    >
      <div className={`relative min-h-[260px] overflow-hidden rounded-[22px_6px_22px_6px] bg-gradient-to-br ${project.palette} p-5`}>
        <div className="absolute inset-x-0 bottom-0 h-20 bg-[repeating-linear-gradient(135deg,rgba(23,33,28,0.18)_0_2px,transparent_2px_10px)]" />
        <div className="relative mx-auto max-w-md rounded-[24px_8px_24px_8px] border border-white/75 bg-white/80 p-4 shadow-[0_22px_60px_rgba(72,48,30,0.14)] backdrop-blur transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:-translate-y-2">
          <div className="mb-4 flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-[#f16d8a]" />
            <span className="size-2.5 rounded-full bg-[#facf5a]" />
            <span className="size-2.5 rounded-full bg-[#18c6a4]" />
            <span className="ml-2 h-6 flex-1 rounded-full bg-[#eef2ed]" />
          </div>
          <div className="grid gap-4 sm:grid-cols-[0.86fr_1.14fr]">
            <div>
              <span className="block h-5 w-10/12 rounded-full bg-[#17211c]" />
              <span className="mt-2 block h-5 w-7/12 rounded-full bg-[#17211c]" />
              <span className="mt-5 block h-3 w-full rounded-full bg-[#cfd8d0]" />
              <span className="mt-2 block h-3 w-8/12 rounded-full bg-[#dfe6df]" />
              <span className="mt-6 block h-9 w-28 rounded-full bg-[#ff6b4a]" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[0, 1, 2, 3].map((item) => (
                <span key={item} className={`h-20 rounded-[16px_5px_16px_5px] ${(item + index) % 2 === 0 ? "bg-[#18c6a4]/70" : "bg-white"}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-[#6b776f]">{project.industry}</p>
          <h3 className="mt-1 text-2xl font-semibold">{project.name}</h3>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#53605a]">
            {project.description}
          </p>
        </div>
        <span className="flex size-11 shrink-0 items-center justify-center rounded-[16px_5px_16px_5px] border border-[#e2d8c9] transition duration-300 group-hover:bg-[#17211c] group-hover:text-white group-hover:rotate-12 group-hover:scale-110">
          <ExternalLink className="size-4" aria-hidden="true" />
        </span>
      </div>
    </motion.article>
  );
}

function OutcomeItem({ outcome }: { outcome: IconCard }) {
  const Icon = outcome.icon;

  return (
    <article className="flex gap-4 rounded-[24px_8px_24px_8px] border border-[#e2d8c9] bg-white p-4">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-[16px_5px_16px_5px] bg-[#ffe6d7]">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div>
        <h3 className="font-semibold">{outcome.title}</h3>
        <p className="mt-1 text-sm leading-6 text-[#53605a]">
          {outcome.description}
        </p>
      </div>
    </article>
  );
}

function LeadForm() {
  const [form, setForm] = useState<LeadPayload>({
    name: "",
    phone: "",
    siteType: "",
    description: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [hasStarted, setHasStarted] = useState(false);

  function startForm() {
    if (!hasStarted) {
      setHasStarted(true);
      trackConversion("lead_form_start");
    }
  }

  function updateField<K extends keyof LeadPayload>(key: K, value: LeadPayload[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateLead(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      await submitLead(form);
      trackConversion("lead_form_submit", { site_type: form.siteType });
      setStatus("success");
      setForm({ name: "", phone: "", siteType: "", description: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      onFocus={startForm}
      className="rounded-[30px_10px_30px_10px] border border-[#e2d8c9] bg-white p-5 text-[#17211c] shadow-[0_22px_80px_rgba(72,48,30,0.12)] sm:p-7"
      noValidate
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#6b776f]">
            Formulaire
          </p>
          <h3 className="mt-2 text-2xl font-semibold">Décrire mon projet</h3>
        </div>
        <span className="hidden size-12 items-center justify-center rounded-[18px_6px_18px_6px] bg-[#18c6a4] sm:flex">
          <Send className="size-5" aria-hidden="true" />
        </span>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field error={errors.name}>
          <Label htmlFor="name">Nom et prénom</Label>
          <Input
            id="name"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            className="mt-2 h-12 rounded-[14px_5px_14px_5px] border-[#e2d8c9] bg-[#fffaf2]"
            placeholder="Votre nom"
          />
        </Field>
        <Field error={errors.phone}>
          <Label htmlFor="phone">Téléphone / WhatsApp</Label>
          <Input
            id="phone"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            inputMode="tel"
            className="mt-2 h-12 rounded-[14px_5px_14px_5px] border-[#e2d8c9] bg-[#fffaf2]"
            placeholder="+212 6 00 00 00 00"
          />
        </Field>
        <Field error={errors.siteType} className="sm:col-span-2">
          <Label htmlFor="site-type">Type de site</Label>
          <Select value={form.siteType} onValueChange={(value) => updateField("siteType", value)}>
            <SelectTrigger id="site-type" aria-invalid={Boolean(errors.siteType)} className="mt-2 h-12 w-full rounded-[14px_5px_14px_5px] border-[#e2d8c9] bg-[#fffaf2]">
              <SelectValue placeholder="Choisissez une option" />
            </SelectTrigger>
            <SelectContent className="border-[#e2d8c9] bg-white text-[#17211c]">
              {siteTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field error={errors.description} className="sm:col-span-2">
          <Label htmlFor="description">Parlez-nous rapidement de votre projet</Label>
          <Textarea
            id="description"
            value={form.description}
            onChange={(event) => updateField("description", event.target.value)}
            aria-invalid={Boolean(errors.description)}
            className="mt-2 min-h-32 rounded-[14px_5px_14px_5px] border-[#e2d8c9] bg-[#fffaf2]"
            placeholder="Exemple : je veux présenter mon activité et recevoir plus de demandes de contact."
          />
        </Field>
      </div>
      {status === "success" ? (
        <div className="mt-5 rounded-[8px] border border-[#98ddc9] bg-[#e1fbf2] p-4 text-sm text-[#126f5c]">
          Votre demande est bien reçue. Nous reviendrons vers vous rapidement.
        </div>
      ) : null}
      {status === "error" && Object.keys(errors).length === 0 ? (
        <div className="mt-5 rounded-[8px] border border-[#f0bcc9] bg-[#fff0f4] p-4 text-sm text-[#a83c58]">
          Une erreur est survenue. Vous pouvez réessayer.
        </div>
      ) : null}
      <Button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 h-14 w-full rounded-full bg-[#17211c] text-base font-semibold text-white hover:bg-[#2b372f]"
      >
        {status === "loading" ? "Envoi en cours..." : "Recevoir ma proposition gratuite"}
        <ArrowRight className="size-5" aria-hidden="true" />
      </Button>
    </form>
  );
}

function Field({
  children,
  error,
  className,
}: {
  children: ReactNode;
  error?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      {children}
      {error ? <p className="mt-2 text-sm text-[#b72f51]">{error}</p> : null}
    </div>
  );
}

function validateLead(form: LeadPayload) {
  const errors: FieldErrors = {};
  if (form.name.trim().length < 2) errors.name = "Indiquez votre nom complet.";
  if (form.phone.trim().length < 8) errors.phone = "Ajoutez un numéro valide.";
  if (!form.siteType) errors.siteType = "Choisissez le type de site souhaité.";
  if (form.description.trim().length < 12) {
    errors.description = "Ajoutez quelques détails sur votre projet.";
  }
  return errors;
}

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#e2d8c9] bg-[#fff1d8] px-5 pb-8 pt-16 sm:px-8 lg:px-10">
      <div className="mx-auto grid w-full max-w-7xl gap-10 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="max-w-md text-4xl font-semibold leading-[0.96]">
            Un site clair pour une entreprise plus visible.
          </h2>
          <Button
            asChild
            className="mt-7 h-11 rounded-full bg-[#ff6b4a] px-5 font-semibold text-white hover:bg-[#ec5738]"
            onClick={() =>
              trackConversion("proposal_cta_click", { placement: "footer" })
            }
          >
            <a href="#contact">Démarrer le brief</a>
          </Button>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          <FooterColumn title={SITE_CONFIG.brand} links={["Services", "Réalisations", "Méthode", "Contact"]} />
          <FooterColumn title="Types de site" links={["Site vitrine", "E-commerce", "Landing page", "Refonte"]} />
          <FooterColumn title="Support" links={["WhatsApp", "Proposition", "Confidentialité"]} />
        </div>
      </div>
      <div className="mx-auto mt-16 w-full max-w-7xl">
        <div className="flex flex-col gap-5 border-t border-[#e2d8c9] pt-6 text-xs text-[#6b776f] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.brand}. Tous droits réservés.</p>
          <p>Création de sites web au Maroc.</p>
        </div>
      </div>
      <p aria-hidden="true" className="pointer-events-none mt-10 select-none text-center text-[clamp(4rem,16vw,13rem)] font-black leading-[0.72] tracking-normal text-[#17211c]">
        GROWTH STUDIO
      </p>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold">{title}</h3>
      <div className="grid gap-2 text-sm text-[#53605a]">
        {links.map((link) => (
          <span key={link}>{link}</span>
        ))}
      </div>
    </div>
  );
}

function MobileStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#e2d8c9] bg-white/92 p-3 backdrop-blur md:hidden">
      <Button
        asChild
        className="h-12 w-full rounded-full bg-[#17211c] font-semibold text-white hover:bg-[#2b372f]"
        onClick={() =>
          trackConversion("proposal_cta_click", { placement: "mobile_sticky" })
        }
      >
        <a href="#contact">
          Recevoir ma proposition gratuite
          <ChevronRight className="size-5" aria-hidden="true" />
        </a>
      </Button>
    </div>
  );
}

function SectionEyebrow({
  children,
  dark = false,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <p className={`mb-4 text-xs font-semibold uppercase tracking-[0.16em] ${dark ? "text-[#ffb45f]" : "text-[#746858]"}`}>
      {children}
    </p>
  );
}

function SiteBackground() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 150]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -80]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div style={{ y: y1 }} className="absolute inset-x-0 top-0 h-[720px] bg-[linear-gradient(145deg,#fff1d8_0%,#e2f7ee_46%,#fbf7ef_100%)]" />
      <motion.div style={{ y: y2 }} className="absolute inset-x-0 top-[120px] h-[460px] bg-[radial-gradient(circle_at_18%_30%,rgba(255,107,74,0.18),transparent_28%),radial-gradient(circle_at_82%_20%,rgba(24,198,164,0.18),transparent_24%)]" />
      <div className="absolute inset-x-0 top-[110px] h-[500px] bg-[linear-gradient(135deg,rgba(23,33,28,0.06)_0_1px,transparent_1px_18px)] opacity-50" />
      <div className="absolute inset-x-0 bottom-0 h-[360px] bg-[linear-gradient(180deg,transparent_0%,rgba(255,241,216,0.75)_100%)]" />
    </div>
  );
}
