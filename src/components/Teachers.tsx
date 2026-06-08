import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Globe, Instagram, Send, type LucideIcon } from "lucide-react";
import { useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import expertDarmova from "@/assets/expert-darmova.jpg";
import expertDrugova from "@/assets/expert-drugova.jpg";
import expertLevadnaya from "@/assets/expert-levadnaya.jpg";
import expertProkhorova from "@/assets/expert-prokhorova.jpg";
import expertVorontsova from "@/assets/expert-vorontsova.jpg";

type ExpertLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

type Teacher = {
  image: string;
  name: string;
  role: string;
  specialization: string;
  qualification: string[];
  qualificationPreview?: string;
  about: string[];
  aboutPreview?: string;
  experience: string[];
  subjects: string[];
  links: ExpertLink[];
};

const teachers: Teacher[] = [
  {
    image: expertDarmova,
    name: "Дармова Юлия",
    role: "Детский психолог",
    specialization: "Отношения с ребенком, возрастные кризисы, эмоциональное здоровье",
    qualification: ["Детский психолог высшей квалификационной категории. Семейный терапевт."],
    about: [
      "10 лет практики в государственном детском образовательном центре при управлении образования.",
      "Спикер на ТВ, в подкастах и онлайн-курсах для родителей, автор статей в СМИ.",
    ],
    experience: [
      "10 лет практики в государственном детском образовательном центре при управлении образования. Преподаватель психологии школы приёмных родителей. Спикер на ТВ, в подкастах и онлайн-курсах для родителей, автор статей в СМИ.",
      "- Коррекция тревожности, неврозов и поведенческих нарушений у детей 2–12 лет",
      "- Работа с родителями как основным инструментом изменений в состоянии ребёнка",
    ],
    subjects: [
      "Выстраивание отношений с ребенком",
      "Коррекция поведения",
      "Возрастные кризисы ребенка",
      "Взаимодействие с семьёй",
    ],
    links: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/psyxolog.dety?igsh=MXZqemMxMGg0NWpyag==",
        icon: Instagram,
      },
    ],
  },
  {
    image: expertLevadnaya,
    name: "Анна Левадная",
    role: "Педиатр",
    specialization: "Здоровье ребенка, первая помощь, уход и безопасность",
    qualification: ["Педиатр, неонатолог, кандидат медицинских наук. Стаж в профессии — более 18 лет."],
    qualificationPreview: "Педиатр, неонатолог, кандидат медицинских наук. Более 18 лет в профессии.",
    about: [
      "- Более 11 лет ведёт просветительский блог о детском здоровье с аудиторией свыше 2,2 млн подписчиков-родителей;",
    ],
    experience: [
      "- Заведующая отделением в федеральном НМИЦ акушерства, гинекологии и перинатологии им. Кулакова (Москва) — ведущем перинатальном центре страны.",
      "- Главный врач детской клиники в Дубае.",
      "- Более 11 лет ведёт просветительский блог о детском здоровье с аудиторией свыше 2,2 млн подписчиков-родителей;",
      "- Более 10 000 семей прошли её онлайн-курсы, вебинары и марафоны.",
      "- Работает по международным стандартам (AAP, WHO, NICE) — практический опыт в России, ОАЭ и Европе",
      "- Автор трёх книг для родителей по педиатрии: «Как сохранить здоровье ребёнка?», «Как ухаживать за ребёнком?», «Как кормить ребёнка?».",
      "- Автор научных статей, методических пособий для врачей и глав в медицинских сборниках.",
      "- Эксперт крупных федеральных брендов и СМИ, постоянный гость центральных телеканалов.",
      "- Ведущая рубрики «Супермама» в программе «Утро» на телеканале «Пятница».",
      "- Член Совета благотворительного фонда «Право на Чудо», помогающего недоношенным детям.",
      "- Победитель национальных и международных премий: InstamamAwards (номинация «ПРОФИ-мама»), «Золотой Колибри», Glamour Influencers Awards (номинация «Ликбез»), Международная премия Mama Award (номинация «Медицина. Педиатрия»), лауреат шорт-листа Forbes Woman Mercury Awards в номинации «Лучшая благотворительная и социальная инициатива»",
      "- Разбор реальных клинических ситуаций, красных флагов и безопасного поведения с ребёнком — на основе доказательной медицины и многолетней практики в стационаре",
    ],
    subjects: [
      "Здоровье ребёнка",
      "Первая помощь в экстренных ситуациях",
      "Режим дня и уход за малышом",
      "Безопасность дома, на улице и на площадке",
    ],
    links: [],
  },
  {
    image: expertDrugova,
    name: "Татьяна Другова",
    role: "Психолог",
    specialization: "Семейная психология, взаимодействие с родителями, границы и иерархия",
    qualification: ["Психолог, философ, академик, блогер с аудиторией 1,6 млн подписчиков"],
    about: [
      "- Автор метода ролевых трансформаций StepWay",
      "- Mrs. Universe Successful 2023",
      "- Лауреат Всероссийского Конкурса  \"Сделано в России. Психология\"",
    ],
    experience: [
      "Психолог, философ, академик, блогер с аудиторией 1,6 млн подписчиков",
      "Жена, бабушка (62 года)",
      "- Эксперт в области психологии",
      "- Философ",
      "- Автор метода ролевых трансформаций StepWay",
      "- Автор книг-бестселлеров",
      "\"Жизнь в свою пользу\"",
      "\"Бизнес в свою пользу\"",
      "- Академик Российской Муниципальной Академии",
      "- Общественный деятель",
      "- Автор уникальной методики Ролевых трансформаций StepWay",
      "- Mrs. Universe Successful 2023",
      "- Миссис Россия Гранд",
      "- Эксперт Центральных каналов Телевидения",
      "- Лауреат Всероссийского Конкурса  \"Сделано в России. Психология\" (награждение проходило  в Государственной  Думе РФ)",
      "Победитель в номинациях",
      "- \"Достояние России\"",
      "- Женщина Года",
      "- Прорыв Года",
    ],
    subjects: [
      "Знакомство с семьей",
      "Взаимодействие с родителями",
      "Границы занятости",
      "Профилактика выгорания",
    ],
    links: [
      {
        label: "Instagram",
        href: "https://www.instagram.com/tatyana.drugova?igsh=MXN6OGJpdzl5dHk1Zg==",
        icon: Instagram,
      },
    ],
  },
  {
    image: expertProkhorova,
    name: "Екатерина Прохорова",
    role: "Юрист",
    specialization: "Юридическая грамотность, трудовые отношения, переговоры",
    qualification: ["Юрист, профессиональный переговорщик, медиатор и арбитр."],
    about: [
      "- 11 лет практики на международном рынке",
      "- 85% кейсов агентства решаются мирно и конфиденциально без передачи в суд",
    ],
    aboutPreview:
      "11 лет практики на международном рынке, 85% кейсов агентства решаются мирно и конфиденциально без передачи в суд",
    experience: [
      "- фаундер агентства EP Legal Support and Communication",
      "- 11 лет практики на международном рынке",
      "- сопровождаем ed-tech проекты, онлайн-школы, digital-бизнес, блогеров и экспертов в РФ, РБ, ЕС, ОАЭ и Грузии",
      "- помогаем бизнесам расти за счет осознанного входа участников в партнерство, либо аудита действующего партнерства",
      "- 85% кейсов агентства решаются мирно и конфиденциально без передачи в суд",
      "- защищаем интеллектуальные права на креатив в соц сетях (Instagram, Telegram, YouTube)",
      "- документы в стиле legal design простым и понятным языком",
    ],
    subjects: [
      "Трудовые отношения с работодателем",
      "Стандарты работы",
      "Границы ответственности",
      "Юридическая грамотность",
      "Конфиденциальность и этика",
      "Личные границы",
    ],
    links: [
      {
        label: "Сайт",
        href: "https://eplegal.ru/",
        icon: Globe,
      },
      {
        label: "Telegram",
        href: "https://t.me/prokhorova_law",
        icon: Send,
      },
      {
        label: "Instagram",
        href: "https://www.instagram.com/prokhorova_law/",
        icon: Instagram,
      },
    ],
  },
  {
    image: expertVorontsova,
    name: "Воронцова Евгения Михайловна",
    role: "HR",
    specialization: "Составление резюме, заполнение анкеты, запись видеовизитки, подготовка к собеседованию",
    qualification: [
      "Высшее психологическое образование",
      "Педагог-психолог",
      "Семейный психолог",
    ],
    about: [
      "В сфере подбора домашнего персонала с 2010 года",
      "Специалист по программе АВА (программа для детей аутистического спектра)",
    ],
    aboutPreview:
      "В сфере подбора домашнего персонала с 2010 года, специалист по программе АВА",
    experience: [
      "Высшее психологическое образование",
      "Педагог-психолог",
      "Семейный психолог",
      "Специалист по программе АВА (программа для детей аутистического спектра)",
      "Работала в школе (психолог)",
      "Многолетняя частная",
      "В сфере подбора домашнего персонала с 2010 года",
    ],
    subjects: [
      "Составление резюме",
      "Заполнение анкеты",
      "Запись видеовизитки",
      "Подготовка к собеседованию",
    ],
    links: [],
  },
];

const formatPreviewText = (items: string[], preview?: string) =>
  (preview ?? items.map((item) => item.replace(/^- /, "")).join(", ")).replace(/[.,;:]+$/, "");

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
          className="mb-12 md:mb-16"
        >
          <p className="section-label">Преподаватели</p>
          <h2 className="heading-lg">Наши эксперты</h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {teachers.map((teacher, index) => (
            <Dialog key={teacher.name}>
              <DialogTrigger asChild>
                <motion.article
                  role="button"
                  tabIndex={0}
                  aria-label={`Подробнее: ${teacher.name}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  className="card-elevated overflow-hidden flex h-full cursor-pointer flex-col bg-background/80 outline-none transition-transform duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={teacher.image}
                      alt={teacher.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>

                  <div className="p-5 flex flex-1 flex-col gap-4">
                    <div>
                      <h3 className="text-lg font-bold font-heading leading-tight mb-1">
                        {teacher.name}
                      </h3>
                      <p className="text-primary text-sm font-semibold">{teacher.role}</p>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div>
                        <p className="mb-1 font-heading text-xs font-semibold tracking-[0.12em] text-foreground">
                          Квалификация
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                          {formatPreviewText(teacher.qualification, teacher.qualificationPreview)}
                        </p>
                      </div>
                      <div>
                        <p className="mb-1 font-heading text-xs font-semibold tracking-[0.12em] text-foreground">
                          О специалисте
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                          {formatPreviewText(teacher.about, teacher.aboutPreview)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-auto inline-flex items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:border-primary/40 hover:text-primary">
                      <span>Подробнее</span>
                      <ArrowUpRight size={13} />
                    </div>
                  </div>
                </motion.article>
              </DialogTrigger>

              <DialogContent className="max-h-[86vh] max-w-4xl overflow-y-auto rounded-2xl border-border bg-background p-0">
                <div className="grid">
                  <div className="p-6 md:p-8">
                    <DialogHeader className="mb-6">
                      <DialogTitle className="font-heading text-2xl uppercase tracking-[0.08em]">
                        {teacher.name}
                      </DialogTitle>
                      <DialogDescription>
                        {teacher.role} · {teacher.specialization}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-5 text-sm">
                      <section>
                        <p className="mb-2 font-heading text-xs font-semibold tracking-[0.12em] text-foreground">
                          Квалификация
                        </p>
                        <div className="space-y-2">
                          {teacher.qualification.map((item) => (
                            <p key={item} className="text-muted-foreground leading-relaxed">{item}</p>
                          ))}
                        </div>
                      </section>

                      <section>
                        <p className="mb-2 font-heading text-xs font-semibold tracking-[0.12em] text-foreground">
                          О специалисте
                        </p>
                        <div className="space-y-2">
                          {teacher.about.map((item) => (
                            <p key={item} className="text-muted-foreground leading-relaxed">{item}</p>
                          ))}
                        </div>
                      </section>

                      <section>
                        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground">
                          Опыт
                        </p>
                        <div className="space-y-2">
                          {teacher.experience.map((item) => (
                            <p key={item} className="leading-relaxed text-muted-foreground">{item}</p>
                          ))}
                        </div>
                      </section>

                      <section>
                        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground">
                          Ведёт на курсе
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {teacher.subjects.map((subject) => (
                            <span
                              key={subject}
                              className="inline-flex items-center rounded-full bg-olive-light/70 px-3 py-1 text-[11px] text-foreground"
                            >
                              {subject}
                            </span>
                          ))}
                        </div>
                      </section>

                      {teacher.links.length > 0 && (
                        <section className="border-t border-border/60 pt-4">
                          <div className="flex flex-wrap gap-2">
                            {teacher.links.map(({ href, icon: Icon, label }) => (
                              <a
                                key={href}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-full border border-border/70 px-3 py-1.5 text-[11px] font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                              >
                                <Icon size={13} />
                                <span>{label}</span>
                              </a>
                            ))}
                          </div>
                        </section>
                      )}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teachers;
