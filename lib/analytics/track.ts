"use client";

export type AnalyticsEventType = "click_imovel" | "lead_whatsapp" | "lead_contact";

type AnalyticsEventPayload = {
  eventType: AnalyticsEventType;
  propertyId?: string | null;
  contactChannel?: string | null;
  contactValue?: string | null;
};

export function trackAnalyticsEvent(payload: AnalyticsEventPayload) {
  try {
    if (typeof window === "undefined") return;
    const body = JSON.stringify({
      ...payload,
      path: window.location.pathname,
    });
    if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon("/api/analytics/event", blob);
      return;
    }
    fetch("/api/analytics/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {}
}
