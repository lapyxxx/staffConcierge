import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowUpRight, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const intentLabels: Record<string, string> = {
  consultation: "Консультация по курсу",
  basic: "Тариф БАЗОВЫЙ",
  pro: "Тариф PRO",
  vip: "Тариф VIP",
  module: "Подбор индивидуального модуля",
};

const getIntentLabel = (intent: string | null) => {
  if (!intent) {
    return "Консультация по курсу";
  }

  if (intent.startsWith("module-")) {
    return `Индивидуальный модуль: ${intent.replace("module-", "")}`;
  }

  return intentLabels[intent] || "Консультация по курсу";
};

const getContactMode = (value: string) => {
  const first = value.trim().charAt(0);
  if (!first) {
    return "empty";
  }

  if (/[\d+]/.test(first)) {
    return "phone";
  }

  return "messenger";
};

const getPhoneDigits = (value: string) => value.replace(/\D/g, "");

const normalizePhoneDigits = (value: string) => {
  let digits = getPhoneDigits(value);

  if (digits.startsWith("8")) {
    digits = `7${digits.slice(1)}`;
  } else if (digits.startsWith("9")) {
    digits = `7${digits}`;
  } else if (!digits.startsWith("7") && digits.length > 0) {
    digits = `7${digits}`;
  }

  return digits.slice(0, 11);
};

const formatPhoneDigits = (digitsValue: string) => {
  const digits = normalizePhoneDigits(digitsValue);
  if (!digits || digits.length <= 1) {
    return "";
  }

  return formatPhone(digits);
};

const formatPhone = (value: string) => {
  const digits = normalizePhoneDigits(value);
  if (!digits) {
    return value.trim() === "+" ? "+" : "";
  }

  const national = digits.startsWith("7") ? digits.slice(1) : digits;
  const parts = [
    national.slice(0, 3),
    national.slice(3, 6),
    national.slice(6, 8),
    national.slice(8, 10),
  ];

  let formatted = "+7";

  if (parts[0]) {
    formatted += ` (${parts[0]}`;
  }

  if (parts[0]?.length === 3) {
    formatted += ")";
  }

  if (parts[1]) {
    formatted += ` ${parts[1]}`;
  }

  if (parts[2]) {
    formatted += `-${parts[2]}`;
  }

  if (parts[3]) {
    formatted += `-${parts[3]}`;
  }

  return formatted;
};

const normalizeMessenger = (value: string) => value.replace(/\s+/g, "");

const validateContact = (value: string) => {
  const mode = getContactMode(value);

  if (mode === "phone") {
    const digits = normalizePhoneDigits(value);
    return digits.length === 11 || "Введите полный номер телефона";
  }

  if (mode === "messenger") {
    return normalizeMessenger(value).length >= 3 || "Укажите Telegram или другой мессенджер";
  }

  return "Укажите телефон или Telegram";
};

const formSchema = z.object({
  name: z.string().min(2, "Введите имя").max(100),
  contact: z.string().max(100).superRefine((value, ctx) => {
    const result = validateContact(value);
    if (result !== true) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: result,
      });
    }
  }),
  email: z.string().email("Введите корректный email"),
  consent: z.boolean().refine((val) => val === true, { message: "Необходимо согласие" }),
});

type FormData = z.infer<typeof formSchema>;

const ApplicationForm = () => {
  const ref = useRef(null);
  const contactValueRef = useRef("");
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedIntent, setSelectedIntent] = useState(() => getIntentLabel(new URLSearchParams(window.location.search).get("intent")));
  const [contactMode, setContactMode] = useState<"empty" | "phone" | "messenger">("empty");
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    clearErrors,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      consent: false,
    },
  });

  useEffect(() => {
    const updateIntent = () => {
      const params = new URLSearchParams(window.location.search);
      setSelectedIntent(getIntentLabel(params.get("intent")));
    };

    window.addEventListener("popstate", updateIntent);
    window.addEventListener("application-intent-change", updateIntent);
    updateIntent();

    return () => {
      window.removeEventListener("popstate", updateIntent);
      window.removeEventListener("application-intent-change", updateIntent);
    };
  }, []);

  const contactRegistration = register("contact", {
    validate: validateContact,
    onChange: (event) => {
      const input = event.target as HTMLInputElement;
      const nativeEvent = event.nativeEvent as InputEvent;
      const isDeleting = nativeEvent.inputType?.startsWith("delete");

      if (!input.value.trim()) {
        setContactMode("empty");
        contactValueRef.current = "";
        setValue("contact", "", { shouldValidate: false, shouldDirty: true });
        clearErrors("contact");
        return;
      }

      const mode = getContactMode(input.value);
      setContactMode(mode);

      const phoneDigits = getPhoneDigits(input.value);
      const previousPhoneDigits = getPhoneDigits(contactValueRef.current);
      const digitsForFormatting = mode === "phone" && isDeleting && phoneDigits.length >= previousPhoneDigits.length
        ? previousPhoneDigits.slice(0, -1)
        : phoneDigits;
      const nextValue = mode === "phone"
        ? formatPhoneDigits(digitsForFormatting)
        : normalizeMessenger(input.value);

      if (!nextValue) {
        setContactMode("empty");
      }

      contactValueRef.current = nextValue;
      setValue("contact", nextValue, { shouldValidate: false, shouldDirty: true });
      clearErrors("contact");
    },
  });

  const onSubmit = async (data: FormData) => {
    await new Promise((resolve) => setTimeout(resolve, 700));
    window.dispatchEvent(
      new CustomEvent("lead-form-submit", {
        detail: {
          ...data,
          intent: selectedIntent,
        },
      }),
    );
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
            className="max-w-xl mx-auto text-center border border-border rounded-2xl p-10 md:p-12"
          >
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-6">
              <Check size={32} className="text-primary-foreground" />
            </div>
            <h2 className="heading-md mb-4">Спасибо за заявку!</h2>
            <p className="text-muted-foreground text-sm mb-2">Запрос: {selectedIntent}</p>
            <p className="text-muted-foreground text-sm mb-6">Менеджер свяжется с вами и подскажет следующий шаг.</p>
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
            <h2 className="heading-lg mb-6">Оставьте контакт</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Форма короткая: город, опыт и детали тарифа менеджер уточнит в переписке или на звонке.
            </p>
            <div className="rounded-2xl border border-primary/20 bg-primary/10 p-5 mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">Выбранный запрос</p>
              <p className="text-foreground font-semibold">{selectedIntent}</p>
            </div>
            <div className="space-y-3">
              {["Ответим на вопросы", "Поможем выбрать тариф", "Пришлём материалы и условия на email"].map((item) => (
                <div key={item} className="flex items-center gap-3">
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
            <form onSubmit={handleSubmit(onSubmit)} className="border border-border rounded-2xl p-7 md:p-10 space-y-5">
              <div>
                <label htmlFor="name" className="label-modern">Имя</label>
                <input id="name" type="text" autoComplete="name" {...register("name")} className="input-modern" placeholder="Ваше имя" />
                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label htmlFor="contact" className="label-modern">Телефон или Telegram</label>
                <input
                  id="contact"
                  type="text"
                  inputMode="text"
                  autoComplete="off"
                  {...contactRegistration}
                  className="input-modern"
                  placeholder="+7 (999) 123-45-67 или @username"
                />
                {errors.contact && <p className="text-xs text-destructive mt-1">{errors.contact.message}</p>}
                <p className="text-[11px] text-muted-foreground mt-1.5">
                  {contactMode === "phone"
                    ? "Распознали номер телефона, форматируем автоматически."
                    : "Можно указать Telegram: @username или имя в мессенджере."}
                </p>
              </div>

              <div>
                <label htmlFor="email" className="label-modern">Email</label>
                <input id="email" type="text" inputMode="email" autoComplete="email" {...register("email")} className="input-modern" placeholder="your@email.com" />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" {...register("consent")} className="w-4 h-4 mt-0.5 accent-primary rounded flex-shrink-0" />
                  <span className="text-xs text-muted-foreground">
                    Я даю согласие на{" "}
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
