"use client";

import { type FormEvent, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronRight,
  Code2,
  ExternalLink,
  Gauge,
  LayoutTemplate,
  MessageCircle,
  MousePointer2,
  PenTool,
  Search,
  Send,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Smartphone,
  Target,
  TrendingUp,
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

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Réalisations", href: "#realisations" },
  { label: "Comment ça marche", href: "#processus" },
  { label: "Contact", href: "#contact" },
];

const services = [
  {
    title: "Site vitrine",
    description:
      "Présentez votre entreprise, vos services et vos réalisations avec un site professionnel qui inspire confiance.",
    icon: LayoutTemplate,
    accent: "from-sky-400 to-cyan-300",
    metric: "Crédibilité",
  },
  {
    title: "Site e-commerce",
    description:
      "Présentez et vendez vos produits en ligne avec une expérience simple pour vos clients.",
    icon: ShoppingBag,
    accent: "from-violet-400 to-fuchsia-300",
    metric: "Vente en ligne",
  },
  {
    title: "Landing Page",
    description:
      "Transformez le trafic de vos campagnes publicitaires en demandes de contact et en prospects.",
    icon: Target,
    accent: "from-blue-400 to-indigo-300",
    metric: "Conversion",
  },
  {
    title: "Refonte de site",
    description:
      "Votre site existe déjà ? Modernisez son design, son contenu et son expérience utilisateur pour mieux représenter votre entreprise.",
    icon: Sparkles,
    accent: "from-cyan-300 to-emerald-300",
    metric: "Modernisation",
  },
];

const benefits = [
  {
    title: "Une image professionnelle",
    description:
      "Donnez une première impression à la hauteur de la qualité de vos services.",
    icon: ShieldCheck,
  },
  {
    title: "Une expérience simple",
    description:
      "Aidez vos visiteurs à trouver rapidement les informations dont ils ont besoin sur mobile comme sur ordinateur.",
    icon: Smartphone,
  },
  {
    title: "Plus de demandes de contact",
    description:
      "Structurez votre site autour d'un objectif clair : transformer davantage de visiteurs en prospects.",
    icon: TrendingUp,
  },
  {
    title: "Un site rapide et optimisé",
    description:
      "Bénéficiez d'un site conçu avec de bonnes bases techniques pour la performance et le référencement.",
    icon: Gauge,
  },
];

const projects = [
  {
    name: "Atlas Conseil",
    industry: "Cabinet de conseil",
    description:
      "Site vitrine premium orienté prise de rendez-vous pour une activité B2B.",
    color: "from-blue-500 via-cyan-400 to-slate-900",
  },
  {
    name: "Casa Home",
    industry: "Immobilier",
    description:
      "Landing page claire pour présenter les biens, rassurer les visiteurs et générer des demandes.",
    color: "from-violet-500 via-blue-500 to-slate-950",
  },
  {
    name: "Marrakech Atelier",
    industry: "Commerce en ligne",
    description:
      "Parcours e-commerce simple avec une mise en avant forte des produits et de la marque.",
    color: "from-cyan-400 via-emerald-300 to-slate-950",
  },
  {
    name: "Nour Santé",
    industry: "Service médical",
    description:
      "Interface rassurante, rapide sur mobile, pensée pour faciliter le contact.",
    color: "from-indigo-400 via-sky-400 to-slate-950",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Parlez-nous de votre projet",
    description:
      "Expliquez-nous votre activité, vos objectifs et le type de site dont vous avez besoin.",
  },
  {
    number: "02",
    title: "Recevez votre proposition",
    description:
      "Nous étudions votre besoin et vous envoyons une proposition adaptée à votre projet.",
  },
  {
    number: "03",
    title: "Nous créons votre site",
    description:
      "Une fois la proposition validée, nous passons au design, au développement et à la mise en ligne.",
  },
];

const siteTypes = [
  "Site vitrine",
  "E-commerce",
  "Landing page",
  "Refonte",
  "Je ne sais pas encore",
];

type FieldErrors = Partial<Record<keyof LeadPayload, string>>;

const fadeUp = {
  hidden: { opacity: 0, y: 34 },
  visible: { opacity: 1, y: 0 },
};

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function Home() {
  const reduceMotion = useReducedMotion();
  const motionProps = useMemo(
    () =>
      reduceMotion
        ? {}
        : {
            initial: "hidden",
            whileInView: "visible",
            viewport: { once: true, margin: "-80px" },
            variants: fadeUp,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
          },
    [reduceMotion],
  );

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050914] text-white">
      <SiteBackground />
      <Header />

      <section
        id="accueil"
        className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 pb-6 pt-24 sm:px-8 sm:pb-12 sm:pt-28 lg:min-h-[92vh] lg:grid-cols-[1.02fr_0.98fr] lg:px-10 lg:pb-20 lg:pt-32"
      >
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/8 px-3 py-2 text-sm text-cyan-100 shadow-[0_0_50px_rgba(34,211,238,0.14)]">
            <Sparkles className="size-4 text-cyan-300" aria-hidden="true" />
            Création de sites web pour entreprises au Maroc
          </div>
          <h1 className="max-w-4xl text-balance text-4xl font-semibold leading-[1.04] tracking-normal text-white sm:text-5xl lg:text-7xl">
            Un site web professionnel qui transforme vos visiteurs en clients
          </h1>
          <div className="mt-5 max-w-2xl space-y-3 text-base leading-7 text-slate-300 sm:mt-7 sm:space-y-4 sm:text-lg sm:leading-8">
            <p>
              Vous avez besoin d&apos;un site pour présenter votre activité, attirer
              de nouveaux clients et développer votre présence en ligne ?
            </p>
            <p>
              Nous créons un site moderne, rapide et adapté à votre activité,
              avec une proposition claire selon vos besoins et votre budget.
            </p>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:mt-9 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-cyan-300 px-6 text-base font-semibold text-slate-950 shadow-[0_18px_60px_rgba(34,211,238,0.28)] hover:bg-cyan-200 sm:h-14 sm:px-7"
              onClick={() =>
                trackConversion("proposal_cta_click", { placement: "hero" })
              }
            >
              <a href="#contact">
                Recevoir ma proposition gratuite
                <ArrowRight className="size-5" aria-hidden="true" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 rounded-full border-white/14 bg-white/6 px-6 text-base text-white hover:bg-white/12 hover:text-white sm:h-14 sm:px-7"
            >
              <a href="#realisations">Voir nos réalisations</a>
            </Button>
          </div>
          <p className="mt-5 hidden text-sm text-slate-400 sm:block">
            Sans engagement • Réponse rapide • Proposition adaptée à votre projet
          </p>
        </motion.div>

        <div className="hidden lg:block">
          <BrowserShowcase reduceMotion={Boolean(reduceMotion)} />
        </div>
      </section>

      <motion.section
        {...motionProps}
        className="relative mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:px-10"
      >
        <div className="grid items-center gap-8 rounded-[32px] border border-white/10 bg-white/[0.035] p-6 shadow-[0_28px_120px_rgba(0,0,0,0.28)] backdrop-blur md:grid-cols-[0.9fr_1.1fr] md:p-10 lg:p-12">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">
              Présence en ligne
            </p>
            <h2 className="text-balance text-3xl font-semibold leading-tight sm:text-4xl">
              Votre site web doit vous aider à développer votre activité
            </h2>
            <Button
              asChild
              className="mt-8 h-12 rounded-full bg-white text-slate-950 hover:bg-cyan-100"
              onClick={() =>
                trackConversion("whatsapp_click", {
                  placement: "value_section",
                })
              }
            >
              <a href={SITE_CONFIG.whatsappUrl} target="_blank" rel="noreferrer">
                Discuter de mon projet
                <MessageCircle className="size-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
          <div className="grid gap-4 text-slate-300 sm:grid-cols-2">
            {[
              "Un site ne doit pas simplement être beau.",
              "Vos futurs clients doivent comprendre rapidement ce que vous proposez, pourquoi ils devraient vous faire confiance et comment vous contacter.",
              "Si votre entreprise n'a pas encore de site, ou si votre site actuel ne reflète plus la qualité de votre activité, vous risquez de perdre des clients qui cherchent déjà vos services en ligne.",
              "Nous vous aidons à construire une présence en ligne professionnelle qui donne envie de passer à l'action.",
            ].map((text, index) => (
              <div
                key={text}
                className="rounded-3xl border border-white/10 bg-slate-950/40 p-5"
              >
                <span className="mb-5 flex size-10 items-center justify-center rounded-2xl bg-cyan-300/12 text-sm font-semibold text-cyan-200">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="leading-7">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        id="services"
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={{ once: true, margin: "-80px" }}
        variants={container}
        className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10"
      >
        <motion.div variants={fadeUp} className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">
            Services
          </p>
          <h2 className="text-balance text-3xl font-semibold leading-tight sm:text-5xl">
            Un site pensé pour votre entreprise
          </h2>
        </motion.div>
        <div className="mt-10 grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.article
            variants={fadeUp}
            className="group relative min-h-[420px] overflow-hidden rounded-[32px] border border-cyan-300/18 bg-cyan-300/8 p-7 shadow-[0_30px_120px_rgba(8,145,178,0.16)] md:p-9"
          >
            <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_30%_10%,rgba(34,211,238,0.35),transparent_50%)]" />
            <div className="relative flex h-full flex-col justify-between">
              <div>
                <span className="flex size-14 items-center justify-center rounded-3xl bg-cyan-300 text-slate-950">
                  <Target className="size-7" aria-hidden="true" />
                </span>
                <h3 className="mt-8 max-w-lg text-3xl font-semibold leading-tight sm:text-4xl">
                  Une landing page conçue pour transformer vos campagnes en
                  opportunités commerciales.
                </h3>
                <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
                  Structure claire, message précis, preuve visible et appel à
                  l&apos;action constant pour aider vos visiteurs à passer au contact.
                </p>
              </div>
              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {["Clarté", "Confiance", "Contact"].map((item) => (
                  <span
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/7 px-4 py-3 text-sm text-cyan-50"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((service) => (
              <motion.article
                key={service.title}
                variants={fadeUp}
                className="group rounded-[28px] border border-white/10 bg-white/[0.045] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-200/30 hover:bg-white/[0.07]"
              >
                <div
                  className={`mb-6 flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br ${service.accent} text-slate-950`}
                >
                  <service.icon className="size-6" aria-hidden="true" />
                </div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200/80">
                  {service.metric}
                </p>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">
                  {service.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        {...motionProps}
        className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10"
      >
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">
              Résultats
            </p>
            <h2 className="text-balance text-3xl font-semibold leading-tight sm:text-5xl">
              Votre site doit faire plus que présenter votre entreprise
            </h2>
            <div className="mt-8 overflow-hidden rounded-[30px] border border-white/10 bg-slate-950/50 p-4">
              <div className="rounded-[24px] bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 p-5">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-sm text-slate-400">
                    Parcours visiteur
                  </span>
                  <span className="rounded-full bg-cyan-300/12 px-3 py-1 text-xs text-cyan-200">
                    Optimisé
                  </span>
                </div>
                <div className="space-y-3">
                  {[
                    "Arrive sur mobile",
                    "Comprend l'offre",
                    "Fait confiance",
                    "Demande un contact",
                  ].map((step, index) => (
                    <div
                      key={step}
                      className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.045] px-4 py-3"
                    >
                      <span className="flex size-8 items-center justify-center rounded-full bg-cyan-300 text-sm font-semibold text-slate-950">
                        {index + 1}
                      </span>
                      <span className="text-sm text-slate-200">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6"
              >
                <benefit.icon
                  className="mb-5 size-7 text-cyan-300"
                  aria-hidden="true"
                />
                <h3 className="text-xl font-semibold">{benefit.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">
                  {benefit.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        id="realisations"
        initial={reduceMotion ? false : "hidden"}
        whileInView={reduceMotion ? undefined : "visible"}
        viewport={{ once: true, margin: "-80px" }}
        variants={container}
        className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10"
      >
        <motion.div
          variants={fadeUp}
          className="flex flex-col justify-between gap-5 md:flex-row md:items-end"
        >
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">
              Réalisations
            </p>
            <h2 className="text-balance text-3xl font-semibold leading-tight sm:text-5xl">
              Quelques projets que nous avons réalisés
            </h2>
          </div>
          <p className="max-w-md leading-7 text-slate-300">
            Découvrez une sélection de sites conçus pour répondre à différents
            objectifs : présenter une entreprise, générer des prospects, vendre
            en ligne ou lancer un nouveau service.
          </p>
        </motion.div>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.name}
              variants={fadeUp}
              tabIndex={0}
              onFocus={() =>
                trackConversion("portfolio_view", { project: project.name })
              }
              onMouseEnter={() =>
                trackConversion("portfolio_view", { project: project.name })
              }
              className="group overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.045] outline-none transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 focus-visible:ring-2 focus-visible:ring-cyan-300"
            >
              <ProjectPreview project={project} index={index} />
              <div className="p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-semibold">{project.name}</h3>
                    <p className="mt-1 text-sm text-cyan-200">
                      {project.industry}
                    </p>
                  </div>
                  <span className="flex size-11 items-center justify-center rounded-full border border-white/10 text-slate-300 transition group-hover:border-cyan-300/40 group-hover:text-cyan-200">
                    <ExternalLink className="size-4" aria-hidden="true" />
                  </span>
                </div>
                <p className="mt-4 leading-7 text-slate-300">
                  {project.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="processus"
        {...motionProps}
        className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10"
      >
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">
            Comment ça marche
          </p>
          <h2 className="text-balance text-3xl font-semibold leading-tight sm:text-5xl">
            Créer votre site peut être simple
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Vous n&apos;avez pas besoin de connaître le design, le développement ou
            les aspects techniques. Nous nous occupons de la réalisation et vous
            gardez une vision claire de l&apos;avancement de votre projet.
          </p>
        </div>
        <div className="relative mt-12 grid gap-5 lg:grid-cols-3">
          <div className="absolute left-8 right-8 top-12 hidden h-px bg-gradient-to-r from-cyan-300/0 via-cyan-300/50 to-cyan-300/0 lg:block" />
          {processSteps.map((step) => (
            <article
              key={step.number}
              className="relative rounded-[28px] border border-white/10 bg-slate-950/60 p-6"
            >
              <span className="mb-8 flex size-16 items-center justify-center rounded-3xl border border-cyan-300/30 bg-cyan-300/10 text-xl font-semibold text-cyan-200">
                {step.number}
              </span>
              <h3 className="text-2xl font-semibold">{step.title}</h3>
              <p className="mt-4 leading-7 text-slate-300">{step.description}</p>
            </article>
          ))}
        </div>
        <Button
          asChild
          size="lg"
          className="mt-9 h-13 rounded-full bg-cyan-300 px-7 text-slate-950 hover:bg-cyan-200"
          onClick={() =>
            trackConversion("proposal_cta_click", { placement: "process" })
          }
        >
          <a href="#contact">
            Recevoir ma proposition gratuite
            <ArrowRight className="size-5" aria-hidden="true" />
          </a>
        </Button>
      </motion.section>

      <section
        id="contact"
        className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10"
      >
        <div className="grid gap-8 rounded-[34px] border border-cyan-300/18 bg-[linear-gradient(135deg,rgba(8,47,73,0.84),rgba(15,23,42,0.94))] p-5 shadow-[0_32px_130px_rgba(14,165,233,0.14)] sm:p-8 lg:grid-cols-[0.92fr_1.08fr] lg:p-10">
          <div className="flex flex-col justify-between gap-10">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-cyan-200">
                Proposition gratuite
              </p>
              <h2 className="text-balance text-3xl font-semibold leading-tight sm:text-5xl">
                Vous avez déjà une idée ? Transformons-la en site web.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
                Parlez-nous de votre projet et recevez une première proposition
                adaptée à vos besoins.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {["Simple", "Rapide", "Adapté"].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.06] p-4"
                >
                  <Check className="mb-3 size-5 text-cyan-300" aria-hidden="true" />
                  <p className="font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <LeadForm />
        </div>
      </section>

      <motion.section
        {...motionProps}
        className="relative mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 lg:px-10"
      >
        <div className="overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.045] p-7 text-center sm:p-10 lg:p-14">
          <div className="mx-auto mb-7 flex size-16 items-center justify-center rounded-3xl bg-cyan-300 text-slate-950">
            <MessageCircle className="size-8" aria-hidden="true" />
          </div>
          <h2 className="text-balance text-3xl font-semibold leading-tight sm:text-5xl">
            Vous préférez en discuter directement ?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Expliquez-nous votre projet sur WhatsApp et échangeons sur la
            meilleure solution pour votre activité.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 h-14 rounded-full bg-white px-7 text-base text-slate-950 hover:bg-cyan-100"
            onClick={() =>
              trackConversion("whatsapp_click", { placement: "final_cta" })
            }
          >
            <a href={SITE_CONFIG.whatsappUrl} target="_blank" rel="noreferrer">
              Discuter de mon projet sur WhatsApp
              <MessageCircle className="size-5" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </motion.section>

      <Footer />
      <MobileStickyCta />
    </main>
  );
}

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-[#050914]/78 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <a href="#accueil" className="flex items-center gap-3" aria-label="Accueil">
          <span className="flex size-10 items-center justify-center rounded-2xl bg-cyan-300 text-sm font-black text-slate-950">
            EG
          </span>
          <span className="text-lg font-semibold tracking-normal">
            {SITE_CONFIG.brand}
          </span>
        </a>
        <div className="hidden items-center gap-7 text-sm text-slate-300 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
        <Button
          asChild
          className="hidden h-11 rounded-full bg-white px-5 text-slate-950 hover:bg-cyan-100 md:inline-flex"
          onClick={() =>
            trackConversion("proposal_cta_click", { placement: "nav" })
          }
        >
          <a href="#contact">Recevoir ma proposition</a>
        </Button>
        <Button
          asChild
          size="icon"
          variant="outline"
          className="rounded-full border-white/12 bg-white/5 text-white hover:bg-white/10 md:hidden"
        >
          <a href="#contact" aria-label="Recevoir ma proposition">
            <Send className="size-4" aria-hidden="true" />
          </a>
        </Button>
      </nav>
    </header>
  );
}

function BrowserShowcase({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 28 }}
      animate={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
      className="relative z-10 mx-auto w-full max-w-[620px] lg:ml-auto"
    >
      <div className="absolute -left-8 top-16 hidden rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-cyan-50 shadow-2xl backdrop-blur md:block">
        <div className="flex items-center gap-2">
          <MousePointer2 className="size-4 text-cyan-300" aria-hidden="true" />
          Demande envoyée
        </div>
      </div>
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-2 bottom-14 hidden rounded-3xl border border-cyan-300/20 bg-slate-950/84 p-4 shadow-[0_24px_80px_rgba(34,211,238,0.16)] backdrop-blur md:block"
      >
        <div className="mb-3 flex items-center gap-2 text-sm text-slate-200">
          <BarChart3 className="size-4 text-cyan-300" aria-hidden="true" />
          Prospects
        </div>
        <div className="flex h-24 items-end gap-2">
          {[42, 60, 48, 82, 72, 96].map((height) => (
            <span
              key={height}
              className="w-7 rounded-t-xl bg-gradient-to-t from-cyan-500 to-cyan-200"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </motion.div>
      <div className="relative overflow-hidden rounded-[34px] border border-white/12 bg-white/[0.055] p-3 shadow-[0_34px_140px_rgba(0,0,0,0.42)] backdrop-blur">
        <div className="rounded-[28px] border border-white/10 bg-[#07101f]">
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <span className="size-3 rounded-full bg-rose-400" />
            <span className="size-3 rounded-full bg-amber-300" />
            <span className="size-3 rounded-full bg-emerald-300" />
            <span className="ml-3 h-7 flex-1 rounded-full bg-white/7" />
          </div>
          <div className="grid gap-4 p-4 sm:grid-cols-[0.95fr_1.05fr]">
            <div className="rounded-3xl bg-gradient-to-br from-cyan-300 via-blue-500 to-violet-500 p-[1px]">
              <div className="h-full rounded-3xl bg-slate-950 p-5">
                <p className="mb-4 text-sm text-cyan-200">Page d&apos;accueil</p>
                <div className="space-y-3">
                  <span className="block h-5 w-11/12 rounded-full bg-white/18" />
                  <span className="block h-5 w-7/12 rounded-full bg-white/18" />
                  <span className="block h-3 w-10/12 rounded-full bg-white/10" />
                  <span className="block h-3 w-8/12 rounded-full bg-white/10" />
                </div>
                <div className="mt-6 h-12 rounded-2xl bg-cyan-300" />
                <div className="mt-6 grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((item) => (
                    <span key={item} className="h-16 rounded-2xl bg-white/8" />
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Conversion</span>
                  <span className="rounded-full bg-emerald-300/12 px-3 py-1 text-xs text-emerald-200">
                    +38%
                  </span>
                </div>
                <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
                  <motion.span
                    initial={reduceMotion ? false : { width: "22%" }}
                    animate={reduceMotion ? undefined : { width: "76%" }}
                    transition={{ duration: 1.2, delay: 0.4 }}
                    className="block h-full rounded-full bg-cyan-300"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-4">
                  <Code2
                    className="mb-4 size-5 text-cyan-300"
                    aria-hidden="true"
                  />
                  <span className="block h-2.5 w-16 rounded-full bg-white/16" />
                  <span className="mt-3 block h-2.5 w-24 rounded-full bg-white/10" />
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-4">
                  <PenTool
                    className="mb-4 size-5 text-violet-300"
                    aria-hidden="true"
                  />
                  <span className="block h-2.5 w-14 rounded-full bg-white/16" />
                  <span className="mt-3 block h-2.5 w-20 rounded-full bg-white/10" />
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.055] p-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-2xl bg-cyan-300 text-slate-950">
                    <Search className="size-5" aria-hidden="true" />
                  </span>
                  <div className="flex-1">
                    <span className="block h-2.5 w-3/4 rounded-full bg-white/16" />
                    <span className="mt-2 block h-2.5 w-1/2 rounded-full bg-white/10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectPreview({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  return (
    <div
      className={`relative min-h-[260px] overflow-hidden bg-gradient-to-br ${project.color} p-5`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.32),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(34,211,238,0.24),transparent_28%)]" />
      <div className="relative rounded-[24px] border border-white/18 bg-slate-950/80 p-4 shadow-2xl transition duration-300 group-hover:scale-[1.015]">
        <div className="mb-4 flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-rose-300" />
          <span className="size-2.5 rounded-full bg-amber-200" />
          <span className="size-2.5 rounded-full bg-emerald-300" />
          <span className="ml-2 h-6 flex-1 rounded-full bg-white/10" />
        </div>
        <div className="grid gap-4 sm:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-3">
            <span className="block h-4 w-11/12 rounded-full bg-white/22" />
            <span className="block h-4 w-8/12 rounded-full bg-white/22" />
            <span className="block h-3 w-10/12 rounded-full bg-white/12" />
            <span className="block h-10 w-32 rounded-2xl bg-cyan-300" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[0, 1, 2, 3].map((item) => (
              <span
                key={item}
                className={`h-20 rounded-2xl ${
                  (item + index) % 2 === 0 ? "bg-white/16" : "bg-cyan-300/22"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
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
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
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
      className="rounded-[28px] border border-white/12 bg-white/[0.075] p-5 shadow-[0_22px_90px_rgba(0,0,0,0.25)] backdrop-blur sm:p-6"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field error={errors.name} className="sm:col-span-1">
          <Label htmlFor="name" className="text-slate-100">
            Nom et prénom
          </Label>
          <Input
            id="name"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            className="mt-2 h-12 rounded-2xl border-white/12 bg-slate-950/45 text-white placeholder:text-slate-500"
            placeholder="Votre nom"
          />
        </Field>
        <Field error={errors.phone} className="sm:col-span-1">
          <Label htmlFor="phone" className="text-slate-100">
            Téléphone / WhatsApp
          </Label>
          <Input
            id="phone"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            aria-invalid={Boolean(errors.phone)}
            inputMode="tel"
            className="mt-2 h-12 rounded-2xl border-white/12 bg-slate-950/45 text-white placeholder:text-slate-500"
            placeholder="+212 6 00 00 00 00"
          />
        </Field>
        <Field error={errors.siteType} className="sm:col-span-2">
          <Label htmlFor="site-type" className="text-slate-100">
            Type de site
          </Label>
          <Select
            value={form.siteType}
            onValueChange={(value) => updateField("siteType", value)}
          >
            <SelectTrigger
              id="site-type"
              aria-invalid={Boolean(errors.siteType)}
              className="mt-2 h-12 w-full rounded-2xl border-white/12 bg-slate-950/45 text-white"
            >
              <SelectValue placeholder="Choisissez une option" />
            </SelectTrigger>
            <SelectContent className="border-white/10 bg-slate-950 text-white">
              {siteTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field error={errors.description} className="sm:col-span-2">
          <Label htmlFor="description" className="text-slate-100">
            Parlez-nous rapidement de votre projet
          </Label>
          <Textarea
            id="description"
            value={form.description}
            onChange={(event) => updateField("description", event.target.value)}
            aria-invalid={Boolean(errors.description)}
            className="mt-2 min-h-32 rounded-2xl border-white/12 bg-slate-950/45 text-white placeholder:text-slate-500"
            placeholder="Exemple : je veux présenter mon activité et recevoir plus de demandes de contact."
          />
        </Field>
      </div>
      {status === "success" ? (
        <div className="mt-5 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 p-4 text-sm text-emerald-100">
          Votre demande est bien reçue. Nous reviendrons vers vous rapidement
          avec une proposition adaptée.
        </div>
      ) : null}
      {status === "error" && Object.keys(errors).length === 0 ? (
        <div className="mt-5 rounded-2xl border border-rose-300/20 bg-rose-300/10 p-4 text-sm text-rose-100">
          Une erreur est survenue. Vous pouvez réessayer ou nous écrire
          directement sur WhatsApp.
        </div>
      ) : null}
      <Button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 h-14 w-full rounded-full bg-cyan-300 text-base font-semibold text-slate-950 hover:bg-cyan-200"
      >
        {status === "loading"
          ? "Envoi en cours..."
          : "Recevoir ma proposition gratuite"}
        <ArrowRight className="size-5" aria-hidden="true" />
      </Button>
      <p className="mt-4 text-center text-xs leading-5 text-slate-400">
        Vos informations sont utilisées uniquement pour vous recontacter au
        sujet de votre projet.
      </p>
    </form>
  );
}

function Field({
  children,
  error,
  className,
}: {
  children: React.ReactNode;
  error?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      {children}
      {error ? <p className="mt-2 text-sm text-rose-200">{error}</p> : null}
    </div>
  );
}

function validateLead(form: LeadPayload) {
  const errors: FieldErrors = {};
  if (form.name.trim().length < 2) {
    errors.name = "Indiquez votre nom complet.";
  }
  if (form.phone.trim().length < 8) {
    errors.phone = "Ajoutez un numéro valide pour vous recontacter.";
  }
  if (!form.siteType) {
    errors.siteType = "Choisissez le type de site souhaité.";
  }
  if (form.description.trim().length < 12) {
    errors.description = "Ajoutez quelques détails sur votre projet.";
  }
  return errors;
}

function Footer() {
  return (
    <footer className="relative border-t border-white/10 px-5 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-2xl bg-cyan-300 text-sm font-black text-slate-950">
            EG
          </span>
          <div>
            <p className="font-semibold">{SITE_CONFIG.brand}</p>
            <p className="text-sm text-slate-400">
              Création de sites web au Maroc
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-5 text-sm text-slate-300">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-white">
              {link.label}
            </a>
          ))}
          <a href="#contact" className="hover:text-white">
            Contact
          </a>
          <span className="text-slate-400">
            Politique de confidentialité
          </span>
        </div>
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} {SITE_CONFIG.brand}. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}

function MobileStickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-slate-950/92 p-3 backdrop-blur md:hidden">
      <Button
        asChild
        className="h-12 w-full rounded-full bg-cyan-300 font-semibold text-slate-950 hover:bg-cyan-200"
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

function SiteBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:72px_72px] opacity-[0.18]" />
      <div className="absolute left-1/2 top-0 h-[540px] w-[820px] -translate-x-1/2 rounded-full bg-cyan-500/16 blur-[130px]" />
      <div className="absolute right-[-180px] top-[28%] h-[500px] w-[500px] rounded-full bg-violet-500/12 blur-[130px]" />
      <div className="absolute bottom-[-220px] left-[-120px] h-[520px] w-[520px] rounded-full bg-blue-500/14 blur-[140px]" />
    </div>
  );
}
