import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STORAGE_KEY = "staff-academy-cookie-consent";
const DESKTOP_QUERY = "(min-width: 1024px)";
const COLLAPSE_SCROLL_Y = 520;
const popupTransition = { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const };

const CookieNotice = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPinnedOpen, setIsPinnedOpen] = useState(false);

  useEffect(() => {
    setIsVisible(localStorage.getItem(STORAGE_KEY) !== "accepted");
  }, []);

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_QUERY);
    const updateDesktop = () => {
      setIsDesktop(media.matches);
      if (!media.matches) {
        setIsCollapsed(false);
      }
    };

    updateDesktop();
    media.addEventListener("change", updateDesktop);
    return () => media.removeEventListener("change", updateDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop || isPinnedOpen) {
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > COLLAPSE_SCROLL_Y) {
        setIsCollapsed(true);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDesktop, isPinnedOpen]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("staff-cookie-dot-change", {
        detail: { visible: isVisible && isDesktop && isCollapsed },
      }),
    );
  }, [isVisible, isDesktop, isCollapsed]);

  useEffect(() => {
    const handleOpen = () => openPinned();

    window.addEventListener("staff-cookie-open", handleOpen);
    return () => window.removeEventListener("staff-cookie-open", handleOpen);
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setIsVisible(false);
    window.dispatchEvent(new CustomEvent("staff-cookie-dot-change", { detail: { visible: false } }));
  };

  const openPinned = () => {
    setIsPinnedOpen(true);
    setIsCollapsed(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      {(!isDesktop || !isCollapsed) && (
        <motion.div
          key="cookie-popup"
          initial={{ opacity: 0, scale: 0.96, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={popupTransition}
          className="fixed left-3 right-3 bottom-3 md:left-auto md:right-6 md:bottom-6 md:max-w-md z-50 rounded-2xl border border-border bg-background/95 backdrop-blur p-4 md:p-5 shadow-lg origin-bottom-right"
        >
          <p className="text-sm text-foreground font-semibold mb-1.5">Мы используем cookie</p>
          <p className="text-xs text-muted-foreground leading-relaxed mb-3">
            Cookie помогают анализировать посещаемость и улучшать сайт. Продолжая пользоваться сайтом,
            вы соглашаетесь с политикой конфиденциальности.
          </p>
          <button
            type="button"
            onClick={accept}
            className="w-full rounded-full bg-foreground px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-background hover:opacity-90 transition-opacity"
          >
            Понятно
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieNotice;
