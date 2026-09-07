import { useEffect, useState } from "react";
import { Check, Palette, X } from "lucide-react";
import { applyTheme, readStoredTheme, storeTheme, themes, type ThemeKey } from "@/lib/theme";

/**
 * Переключатель цветовых вариантов сайта.
 * Выбор сохраняется в localStorage, базовый вариант («Графит») —
 * это текущая палитра, поэтому откат всегда доступен в один клик.
 */
const ThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeKey>("slate");

  useEffect(() => {
    const saved = readStoredTheme();
    setTheme(saved);
    applyTheme(saved);
  }, []);

  const select = (key: ThemeKey) => {
    setTheme(key);
    applyTheme(key);
    storeTheme(key);
  };

  return (
    <div className="fixed left-4 bottom-4 z-50 md:left-6 md:bottom-6 print:hidden">
      {isOpen && (
        <div className="mb-3 w-64 rounded-2xl border border-border bg-popover p-4 shadow-xl">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
              Вариант оформления
            </p>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Закрыть выбор оформления"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <X size={15} />
            </button>
          </div>

          <div className="space-y-2">
            {themes.map((item) => {
              const isActive = item.key === theme;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => select(item.key)}
                  className={`flex w-full items-center gap-3 rounded-xl border p-2.5 text-left transition-colors ${
                    isActive
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/40 hover:bg-secondary"
                  }`}
                >
                  <span className="flex shrink-0 overflow-hidden rounded-md border border-border">
                    {item.swatches.map((color) => (
                      <span key={color} style={{ background: color }} className="block h-7 w-3.5" />
                    ))}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-foreground">{item.label}</span>
                    <span className="block text-[11px] leading-snug text-muted-foreground">{item.hint}</span>
                  </span>
                  {isActive && <Check size={15} className="shrink-0 text-primary" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        aria-label="Выбрать цветовое оформление сайта"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-lg transition-colors hover:border-primary/40 hover:text-primary"
      >
        <Palette size={18} />
      </button>
    </div>
  );
};

export default ThemeSwitcher;
