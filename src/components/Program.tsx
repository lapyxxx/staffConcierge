import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SLIDE_DURATION = 4200; // ms per module

const modules = [
  {
    number: "01",
    title: "Моё место и мои ценности: как понять свои предпочтения в общении с детьми",
    content: [
      "Современная няня и гувернантка: в чём разница ролей и где проходит граница ответственности",
      "Что такое высокий стандарт работы в семье",
      "Этика, конфиденциальность, субординация, личные границы",
      "Первый вход в семью: как встроиться в систему и сохранить профессиональную позицию",
    ],
  },
  {
    number: "02",
    title: "Возрастные особенности и развитие ребёнка",
    content: [
      "Ребёнок 0–1 года: сигналы, базовые потребности, режим, контакт",
      "Ребёнок 1–3 лет: самостоятельность, речь, протест, кризисы",
      "Ребёнок 3–5 лет: игра, эмоции, правила, социализация",
      "Ребёнок 5–7 лет: усложнение режима, внимание, бытовая самостоятельность",
      "Как замечать тревожные признаки и корректно говорить о них родителям",
    ],
  },
  {
    number: "03",
    title: "Коммуникация с ребёнком",
    content: [
      "Как быстро выстроить доверие и контакт",
      "Как говорить, чтобы ребёнок слышал и сотрудничал",
      "Слёзы, отказ, истерика, перевозбуждение: алгоритм сопровождения",
      "Границы без крика, угроз и стыда",
      "Как поддерживать самооценку, не выращивая вседозволенность",
    ],
  },
  {
    number: "04",
    title: "Общение с родителями и взаимоотношения в семье",
    content: [
      "Первый созвон и знакомство: какие вопросы нужно задать до старта",
      "Договорённости: режим, питание, экраны, прогулки, наказания, отчётность",
      "Сложные разговоры с родителями: претензии, несогласие, разные взгляды",
      "Как давать обратную связь о ребёнке спокойно, точно и профессионально",
    ],
  },
  {
    number: "05",
    title: "Уход, режим и организация дня",
    content: [
      "Как собрать стабильный режим дня по возрасту",
      "Гардероб специалиста и детский гардероб по сезону: сборы без хаоса",
      "Питание без стресса: как формировать культуру еды",
      "Питание детей 0–3 и 4–10: от первого прикорма к школьной осознанности",
      "Сон, укладывание, переходы, ритуалы",
      "Домашняя среда: порядок, игрушки, зоны активности, безопасность пространства",
    ],
  },
  {
    number: "06",
    title: "Развитие, игры и занятия",
    content: [
      "Игра как главный инструмент развития",
      "Игры и занятия для возраста 0–3, 3–5 и 5–7 лет",
      "Речь, книги, стихи, скороговорки, словарь ребёнка",
      "Творчество, моторика, сенсорика без дорогих материалов",
    ],
  },
  {
    number: "07",
    title: "Безопасность и первая помощь",
    content: [
      "Травма головы, ожоги, раны и порезы: первая помощь до приезда врача",
      "Укусы насекомых и клеща: алгоритм действий и наблюдение",
      "Кровотечения, в том числе носовое: как определить тип и действовать",
      "Инородное тело в дыхательных путях: экстренная помощь",
      "Контакты, документы, маршруты, передача ребёнка другому взрослому",
    ],
  },
  {
    number: "08",
    title: "Я и другие: как уверенно строить диалог и представлять свои идеи",
    content: [
      "Внешний вид, речь, манеры, цифровой след",
      "Резюме, анкета, видеовизитка, собеседование",
      "Границы занятости, профессиональная устойчивость и профилактика выгорания",
    ],
  },
  {
    number: "09",
    title: "Финансовая и правовая грамотность в семейных вопросах",
    content: [
      "Финансовая грамотность специалиста: личный бюджет, учёт доходов и резерв",
      "Стоимость услуг, оплата, переработки и дополнительные задачи",
      "Юридическая защита няни: договор с семьёй, границы обязанностей, конфиденциальность",
      "Конфликт, претензия, увольнение, репутационный риск: как действовать спокойно",
    ],
  },
  {
    number: "10",
    title: "Особенности ухода и общения с детьми от 0 до 3 лет",
    content: [
      "Адаптация малыша к новому взрослому и сепарационная тревога",
      "Навыки самообслуживания: есть, одеваться, убирать, туалет",
      "Кризисы 1 и 3 лет без жёсткости и наказаний",
      "Сенсорное развитие, мелкая моторика, запуск речи",
      "Как работать сразу с двумя детьми и не терять безопасность",
    ],
  },
  {
    number: "11",
    title: "Особенности взаимодействия с детьми от 4 до 10 лет",
    content: [
      "Роль гувернантки: не просто присмотр, а развитие, сопровождение и культура",
      "Домашние задания без давления и без «делать за ребёнка»",
      "Чтение, пересказ, обсуждение, словарь, развитие речи",
      "Этикет, манеры, поведение за столом, в гостях, в общественных местах",
      "Музей, театр, экскурсия, поездка: как превращать выходы в развитие",
      "Самостоятельность, ответственность, режим, тайм-менеджмент ребёнка",
    ],
  },
  {
    number: "12",
    title: "Бонусный модуль «Ресурсы и опоры в повседневной жизни»",
    content: [
      "50 игр в дороге, очереди, кафе, ожидании",
      "Стихи, пальчиковые игры, скороговорки, успокаивающие ритуалы",
      "Как собрать чемодан ребёнку: выходной, поездка, ночёвка, отпуск",
      "Готовые сценарии на сложные дни: дождь, болезнь дома, разный возраст, день без гаджетов",
    ],
  },
  {
    number: "13",
    title: "Цифровые инструменты в повседневной жизни",
    content: [
      "Цифровой стандарт современной няни: телефон как рабочий инструмент",
      "Видеовизитка няни: сценарий, образ, кадр, свет, звук",
      "Съёмка и базовый монтаж: CapCut, Canva, iMovie и простые инструменты",
      "Гаджеты ребёнка, Wi-Fi, VPN, приложения и цифровая безопасность",
    ],
  },
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
                13
              </span>{" "}
              модулей для полной трансформации
            </h2>
            <p className="text-muted-foreground mb-8 text-sm">
              Каждый модуль включает теорию, практику и индивидуальную обратную связь.
            </p>
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
                    className="border border-white/50 rounded-xl overflow-hidden bg-card/75 backdrop-blur-sm relative"
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 lg:mt-20 max-w-3xl border-l-2 border-primary pl-6"
        >
          <p className="section-label">Цель программы</p>
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
            Удовлетворение познавательных интересов учащихся в области возрастного развития детей
            от 0 до 10 лет, освоение способов организации гармоничного, развивающего и безопасного
            взаимодействия с ребенком в повседневной жизни, а также формирование личных установок
            на здоровый образ жизни и эмоциональное благополучие в процессе ухода за детьми.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Program;
