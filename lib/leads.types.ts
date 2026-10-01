export type LeadPayload = {
  name: string;
  email: string;
  phone: string;
  siteType: string;
  description: string;
  contactMethod: "whatsapp" | "email";
};
