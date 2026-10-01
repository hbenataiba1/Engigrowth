"use server";

import { Resend } from "resend";
import { type LeadPayload } from "./leads.types";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitLeadAction(payload: LeadPayload) {
  try {
    const { name, email, phone, siteType, description, contactMethod } = payload;

    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const contactMethodLabel =
      contactMethod === "whatsapp" ? "WhatsApp" : "Email";

    const data = await resend.emails.send({
      from: fromEmail,
      to: "hbenataiba@gmail.com",
      subject: `Nouveau lead : ${name} - ${siteType}`,
      html: `
        <h2 style="color:#17211c;font-family:Arial,sans-serif;">Nouvelle demande de projet</h2>
        <table style="font-family:Arial,sans-serif;border-collapse:collapse;width:100%;">
          <tr><td style="padding:8px 0;color:#6b776f;font-size:13px;">Nom</td><td style="padding:8px 0;font-weight:600;">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#6b776f;font-size:13px;">Email</td><td style="padding:8px 0;font-weight:600;">${email}</td></tr>
          <tr><td style="padding:8px 0;color:#6b776f;font-size:13px;">Téléphone</td><td style="padding:8px 0;font-weight:600;">${phone}</td></tr>
          <tr><td style="padding:8px 0;color:#6b776f;font-size:13px;">Type de site</td><td style="padding:8px 0;font-weight:600;">${siteType}</td></tr>
          <tr><td style="padding:8px 0;color:#6b776f;font-size:13px;">Réponse souhaitée via</td><td style="padding:8px 0;font-weight:600;">${contactMethodLabel}</td></tr>
        </table>
        <h3 style="color:#17211c;font-family:Arial,sans-serif;margin-top:24px;">Description du projet</h3>
        <p style="font-family:Arial,sans-serif;color:#53605a;line-height:1.6;">${description.replace(/\n/g, "<br/>")}</p>
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
