"use client";

import { type FormEvent, type ReactNode, createContext, useContext, useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Gauge,
  Globe,
  LayoutTemplate,
  type LucideIcon,
  Mail,
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
import { type Dictionary, type Locale, dictionaries } from "@/lib/i18n";

type FieldErrors = Partial<Record<keyof LeadPayload | "email" | "contactMethod", string>>;

const serviceIcons: LucideIcon[] = [LayoutTemplate, ShoppingBag, Target, Sparkles];

const projectPalettes = [
  "from-[#e2f7ee] via-[#fff1d8] to-[#ffe6d7]",
  "from-[#fff8e7] via-[#e7edff] to-[#dff6ee]",
  "from-[#ffe0d2] via-[#fff0bd] to-[#e2f7ee]",
  "from-[#ddf7ee] via-[#fff7ea] to-[#ffe6d7]",
];

const LocaleContext = createContext<{ locale: Locale; t: Dictionary }>({
  locale: "fr",
  t: dictionaries.fr,
});

function useLocale() {
  return useContext(LocaleContext);
}

import { motion, AnimatePresence, animate, useInView, useScroll, useTransform, useReducedMotion, Variants } from "framer-motion";
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
        <span key={i} className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em]" style={{ verticalAlign: "top" }}>
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

export default function SitePage({ locale }: { locale: Locale }) {
  const t = dictionaries[locale];

  useEffect(() => {
    document.documentElement.lang = t.htmlLang;
  }, [t.htmlLang]);

  return (
    <LocaleContext.Provider value={{ locale, t }}>
      <Home />
    </LocaleContext.Provider>
  );
}

function Home() {
  const { t } = useLocale();
  const reduceMotion = useReducedMotion();
  const { fadeUpVariant, staggerContainer, sectionVariant } = getAnimationVariants(reduceMotion);

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
            <TextReveal className="max-w-4xl text-balance text-5xl font-semibold leading-[0.92] tracking-normal sm:text-6xl lg:text-7xl">
              {t.hero.title}
            </TextReveal>
            <motion.p 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}
              className="mt-6 max-w-2xl text-base leading-7 text-[#5f665d] sm:text-lg sm:leading-8"
            >
              {t.hero.description}
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
                  {t.cta.proposal}
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
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.div variants={fadeUpVariant} className="max-w-3xl">
            <SectionEyebrow>{t.solutions.eyebrow}</SectionEyebrow>
            <TextReveal as="h2" className="text-balance text-4xl font-semibold leading-[0.96] sm:text-5xl">
              {t.solutions.title}
            </TextReveal>
          </motion.div>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} className="mt-9 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {t.solutions.items.map((service, index) => (
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
          {t.highlights.map((point) => (
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
                {t.pitch.title}
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/68">
                {t.pitch.p1}
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/78">
                {t.pitch.p2}
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
          <SectionEyebrow>{t.projects.eyebrow}</SectionEyebrow>
          <h2 className="text-balance text-4xl font-semibold leading-[0.96] sm:text-5xl">
            {t.projects.title}
          </h2>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-9 grid gap-4 lg:grid-cols-2">
          {t.projects.items.map((project, index) => (
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
            {t.process.title}
          </TextReveal>
        </motion.div>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-20%" }} className="grid gap-3">
          {t.process.steps.map((step, index) => (
            <motion.article
              key={step.title}
              variants={fadeUpVariant}
              className="grid gap-4 rounded-[26px_8px_26px_8px] border border-[#e2d8c9] bg-white p-5 sm:grid-cols-[5rem_1fr]"
            >
              <p className="text-4xl font-semibold leading-none text-[#ff6b4a]">
                {String(index + 1).padStart(2, "0")}
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
          <SectionEyebrow dark>{t.contact.eyebrow}</SectionEyebrow>
          <h2 className="text-balance text-4xl font-semibold leading-[0.96] sm:text-5xl">
            {t.contact.title}
          </h2>
          <p className="mt-5 max-w-md leading-7 text-white/68">
            {t.contact.description}
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
  const { t } = useLocale();
  return (
    <div className="relative pb-8 pt-4 lg:pb-10 lg:pt-0">
      <div
        aria-hidden="true"
        className="hero-blob absolute -right-10 top-4 size-56 rounded-full bg-[#18c6a4]/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="hero-blob absolute -left-12 bottom-10 size-56 rounded-full bg-[#ffb45f]/25 blur-3xl"
      />
      <div className="relative mx-auto max-w-[540px]">
        <img
          src="/hero-engigrowth.png"
          decoding="async"
          alt={t.hero.imageAlt}
          className="w-full rounded-[28px] object-contain ring-1 ring-black/5 shadow-[0_30px_80px_-30px_rgba(23,33,28,0.35)]"
        />

        <div className="hero-reveal hero-glass hero-delay-1 absolute -left-2 top-12 hidden lg:-left-5 rounded-2xl border border-white/60 bg-white/70 px-4 py-3 shadow-[0_10px_30px_-10px_rgba(23,33,28,0.2)] backdrop-blur-xl md:block">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-[14px_4px_14px_4px] bg-[#fff1d8]">
              <Search className="size-4 text-[#ff6b4a]" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-semibold">{t.hero.cardMessage}</p>
              <p className="text-xs text-[#6b776f]">{t.hero.cardMessageSub}</p>
            </div>
          </div>
        </div>

        <div className="hero-reveal hero-glass hero-delay-2 absolute -right-2 top-28 hidden lg:-right-4 rounded-full bg-[#17211c]/85 px-4 py-2.5 text-sm font-medium text-white shadow-[0_10px_30px_-10px_rgba(23,33,28,0.4)] backdrop-blur-xl md:block">
          {t.hero.cardDesign}
        </div>

        <div className="hero-reveal hero-glass hero-delay-3 absolute -right-2 bottom-20 hidden lg:-right-3 rounded-full border border-white/60 bg-white/70 px-4 py-2.5 text-sm font-medium text-[#17211c] shadow-[0_10px_30px_-10px_rgba(23,33,28,0.2)] backdrop-blur-xl md:block">
          {t.hero.cardConvert}
        </div>

        <div className="hero-reveal hero-glass hero-delay-4 absolute -bottom-24 left-4 hidden w-64 lg:left-6 lg:w-72 rounded-3xl border border-white/60 bg-white/70 p-3 shadow-[0_20px_50px_-20px_rgba(23,33,28,0.3)] backdrop-blur-xl md:block">
          <div className="mb-3 flex items-center gap-2 border-b border-[#e2d8c9] pb-2">
            <span className="size-2.5 rounded-full bg-[#ff6b4a]" />
            <span className="size-2.5 rounded-full bg-[#ffb45f]" />
            <span className="size-2.5 rounded-full bg-[#18c6a4]" />
            <span className="ml-2 text-xs font-semibold text-[#6b776f]">
              {t.hero.cardBrowser}
            </span>
          </div>
          <div className="rounded-2xl bg-[#17211c] p-4 text-white">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-white/55">{t.hero.cardActivity}</p>
                <p className="mt-1 text-lg font-semibold leading-tight">
                  {t.hero.cardHeadline}
                </p>
              </div>
              <span className="rounded-full bg-[#ff6b4a] px-3 py-1 text-xs font-semibold">
                {t.hero.cardCta}
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
                  <motion.span
                    key={`${height}-${index}`}
                    className={`flex-1 origin-bottom rounded-t-md ${
                      index % 2 === 0 ? "bg-[#ffb45f]" : "bg-[#18c6a4]"
                    }`}
                    style={{ height: `${height}%` }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: [0, 1, 1, 0.82, 1] }}
                    transition={{
                      duration: 5,
                      times: [0, 0.2, 0.5, 0.75, 1],
                      delay: 1 + index * 0.12,
                      ease: [0.22, 1, 0.36, 1],
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 md:hidden">
        {t.hero.chips.map((item, index) => (
          <span
            key={item}
            className="hero-reveal rounded-2xl border border-white/60 bg-white/70 px-3 py-3 text-center text-xs font-medium shadow-sm backdrop-blur-xl"
            style={{ animationDelay: `${index * 0.7}s` }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function LanguageSwitch() {
  const { locale } = useLocale();
  const options: { code: Locale; label: string; href: string; name: string }[] = [
    { code: "fr", label: "FR", href: "/", name: "Français" },
    { code: "en", label: "EN", href: "/en", name: "English" },
  ];

  return (
    <div
      role="group"
      aria-label="Language"
      className="relative ml-auto flex items-center gap-1 rounded-full border border-[#e2d8c9] bg-white/80 p-1 shadow-sm backdrop-blur md:ml-0"
    >
      <Globe className="ml-2 size-3.5 text-[#6b776f]" aria-hidden="true" />
      <div className="relative grid grid-cols-2">
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-1/2 rounded-full bg-[#17211c] shadow-sm transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateX(${locale === "fr" ? 0 : 100}%)` }}
        />
        {options.map((option) => (
          <a
            key={option.code}
            href={option.href}
            hrefLang={option.code}
            lang={option.code}
            title={option.name}
            aria-label={option.name}
            aria-current={locale === option.code ? "true" : undefined}
            className={`relative z-10 px-3 py-1.5 text-center text-xs font-semibold tracking-wide transition-colors duration-300 ${
              locale === option.code ? "text-white" : "text-[#53605a] hover:text-[#17211c]"
            }`}
          >
            {option.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function Header() {
  const { locale, t } = useLocale();
  const navLinks = [
    { label: t.nav.services, href: "#services" },
    { label: t.nav.projects, href: "#realisations" },
    { label: t.nav.method, href: "#processus" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="bg-[#17211c] px-5 py-2 text-center text-xs font-semibold text-[#fff7ea]">
        {t.topBanner}
      </div>
      <nav className="border-b border-[#e2d8c9]/80 bg-[#fbf7ef]/86 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <a href="#accueil" className="flex items-center gap-3" aria-label={t.homeLabel}>
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
          <LanguageSwitch />
          <Button
            asChild
            className="hidden h-10 rounded-full bg-[#17211c] px-5 text-white hover:bg-[#2b372f] md:inline-flex"
            onClick={() =>
              trackConversion("proposal_cta_click", { placement: "nav" })
            }
          >
            <a href="#contact">{t.cta.proposal}</a>
          </Button>
          <Button
            asChild
            size="icon"
            variant="outline"
            className="rounded-full border-[#e2d8c9] bg-white text-[#17211c] hover:bg-[#17211c] hover:text-white md:hidden"
          >
            <a href="#contact" aria-label={t.cta.proposal}>
              <Send className="size-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </nav>
    </header>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: Dictionary["solutions"]["items"][number];
  index: number;
}) {
  const Icon = serviceIcons[index];
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
        <Icon className="mb-8 size-7 transition-transform duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-110" aria-hidden="true" />
        <p className="text-sm leading-6 text-[#5f665d]">{service.description}</p>
      </div>
    </motion.article>
  );
}

function CountUp({ to, delay = 0 }: { to: number; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.4,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, delay]);

  return <span ref={ref}>{n}</span>;
}

function VisibilityChart() {
  const { t } = useLocale();
  const rows = t.chart.rows;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="font-semibold">{t.chart.title}</p>
          <p className="text-xs text-[#6b776f]">{t.chart.subtitle}</p>
        </div>
        <span className="rounded-full bg-[#ffe6d7] px-3 py-1 text-xs font-semibold text-[#a3422e]">
          {t.chart.badge}
        </span>
      </div>
      <div className="space-y-4">
        {rows.map(([label, value], index) => (
          <div key={label} className="grid gap-3 sm:grid-cols-[11rem_1fr_3rem]">
            <p className="text-sm font-medium">{label}</p>
            <div className="h-3 overflow-hidden rounded-full bg-[#f3eadc]">
              <motion.span
                className={`block h-full origin-left rounded-full ${index % 2 === 0 ? "bg-[#18c6a4]" : "bg-[#ff6b4a]"}`}
                style={{ width: `${value}%` }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.4, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <p className="text-sm tabular-nums text-[#6b776f]">
              <CountUp to={value} delay={index * 0.12} />%
            </p>
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
  project: Dictionary["projects"]["items"][number];
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
      <div className={`relative min-h-[260px] overflow-hidden rounded-[22px_6px_22px_6px] bg-gradient-to-br ${projectPalettes[index]} p-5`}>
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

type FormData = {
  name: string;
  email: string;
  phone: string;
  siteType: string;
  description: string;
  contactMethod: "whatsapp" | "email" | "";
};

function LeadForm() {
  const { t } = useLocale();
  const f = t.form;
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    siteType: "",
    description: "",
    contactMethod: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [hasStarted, setHasStarted] = useState(false);

  function startForm() {
    if (!hasStarted) {
      setHasStarted(true);
      trackConversion("lead_form_start");
    }
  }

  function updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((c) => ({ ...c, [key]: value }));
    setErrors((c) => {
      const next = { ...c };
      delete next[key as string];
      return next;
    });
  }

  function goToStep2(e: FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 2) errs.name = f.errors.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = f.errors.email;
    if (form.phone.trim().length < 8) errs.phone = f.errors.phone;
    if (!form.siteType) errs.siteType = f.errors.siteType;
    if (form.description.trim().length < 12) errs.description = f.errors.description;
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setStep(2);
  }

  async function onSubmit() {
    if (!form.contactMethod) {
      setErrors({ contactMethod: f.errors.contactMethod });
      return;
    }
    setStatus("loading");
    try {
      await submitLead({
        name: form.name,
        email: form.email,
        phone: form.phone,
        siteType: form.siteType,
        description: form.description,
        contactMethod: form.contactMethod as "whatsapp" | "email",
      });
      trackConversion("lead_form_submit", { site_type: form.siteType });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  // ── Success screen ──────────────────────────────────────────────────────────
  if (status === "success") {
    const byWhatsApp = form.contactMethod === "whatsapp";
    const whatsappText = encodeURIComponent(f.whatsappMessage(form.name, form.siteType));
    const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${whatsappText}`;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-[30px_10px_30px_10px] border border-[#e2d8c9] bg-white p-5 text-[#17211c] shadow-[0_22px_80px_rgba(72,48,30,0.12)] sm:p-7"
      >
        {/* Animated check */}
        <div className="flex flex-col items-center py-6 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.1, duration: 0.7, type: "spring", stiffness: 200 }}
            className="mb-5 flex size-20 items-center justify-center rounded-full bg-[#18c6a4]/15"
          >
            <CheckCircle2 className="size-10 text-[#18c6a4]" />
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-2xl font-semibold"
          >
            {f.success.title}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 max-w-sm text-sm leading-6 text-[#53605a]"
          >
            {byWhatsApp
              ? f.success.whatsapp
              : f.success.email(form.email)}
          </motion.p>



          {!byWhatsApp && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 flex items-center gap-2 rounded-[12px] border border-[#e2d8c9] bg-[#fffaf2] px-4 py-3 text-sm"
            >
              <Mail className="size-4 shrink-0 text-[#ff6b4a]" />
              <span className="text-[#53605a]">
                {f.success.checkInbox}
              </span>
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  }

  // ── Form ────────────────────────────────────────────────────────────────────
  return (
    <div
      onFocus={startForm}
      className="rounded-[30px_10px_30px_10px] border border-[#e2d8c9] bg-white text-[#17211c] shadow-[0_22px_80px_rgba(72,48,30,0.12)] overflow-hidden"
    >
      {/* Progress bar */}
      <div className="h-1 bg-[#f3eadc]">
        <motion.div
          className="h-full bg-[#ff6b4a]"
          animate={{ width: step === 1 ? "50%" : "100%" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="p-5 sm:p-7">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#6b776f]">
              {f.step} {step} / 2
            </p>
            <h3 className="mt-2 text-2xl font-semibold">
              {step === 1 ? f.stepTitle1 : f.stepTitle2}
            </h3>
          </div>
          <span className="hidden size-12 items-center justify-center rounded-[18px_6px_18px_6px] bg-[#18c6a4] sm:flex">
            {step === 1
              ? <Send className="size-5 text-white" aria-hidden="true" />
              : <MessageCircle className="size-5 text-white" aria-hidden="true" />}
          </span>
        </div>

        {/* Step 1 */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.form
              key="step1"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onSubmit={goToStep2}
              noValidate
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field error={errors.name}>
                  <Label htmlFor="name">{f.name}</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    className="mt-2 h-12 rounded-[14px_5px_14px_5px] border-[#e2d8c9] bg-[#fffaf2]"
                    placeholder={f.namePlaceholder}
                  />
                </Field>
                <Field error={errors.phone}>
                  <Label htmlFor="phone">{f.phone}</Label>
                  <Input
                    id="phone"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    aria-invalid={Boolean(errors.phone)}
                    inputMode="tel"
                    className="mt-2 h-12 rounded-[14px_5px_14px_5px] border-[#e2d8c9] bg-[#fffaf2]"
                    placeholder="+212 6 00 00 00 00"
                  />
                </Field>
                <Field error={errors.email} className="sm:col-span-2">
                  <Label htmlFor="email">{f.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    className="mt-2 h-12 rounded-[14px_5px_14px_5px] border-[#e2d8c9] bg-[#fffaf2]"
                    placeholder={f.emailPlaceholder}
                  />
                </Field>
                <Field error={errors.siteType} className="sm:col-span-2">
                  <Label htmlFor="site-type">{f.siteType}</Label>
                  <Select value={form.siteType} onValueChange={(v) => updateField("siteType", v)}>
                    <SelectTrigger id="site-type" aria-invalid={Boolean(errors.siteType)} className="mt-2 h-12 w-full rounded-[14px_5px_14px_5px] border-[#e2d8c9] bg-[#fffaf2]">
                      <SelectValue placeholder={f.siteTypePlaceholder} />
                    </SelectTrigger>
                    <SelectContent className="border-[#e2d8c9] bg-white text-[#17211c]">
                      {f.siteTypes.map((type, i) => (
                        <SelectItem key={type} value={dictionaries.fr.form.siteTypes[i]}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field error={errors.description} className="sm:col-span-2">
                  <Label htmlFor="description">{f.description}</Label>
                  <Textarea
                    id="description"
                    value={form.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    aria-invalid={Boolean(errors.description)}
                    className="mt-2 min-h-32 rounded-[14px_5px_14px_5px] border-[#e2d8c9] bg-[#fffaf2]"
                    placeholder={f.descriptionPlaceholder}
                  />
                </Field>
              </div>
              <Button
                type="submit"
                className="mt-6 h-14 w-full rounded-full bg-[#17211c] text-base font-semibold text-white hover:bg-[#2b372f]"
              >
                {f.continue}
                <ArrowRight className="size-5" aria-hidden="true" />
              </Button>
            </motion.form>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="mb-4 text-sm text-[#53605a]">
                {f.howToReceive}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {/* WhatsApp option */}
                <button
                  type="button"
                  onClick={() => updateField("contactMethod", "whatsapp")}
                  className={`group flex flex-col gap-3 rounded-[20px_7px_20px_7px] border-2 p-5 text-left transition-all duration-300 ${
                    form.contactMethod === "whatsapp"
                      ? "border-[#25D366] bg-[#e8faf0]"
                      : "border-[#e2d8c9] bg-[#fffaf2] hover:border-[#25D366]/50"
                  }`}
                >
                  <span className={`flex size-11 items-center justify-center rounded-[14px_4px_14px_4px] transition-colors ${form.contactMethod === "whatsapp" ? "bg-[#25D366]" : "bg-[#e2faf0]"}`}>
                    <MessageCircle className={`size-5 ${form.contactMethod === "whatsapp" ? "text-white" : "text-[#25D366]"}`} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-semibold">WhatsApp</p>
                    <p className="mt-1 text-xs leading-5 text-[#6b776f]">{f.whatsappHint}</p>
                  </div>
                  {form.contactMethod === "whatsapp" && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-3 right-3">
                      <CheckCircle2 className="size-5 text-[#25D366]" />
                    </motion.div>
                  )}
                </button>

                {/* Email option */}
                <button
                  type="button"
                  onClick={() => updateField("contactMethod", "email")}
                  className={`group flex flex-col gap-3 rounded-[20px_7px_20px_7px] border-2 p-5 text-left transition-all duration-300 ${
                    form.contactMethod === "email"
                      ? "border-[#ff6b4a] bg-[#fff5f2]"
                      : "border-[#e2d8c9] bg-[#fffaf2] hover:border-[#ff6b4a]/50"
                  }`}
                >
                  <span className={`flex size-11 items-center justify-center rounded-[14px_4px_14px_4px] transition-colors ${form.contactMethod === "email" ? "bg-[#ff6b4a]" : "bg-[#ffe6d7]"}`}>
                    <Mail className={`size-5 ${form.contactMethod === "email" ? "text-white" : "text-[#ff6b4a]"}`} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-semibold">{f.emailLabel}</p>
                    <p className="mt-1 text-xs leading-5 text-[#6b776f]">{f.emailHint}</p>
                  </div>
                </button>
              </div>

              {errors.contactMethod && (
                <p className="mt-3 text-sm text-[#b72f51]">{errors.contactMethod}</p>
              )}
              {status === "error" && (
                <div className="mt-4 rounded-[8px] border border-[#f0bcc9] bg-[#fff0f4] p-4 text-sm text-[#a83c58]">
                  {f.genericError}
                </div>
              )}

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="h-14 rounded-full border border-[#e2d8c9] bg-white px-5 text-sm font-semibold text-[#17211c] transition hover:bg-[#f3eadc]"
                >
                  {f.back}
                </button>
                <motion.button
                  type="button"
                  onClick={onSubmit}
                  disabled={status === "loading"}
                  className="relative flex h-14 flex-1 items-center justify-center overflow-hidden rounded-full bg-[#17211c] text-base font-semibold text-white disabled:opacity-70"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.25 }}
                >
                  <AnimatePresence mode="wait">
                    {status === "loading" ? (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                      >
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          className="block size-5 rounded-full border-2 border-white/30 border-t-white"
                        />
                        {f.sending}
                      </motion.span>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                      >
                        {f.submit}
                        <ArrowRight className="size-5" aria-hidden="true" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
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



function Footer() {
  const { t } = useLocale();
  return (
    <footer className="relative overflow-hidden border-t border-[#e2d8c9] bg-[#fff1d8] px-5 pb-[calc(6.5rem+env(safe-area-inset-bottom))] pt-16 sm:px-8 md:pb-8 lg:px-10">
      <div className="mx-auto grid w-full max-w-7xl gap-10 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="max-w-md text-4xl font-semibold leading-[0.96]">
            {t.footer.title}
          </h2>
          <Button
            asChild
            className="mt-7 h-11 rounded-full bg-[#ff6b4a] px-5 font-semibold text-white hover:bg-[#ec5738]"
            onClick={() =>
              trackConversion("proposal_cta_click", { placement: "footer" })
            }
          >
            <a href="#contact">{t.cta.startBrief}</a>
          </Button>
          <div className="mt-6 flex items-center gap-3">
            {[
              { name: "Instagram", href: SITE_CONFIG.instagramUrl, icon: <InstagramIcon /> },
              { name: "LinkedIn", href: SITE_CONFIG.linkedinUrl, icon: <LinkedinIcon /> },
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                title={social.name}
                className="flex size-11 items-center justify-center rounded-full border border-[#17211c]/15 bg-white/70 text-[#17211c] transition duration-300 hover:-translate-y-0.5 hover:border-[#17211c] hover:bg-[#17211c] hover:text-white"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          <FooterColumn
            title={SITE_CONFIG.brand}
            links={[
              { label: t.nav.services, href: "#services" },
              { label: t.nav.projects, href: "#realisations" },
              { label: t.nav.method, href: "#processus" },
              { label: t.nav.contact, href: "#contact" },
            ]}
          />
          <FooterColumn
            title={t.footer.siteTypesColumn}
            links={t.footer.siteTypeLinks.map((label) => ({ label, href: "#services" }))}
          />
          <FooterColumn
            title={t.footer.supportColumn}
            links={[
              { label: t.footer.proposal, href: "#contact" },
              { label: t.footer.privacy, href: "#contact" },
            ]}
          />
        </div>
      </div>
      <div className="mx-auto mt-16 w-full max-w-7xl">
        <div className="flex flex-col gap-5 border-t border-[#e2d8c9] pt-6 text-xs text-[#6b776f] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE_CONFIG.brand}. {t.footer.rights}</p>
          <p>{t.footer.tagline}</p>
        </div>
      </div>
      <p aria-hidden="true" className="pointer-events-none mt-10 select-none text-center text-[13vw] font-black leading-[0.85] tracking-normal text-[#17211c] md:text-[clamp(4rem,16vw,13rem)] md:leading-[0.72]">
        {t.bigText[0]}<br className="md:hidden" /> {t.bigText[1]}
      </p>
    </footer>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11.5H3V9.75Zm6.5 0h3.83v1.57h.06c.53-1 1.84-2.07 3.78-2.07 4.04 0 4.78 2.66 4.78 6.1v5.9h-4v-5.23c0-1.25-.02-2.85-1.74-2.85-1.74 0-2 1.36-2 2.76v5.32h-4V9.75Z" />
    </svg>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold">{title}</h3>
      <div className="grid gap-2 text-sm text-[#53605a]">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="transition hover:text-[#17211c]"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function MobileStickyCta() {
  const { t } = useLocale();
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
          {t.cta.proposalFree}
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
