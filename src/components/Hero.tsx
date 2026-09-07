import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import heroVideo from "@/assets/hero-video.mp4";
import heroPoster from "@/assets/hero-poster.jpg";
import { reachGoal } from "@/lib/analytics";
import { openApplication } from "@/lib/application";

const Hero = () => {
  const scrollToForm = () => openApplication("consultation", "hero_consultation_click");

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <video
          src={heroVideo}
          poster={heroPoster}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <div className="container-wide relative pb-16 md:pb-24 pt-32">
        {/* Small label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs font-semibold uppercase tracking-[0.25em] text-cream/70 mb-6"
        >
          Staff Concierge Academy
        </motion.p>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="heading-display text-cream mb-5 max-w-4xl"
        >
          Няня, которую выбирают
        </motion.h1>

        {/* Positioning tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="text-lg md:text-2xl text-cream/90 max-w-2xl mb-6"
        >
          Больше, чем обучение — новый уровень вашей профессиональной ценности.
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-base md:text-lg text-cream/70 max-w-xl mb-6 md:mb-12"
        >
          Профессиональная программа для нянь и гувернанток от кадрового агентства
          Staff Concierge: детская психология и безопасность, стандарты работы в частной
          семье, профессиональная коммуникация, карьерная упаковка и подготовка к собеседованию.
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
            onClick={() => reachGoal("hero_program_click")}
            className="inline-flex items-center justify-center gap-3 px-7 py-4 border border-cream/40 text-cream font-semibold rounded-full uppercase tracking-wider text-sm text-center hover:bg-cream/10 transition-all duration-300"
          >
            <span>Смотреть программу</span>
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
