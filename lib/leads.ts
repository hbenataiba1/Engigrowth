export type LeadPayload = {
  name: string;
  phone: string;
  siteType: string;
  description: string;
};

const LEAD_ENDPOINT = process.env.NEXT_PUBLIC_LEAD_ENDPOINT;

export async function submitLead(payload: LeadPayload) {
  if (LEAD_ENDPOINT) {
    const response = await fetch(LEAD_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Lead submission failed");
    }

    return;
  }

  await new Promise((resolve) => setTimeout(resolve, 700));
}
