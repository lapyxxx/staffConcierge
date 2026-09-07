import { useEffect, useRef, useState } from "react";

type LazyVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  /** Фоновые видео проигрываются сами, когда попадают в зону видимости. */
  autoPlay?: boolean;
  loop?: boolean;
  controls?: boolean;
  "aria-hidden"?: boolean;
};

/**
 * Видео, которое НЕ скачивается вместе со страницей.
 * Источник подставляется только когда блок приближается к экрану,
 * поэтому тяжёлые ролики ниже первого экрана не конкурируют за канал
 * с видео на главном экране и не задерживают загрузку страницы.
 */
const LazyVideo = ({
  src,
  poster,
  className,
  autoPlay = true,
  loop = true,
  controls = false,
  ...rest
}: LazyVideoProps) => {
  const containerRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      // Начинаем подгрузку чуть заранее, чтобы к моменту показа видео уже играло.
      { rootMargin: "300px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={containerRef}
      src={shouldLoad ? src : undefined}
      poster={poster}
      autoPlay={autoPlay}
      loop={loop}
      muted
      playsInline
      controls={controls}
      preload="none"
      className={className}
      {...rest}
    />
  );
};

export default LazyVideo;
