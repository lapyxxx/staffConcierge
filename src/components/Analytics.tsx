import { useEffect } from "react";

type YandexMetrika = ((...args: unknown[]) => void) & {
  a?: unknown[][];
  l?: number;
};

declare global {
  interface Window {
    ym?: YandexMetrika;
  }
}

const Analytics = () => {
  useEffect(() => {
    const id = 108988775;

    const handleLeadSubmit = () => window.ym?.(id, "reachGoal", "lead_form_submit");
    window.addEventListener("lead-form-submit", handleLeadSubmit);

    return () => {
      window.removeEventListener("lead-form-submit", handleLeadSubmit);
    };
  }, []);

  return null;
};

export default Analytics;
