import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const faqs = [
    { question: "В каком формате проходит обучение?", answer: "Обучение проходит полностью онлайн. Вы получаете доступ к видео-лекциям, текстовым материалам и практическим заданиям в удобное время. Также предусмотрены живые вебинары и консультации." },
    { question: "Какой сертификат я получу?", answer: "Сертификат установленного образца в соответствии с требованиями Министерства образования и науки РФ, подтверждающий профессиональные компетенции. Подробная информация о лицензировании предоставляется по запросу." },
    { question: "Какой тариф выбрать?", answer: "БАЗОВЫЙ подойдёт для самостоятельного старта. PRO — если важны поддержка, проверка заданий и карьерная подготовка. VIP — если нужен индивидуальный разбор опыта, анкеты, собеседования и стратегии дохода." },
    { question: "Почему PRO дороже БАЗОВОГО?", answer: "Разница не в количестве уроков. В PRO добавлены сопровождение, проверка заданий, чат, разборы и карьерный блок — это снижает риск остаться одной с материалами." },
    { question: "Вы гарантируете трудоустройство?", answer: "Нет, мы не обещаем гарантированное трудоустройство или конкретный доход. Результат зависит от опыта, рынка, региона и прохождения программы. При успешном завершении и соответствии стандартам возможна рекомендация школы." },
    { question: "Можно ли перейти на тариф выше?", answer: "Такую возможность можно предусмотреть при наличии мест и в пределах срока доступа к обучению: ученик оплачивает разницу и переходит на следующий уровень." },
    { question: "Как применить знания на практике?", answer: "Программа разработана с акцентом на практику. Каждый модуль включает практические задания, конкретные инструменты и методики для немедленного применения." },
    { question: "Какие технические требования?", answer: "Компьютер, планшет или смартфон с доступом в интернет. Все материалы доступны через личный кабинет." },
  ];

  return (
    <section id="faq" className="section-padding" ref={ref}>
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-32 lg:self-start"
          >
            <p className="section-label">FAQ</p>
            <h2 className="heading-lg mb-6">Ответы на частые вопросы</h2>
            <p className="text-muted-foreground text-sm">
              Не нашли ответ? Напишите нам — мы поможем.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <Accordion type="single" collapsible className="space-y-0">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="border-b border-border">
                  <AccordionTrigger className="hover:no-underline text-left py-5">
                    <span className="text-base font-semibold text-foreground pr-4 font-heading">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
