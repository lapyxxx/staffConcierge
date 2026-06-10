import { motion, useInView } from "framer-motion";
import { CheckCircle2, ClipboardCheck, SearchCheck } from "lucide-react";
import { useRef } from "react";

const items = [
  {
    icon: ClipboardCheck,
    title: "Финальная проверка",
    text: "В конце программы участник проходит итоговое тестирование и практические задания по ключевым темам курса.",
  },
  {
    icon: CheckCircle2,
    title: "Подтверждение уровня",
    text: "Результат экзамена помогает подтвердить готовность специалиста к работе с семьями премиального сегмента.",
  },
  {
    icon: SearchCheck,
    title: "Приоритетное рассмотрение",
    text: "Лучшие выпускники могут получить рекомендацию школы при успешном завершении программы, совпадении с вакансией и прохождении внутренних проверок.",
  },
];

const ExamEmployment = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="employment" className="section-padding bg-background" ref={ref}>
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12"
        >
          <p className="section-label">Экзамен и рекомендация</p>
          <h2 className="heading-lg mb-5">Финальный экзамен и приоритет для лучших выпускников</h2>
          <p className="text-muted-foreground leading-relaxed">
            Обучение не гарантирует трудоустройство или конкретный доход. Рекомендация возможна только
            при выполнении условий программы и соответствии требованиям конкретной семьи.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {items.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="rounded-2xl border border-border bg-card p-6 md:p-7"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <item.icon size={22} className="text-primary" />
              </div>
              <h3 className="mb-3 text-base font-bold md:text-lg">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExamEmployment;
