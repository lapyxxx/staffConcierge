import logo from "@/assets/logo-black.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-12 pb-36 lg:py-12 border-t border-border bg-background">
      <div className="container-wide">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div>
            <img src={logo} alt="SK Academia" className="h-12 md:h-16 w-auto object-contain mb-3" />
            <p className="text-xs text-muted-foreground">
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
              <a key={link.href} href={link.href} className="text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col md:items-end gap-3">
            <p className="text-xs text-muted-foreground">© {currentYear} Staff Concierge Academy</p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <a href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Политика конфиденциальности
            </a>
            <a href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Пользовательское соглашение
            </a>
            <a href="/personal-data" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Политика обработки персональных данных
            </a>
            <a href="/articles/governess-salary" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Доход гувернантки
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
