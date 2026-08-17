export type LeadPayload = {
  name: string;
  contact: string;
  email?: string;
  experience?: string;
  intent: string;
  page: string;
  submittedAt: string;
  utm: Record<string, string>;
  website?: string;
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
  data: Pick<LeadPayload, "name" | "contact" | "email" | "experience" | "intent">,
): LeadPayload => ({
  ...data,
  page: window.location.href,
  submittedAt: new Date().toISOString(),
  utm: getUtmParams(),
});

export const submitLead = async (payload: LeadPayload) => {
  const response = await fetch("/api/lead.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Lead webhook failed with status ${response.status}`);
  }

  const result: unknown = await response.json();

  if (!result || typeof result !== "object" || !("delivered" in result) || result.delivered !== true) {
    throw new Error("Lead API returned an invalid response");
  }

  return { delivered: true as const };
};
