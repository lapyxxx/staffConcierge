import logo from "@/assets/logo-white.png";

// TODO(контент): заполнить утверждёнными данными. Пустые значения не отображаются.
const offerHref = ""; // ссылка на оферту (например "/offer" или PDF)
const legalRequisites = ""; // реквизиты: ИП/ООО, ИНН, ОГРН и т.п.

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-12 pb-60 md:pb-56 lg:py-12 border-t border-white/15 bg-dark text-dark-foreground">
      <div className="container-wide">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div>
            <img src={logo} alt="SK Academia" className="h-12 md:h-16 w-auto object-contain mb-3" />
            <p className="text-xs text-dark-foreground/65">
              Профессиональное образование<br />для специалистов премиум-сегмента
            </p>
          </div>

          <div className="flex flex-col md:flex-row md:justify-center gap-4 md:gap-8">
            {[
              { label: "О курсе", href: "#about" },
              { label: "Программа", href: "#program" },
              { label: "Тарифы", href: "#pricing" },
              { label: "FAQ", href: "#faq" },
              { label: "Материалы", href: "/articles/vip-family" },
            ].map((link) => (
              <a key={link.href} href={link.href} className="text-xs uppercase tracking-wider text-dark-foreground/65 hover:text-dark-foreground transition-colors whitespace-nowrap">
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col md:items-end gap-3">
            <div className="flex flex-col gap-2 md:items-end">
              <a
                href="https://t.me/staffconcierge"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-wider text-dark-foreground/65 hover:text-dark-foreground transition-colors"
              >
                Telegram
              </a>
              <a
                href="https://staff-concierge.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-wider text-dark-foreground/65 hover:text-dark-foreground transition-colors"
              >
                Staff Concierge
              </a>
            </div>
            <p className="text-xs text-dark-foreground/65">© {currentYear} Staff Concierge Academy</p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/15">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <a href="/privacy" className="text-xs text-dark-foreground/65 hover:text-dark-foreground transition-colors">
              Политика конфиденциальности
            </a>
            <a href="/terms" className="text-xs text-dark-foreground/65 hover:text-dark-foreground transition-colors">
              Пользовательское соглашение
            </a>
            <a href="/personal-data" className="text-xs text-dark-foreground/65 hover:text-dark-foreground transition-colors">
              Политика обработки персональных данных
            </a>
            {offerHref && (
              <a href={offerHref} className="text-xs text-dark-foreground/65 hover:text-dark-foreground transition-colors">
                Публичная оферта
              </a>
            )}
            <a href="/articles/governess-salary" className="text-xs text-dark-foreground/65 hover:text-dark-foreground transition-colors">
              Доход гувернантки
            </a>
          </div>
          {legalRequisites && (
            <p className="mt-4 text-center text-xs text-dark-foreground/50 leading-relaxed">{legalRequisites}</p>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
