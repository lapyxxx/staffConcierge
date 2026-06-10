export type LeadPayload = {
  name: string;
  contact: string;
  email: string;
  intent: string;
  page: string;
  submittedAt: string;
  utm: Record<string, string>;
};

const getUtmParams = () => {
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};

  params.forEach((value, key) => {
    if (key.startsWith("utm_")) {
      utm[key] = value;
    }
  });

  return utm;
};

export const createLeadPayload = (
  data: Pick<LeadPayload, "name" | "contact" | "email" | "intent">,
): LeadPayload => ({
  ...data,
  page: window.location.href,
  submittedAt: new Date().toISOString(),
  utm: getUtmParams(),
});

export const submitLead = async (payload: LeadPayload) => {
  const webhookUrl = import.meta.env.VITE_LEAD_WEBHOOK_URL;

  if (!webhookUrl) {
    return { delivered: false, reason: "missing_webhook" as const };
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Lead webhook failed with status ${response.status}`);
  }

  return { delivered: true as const };
};
