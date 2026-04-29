import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, ArrowUpRight } from "lucide-react";

const FloatingActions = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [bottomOffset, setBottomOffset] = useState("16px");

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 520);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const compactQuery = window.matchMedia("(max-width: 1023px)");

    const updateBottomOffset = () => {
      const isCompact = compactQuery.matches;
      const viewport = window.visualViewport;
      const viewportGap = viewport
        ? Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop)
        : 0;
      const baseOffset = isCompact ? 12 : 24;
      const dynamicOffset = isCompact ? baseOffset + viewportGap : baseOffset;

      setBottomOffset(`calc(${Math.round(dynamicOffset)}px + env(safe-area-inset-bottom, 0px))`);
    };

    updateBottomOffset();
    compactQuery.addEventListener("change", updateBottomOffset);
    window.addEventListener("resize", updateBottomOffset);
    window.visualViewport?.addEventListener("resize", updateBottomOffset);
    window.visualViewport?.addEventListener("scroll", updateBottomOffset);

    return () => {
      compactQuery.removeEventListener("change", updateBottomOffset);
      window.removeEventListener("resize", updateBottomOffset);
      window.visualViewport?.removeEventListener("resize", updateBottomOffset);
      window.visualViewport?.removeEventListener("scroll", updateBottomOffset);
    };
  }, []);

  const scrollToForm = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("intent", "consultation");
    window.history.pushState({}, "", url);
    window.dispatchEvent(new CustomEvent("application-intent-change"));
    document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 28, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 360, damping: 28 }}
          style={{ bottom: bottomOffset }}
          className="fixed inset-x-0 z-40 pointer-events-none px-4 md:inset-x-auto md:left-6 md:right-6 md:px-0"
        >
          <div className="flex items-center justify-between gap-3">
            <motion.button
              type="button"
              onClick={scrollToTop}
              className="pointer-events-auto h-12 w-12 shrink-0 rounded-full bg-foreground border border-foreground shadow-xl ring-1 ring-background/50 flex items-center justify-center text-background hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              aria-label="Вернуться в начало сайта"
              whileTap={{ scale: 0.94 }}
            >
              <ArrowUp size={18} />
            </motion.button>

            <motion.button
              type="button"
              onClick={scrollToForm}
              className="pointer-events-auto flex-1 md:flex-none h-12 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-xl hover:opacity-95 transition-opacity"
              whileTap={{ scale: 0.96 }}
            >
              <span>Оставить заявку</span>
              <ArrowUpRight size={15} />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingActions;
