import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoWhite from "@/assets/logo-white.png";
import logoBlack from "@/assets/logo-black.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCookieDot, setShowCookieDot] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleCookieDot = (event: Event) => {
      const customEvent = event as CustomEvent<{ visible?: boolean }>;
      setShowCookieDot(Boolean(customEvent.detail?.visible));
    };

    window.addEventListener("staff-cookie-dot-change", handleCookieDot);
    return () => window.removeEventListener("staff-cookie-dot-change", handleCookieDot);
  }, []);

  const navItems = [
    { label: "О КУРСЕ", href: "#about" },
    { label: "ПРОГРАММА", href: "#program" },
    { label: "ПРЕПОДАВАТЕЛИ", href: "#teachers" },
    { label: "ТАРИФЫ", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  const scrollToForm = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("intent", "consultation");
    window.history.pushState({}, "", url);
    window.dispatchEvent(new CustomEvent("application-intent-change"));
    document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const closeMenu = () => setIsMenuOpen(false);
  const openCookieNotice = () => window.dispatchEvent(new CustomEvent("staff-cookie-open"));

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isMenuOpen ? "bg-background" : isScrolled ? "bg-background/95 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container-wide">
        <div className="flex items-center justify-between h-20 md:h-24">
          <a href="#" className="flex items-center">
            <img
              src={isScrolled || isMenuOpen ? logoBlack : logoWhite}
              alt="SK Academia"
              className="h-10 md:h-14 lg:h-16 w-auto object-contain"
            />
          </a>

          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map(item => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={`text-xs font-semibold tracking-[0.15em] transition-colors ${
                  isScrolled || isMenuOpen
                    ? "text-muted-foreground hover:text-foreground"
                    : "text-cream/80 hover:text-cream"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-1.5">
            <button onClick={scrollToForm} data-metrika-goal="header_cta_click" className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-semibold rounded-full text-xs uppercase tracking-wider hover:shadow-md transition-all duration-300">
              <span>Связаться</span>
              <ArrowUpRight size={14} />
            </button>

            <div className="relative h-9 w-9 shrink-0">
              <AnimatePresence>
                {showCookieDot && (
                  <motion.button
                    key="header-cookie-dot"
                    type="button"
                    onClick={openCookieNotice}
                    initial={{ opacity: 0, scale: 0.82 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 rounded-full border border-border bg-background shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
                    aria-label="Открыть уведомление о cookie"
                  >
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" aria-hidden="true">
                      <path d="M12.01 20H12M12 14L12.01 4" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 ${isScrolled || isMenuOpen ? "text-foreground" : "text-cream"}`}
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-t border-border shadow-lg"
          >
            <nav className="container-wide py-3">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="shrink-0 rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-wider text-foreground"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>
              <button onClick={scrollToForm} data-metrika-goal="mobile_header_cta_click" className="btn-cta mt-2 w-full justify-center py-3">
                <span>Получить консультацию</span>
                <ArrowUpRight size={16} />
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
