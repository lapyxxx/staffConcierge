import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, FileText, GraduationCap } from "lucide-react";

const evidence = [
  {
    icon: Building2,
    title: "Опыт действующего агентства",
    text: "Программа опирается на реальные запросы семей, с которыми работает Staff Concierge.",
  },
  {
    icon: FileText,
    title: "Карьерная упаковка",
    text: "В тарифах с сопровождением разбираем анкету, резюме, самопрезентацию и сложные вопросы на собеседовании.",
  },
  {
    icon: GraduationCap,
    title: "Рекомендация при выполнении условий",
    text: "Рекомендация школы возможна после успешного завершения программы и соответствия внутренним стандартам.",
  },
];

const TrustEvidence = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-background" ref={ref}>
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12"
        >
          <p className="section-label">Доверие</p>
          <h2 className="heading-lg mb-6">Не обещаем гарантии, показываем систему</h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Пока у первого потока нет публичных историй выпускников, на сайте лучше не использовать
            неподтверждённые проценты и обещания. Акцент переносим на опыт агентства, понятные
            условия рекомендации и карьерную подготовку.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {evidence.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="rounded-2xl border border-border bg-card p-6 md:p-7"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <item.icon size={22} className="text-primary" />
              </div>
              <h3 className="text-base md:text-lg font-bold mb-3">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustEvidence;
