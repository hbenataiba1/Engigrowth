export type Locale = "fr" | "en";

export const LOCALES: Locale[] = ["fr", "en"];

type Card = { title: string; description: string; tag: string };

export type Dictionary = {
  htmlLang: string;
  ogLocale: string;
  meta: { title: string; description: string; ogDescription: string; keywords: string[] };
  topBanner: string;
  nav: { services: string; projects: string; method: string; contact: string };
  homeLabel: string;
  switchLabel: string;
  switchShort: string;
  switchHref: string;
  cta: { proposal: string; proposalFree: string };
  hero: {
    title: string;
    description: string;
    imageAlt: string;
    imageTitle: string;
    cardMessage: string;
    cardMessageSub: string;
    cardDesign: string;
    cardConvert: string;
    cardBrowser: string;
    cardActivity: string;
    cardHeadline: string;
    cardCta: string;
    chips: [string, string, string];
  };
  solutions: { eyebrow: string; title: string; items: [Card, Card, Card, Card] };
  highlights: [string, string, string, string];
  pitch: { title: string; p1: string; p2: string };
  chart: { title: string; subtitle: string; badge: string; rows: [string, number][] };
  projects: {
    eyebrow: string;
    title: string;
    items: {
      name: string;
      industry: string;
      description: string;
      image?: { alt: string; title: string; caption: string };
    }[];
  };
  process: {
    title: string;
    steps: { title: string; description: string }[];
  };
  contact: { eyebrow: string; title: string; description: string };
  form: {
    step: string;
    stepTitle1: string;
    stepTitle2: string;
    name: string;
    namePlaceholder: string;
    phone: string;
    email: string;
    emailPlaceholder: string;
    siteType: string;
    siteTypePlaceholder: string;
    siteTypes: string[];
    description: string;
    descriptionPlaceholder: string;
    continue: string;
    howToReceive: string;
    whatsappHint: string;
    emailLabel: string;
    emailHint: string;
    back: string;
    sending: string;
    submit: string;
    genericError: string;
    errors: {
      name: string;
      email: string;
      phone: string;
      siteType: string;
      description: string;
      contactMethod: string;
    };
    success: {
      title: string;
      whatsapp: string;
      email: (email: string) => string;
      checkInbox: string;
    };
    whatsappMessage: (name: string, siteType: string) => string;
  };
  footer: {
    slogan: string;
    brandColumn: string;
    siteTypesColumn: string;
    supportColumn: string;
    siteTypeLinks: string[];
    proposal: string;
    privacy: string;
    rights: string;
    tagline: string;
  };
  bigText: [string, string];
};

const fr: Dictionary = {
  htmlLang: "fr",
  ogLocale: "fr_MA",
  meta: {
    title: "Création site web professionnel | EngiGrowth",
    description:
      "Création de sites internet professionnels : site vitrine, e-commerce, landing page et refonte pour transformer vos visiteurs en clients.",
    ogDescription:
      "Un site web professionnel, rapide et pensé pour convertir vos visiteurs en clients.",
    keywords: [
      "création site internet",
      "création site web",
      "agence web",
      "création site vitrine",
      "création site e-commerce",
      "refonte site internet",
    ],
  },
  topBanner: "Sites web clairs, rapides et distinctifs pour entreprises",
  nav: { services: "Services", projects: "Réalisations", method: "Méthode", contact: "Contact" },
  homeLabel: "Accueil",
  switchLabel: "Passer en anglais",
  switchShort: "EN",
  switchHref: "/en",
  cta: {
    proposal: "Recevoir une proposition",
    proposalFree: "Recevoir ma proposition gratuite",
  },
  hero: {
    title: "Attirez plus de clients avec un site qui travaille pour votre croissance.",
    description:
      "Gagnez en visibilité, inspirez confiance dès la première visite et transformez votre présence en ligne en nouvelles opportunités pour votre entreprise.",
    imageAlt:
      "Entrepreneur travaillant sur son site web avec EngiGrowth, agence de création de sites web au Maroc",
    imageTitle: "Création de site web professionnel – EngiGrowth",
    cardMessage: "Message",
    cardMessageSub: "Offre claire",
    cardDesign: "Design premium",
    cardConvert: "Prêt à convertir",
    cardBrowser: "site moderne",
    cardActivity: "Votre activité",
    cardHeadline: "Claire, crédible, prête à convertir",
    cardCta: "CTA",
    chips: ["Message", "Design", "Conversion"],
  },
  solutions: {
    eyebrow: "Solutions",
    title: "À chaque objectif, sa solution web.",
    items: [
      {
        title: "Site vitrine",
        description:
          "Présentez votre activité avec un site clair, crédible et facile à parcourir.",
        tag: "Crédibilité",
      },
      {
        title: "E-commerce",
        description:
          "Mettez vos produits en valeur avec un parcours simple du catalogue au contact.",
        tag: "Vente",
      },
      {
        title: "Landing page",
        description:
          "Transformez le trafic de vos campagnes en demandes de devis plus qualifiées.",
        tag: "Conversion",
      },
      {
        title: "Refonte",
        description:
          "Modernisez votre site existant pour mieux refléter la qualité de votre entreprise.",
        tag: "Image",
      },
    ],
  },
  highlights: [
    "Design professionnel",
    "100 % responsive",
    "Rapide & optimisé",
    "Pensé pour la conversion",
  ],
  pitch: {
    title:
      "Votre site ne devrait pas simplement exister. Il devrait travailler pour votre entreprise.",
    p1: "Un site lent, dépassé ou difficile à comprendre peut faire perdre des clients potentiels avant même le premier contact.",
    p2: "Nous combinons stratégie, design et développement pour créer une expérience qui présente clairement votre offre et facilite le passage à l’action.",
  },
  chart: {
    title: "Audit de conversion",
    subtitle: "Prototype avant mise en ligne",
    badge: "Priorisé",
    rows: [
      ["Clarté de l'offre", 96],
      ["Preuves", 84],
      ["Contact", 91],
      ["Mobile", 88],
      ["Vitesse", 79],
      ["SEO local", 72],
    ],
  },
  projects: {
    eyebrow: "Réalisations",
    title: "Une direction visuelle adaptée à chaque activité.",
    items: [
      {
        name: "Atlas Conseil",
        industry: "Cabinet de conseil",
        description: "Site vitrine premium orienté prise de rendez-vous B2B.",
        image: {
          alt: "Création du site web Atlas Conseil, cabinet de conseil au Maroc",
          title: "Site web Atlas Conseil",
          caption: "Conception d’un site web moderne pour Atlas Conseil",
        },
      },
      {
        name: "Casa Home",
        industry: "Immobilier",
        description: "Landing page claire pour rassurer et générer des demandes.",
        image: {
          alt: "Création du site web immobilier Casa Home au Maroc",
          title: "Site web immobilier Casa Home",
          caption: "",
        },
      },
      {
        name: "Nova Atelier",
        industry: "Commerce en ligne",
        description: "Parcours e-commerce simple avec une marque bien mise en avant.",
        image: {
          alt: "Création du site e-commerce Nova Atelier au Maroc",
          title: "Site e-commerce Nova Atelier",
          caption:
            "Conception d’une boutique en ligne moderne pour Nova Atelier, optimisée pour présenter les produits et faciliter les achats.",
        },
      },
      {
        name: "Nour Santé",
        industry: "Service médical",
        description: "Interface rassurante, rapide sur mobile, pensée pour le contact.",
        image: {
          alt: "Création du site web médical Nour Santé au Maroc",
          title: "Site web médical Nour Santé",
          caption:
            "Conception d’un site web moderne pour Nour Santé, avec présentation des services médicaux et prise de rendez-vous en ligne.",
        },
      },
    ],
  },
  process: {
    title: "Votre nouveau site en 3 étapes",
    steps: [
      {
        title: "Parlez-nous de votre projet",
        description: "Expliquez-nous votre activité, vos objectifs et vos besoins.",
      },
      {
        title: "Recevez votre proposition",
        description: "Nous définissons la solution, le périmètre et une proposition adaptée.",
      },
      {
        title: "Nous créons votre site",
        description: "Design, développement, optimisation et mise en ligne.",
      },
    ],
  },
  contact: {
    eyebrow: "Démarrer",
    title: "Lancez votre site avec EngiGrowth.",
    description:
      "Décrivez votre projet en quelques mots. Nous vous répondrons avec une proposition adaptée à votre activité, votre objectif et votre budget.",
  },
  form: {
    step: "Étape",
    stepTitle1: "Décrire mon projet",
    stepTitle2: "Comment vous répondre ?",
    name: "Nom et prénom",
    namePlaceholder: "Votre nom",
    phone: "Téléphone / WhatsApp",
    email: "Adresse email",
    emailPlaceholder: "vous@exemple.com",
    siteType: "Type de site",
    siteTypePlaceholder: "Choisissez une option",
    siteTypes: ["Site vitrine", "E-commerce", "Landing page", "Refonte", "Je ne sais pas encore"],
    description: "Parlez-nous rapidement de votre projet",
    descriptionPlaceholder:
      "Exemple : je veux présenter mon activité et recevoir plus de demandes de contact.",
    continue: "Continuer",
    howToReceive: "Comment souhaitez-vous recevoir votre proposition ?",
    whatsappHint: "On vous envoie un message directement.",
    emailLabel: "Email",
    emailHint: "Nous vous envoyons la proposition par email.",
    back: "← Retour",
    sending: "Envoi en cours...",
    submit: "Recevoir ma proposition gratuite",
    genericError: "Une erreur est survenue. Veuillez réessayer.",
    errors: {
      name: "Indiquez votre nom complet.",
      email: "Adresse email invalide.",
      phone: "Ajoutez un numéro valide.",
      siteType: "Choisissez le type de site souhaité.",
      description: "Ajoutez quelques détails sur votre projet.",
      contactMethod: "Choisissez comment vous souhaitez recevoir notre réponse.",
    },
    success: {
      title: "Demande bien reçue !",
      whatsapp: "Nous vous contacterons sur WhatsApp avec votre proposition personnalisée.",
      email: (email) => `Nous vous enverrons votre proposition à l'adresse ${email}.`,
      checkInbox: "Vérifiez votre boîte mail — et vos spams.",
    },
    whatsappMessage: (name, siteType) =>
      `Bonjour, je suis ${name}. Je viens de soumettre ma demande sur votre site pour un projet : ${siteType}.`,
  },
  footer: {
    slogan: "Speed. Quality. Growth.",
    brandColumn: "",
    siteTypesColumn: "Types de site",
    supportColumn: "Support",
    siteTypeLinks: ["Site vitrine", "E-commerce", "Landing page", "Refonte"],
    proposal: "Proposition",
    privacy: "Confidentialité",
    rights: "Tous droits réservés.",
    tagline: "Agence growth marketing",
  },
  bigText: ["GROWTH", "MARKETING"],
};

const en: Dictionary = {
  htmlLang: "en",
  ogLocale: "en_US",
  meta: {
    title: "Professional Website Design & Development | EngiGrowth",
    description:
      "Professional websites built to win clients: business sites, e-commerce, landing pages and redesigns that turn visitors into customers.",
    ogDescription:
      "A fast, professional website designed to turn your visitors into customers.",
    keywords: [
      "website design",
      "web development",
      "web agency",
      "business website",
      "e-commerce website",
      "website redesign",
    ],
  },
  topBanner: "Clear, fast and distinctive websites for businesses",
  nav: { services: "Services", projects: "Our work", method: "Process", contact: "Contact" },
  homeLabel: "Home",
  switchLabel: "Passer en français",
  switchShort: "FR",
  switchHref: "/",
  cta: {
    proposal: "Get a proposal",
    proposalFree: "Get my free proposal",
  },
  hero: {
    title: "Win more clients with a website that works for your growth.",
    description:
      "Boost your visibility, build trust from the very first visit and turn your online presence into new opportunities for your business.",
    imageAlt:
      "Entrepreneur working on their website with EngiGrowth, a web design agency in Morocco",
    imageTitle: "Professional website design – EngiGrowth",
    cardMessage: "Message",
    cardMessageSub: "Clear offer",
    cardDesign: "Premium design",
    cardConvert: "Built to convert",
    cardBrowser: "modern website",
    cardActivity: "Your business",
    cardHeadline: "Clear, credible, built to convert",
    cardCta: "CTA",
    chips: ["Message", "Design", "Conversion"],
  },
  solutions: {
    eyebrow: "Solutions",
    title: "A web solution for every goal.",
    items: [
      {
        title: "Business website",
        description:
          "Showcase your business with a website that is clear, credible and easy to navigate.",
        tag: "Credibility",
      },
      {
        title: "E-commerce",
        description:
          "Put your products front and center with a simple journey from catalog to contact.",
        tag: "Sales",
      },
      {
        title: "Landing page",
        description:
          "Turn your campaign traffic into more qualified quote requests.",
        tag: "Conversion",
      },
      {
        title: "Redesign",
        description:
          "Modernize your existing site so it reflects the quality of your business.",
        tag: "Image",
      },
    ],
  },
  highlights: [
    "Professional design",
    "100% responsive",
    "Fast & optimized",
    "Built to convert",
  ],
  pitch: {
    title:
      "Your website shouldn't just exist. It should work for your business.",
    p1: "A slow, outdated or confusing website can cost you potential clients before they ever get in touch.",
    p2: "We combine strategy, design and development to create an experience that presents your offer clearly and makes it easy to take the next step.",
  },
  chart: {
    title: "Conversion audit",
    subtitle: "Prototype before launch",
    badge: "Prioritized",
    rows: [
      ["Offer clarity", 96],
      ["Social proof", 84],
      ["Contact", 91],
      ["Mobile", 88],
      ["Speed", 79],
      ["Local SEO", 72],
    ],
  },
  projects: {
    eyebrow: "Our work",
    title: "A visual direction tailored to every business.",
    items: [
      {
        name: "Atlas Conseil",
        industry: "Consulting firm",
        description: "Premium business website focused on booking B2B meetings.",
        image: {
          alt: "Website design for Atlas Conseil, a consulting firm in Morocco",
          title: "Atlas Conseil website",
          caption: "Design of a modern website for Atlas Conseil",
        },
      },
      {
        name: "Casa Home",
        industry: "Real estate",
        description: "A clear landing page that builds trust and generates enquiries.",
        image: {
          alt: "Website design for Casa Home, a real estate business in Morocco",
          title: "Casa Home real estate website",
          caption: "",
        },
      },
      {
        name: "Nova Atelier",
        industry: "Online store",
        description: "A simple e-commerce journey that puts the brand first.",
        image: {
          alt: "E-commerce website design for Nova Atelier in Morocco",
          title: "Nova Atelier e-commerce website",
          caption:
            "Design of a modern online store for Nova Atelier, built to showcase products and make buying easy.",
        },
      },
      {
        name: "Nour Santé",
        industry: "Medical service",
        description: "A reassuring, mobile-fast interface designed to drive contact.",
        image: {
          alt: "Website design for Nour Santé, a medical practice in Morocco",
          title: "Nour Santé medical website",
          caption:
            "Design of a modern website for Nour Santé, presenting medical services and offering online appointment booking.",
        },
      },
    ],
  },
  process: {
    title: "Your new website in 3 steps",
    steps: [
      {
        title: "Tell us about your project",
        description: "Share your business, your goals and your needs.",
      },
      {
        title: "Receive your proposal",
        description: "We define the solution, the scope and a proposal tailored to you.",
      },
      {
        title: "We build your website",
        description: "Design, development, optimization and launch.",
      },
    ],
  },
  contact: {
    eyebrow: "Get started",
    title: "Launch your website with EngiGrowth.",
    description:
      "Describe your project in a few words. We'll get back to you with a proposal tailored to your business, your goal and your budget.",
  },
  form: {
    step: "Step",
    stepTitle1: "Describe my project",
    stepTitle2: "How should we reply?",
    name: "Full name",
    namePlaceholder: "Your name",
    phone: "Phone / WhatsApp",
    email: "Email address",
    emailPlaceholder: "you@example.com",
    siteType: "Type of website",
    siteTypePlaceholder: "Choose an option",
    siteTypes: [
      "Business website",
      "E-commerce",
      "Landing page",
      "Redesign",
      "I don't know yet",
    ],
    description: "Tell us briefly about your project",
    descriptionPlaceholder:
      "Example: I want to showcase my business and receive more enquiries.",
    continue: "Continue",
    howToReceive: "How would you like to receive your proposal?",
    whatsappHint: "We'll message you directly.",
    emailLabel: "Email",
    emailHint: "We'll send the proposal by email.",
    back: "← Back",
    sending: "Sending...",
    submit: "Get my free proposal",
    genericError: "Something went wrong. Please try again.",
    errors: {
      name: "Please enter your full name.",
      email: "Invalid email address.",
      phone: "Please enter a valid phone number.",
      siteType: "Please choose the type of website you need.",
      description: "Please add a few details about your project.",
      contactMethod: "Please choose how you'd like to receive our reply.",
    },
    success: {
      title: "Request received!",
      whatsapp: "We'll contact you on WhatsApp with your personalized proposal.",
      email: (email) => `We'll send your proposal to ${email}.`,
      checkInbox: "Check your inbox — and your spam folder.",
    },
    whatsappMessage: (name, siteType) =>
      `Hello, I'm ${name}. I just submitted a request on your website for a project: ${siteType}.`,
  },
  footer: {
    slogan: "Speed. Quality. Growth.",
    brandColumn: "",
    siteTypesColumn: "Website types",
    supportColumn: "Support",
    siteTypeLinks: ["Business website", "E-commerce", "Landing page", "Redesign"],
    proposal: "Proposal",
    privacy: "Privacy",
    rights: "All rights reserved.",
    tagline: "Growth marketing agency",
  },
  bigText: ["GROWTH", "MARKETING"],
};

export const dictionaries: Record<Locale, Dictionary> = { fr, en };
