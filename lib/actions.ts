"use server";

import { Resend } from "resend";
import { type LeadPayload } from "./leads.types";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitLeadAction(payload: LeadPayload) {
  try {
    const { name, phone, siteType, description } = payload;
    
    // We send from a verified domain. The user says they have a verified domain,
    // usually something like "onboarding@resend.dev" is used for testing, but 
    // for a verified domain they should use their own (e.g. "contact@<their-domain.com>").
    // We can use a generic "contact@engigrowth.com" or a fallback they configure.
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    
    const data = await resend.emails.send({
      from: fromEmail,
      to: "hbenataiba@gmail.com",
      subject: `Nouveau lead : ${name} - ${siteType}`,
      html: `
        <h2>Nouvelle demande de projet</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Téléphone :</strong> ${phone}</p>
        <p><strong>Type de site :</strong> ${siteType}</p>
        <p><strong>Description :</strong></p>
        <p>${description.replace(/\n/g, '<br/>')}</p>
      `,
    });

    if (data.error) {
      throw new Error(data.error.message);
    }
    
    return { success: true };
  } catch (error) {
    console.error("Resend error:", error);
    return { success: false, error: "Failed to send email" };
  }
}
