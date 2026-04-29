import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import teacher1 from "@/assets/teacher-1.jpg";
import teacher2 from "@/assets/teacher-2.jpg";
import teacher3 from "@/assets/teacher-3.jpg";

const teachers = [
  {
    image: teacher1,
    name: "Екатерина Морозова",
    role: "Психология развития и коммуникация",
    education: "Клинический и семейный психолог, МГУ им. М.В. Ломоносова. Дополнительная подготовка по детской психотерапии.",
    summary:
      "Опыт работы в частном сопровождении детей и консультировании специалистов по выстраиванию границ и взаимодействию с родителями.",
    experienceHighlights: [
      "Практика в премиальном сегменте и этике сервиса",
      "Разбор кейсов и сценариев коммуникации с семьёй",
    ],
    subjects: ["Психология развития", "Коммуникация с родителями", "Эмоциональное благополучие ребёнка"],
  },
  {
    image: teacher2,
    name: "Мария Ильина",
    role: "Методики развития и обучение",
    education: "Педагог начальных классов, РГПУ им. А.И. Герцена. Повышение квалификации по современным методикам развития.",
    summary:
      "Практик в области планирования занятий, развития речи и когнитивных навыков, адаптации программ под возраст и контекст семьи.",
    experienceHighlights: [
      "Систематизация программы занятий на неделю и месяц",
      "Инструменты наблюдения и оценки прогресса ребёнка",
    ],
    subjects: ["Развивающие занятия", "Методики обучения", "Раннее развитие"],
  },
  {
    image: teacher3,
    name: "Анна Власова",
    role: "Премиальный сервис и профессиональный образ",
    education: "Менеджмент в сфере сервиса и гостеприимства, Высшая школа экономики. Специализация — частные дома и VIP-сопровождение.",
    summary:
      "Настройка стандартов работы, конфиденциальность, деловой тон и предсказуемое качество в повседневной коммуникации.",
    experienceHighlights: [
      "Этика, сервис‑мышление и документация договорённостей",
      "Практикум по сложным ситуациям без конфликта",
    ],
    subjects: ["Премиальный сервис", "Позиционирование эксперта", "Коммуникация в частном доме"],
  },
];

const Teachers = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="teachers" className="section-padding bg-card" ref={ref}>
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label">Преподаватели</p>
          <h2 className="heading-lg">Наши эксперты</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {teachers.map((teacher, index) => (
            <motion.article
              key={teacher.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card-elevated overflow-hidden flex flex-col bg-background/80"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
                />
              </div>

              <div className="p-6 md:p-7 flex-1 flex flex-col gap-4">
                <div>
                  <h3 className="text-lg md:text-xl font-bold font-heading mb-1">{teacher.name}</h3>
                  <p className="text-primary text-sm font-semibold">{teacher.role}</p>
                </div>

                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground mb-1">
                      Образование
                    </p>
                    <p className="text-muted-foreground leading-relaxed">{teacher.education}</p>
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground mb-1">
                      Опыт
                    </p>
                    <p className="text-muted-foreground leading-relaxed">{teacher.summary}</p>
                    <ul className="mt-3 space-y-1.5">
                      {teacher.experienceHighlights.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-muted-foreground">
                          <span className="mt-2 w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground mb-1">
                      Ведёт на курсе
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {teacher.subjects.map((subject) => (
                        <span
                          key={subject}
                          className="inline-flex items-center rounded-full bg-olive-light/70 text-[11px] px-3 py-1 text-foreground"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teachers;
