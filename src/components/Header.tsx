import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoWhite from "@/assets/logo-white.png";
import logoBlack from "@/assets/logo-black.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "О КУРСЕ", href: "#about" },
    { label: "ПРОГРАММА", href: "#program" },
    { label: "ПРЕПОДАВАТЕЛИ", href: "#teachers" },
    { label: "ТАРИФЫ", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ];

  const scrollToForm = () => {
    document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

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

          <button onClick={scrollToForm} className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-semibold rounded-full text-xs uppercase tracking-wider hover:shadow-md transition-all duration-300">
            <span>Связаться</span>
            <ArrowUpRight size={14} />
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 ${isScrolled || isMenuOpen ? "text-foreground" : "text-cream"}`}
            aria-label="Toggle menu"
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
            className="lg:hidden bg-background border-t border-border"
          >
            <nav className="container-wide py-8 flex flex-col gap-1">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="text-lg font-semibold tracking-wider text-foreground py-3 border-b border-border/50"
                >
                  {item.label}
                </motion.a>
              ))}
              <button onClick={scrollToForm} className="btn-cta mt-6 justify-center">
                <span>Связаться</span>
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
