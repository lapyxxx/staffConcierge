import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, ArrowUpRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Введите имя").max(100),
  phone: z.string().min(10, "Введите корректный номер").max(20),
  email: z.string().email("Введите корректный email").optional().or(z.literal("")),
  messenger: z.enum(["telegram", "whatsapp", "phone", "email"], { required_error: "Выберите способ связи" }),
  city: z.string().min(2, "Введите город").max(100),
  specialization: z.string().min(2, "Укажите специализацию").max(200),
  comment: z.string().max(500).optional(),
  consent: z.boolean().refine((val) => val === true, { message: "Необходимо согласие" })
});

type FormData = z.infer<typeof formSchema>;

const specializationOptions = [
  "Хочу связаться",
  "BASE. CORE, стандарт.",
  "PRO. FULL: EXPERT.",
  "CAREER. Индивидуальная аттестация + упаковка + вакансии",
  "Индивидуальный модуль."
];

const planNames: Record<string, string> = {
  BASE: "BASE. CORE, стандарт.",
  PRO: "PRO. FULL: EXPERT.",
  CAREER: "CAREER. Индивидуальная аттестация + упаковка + вакансии",
  MODULE: "Индивидуальный модуль.",
  CONTACT: "Хочу связаться"
};

const ApplicationForm = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  // Получаем выбранную специализацию из URL
  const getSpecializationFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const plan = params.get("plan");
    const spec = params.get("specialization");
    
    if (spec) {
      return spec;
    }
    
    if (plan) {
      return planNames[plan.toUpperCase()] || null;
    }
    
    return null;
  };

  const defaultSpecialization = getSpecializationFromUrl() || "Хочу связаться";

  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { 
      messenger: "telegram", 
      consent: false,
      specialization: defaultSpecialization
    }
  });

  // Обновляем поле специализации при изменении URL
  useEffect(() => {
    const spec = getSpecializationFromUrl();
    if (spec) {
      setValue("specialization", spec);
    }
  }, [setValue]);

  const onSubmit = async (data: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitted(true);
    toast({ title: "Заявка отправлена!", description: "Мы свяжемся с вами в ближайшее время." });
  };

  if (isSubmitted) {
    return (
      <section id="application-form" className="section-padding" ref={ref}>
        <div className="container-wide">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto text-center border border-border rounded-2xl p-12"
          >
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-6">
              <Check size={32} className="text-primary-foreground" />
            </div>
            <h2 className="heading-md mb-4">Спасибо за заявку!</h2>
            <p className="text-muted-foreground text-sm mb-6">Наш менеджер свяжется с вами в ближайшее время.</p>
            <a href="https://t.me/staffconcierge" target="_blank" rel="noopener noreferrer" className="text-primary text-sm font-medium hover:underline">
              Написать нам в Telegram →
            </a>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="application-form" className="section-padding" ref={ref}>
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-32 lg:self-start"
          >
            <p className="section-label">Заявка</p>
            <h2 className="heading-lg mb-6">Оставьте заявку</h2>
            <p className="text-muted-foreground text-sm mb-8">
              Заполните форму, и наш менеджер перезвонит для бесплатной консультации.
            </p>
            <div className="space-y-3">
              {["Ответим на все вопросы", "Поможем выбрать тариф", "Расскажем о формате"].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span className="text-foreground text-sm">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="border border-border rounded-2xl p-8 md:p-10 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="label-modern">Имя</label>
                  <input id="name" type="text" {...register("name")} className="input-modern" placeholder="Ваше имя" />
                  {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="label-modern">Телефон</label>
                  <input id="phone" type="tel" {...register("phone")} className="input-modern" placeholder="+7 (999) 123-45-67" />
                  {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="label-modern">Email <span className="text-muted-foreground font-normal normal-case">(необязательно)</span></label>
                <input id="email" type="email" {...register("email")} className="input-modern" placeholder="your@email.com" />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="label-modern">Способ связи</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: "telegram", label: "Telegram" },
                    { value: "whatsapp", label: "WhatsApp" },
                    { value: "phone", label: "Телефон" },
                    { value: "email", label: "Email" }
                  ].map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2 cursor-pointer text-sm p-3 border border-border rounded-lg hover:border-primary/30 hover:bg-primary/5 transition-colors">
                      <input type="radio" value={opt.value} {...register("messenger")} className="w-4 h-4 accent-primary" />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="city" className="label-modern">Город</label>
                  <input id="city" type="text" {...register("city")} className="input-modern" placeholder="Ваш город" />
                  {errors.city && <p className="text-xs text-destructive mt-1">{errors.city.message}</p>}
                </div>
                <div>
                  <label htmlFor="specialization" className="label-modern">Специализация</label>
                  <select 
                    id="specialization" 
                    {...register("specialization")} 
                    className="input-modern"
                  >
                    {specializationOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors.specialization && <p className="text-xs text-destructive mt-1">{errors.specialization.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="comment" className="label-modern">Комментарий <span className="text-muted-foreground font-normal normal-case">(необязательно)</span></label>
                <textarea id="comment" {...register("comment")} className="input-modern min-h-[90px] resize-none" placeholder="Ваши вопросы..." />
              </div>

              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" {...register("consent")} className="w-4 h-4 mt-0.5 accent-primary rounded flex-shrink-0" />
                  <span className="text-xs text-muted-foreground">
                    Я даю согласие на{' '}
                    <a 
                      href="/personal-data" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      обработку персональных данных
                    </a>
                  </span>
                </label>
                {errors.consent && <p className="text-xs text-destructive mt-1">{errors.consent.message}</p>}
              </div>

              <button type="submit" disabled={isSubmitting} className="btn-cta w-full justify-center">
                <span>{isSubmitting ? "Отправка..." : "Отправить заявку"}</span>
                <ArrowUpRight size={16} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationForm;
