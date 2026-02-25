import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, ArrowUpRight, UtensilsCrossed, Briefcase, Shirt, Sparkles, Calendar, BookOpen } from "lucide-react";

const Pricing = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const scrollToForm = (planName?: string, specialization?: string) => {
    const url = new URL(window.location.href);
    
    if (specialization) {
      url.searchParams.set("specialization", specialization);
    } else if (planName) {
      url.searchParams.set("plan", planName);
    }
    
    window.history.pushState({}, "", url);
    document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const plans = [
    {
      name: "BASE",
      subtitle: "CORE, стандарт - базовость",
      price: "24 400",
      installment: "от 6 100 ₽ / Мес",
      installmentNote: "«Долями» — 4 платежа по 6 100 ₽",
      features: [
        "Доступ к Core‑модулям: безопасность, возрастные блоки, базовые коммуникации, основы договора и этики",
        "Чек‑листы, шаблоны, тесты",
        "Сертификат о прохождении",
      ],
      highlighted: false,
      upgrade: null,
    },
    {
      name: "PRO",
      subtitle: "FULL: EXPERT",
      price: "59 900",
      installment: "от 9 900 ₽ / Мес",
      installmentNote: "Рассрочка до 6 месяцев",
      features: [
        "Всё из тарифа Base + полный блок экспертов",
        "Быстрые проверки выполненных заданий и корректировки",
        "Групповые Q&A и разборы кейсов (4 встречи)",
        "Финальная аттестация «с человеком» — мини‑экзамен",
        "Сертификат «PRO (аттестовано)»",
      ],
      highlighted: true,
      upgrade: "Переход из Base с доплатой разницы",
    },
    {
      name: "CAREER",
      subtitle: "Индивидуальная аттестация + упаковка + вакансии",
      price: "129 900",
      installment: "от 5 412 ₽/Мес",
      installmentNote: "Рассрочка до 24 месяцев",
      features: [
        "Всё из тарифа Pro",
        "Индивидуальная аттестация (60 мин) + персональная карта развития",
        "Упаковка профиля: резюме, анкета, легенда, рекомендательные формулировки",
        "Репетиция собеседования (1–2 сессии)",
        "Приоритетное рассмотрение в «премиум‑лист» агентства",
      ],
      highlighted: false,
      upgrade: "Переход из Pro с доплатой разницы",
    },
  ];

  return (
    <section id="pricing" className="py-32 md:py-40 bg-secondary" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground mb-6">Тарифы</p>
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-[0.15em] text-foreground mb-4">
            Выберите формат
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
            Три варианта участия для разных целей и возможностей. Переход между тарифами возможен с доплатой разницы.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`rounded-2xl p-8 flex flex-col transition-all duration-300 ${
                plan.highlighted
                  ? "bg-foreground text-background ring-1 ring-foreground"
                  : "bg-background border border-border"
              }`}
            >
              {plan.highlighted && (
                <span className="inline-block text-[10px] font-semibold uppercase tracking-[0.22em] text-background bg-primary px-3 py-1 rounded-full mb-4">
                  Рекомендуем
                </span>
              )}

              <h3 className={`text-xl font-bold uppercase tracking-[0.1em] mb-1 ${
                plan.highlighted ? "text-background" : "text-foreground"
              }`}>
                {plan.name}
              </h3>
              <p className={`text-xs mb-6 ${plan.highlighted ? "text-background/50" : "text-muted-foreground"}`}>
                {plan.subtitle}
              </p>

              <div className="mb-2">
                <div className="flex items-baseline gap-1">
                  <span className={`text-4xl font-extrabold tracking-tight ${
                    plan.highlighted ? "text-background" : "text-foreground"
                  }`}>
                    {plan.price}
                  </span>
                  <span className={plan.highlighted ? "text-background/50" : "text-muted-foreground"}>₽</span>
                </div>
              </div>

              <div className={`mb-8 pb-6 border-b ${plan.highlighted ? "border-background/15" : "border-border"}`}>
                <p className={`text-sm font-semibold ${plan.highlighted ? "text-primary" : "text-primary"}`}>
                  {plan.installment}
                </p>
                <p className={`text-xs mt-0.5 ${plan.highlighted ? "text-background/40" : "text-muted-foreground"}`}>
                  {plan.installmentNote}
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      plan.highlighted ? "bg-primary" : "bg-primary/15"
                    }`}>
                      <Check size={10} className={plan.highlighted ? "text-foreground" : "text-primary"} />
                    </div>
                    <span className={`text-sm leading-relaxed ${
                      plan.highlighted ? "text-background/70" : "text-muted-foreground"
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {plan.upgrade && (
                <p className={`text-xs mb-4 text-center ${
                  plan.highlighted ? "text-background/40" : "text-muted-foreground"
                }`}>
                  ↑ {plan.upgrade}
                </p>
              )}

              <button
                onClick={() => scrollToForm(plan.name)}
                className={`w-full py-3.5 rounded-full font-semibold text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
                  plan.highlighted
                    ? "bg-primary text-foreground hover:opacity-90"
                    : "bg-foreground text-background hover:opacity-90"
                }`}
              >
                <span>Выбрать</span>
                <ArrowUpRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-24 md:mt-32 mb-16 md:mb-20">
          <div className="h-px bg-border/60 max-w-2xl mx-auto" />
        </div>

        {/* Individual modules section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 md:mt-20"
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left side - Text content */}
            <div className="order-1 lg:order-1">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold uppercase tracking-[0.08em] text-foreground mb-6">
                Также доступны индивидуальные модули
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8 text-sm md:text-base">
                Вы можете приобрести отдельные курсы по конкретным навыкам. Выбирайте только необходимые направления и формируйте персональную программу обучения.
              </p>
              <button
                onClick={() => scrollToForm(undefined, "Индивидуальный модуль.")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-semibold rounded-full text-sm uppercase tracking-wider hover:opacity-90 transition-all duration-200"
              >
                <span>Подобрать модуль</span>
                <ArrowUpRight size={14} />
              </button>
            </div>

            {/* Right side - Module cards grid */}
            <div className="order-2 lg:order-2">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { icon: UtensilsCrossed, label: "Сервировка", price: "от 4 900 ₽" },
                  { icon: Briefcase, label: "Этикет", price: "от 4 900 ₽" },
                  { icon: Shirt, label: "Стиль", price: "от 4 900 ₽" },
                  { icon: Sparkles, label: "Хозяйство", price: "от 4 900 ₽" },
                  { icon: Calendar, label: "Планирование", price: "от 4 900 ₽" },
                  { icon: BookOpen, label: "Навыки", price: "от 4 900 ₽" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
                    className="group relative aspect-square rounded-2xl bg-background border border-border flex flex-col items-center justify-center p-6 hover:bg-card hover:border-primary/30 hover:shadow-md transition-all duration-200 cursor-pointer"
                    style={{ transform: "scale(1)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.03)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors duration-200">
                      <item.icon size={24} className="text-primary/70 group-hover:text-primary transition-colors duration-200" strokeWidth={1.5} />
                    </div>
                    <span className="text-xs md:text-sm font-medium text-foreground text-center mb-2 group-hover:text-foreground transition-colors duration-200">
                      {item.label}
                    </span>
                    <span className="text-[10px] md:text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {item.price}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
