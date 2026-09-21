const whatsappNumber = "212600000000";
const whatsappText = encodeURIComponent(
  "Bonjour, je souhaite discuter de mon projet de site web.",
);

export const SITE_CONFIG = {
  brand: "EngiGrowth",
  whatsappNumber,
  whatsappUrl: `https://wa.me/${whatsappNumber}?text=${whatsappText}`,
};
