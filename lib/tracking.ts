export type ConversionEvent =
  | "proposal_cta_click"
  | "whatsapp_click"
  | "lead_form_start"
  | "lead_form_submit"
  | "portfolio_view";

type ConversionParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (
      command: "event",
      eventName: ConversionEvent,
      params?: ConversionParams,
    ) => void;
  }
}

export function trackConversion(
  eventName: ConversionEvent,
  params: ConversionParams = {},
) {
  if (typeof window === "undefined") return;

  window.dataLayer?.push({ event: eventName, ...params });
  window.gtag?.("event", eventName, params);
}
