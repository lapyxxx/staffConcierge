import { reachGoal } from "@/lib/analytics";

/**
 * Единый сценарий обращения по всему сайту.
 * Проставляет выбранный intent, синхронизирует форму заявки и плавно
 * прокручивает к ней. Все главные CTA используют этот helper, чтобы
 * логика перехода к заявке была одинаковой.
 */
export const openApplication = (intent: string = "consultation", goal?: string) => {
  if (goal) {
    reachGoal(goal);
  }

  const url = new URL(window.location.href);
  url.searchParams.set("intent", intent);
  window.history.pushState({}, "", url);
  window.dispatchEvent(new CustomEvent("application-intent-change"));
  document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" });
};
