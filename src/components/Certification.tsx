import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileCheck, Shield } from "lucide-react";
import diplomVideo from "@/assets/diplom.mp4";
import LazyVideo from "@/components/LazyVideo";

const Certification = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-card" ref={ref}>
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="rounded-2xl overflow-hidden">
              <LazyVideo src={diplomVideo} className="w-full h-auto object-cover" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="section-label">Документ по итогам обучения</p>
            <h2 className="heading-lg mb-6">Сертификат</h2>
            <p className="text-lead mb-4">
              По итогам успешного прохождения программы вы получите сертификат,
              подтверждающий обучение.
            </p>
            <p className="text-sm text-muted-foreground mb-10">
              Лицензия на осуществление образовательной деятельности находится
              в процессе оформления.
            </p>

            <div className="space-y-5">
              {[
                { icon: FileCheck, text: "Сертификат по итогам программы" },
                { icon: Shield, text: "Подтверждение прохождения программы" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon size={20} className="text-primary" />
                  </div>
                  <p className="text-foreground text-sm font-medium">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Certification;
