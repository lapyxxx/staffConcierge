import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import ctaBgVideo from "@/assets/cta-bg.mp4";

const FinalCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToForm = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("intent", "consultation");
    window.history.pushState({}, "", url);
    window.dispatchEvent(new CustomEvent("application-intent-change"));
    document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0">
        <video src={ctaBgVideo} autoPlay loop muted playsInline preload="metadata" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-charcoal/65" />
      </div>

      <div className="container-wide relative py-24 md:py-32 lg:py-40">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <h2 className="heading-xl text-cream mb-6">
              Начните путь к профессии, где важны доверие, статус и достойная оплата
            </h2>
            <p className="text-cream/60 text-base mb-10">
              Вы можете пройти обучение самостоятельно, выбрать сопровождение или получить индивидуальную
              карьерную траекторию. Главное — начать с профессиональной системы, а не с разрозненных советов.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button onClick={scrollToForm} className="inline-flex items-center gap-3 px-7 py-4 bg-primary text-primary-foreground font-semibold rounded-full uppercase tracking-wider text-sm hover:shadow-lg transition-all">
              <span>Оставить заявку</span>
              <ArrowUpRight size={16} />
            </button>
            <a
              href="https://t.me/staffconcierge"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-cream/40 text-cream font-semibold rounded-full uppercase tracking-wider text-sm hover:bg-cream/10 transition-colors"
            >
              Написать в Telegram
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
