import { useEffect } from "react";
import { reachGoal } from "@/lib/analytics";

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
    const handleLeadSubmit = () => reachGoal("lead_form_submit");
    const handleMessengerClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest("a[href]") : null;
      const href = target?.getAttribute("href") ?? "";

      if (href.includes("t.me") || href.includes("wa.me") || href.includes("telegram")) {
        reachGoal("messenger_click", { href });
      }
    };

    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest("a[href^='#']") : null;
      const href = target?.getAttribute("href");

      if (href && href.length > 1) {
        reachGoal("anchor_click", { anchor: href });
      }
    };

    const handleGoalClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-metrika-goal]") : null;
      const goal = target?.dataset.metrikaGoal;

      if (goal) {
        reachGoal(goal);
      }
    };

    window.addEventListener("lead-form-submit", handleLeadSubmit);
    document.addEventListener("click", handleMessengerClick);
    document.addEventListener("click", handleAnchorClick);
    document.addEventListener("click", handleGoalClick);

    return () => {
      window.removeEventListener("lead-form-submit", handleLeadSubmit);
      document.removeEventListener("click", handleMessengerClick);
      document.removeEventListener("click", handleAnchorClick);
      document.removeEventListener("click", handleGoalClick);
    };
  }, []);

  return null;
};

export default Analytics;
