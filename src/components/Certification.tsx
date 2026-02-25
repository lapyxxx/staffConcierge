import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FileCheck, Shield, Award } from "lucide-react";
import diplomVideo from "@/assets/diplom.mp4";

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
              <video
                src={diplomVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="section-label">Сертификация</p>
            <h2 className="heading-lg mb-6">Документ, подтверждающий профессионализм</h2>
            <p className="text-lead mb-10">
              По итогам обучения вы получаете сертификат установленного образца
              в соответствии с требованиями Министерства образования и науки РФ —
              для работы в премиальном сегменте.
            </p>

            <div className="space-y-5">
              {[
                { icon: FileCheck, text: "Сертификат установленного образца (Министерство образования и науки РФ)" },
                { icon: Shield, text: "Информация о лицензировании по запросу" },
                { icon: Award, text: "Признание в профессиональном сообществе" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon size={20} className="text-primary" />
                  </div>
                  <p className="text-foreground text-sm font-medium">
                    {index === 0 ? (
                      <>
                        Сертификат установленного образца (<span className="whitespace-nowrap">Министерство образования и науки РФ</span>)
                      </>
                    ) : (
                      item.text
                    )}
                  </p>
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
