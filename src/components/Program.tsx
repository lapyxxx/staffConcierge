import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SLIDE_DURATION = 7000; // ms per module

const modules = [
  {
    number: "01",
    title: "Психология детского развития",
    duration: "12 часов",
    content: [
      "Возрастные особенности развития",
      "Психологические потребности детей",
      "Формирование здоровой привязанности",
      "Эмоциональный интеллект и саморегуляция",
      "Работа с детскими страхами"
    ]
  },
  {
    number: "02",
    title: "Методики развития и обучения",
    duration: "15 часов",
    content: [
      "Современные педагогические подходы",
      "Раннее развитие: научный взгляд",
      "Игровые методики обучения",
      "Подготовка к школе",
      "Развитие творческих способностей"
    ]
  },
  {
    number: "03",
    title: "Коммуникация с семьёй",
    duration: "10 часов",
    content: [
      "Профессиональные границы",
      "Эффективная коммуникация с родителями",
      "Отчётность и обратная связь",
      "Разрешение конфликтов",
      "Этика работы в частном доме"
    ]
  },
  {
    number: "04",
    title: "Особые потребности детей",
    duration: "8 часов",
    content: [
      "Работа с особенными детьми",
      "Инклюзивный подход",
      "Адаптация программ",
      "Взаимодействие со специалистами",
      "Поддержка семьи"
    ]
  },
  {
    number: "05",
    title: "Премиальный сервис",
    duration: "10 часов",
    content: [
      "Стандарты премиального сегмента",
      "Организация быта и распорядка",
      "Путешествия и сопровождение",
      "Культурное развитие и досуг",
      "Личный бренд эксперта"
    ]
  }
];

const Program = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [progress, setProgress] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
  }, []);

  // Start auto-slide when section comes into view
  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true);
      setActiveIndex(0);
      setProgress(0);
    }
  }, [isInView, hasStarted]);

  // Auto-cycle through modules
  useEffect(() => {
    if (!hasStarted || userInteracted || activeIndex < 0) return;

    clearTimers();

    const startTime = Date.now();
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(elapsed / SLIDE_DURATION, 1);
      setProgress(p);
    }, 30);

    timerRef.current = setTimeout(() => {
      if (progressRef.current) clearInterval(progressRef.current);
      setProgress(0);
      setActiveIndex((prev) => {
        const next = prev + 1;
        if (next >= modules.length) {
          // Stop after last module — stay on last
          setUserInteracted(true);
          setProgress(1);
          return prev;
        }
        return next;
      });
    }, SLIDE_DURATION);

    return clearTimers;
  }, [activeIndex, hasStarted, userInteracted, clearTimers]);

  const handleManualChange = (value: string) => {
    setUserInteracted(true);
    clearTimers();
    if (value) {
      const idx = parseInt(value.replace("module-", ""), 10);
      setActiveIndex(idx);
      setProgress(1);
    } else {
      setActiveIndex(-1);
    }
  };

  const accordionValue = activeIndex >= 0 ? `module-${activeIndex}` : "";

  return (
    <section id="program" className="section-padding bg-card" ref={ref}>
      <div className="container-wide">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 lg:sticky lg:top-32 lg:self-start"
          >
            <p className="section-label">Программа курса</p>
            <h2 className="heading-lg mb-6">
              <span className="inline-block -translate-y-[0.03em] align-baseline font-sans font-extrabold tracking-normal [font-variant-numeric:lining-nums]">
                5
              </span>{" "}
              модулей для полной трансформации
            </h2>
            <p className="text-muted-foreground mb-8 text-sm">
              Каждый модуль включает теорию, практику и индивидуальную обратную связь.
            </p>
            <span className="inline-block px-4 py-2 bg-primary/10 rounded-full text-sm font-medium text-primary">55+ часов</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <Accordion
              type="single"
              collapsible
              className="space-y-3"
              value={accordionValue}
              onValueChange={handleManualChange}
            >
              {modules.map((module, index) => {
                const isActive = activeIndex === index;
                const isPast = index < activeIndex;
                const lineProgress = isActive ? progress : isPast ? 1 : 0;

                return (
                  <AccordionItem
                    key={index}
                    value={`module-${index}`}
                    className="border border-border rounded-xl overflow-hidden bg-background relative"
                  >
                    {/* Progress line on the left */}
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary/10 rounded-full overflow-hidden">
                      <div
                        className="w-full bg-primary rounded-full transition-none"
                        style={{
                          height: `${lineProgress * 100}%`,
                          transition: isActive && !userInteracted ? 'none' : 'height 0.3s ease',
                        }}
                      />
                    </div>
                    <AccordionTrigger className="hover:no-underline px-6 py-5">
                      <div className="flex items-center gap-5 w-full">
                        <span className={`text-2xl font-bold font-heading transition-colors duration-300 ${isActive || isPast ? 'text-primary' : 'text-primary/30'}`}>
                          {module.number}
                        </span>
                        <div className="flex-1 text-left">
                          <h3 className="text-base font-bold text-foreground font-heading">{module.title}</h3>
                          <p className="text-xs font-light text-muted-foreground mt-1.5 tracking-wide">{module.duration}</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-5">
                      <ul className="space-y-2 pl-14">
                        {module.content.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-muted-foreground text-sm">
                            <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Program;
