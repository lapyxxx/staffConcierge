import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import aboutVideo from "@/assets/about.mp4";
import heroImage from "@/assets/hero-image.jpg";

const audiences = [
  {
    num: "01",
    title: "Начинающие специалисты",
    text: "Системные знания и навыки, которые другие собирают годами, — без типичных ошибок на старте.",
  },
  {
    num: "02",
    title: "С опытом работы",
    text: "Уверенность в своих действиях и соответствие стандартам премиального сегмента.",
  },
  {
    num: "03",
    title: "С профильным образованием",
    text: "Современные подходы к воспитанию и то, о чём не рассказывают на классических курсах.",
  },
];

const Problems = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 md:py-28 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span className="text-xs uppercase tracking-[0.25em] text-primary mb-4 block">
            О курсе
          </span>
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-[0.15em] text-foreground">
            Для кого этот курс
          </h2>
        </motion.div>

        {/* Cards row */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {audiences.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + index * 0.12 }}
              className="group border border-border/60 rounded-lg p-6 transition-colors duration-300 hover:bg-primary/5 hover:border-primary/30"
            >
              <span className="text-4xl font-extrabold text-primary/20 leading-none block mb-4">
                {item.num}
              </span>
              <h3 className="text-base font-bold uppercase tracking-[0.1em] text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-base leading-[1.7] text-muted-foreground">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom row: quote + video side by side */}
        <div className="grid lg:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="bg-primary/5 border border-primary/20 rounded-lg p-8 flex items-center"
          >
            <p className="text-lg md:text-xl leading-[1.7] text-foreground font-medium">
              <span className="text-primary font-bold">Staff Concierge Academy</span> — это концентрат знаний о детской психологии, безопасности, современных методиках воспитания, взаимодействии с семьёй и профессиональной этике в премиальном сегменте.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="rounded-lg overflow-hidden aspect-video"
          >
            <video
              src={aboutVideo}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {/* "Not for" section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-24 md:mt-32"
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 lg:items-stretch">
            {/* Image left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 1.0 }}
              className="hidden lg:block"
            >
              <div className="rounded-2xl overflow-hidden h-full">
                <img
                  src={heroImage}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Text right */}
            <div className="flex flex-col">
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '48px',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: '#1a1a1a',
                  marginBottom: '48px',
                }}
                className="mb-10 md:mb-12"
              >
                Этот курс не для тех, кто
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-col gap-4">
                {[
                  { main: "Убеждён, что базового образования достаточно.", secondary: "И обновлять знания нет необходимости." },
                  { main: "Считает, что его текущего опыта хватает.", secondary: "И развиваться можно без системы." },
                  { main: "Предпочитает действовать интуитивно.", secondary: "Не опираясь на современные методики." },
                  { main: "Готов мириться с профессиональными ограничениями.", secondary: "Вместо того чтобы их пересматривать." },
                  { main: "Считает, что повышение дохода зависит исключительно от переработки.", secondary: null },
                  { main: "Видит развитие как дополнительную нагрузку, а не инвестицию в карьеру", secondary: null }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
                    className="group border border-border/60 rounded-lg p-6 transition-colors duration-300 hover:bg-primary/5 hover:border-primary/30"
                  >
                    <div className="flex flex-col">
                      <p
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          fontSize: '18px',
                          fontWeight: 500,
                          lineHeight: 1.6,
                          color: '#1a1a1a',
                          marginBottom: item.secondary ? '4px' : 0,
                        }}
                      >
                        {item.main}
                      </p>
                      {item.secondary && (
                        <p
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '16px',
                            fontWeight: 300,
                            lineHeight: 1.7,
                            color: '#9a9a9a',
                          }}
                        >
                          {item.secondary}
                        </p>
                      )}
                    </div>
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

export default Problems;
