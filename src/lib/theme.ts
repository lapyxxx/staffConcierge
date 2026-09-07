export type ThemeKey = "slate" | "navy" | "bluegray";

export const THEME_STORAGE_KEY = "sca-theme";

export const themes: { key: ThemeKey; label: string; hint: string; swatches: string[] }[] = [
  {
    key: "slate",
    label: "Графит",
    hint: "Текущий вариант сайта",
    swatches: ["#F2F5F7", "#5A6B7D", "#2B3742"],
  },
  {
    key: "navy",
    label: "Navy Ivory",
    hint: "Фирменный: тёплый ivory и глубокий синий",
    swatches: ["#F5F3EE", "#3F5163", "#C9C1B6"],
  },
  {
    key: "bluegray",
    label: "Blue Gray",
    hint: "Палитра #8698AA / #64798C / #485A6E",
    swatches: ["#F4F7F9", "#64798C", "#485A6E"],
  },
];

/** Применяет тему к документу. "slate" — базовая, без атрибута. */
export const applyTheme = (theme: ThemeKey) => {
  const root = document.documentElement;
  if (theme === "slate") {
    root.removeAttribute("data-theme");
  } else {
    root.setAttribute("data-theme", theme);
  }
};

export const readStoredTheme = (): ThemeKey => {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === "navy" || saved === "bluegray" || saved === "slate") {
      return saved;
    }
  } catch {
    /* localStorage может быть недоступен */
  }
  return "slate";
};

export const storeTheme = (theme: ThemeKey) => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* игнорируем — тема просто не запомнится */
  }
};
