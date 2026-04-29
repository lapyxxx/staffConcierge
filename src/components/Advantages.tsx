import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PlayCircle, ClipboardCheck, Briefcase, CalendarClock, ShieldCheck, Banknote } from "lucide-react";

const advantages = [
  {
    icon: PlayCircle,
    title: "Живые и записанные модули",
    description: "Структурированная программа с академическими часами, к которым вы можете вернуться в любой момент.",
  },
  {
    icon: ClipboardCheck,
    title: "Разбор домашних заданий",
    description: "Кураторы и эксперты дают обратную связь, чтобы вы не просто «посмотрели курс», а действительно отработали навыки.",
  },
  {
    icon: Briefcase,
    title: "Фокус на трудоустройстве",
    description: "Помогаем упаковать опыт, подготовить резюме и правильно презентовать себя на собеседовании.",
  },
  {
    icon: CalendarClock,
    title: "Гибкий формат обучения",
    description: "Занимаетесь в комфортном темпе: с телефона или ноутбука, без отрыва от текущей работы и семьи.",
  },
  {
    icon: ShieldCheck,
    title: "Прозрачные гарантии",
    description: "Первые недели идут с поддержкой: если формат вам не подходит, обсудим условия и поможем принять решение.",
  },
  {
    icon: Banknote,
    title: "Фокус на рост дохода",
    description: "Разбираем, как говорить о ценности, условиях, графике и оплате без неподтверждённых обещаний.",
  },
];

const Advantages = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-background" ref={ref}>
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start text-left gap-3 mb-12"
        >
          <p className="section-label">Преимущества программы</p>
          <h2 className="heading-lg">Почему няни выбирают Staff Concierge Academy</h2>
          <p className="text-muted-foreground max-w-2xl text-sm md:text-base">
            Мы собрали ключевые элементы, которые важны профессиональным няням: от качества контента до реальных карьерных
            возможностей.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {advantages.map((adv, index) => (
            <motion.div
              key={adv.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="group flex flex-col items-center text-center"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary transition-colors duration-300">
                <adv.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <h3 className="text-base md:text-lg font-bold mb-2 font-heading">{adv.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{adv.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
