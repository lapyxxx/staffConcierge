import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import heroVideo from "@/assets/hero-video.mp4";

const Hero = () => {
  const scrollToForm = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("intent", "consultation");
    window.history.pushState({}, "", url);
    window.dispatchEvent(new CustomEvent("application-intent-change"));
    document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
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
          Обучение от агентства Staff Concierge
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
          className="text-base md:text-lg text-cream/70 max-w-lg mb-6 md:mb-12"
        >
          Профессиональная программа для нянь и гувернанток, которые хотят
          уверенно работать с премиальными семьями и понимать стандарты рынка.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button onClick={scrollToForm} className="inline-flex items-center justify-center gap-3 px-7 py-4 bg-primary text-primary-foreground font-semibold rounded-full uppercase tracking-wider text-sm text-center hover:shadow-lg transition-all duration-300">
            <span>Получить консультацию</span>
            <ArrowUpRight size={16} />
          </button>
          <a
            href="#program"
            className="inline-flex items-center justify-center gap-3 px-7 py-4 border border-cream/40 text-cream font-semibold rounded-full uppercase tracking-wider text-sm text-center hover:bg-cream/10 transition-all duration-300"
          >
            <span>Смотреть программу</span>
            <ArrowDown size={16} />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.42 }}
          className="mt-6 md:mt-8 max-w-2xl border-l border-primary pl-5 text-sm md:text-base text-cream/80 leading-relaxed"
        >
          Лучшие выпускники после успешного завершения программы и соответствия
          стандартам могут получить приоритетное рассмотрение в агентстве.
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
