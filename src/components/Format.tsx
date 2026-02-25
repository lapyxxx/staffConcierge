import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Plus, Minus } from "lucide-react";

const STEP_DURATION = 7000;
const UPDATE_INTERVAL = 30;

const Format = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number>(-1);
  const [progress, setProgress] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const startTimeRef = useRef<number>(0);
  const hasStartedRef = useRef(false);

  const steps = [
    {
      num: "01",
      title: "Теория",
      description: "Онлайн-лекции и материалы в удобном темпе",
      details: [
        "Структурированные видеоуроки от экспертов",
        "Доступ к материалам 24/7",
        "Конспекты и чек-листы для каждого урока",
        "Регулярные обновления контента"
      ]
    },
    {
      num: "02",
      title: "Практика",
      description: "Отработка навыков на реальных кейсах",
      details: [
        "Реальные ситуации из работы с семьями",
        "Ролевые игры и симуляции",
        "Групповые разборы сложных кейсов",
        "Домашние задания с дедлайнами"
      ]
    },
    {
      num: "03",
      title: "Фидбек",
      description: "Персональные консультации с экспертами",
      details: [
        "Индивидуальные сессии каждые 2 недели",
        "Детальный разбор заданий",
        "Рекомендации по развитию",
        "Поддержка в закрытом чате"
      ]
    },
    {
      num: "04",
      title: "Сертификат",
      description: "Документальное подтверждение компетенций",
      details: [
        "Сертификат установленного образца (Министерство образования и науки РФ)",
        "Рекомендательное письмо",
        "Добавление в базу специалистов",
        "Помощь с резюме"
      ]
    }
  ];

  const goToStep = useCallback((index: number) => {
    setOpenIndex(index);
    setProgress(0);
    startTimeRef.current = Date.now();
  }, []);

  // Start auto-slider when section comes into view
  useEffect(() => {
    if (isInView && !hasStartedRef.current) {
      hasStartedRef.current = true;
      goToStep(0);
    }
  }, [isInView, goToStep]);

  // Auto-advance logic
  useEffect(() => {
    if (!isAutoPlaying || openIndex < 0 || openIndex >= steps.length) return;

    startTimeRef.current = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min(elapsed / STEP_DURATION, 1);
      setProgress(newProgress);

      if (newProgress >= 1) {
        if (openIndex < steps.length - 1) {
          goToStep(openIndex + 1);
        } else {
          setIsAutoPlaying(false);
          clearInterval(interval);
        }
      }
    }, UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, [isAutoPlaying, openIndex, steps.length, goToStep]);

  const toggle = (index: number) => {
    setIsAutoPlaying(false);
    setOpenIndex(openIndex === index ? -1 : index);
    setProgress(0);
  };

  return (
    <section className="section-padding bg-background" ref={ref}>
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <p className="section-label">Формат обучения</p>
          <h2 className="heading-lg">Путь к результату</h2>
        </motion.div>

        <div className="space-y-0">
          {steps.map((step, index) => {
            const isOpen = openIndex === index;
            const isPast = openIndex > index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
                className="relative"
              >
                {/* Horizontal progress bar */}
                <div className="relative h-px bg-border">
                  {(isOpen || isPast) && (
                    <div
                      className="absolute top-0 left-0 h-[2px] bg-primary transition-none"
                      style={{
                        width: isPast ? "100%" : `${progress * 100}%`,
                        transition: isPast ? "none" : undefined,
                      }}
                    />
                  )}
                </div>

                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between py-7 md:py-8 hover:bg-muted/30 transition-colors duration-300 cursor-pointer text-left px-2"
                >
                  <div className="flex items-center gap-6 md:gap-10">
                    <span
                      className={`text-xs font-mono transition-colors duration-300 ${
                        isOpen || isPast ? "text-primary" : "text-muted-foreground/50"
                      }`}
                    >
                      {step.num}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold font-heading tracking-wide">{step.title}</h3>
                  </div>

                  <div className="flex items-center gap-6">
                    <p className="text-muted-foreground text-sm md:text-base hidden sm:block max-w-xs">{step.description}</p>
                    <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center flex-shrink-0">
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-10 pt-2 px-2">
                        <div className="space-y-3">
                          {step.details.map((detail, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: i * 0.05 }}
                              className="flex items-start gap-3"
                            >
                              <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                              <p className="text-muted-foreground text-sm md:text-base">{detail}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
};

export default Format;
