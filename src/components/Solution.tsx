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
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: heading, intro, bullets, CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div>
              <p className="section-label">О курсе</p>
              <h2 className="heading-xl">Программа, построенная на практике</h2>
            </div>

            <p className="text-lead">
              Содержание опирается на реальные ситуации из повседневной работы
              с детьми и семьями. Занятия ведут практикующие специалисты —
              педагоги, психологи, юрист и врач.
            </p>

            <div className="space-y-3">
              {[
                "Программа, построенная на реальных запросах семей",
                "Преподаватели-практики из индустрии",
                "Теория, практические задания и обратная связь в каждом модуле",
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

            <button onClick={scrollToForm} data-metrika-goal="about_cta_click" className="btn-cta">
              <span>Начать обучение</span>
              <ArrowUpRight size={16} />
            </button>
          </motion.div>

          {/* Right: stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:pt-14"
          >
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 md:p-8">
              <div className="absolute -top-4 -right-4 opacity-[0.05]">
                <img src={logo} alt="" className="w-32 h-32 object-contain" aria-hidden="true" />
              </div>
              <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
                {[
                  { number: "13", label: "модулей обучения" },
                  { number: "20", label: "часов практики" },
                  { number: "3", label: "уровня сопровождения" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    <p className="stat-number text-primary">{stat.number}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Solution;
