export type { LeadPayload } from "./leads.types";
import { submitLeadAction } from "./actions";
import { type LeadPayload } from "./leads.types";

export async function submitLead(payload: LeadPayload) {
  const result = await submitLeadAction(payload);
  if (!result.success) {
    throw new Error(result.error || "Lead submission failed");
  }
}
