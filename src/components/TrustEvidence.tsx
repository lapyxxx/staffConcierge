import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, FileText, GraduationCap, PlayCircle, Quote } from "lucide-react";

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

// ─── Контентные блоки доверия (п.4 сметы) ────────────────────────────────
// Заполняются утверждёнными материалами заказчика. Пока значения пустые —
// блоки не отображаются, поэтому на прод ничего «недоделанного» не попадёт.

// Подтверждённые цифры/факты об опыте агентства.
// Пример: { value: "8 лет", label: "агентство подбирает домашний персонал" }
const agencyStats: { value: string; label: string }[] = [
  // TODO(контент): добавить утверждённые цифры.
];

// Фрагмент урока: видео/скрин/описание. Заполнить href и текст — появится карточка.
// Пример: { title: "Фрагмент урока", description: "…", href: "https://…" }
const lessonSample: { title: string; description: string; href: string } | null = null;

// Пример реальной обратной связи (с разрешением на публикацию).
// Пример: { text: "…", author: "Куратор программы" }
const feedbackExample: { text: string; author: string } | null = null;

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

        {agencyStats.length > 0 && (
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 rounded-2xl border border-border bg-card p-6 md:p-8">
            {agencyStats.map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <p className="stat-number text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {(lessonSample || feedbackExample) && (
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {lessonSample && (
              <a
                href={lessonSample.href}
                target="_blank"
                rel="noopener noreferrer"
                data-metrika-goal="lesson_sample_click"
                className="group flex flex-col rounded-2xl border border-border bg-card p-6 md:p-7 hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <PlayCircle size={22} className="text-primary" />
                </div>
                <h3 className="text-base md:text-lg font-bold mb-3">{lessonSample.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{lessonSample.description}</p>
                <span className="mt-4 text-sm font-semibold text-primary group-hover:underline">Смотреть фрагмент →</span>
              </a>
            )}
            {feedbackExample && (
              <figure className="flex flex-col rounded-2xl border border-border bg-card p-6 md:p-7">
                <Quote size={22} className="text-primary mb-4" />
                <blockquote className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {feedbackExample.text}
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-foreground">{feedbackExample.author}</figcaption>
              </figure>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default TrustEvidence;
