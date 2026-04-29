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
    const metrikaId = import.meta.env.VITE_YANDEX_METRIKA_ID;
    if (!metrikaId) {
      return;
    }

    const id = Number(metrikaId);
    if (!Number.isFinite(id)) {
      return;
    }

    window.ym =
      window.ym ||
      ((function ymStub(...args: unknown[]) {
        (window.ym!.a = window.ym!.a || []).push(args);
      }) as YandexMetrika);
    window.ym.l = Date.now();

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://mc.yandex.ru/metrika/tag.js";
    document.head.appendChild(script);

    window.ym(id, "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
    });

    const handleLeadSubmit = () => window.ym?.(id, "reachGoal", "lead_form_submit");
    window.addEventListener("lead-form-submit", handleLeadSubmit);

    return () => {
      window.removeEventListener("lead-form-submit", handleLeadSubmit);
      script.remove();
    };
  }, []);

  return null;
};

export default Analytics;
