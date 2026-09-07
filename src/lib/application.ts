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

  // Скроллим к форме с учётом высоты липкой шапки, чтобы заголовок формы
  // не оказывался под ней и переход попадал точно на блок заявки.
  const el = document.getElementById("application-form");
  if (el) {
    const header = document.querySelector("header");
    const offset = (header instanceof HTMLElement ? header.offsetHeight : 0) + 16;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
  }
};
