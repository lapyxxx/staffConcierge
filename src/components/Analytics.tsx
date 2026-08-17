import { useEffect } from "react";
import { reachGoal } from "@/lib/analytics";

const METRIKA_ID = 108988775;
const COOKIE_CONSENT_KEY = "staff-academy-cookie-consent";

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
    const initMetrika = () => {
      if (window.ym || document.querySelector(`script[src*="mc.yandex.ru/metrika/tag.js?id=${METRIKA_ID}"]`)) {
        return;
      }

      const queue: YandexMetrika = ((...args: unknown[]) => {
        queue.a = queue.a || [];
        queue.a.push(args);
      }) as YandexMetrika;
      queue.l = Date.now();
      window.ym = queue;

      const script = document.createElement("script");
      script.async = true;
      script.src = `https://mc.yandex.ru/metrika/tag.js?id=${METRIKA_ID}`;
      document.head.appendChild(script);

      window.ym(METRIKA_ID, "init", {
        ssr: true,
        webvisor: true,
        clickmap: true,
        ecommerce: "dataLayer",
        referrer: document.referrer,
        url: location.href,
        accurateTrackBounce: true,
        trackLinks: true,
      });
    };

    if (localStorage.getItem(COOKIE_CONSENT_KEY) === "accepted") {
      initMetrika();
    }

    const handleLeadSubmit = () => reachGoal("lead_form_submit");
    const handleMessengerClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest("a[href]") : null;
      const href = target?.getAttribute("href") ?? "";

      if (href.startsWith("tel:")) {
        reachGoal("phone_click", { href });
        return;
      }

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
    window.addEventListener("staff-cookie-consent", initMetrika);
    document.addEventListener("click", handleMessengerClick);
    document.addEventListener("click", handleAnchorClick);
    document.addEventListener("click", handleGoalClick);

    return () => {
      window.removeEventListener("lead-form-submit", handleLeadSubmit);
      window.removeEventListener("staff-cookie-consent", initMetrika);
      document.removeEventListener("click", handleMessengerClick);
      document.removeEventListener("click", handleAnchorClick);
      document.removeEventListener("click", handleGoalClick);
    };
  }, []);

  return null;
};

export default Analytics;
