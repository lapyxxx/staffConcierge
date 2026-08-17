import { Helmet } from "react-helmet-async";

const SITE_URL = "https://staff-academia.ru";

type SeoProps = {
  title: string;
  description: string;
  /** Путь страницы для canonical, например "/privacy". */
  path?: string;
};

/**
 * Уникальные Title / Description / canonical на страницу.
 * Значения попадают в статический HTML на этапе пререндера.
 */
const Seo = ({ title, description, path = "/" }: SeoProps) => {
  const canonical = `${SITE_URL}${path === "/" ? "" : path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
    </Helmet>
  );
};

export default Seo;
