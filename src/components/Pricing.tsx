import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { reachGoal } from "@/lib/analytics";
import { openApplication } from "@/lib/application";
import {
  ArrowUpRight,
  BookOpen,
  Briefcase,
  Calendar,
  Check,
  Shirt,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";

const setApplicationIntent = (intent: string) => openApplication(intent);

const plans = [
  {
    key: "basic",
    name: "БАЗОВЫЙ",
    subtitle: "Профессиональная подготовка",
    price: "49 900",
    oldPrice: "59 900",
    forWhom:
      "Для тех, кто хочет получить полноценную системную подготовку, освоить профессию и пройти обучение самостоятельно в удобном темпе.",
    value:
      "Вы получаете системную профессиональную базу, понимаете современные стандарты работы няни и готовы уверенно применять полученные знания в работе с ребёнком и семьёй.",
    features: [
      "12 модулей профессиональной подготовки: от возрастной психологии, развития ребёнка и первой помощи до профессионального этикета, взаимодействия с семьёй и юридической защиты специалиста",
      "Практические задания для самостоятельного закрепления",
      "Портфолио из 10 готовых рабочих документов: чек-лист безопасного договора, план адаптации ребёнка, матрица стоимости услуг и другие профессиональные инструменты",
      "Тестирование после каждого модуля",
      "Итоговая аттестация",
      "Сертификат после успешного завершения программы",
      "Техническая и организационная поддержка на образовательной платформе",
    ],
    // TODO(контент): вставить утверждённые условия тарифа. Пустые строки не отображаются.
    terms: {
      access: "",
      support: "",
      installment: "",
      refund: "",
      recommendation: "",
    },
    cta: "Начать самостоятельно",
    highlighted: false,
  },
  {
    key: "pro",
    name: "PRO",
    subtitle: "Обучение с сопровождением",
    price: "79 900",
    oldPrice: "89 900",
    forWhom:
      "Для тех, кто хочет не просто пройти курс, а получить профессиональную обратную связь, увидеть свои сильные стороны и ошибки и научиться правильно применять знания в реальных рабочих ситуациях.",
    value:
      "Вы проходите обучение с профессиональным взглядом со стороны, исправляете ошибки ещё в процессе курса и выходите из программы более уверенным, подготовленным и конкурентоспособным специалистом.",
    features: [
      "Все из тарифа БАЗОВЫЙ",
      "Проверка ключевых практических заданий",
      "Письменная обратная связь от куратора",
      "Рекомендации по исправлению ошибок и усилению профессиональных навыков",
      "Практические разборы ситуаций из работы с детьми и родителями",
      "Разбор сложных вопросов профессиональных границ, коммуникации и взаимодействия внутри семьи",
      "Обратная связь по профессиональной самопрезентации",
      "Рекомендации по улучшению анкеты специалиста на основе модуля «Профессиональный образ и карьера»",
      "Сопровождение по ключевым вопросам программы в процессе обучения",
    ],
    // TODO(контент): вставить утверждённые условия тарифа. Пустые строки не отображаются.
    terms: {
      access: "",
      support: "",
      installment: "",
      refund: "",
      recommendation: "",
    },
    cta: "Выбрать PRO",
    highlighted: true,
  },
  {
    key: "vip",
    name: "VIP",
    subtitle: "Персональная подготовка и карьерное позиционирование",
    price: "149 000",
    oldPrice: "159 000",
    forWhom:
      "Для тех, кто хочет получить максимум от программы: индивидуальную работу с экспертами, сильную профессиональную упаковку и подготовку к выходу на более высокий ценовой уровень.",
    value:
      "Вы получаете индивидуально проработанный профессиональный образ, сильную самопрезентацию и понимание собственной ценности как специалиста — чтобы увереннее проходить собеседования, претендовать на более серьёзные вакансии и повышать стоимость своих услуг.",
    features: [
      "Все из тарифа PRO",
      "Индивидуальная консультация с HR-специалистом / рекрутером",
      "Персональная подготовка к собеседованию: разбор сильных сторон, ошибок и стратегии общения с потенциальным работодателем",
      "Индивидуальная консультация с имидж-консультантом или стилистом",
      "Персональный разбор анкеты и резюме",
      "Индивидуальный разбор видеовизитки и самопрезентации",
      "Глубокая корректировка ключевых карьерных материалов",
      "Рекомендации по профессиональному образу и позиционированию",
      "Рекомендации по выходу в более высокий ценовой и премиальный сегмент",
      "Персональный план дальнейшего профессионального развития",
    ],
    // TODO(контент): вставить утверждённые условия тарифа. Пустые строки не отображаются.
    terms: {
      access: "",
      support: "",
      installment: "",
      refund: "",
      recommendation: "",
    },
    cta: "Подать заявку на VIP",
    highlighted: false,
  },
];

// Порядок и подписи строк с условиями тарифа.
const termLabels: [keyof (typeof plans)[number]["terms"], string][] = [
  ["access", "Доступ"],
  ["support", "Поддержка"],
  ["installment", "Рассрочка"],
  ["refund", "Возврат"],
  ["recommendation", "Рекомендация"],
];

const comparisonRows = [
  ["Формат", "Самостоятельное обучение", "Обучение с поддержкой", "Индивидуальное сопровождение"],
  ["Практические задания", "Самостоятельное закрепление", "Проверка ключевых заданий", "Персональный разбор материалов"],
  ["Обратная связь", "Техническая и организационная поддержка", "Письменная обратная связь куратора", "Индивидуальные консультации с экспертами"],
  ["Карьерная подготовка", "Портфолио рабочих документов", "Рекомендации по анкете и самопрезентации", "Анкета, резюме, видеовизитка и позиционирование"],
  ["Итог", "Аттестация и сертификат", "Аттестация и сертификат", "Аттестация и сертификат"],
];

const modules = [
  { icon: UtensilsCrossed, label: "Сервировка", price: "от 4 900 ₽" },
  { icon: Briefcase, label: "Этикет", price: "от 4 900 ₽" },
  { icon: Shirt, label: "Стиль", price: "от 4 900 ₽" },
  { icon: Sparkles, label: "Хозяйство", price: "от 4 900 ₽" },
  { icon: Calendar, label: "Планирование", price: "от 4 900 ₽" },
  { icon: BookOpen, label: "Навыки", price: "от 4 900 ₽" },
];

const Pricing = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      reachGoal("pricing_view");
    }
  }, [isInView]);

  return (
    <section id="pricing" className="py-24 md:py-32 bg-secondary" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-6">Тарифы</p>
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-[0.08em] text-foreground mb-4">
            Выберите формат обучения
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Разница между тарифами не в количестве уроков, а в уровне сопровождения,
            глубине обратной связи и скорости уверенного выхода в практику.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.article
              key={plan.key}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-2xl p-7 md:p-8 flex flex-col transition-all duration-300 ${
                plan.highlighted
                  ? "bg-dark text-dark-foreground ring-1 ring-dark"
                  : "bg-card/80 backdrop-blur-sm border border-white/50"
              }`}
            >
              {plan.highlighted && (
                <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.22em] text-primary bg-white px-3 py-1 rounded-full mb-4 self-start">
                  Рекомендуемый тариф
                </span>
              )}

              <h3 className={`text-xl font-bold uppercase tracking-[0.1em] mb-1 ${
                plan.highlighted ? "text-dark-foreground" : "text-foreground"
              }`}>
                {plan.name}
              </h3>
              <p className={`text-xs mb-6 ${plan.highlighted ? "text-dark-foreground/65" : "text-muted-foreground"}`}>
                {plan.subtitle}
              </p>

              <div className="mb-6">
                <span className={`text-4xl font-extrabold tracking-tight ${
                  plan.highlighted ? "text-dark-foreground" : "text-foreground"
                }`}>
                  {plan.price}
                </span>
                <span className={plan.highlighted ? "text-dark-foreground/55" : "text-muted-foreground"}> ₽</span>
                <p className={`mt-1 text-sm line-through ${plan.highlighted ? "text-dark-foreground/55" : "text-muted-foreground"}`}>
                  {plan.oldPrice} ₽
                </p>
              </div>

              <div className={`space-y-3 mb-7 pb-6 border-b ${plan.highlighted ? "border-white/15" : "border-border"}`}>
                <p className={`text-sm leading-relaxed ${plan.highlighted ? "text-dark-foreground/80" : "text-muted-foreground"}`}>
                  <span className={plan.highlighted ? "text-dark-foreground font-semibold" : "text-foreground font-semibold"}>Для кого: </span>
                  {plan.forWhom}
                </p>
                <p className={`text-sm leading-relaxed ${plan.highlighted ? "text-dark-foreground/80" : "text-muted-foreground"}`}>
                  <span className={plan.highlighted ? "text-dark-foreground font-semibold" : "text-foreground font-semibold"}>Результат: </span>
                  {plan.value}
                </p>
              </div>

              <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.15em] ${plan.highlighted ? "text-dark-foreground" : "text-foreground"}`}>
                В тариф входит
              </p>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      plan.highlighted ? "bg-white/20" : "bg-primary/15"
                    }`}>
                      <Check size={10} className={plan.highlighted ? "text-dark-foreground" : "text-primary"} />
                    </div>
                    <span className={`text-sm leading-relaxed ${
                      plan.highlighted ? "text-dark-foreground/75" : "text-muted-foreground"
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {termLabels.some(([field]) => plan.terms[field]) && (
                <div className={`space-y-2.5 mb-7 pt-5 border-t ${plan.highlighted ? "border-white/15" : "border-border"}`}>
                  {termLabels.map(([field, label]) =>
                    plan.terms[field] ? (
                      <div key={field} className="flex gap-2 text-sm leading-relaxed">
                        <span className={`shrink-0 font-semibold ${plan.highlighted ? "text-dark-foreground" : "text-foreground"}`}>
                          {label}:
                        </span>
                        <span className={plan.highlighted ? "text-dark-foreground/75" : "text-muted-foreground"}>
                          {plan.terms[field]}
                        </span>
                      </div>
                    ) : null,
                  )}
                </div>
              )}

              <button
                onClick={() => setApplicationIntent(plan.key)}
                data-metrika-goal={`pricing_${plan.key}_click`}
                className={`w-full py-3.5 rounded-full font-semibold text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
                  plan.highlighted
                    ? "bg-white text-primary hover:bg-white/90"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                <span>{plan.cta}</span>
                <ArrowUpRight size={14} />
              </button>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid lg:grid-cols-3 gap-5"
        >
          {[
            ["БАЗОВЫЙ", "если хотите получить систему знаний и готовы проходить обучение самостоятельно."],
            ["PRO", "если важны поддержка, обратная связь, разбор ошибок и подготовка к работе."],
            ["VIP", "если нужен индивидуальный подход, карьерная упаковка и подготовка к премиальному сегменту."],
          ].map(([title, text]) => (
            <div key={title} className="bg-card/75 backdrop-blur-sm border border-white/50 rounded-2xl p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">Когда выбирать</p>
              <h3 className="text-lg font-bold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 overflow-hidden rounded-2xl border border-white/50 bg-card/75 backdrop-blur-sm"
        >
          <div className="p-6 md:p-8 border-b border-border">
            <p className="section-label mb-3">Сравнение</p>
            <h3 className="heading-md">Что входит в тарифы</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-sm">
              <thead>
                <tr className="bg-card text-left">
                  <th className="p-4 font-semibold">Критерий</th>
                  <th className="p-4 font-semibold">БАЗОВЫЙ</th>
                  <th className="p-4 font-semibold">PRO</th>
                  <th className="p-4 font-semibold">VIP</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row[0]} className="border-t border-border">
                    {row.map((cell, index) => (
                      <td key={`${row[0]}-${index}`} className={`p-4 align-top ${index === 0 ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-16 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          <div>
            <p className="section-label">Отдельные модули</p>
            <h3 className="text-2xl md:text-3xl font-heading font-bold uppercase tracking-[0.08em] text-foreground mb-6">
              Точечные модули
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-5 text-sm md:text-base">
              Отдельный модуль подходит, если нужно закрыть конкретный навык. Полный курс нужен,
              когда важна система: знания, практика, обратная связь и карьерная упаковка.
            </p>
            <p className="text-sm text-foreground mb-8">
              Если после модуля вы решите перейти на полный тариф, менеджер подскажет доступные варианты перехода.
            </p>
            <button
              onClick={() => setApplicationIntent("module")}
              data-metrika-goal="module_cta_click"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-full text-sm uppercase tracking-wider hover:bg-primary/90 transition-all duration-200"
            >
              <span>Подобрать модуль</span>
              <ArrowUpRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4">
            {modules.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setApplicationIntent(`module-${item.label}`)}
                data-metrika-goal="module_card_click"
                className="group relative min-h-[138px] sm:min-h-[150px] lg:min-h-[156px] rounded-2xl bg-card/75 backdrop-blur-sm border border-white/50 flex flex-col items-center justify-center p-4 hover:bg-card hover:border-primary/30 hover:shadow-md transition-all duration-200"
              >
                <div className="w-12 h-12 sm:w-[52px] sm:h-[52px] md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/15 transition-colors duration-200">
                  <item.icon size={26} className="text-primary/70 group-hover:text-primary transition-colors duration-200" strokeWidth={1.5} />
                </div>
                <span className="text-xs md:text-sm font-medium text-foreground text-center mb-1.5">
                  {item.label}
                </span>
                <span className="text-[10px] md:text-xs text-muted-foreground">
                  {item.price}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
