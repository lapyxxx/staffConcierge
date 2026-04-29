import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import logo from "@/assets/logo.svg";

const Solution = () => {
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
    <section id="about" className="section-padding" ref={ref}>
      <div className="container-wide">
        {/* Top row: heading left, agency highlight right */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-start mb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label">О курсе</p>
            <h2 className="heading-xl">
              Академия от действующего агентства
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:pt-2"
          >
            <div className="bg-primary/[0.07] border border-primary/15 rounded-2xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 opacity-[0.06]">
                <img src={logo} alt="" className="w-20 h-20 object-contain" aria-hidden="true" />
              </div>
              <p className="text-base md:text-lg leading-[1.8] text-foreground relative z-10">
                <span className="text-primary font-bold text-lg md:text-xl">Staff Concierge Academy</span>
                <br className="hidden sm:block" />
                — образовательный проект агентства{" "}
                <a
                  href="https://staff-concierge.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-semibold underline underline-offset-4 decoration-primary/40 hover:decoration-primary transition-colors"
                >
                  Staff Concierge
                </a>
                , которое ежедневно подбирает домашний персонал для премиальных семей.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom row: bullets + text + CTA left, stats right */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-3">
              {[
                "Программа, построенная на реальных запросах семей",
                "Преподаватели-практики из индустрии",
                "Приоритетное рассмотрение лучших выпускников при соответствии стандартам агентства",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -15 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <p className="text-foreground">{item}</p>
                </motion.div>
              ))}
            </div>

            <p className="text-lead">
              Мы знаем, каких специалистов ищут VIP-семьи, потому что работаем
              с ними каждый день. И мы готовим именно таких профессионалов.
            </p>

            <button onClick={scrollToForm} className="btn-cta">
              <span>Начать обучение</span>
              <ArrowUpRight size={16} />
            </button>
          </motion.div>

          {/* Stats grid 2x2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: "5", label: "Модулей обучения" },
                { number: "50+", label: "Часов практики" },
                { number: "3", label: "Уровня сопровождения" },
                { number: "1", label: "Связка с действующим агентством" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className={`p-6 rounded-2xl border border-border ${
                    index === 1 || index === 3 ? "bg-primary text-primary-foreground border-transparent" : "bg-card"
                  }`}
                >
                  <p className={`stat-number ${index === 1 || index === 3 ? "" : "text-primary"}`}>
                    {stat.number}
                  </p>
                  <p className={`mt-2 text-sm ${index === 1 || index === 3 ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Solution;
