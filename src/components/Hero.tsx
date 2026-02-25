import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import heroVideo from "@/assets/hero-video.mp4";

const Hero = () => {
  const scrollToForm = (specialization?: string) => {
    if (specialization) {
      const url = new URL(window.location.href);
      url.searchParams.set("specialization", specialization);
      window.history.pushState({}, "", url);
    }
    document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Full-screen background image */}
      <div className="absolute inset-0">
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/50" />
      </div>

      <div className="container-wide relative pb-16 md:pb-24 pt-32">
        {/* Small label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs font-semibold uppercase tracking-[0.25em] text-cream/70 mb-6"
        >
          Премиальное образование для специалистов
        </motion.p>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="heading-display text-cream mb-8 max-w-4xl"
        >
          Staff Concierge Academy
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-base md:text-lg text-cream/70 max-w-lg mb-12"
        >
          Профессиональная программа для нянь, гувернанток и педагогов,
          стремящихся работать в премиальном сегменте.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button onClick={() => scrollToForm("Хочу связаться")} className="inline-flex items-center gap-3 px-7 py-4 bg-primary text-primary-foreground font-semibold rounded-full uppercase tracking-wider text-sm hover:shadow-lg transition-all duration-300">
            <span>Оставить заявку</span>
            <ArrowUpRight size={16} />
          </button>
          <button
            onClick={() => scrollToForm("Хочу связаться")}
            className="inline-flex items-center gap-3 px-7 py-4 border border-cream/40 text-cream font-semibold rounded-full uppercase tracking-wider text-sm hover:bg-cream/10 transition-all duration-300"
          >
            Получить консультацию
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
