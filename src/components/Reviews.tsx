import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import review01 from "@/assets/reviews/review-01.jpg";
import review02 from "@/assets/reviews/review-02.jpg";
import review03 from "@/assets/reviews/review-03.jpg";
import review04 from "@/assets/reviews/review-04.jpg";
import review05 from "@/assets/reviews/review-05.jpg";
import review06 from "@/assets/reviews/review-06.jpg";
import review07 from "@/assets/reviews/review-07.jpg";
import review08 from "@/assets/reviews/review-08.jpg";
import review09 from "@/assets/reviews/review-09.jpg";
import review10 from "@/assets/reviews/review-10.jpg";

const reviews = [review01, review02, review03, review04, review05, review06, review07, review08, review09, review10];

// ─── Кейсы выпускников (п.5 сметы): формат «до → обучение → результат» ──────
// Заполняются реальными материалами выпускников с разрешением на публикацию.
// Пока массив пуст — блок не отображается, текущие отзывы семей остаются.
type GraduateCase = {
  name: string;
  before: string; // ситуация до обучения
  during: string; // что дало обучение
  result: string; // результат после
};

const graduateCases: GraduateCase[] = [
  // TODO(контент): добавить реальные кейсы выпускников.
];

const caseSteps: [keyof Omit<GraduateCase, "name">, string][] = [
  ["before", "До обучения"],
  ["during", "Обучение"],
  ["result", "Результат"],
];

const ReviewCard = ({ review, index, isInView }: { review: string; index: number; isInView: boolean }) => (
  <motion.article
    initial={{ opacity: 0, y: 18 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.45, delay: index * 0.04 }}
    className="flex h-full items-center justify-center overflow-hidden rounded-2xl border border-white/50 bg-card/80 p-2 shadow-sm"
  >
    <img
      src={review}
      alt="Скриншот отзыва о трудоустройстве через Staff Concierge"
      loading="lazy"
      className="max-h-[620px] w-full rounded-xl object-contain"
    />
  </motion.article>
);

const Reviews = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section id="reviews" className="section-padding bg-background" ref={ref}>
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10 md:mb-12 max-w-5xl"
        >
          <p className="section-label">Отзывы</p>
          <h2 className="heading-lg mb-4">Опыт, который подтверждают специалисты</h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Реальные отзывы о трудоустройстве через агентство Staff Concierge.
          </p>
        </motion.div>

        {graduateCases.length > 0 && (
          <div className="mb-14 md:mb-16">
            <h3 className="heading-md mb-6 md:mb-8">Кейсы выпускников</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {graduateCases.map((item, index) => (
                <motion.article
                  key={item.name}
                  initial={{ opacity: 0, y: 18 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="flex flex-col rounded-2xl border border-white/50 bg-card/80 backdrop-blur-sm p-6 shadow-sm"
                >
                  <p className="text-sm font-semibold text-foreground mb-4">{item.name}</p>
                  <div className="space-y-4">
                    {caseSteps.map(([field, label], stepIndex) => (
                      <div key={field} className="relative pl-6">
                        <span className="absolute left-0 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">
                          {stepIndex + 1}
                        </span>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-primary mb-1">{label}</p>
                        <p className="text-sm leading-relaxed text-muted-foreground">{item[field]}</p>
                      </div>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        )}

        <div className="-mx-6 overflow-x-auto px-6 pb-2 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] lg:hidden [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-4 md:gap-5">
            {reviews.map((review, index) => (
              <div
                key={review}
                className="w-[78vw] max-w-[360px] shrink-0 snap-start sm:w-[calc((100%_-_1rem)/2)] sm:max-w-none"
              >
                <ReviewCard review={review} index={index} isInView={isInView} />
              </div>
            ))}
          </div>
        </div>

        <Carousel
          opts={{ align: "start" }}
          className="hidden lg:block"
        >
          <CarouselContent className="-ml-5">
            {reviews.map((review, index) => (
              <CarouselItem key={review} className="basis-1/3 pl-5">
                <ReviewCard review={review} index={index} isInView={isInView} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 h-11 w-11 border-border bg-card text-foreground shadow-sm hover:bg-primary hover:text-primary-foreground disabled:opacity-30 xl:-left-14" />
          <CarouselNext className="-right-4 h-11 w-11 border-border bg-card text-foreground shadow-sm hover:bg-primary hover:text-primary-foreground disabled:opacity-30 xl:-right-14" />
        </Carousel>
      </div>
    </section>
  );
};

export default Reviews;
