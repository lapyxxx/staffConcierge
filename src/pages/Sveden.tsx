import { Link } from "react-router-dom";
import { Download, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

const PROGRAM_FILE = "/docs/programma-do.pdf";

// Обязательные подразделы специального раздела «Сведения об образовательной организации».
// data-заглушки помечены как «Информация размещается» — их наполняет заказчик.
const subsections: { id: string; title: string; ready?: boolean }[] = [
  { id: "common", title: "Основные сведения", ready: true },
  { id: "struct", title: "Структура и органы управления образовательной организацией" },
  { id: "document", title: "Документы" },
  { id: "education", title: "Образование", ready: true },
  { id: "eduStandarts", title: "Образовательные стандарты и требования" },
  { id: "employees", title: "Руководство. Педагогический (научно-педагогический) состав" },
  { id: "objects", title: "Материально-техническое обеспечение и оснащённость образовательного процесса" },
  { id: "grants", title: "Стипендии и меры поддержки обучающихся" },
  { id: "paid_edu", title: "Платные образовательные услуги" },
  { id: "budget", title: "Финансово-хозяйственная деятельность" },
  { id: "vacant", title: "Вакантные места для приёма (перевода) обучающихся" },
  { id: "ovz", title: "Доступная среда" },
  { id: "inter", title: "Международное сотрудничество" },
  { id: "catering", title: "Организация питания в образовательной организации" },
];

const Row = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="py-3 grid sm:grid-cols-[minmax(0,260px)_1fr] gap-1 sm:gap-6 border-b border-border last:border-0">
    <div className="text-sm text-muted-foreground">{label}</div>
    <div className="text-sm text-foreground">{value}</div>
  </div>
);

const Placeholder = () => (
  <p className="text-sm text-muted-foreground italic">
    Информация размещается.
  </p>
);

const Sveden = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Сведения об образовательной организации — Staff Concierge Academy"
        description="Специальный раздел «Сведения об образовательной организации»: основные сведения, документы, образование, руководство и педагогический состав, платные образовательные услуги."
        path="/sveden"
      />
      <Header solid />
      <main className="section-padding">
        <div className="container-wide max-w-4xl">
          <h1 className="heading-xl mb-6">Сведения об образовательной организации</h1>
          <p className="text-muted-foreground leading-relaxed mb-10 max-w-2xl">
            Раздел сформирован в соответствии с требованиями к структуре официального сайта
            образовательной организации в информационно-телекоммуникационной сети «Интернет».
            Все страницы раздела доступны без регистрации.
          </p>

          {/* Оглавление раздела */}
          <nav className="mb-14 rounded-2xl border border-border bg-card/60 divide-y divide-border">
            {subsections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex items-center justify-between gap-4 px-5 py-3.5 text-sm hover:bg-card transition-colors"
              >
                <span className="text-foreground">{s.title}</span>
                <ChevronRight size={16} className="text-muted-foreground shrink-0" />
              </a>
            ))}
          </nav>

          <div className="space-y-14">
            {/* Основные сведения */}
            <section id="common" className="scroll-mt-28">
              <h2 className="heading-md mb-5">Основные сведения</h2>
              <div className="rounded-2xl border border-border bg-card/60 px-5">
                <Row label="Полное наименование" value="Индивидуальный предприниматель Высокий Сергей Евгеньевич" />
                <Row label="Дата государственной регистрации" value={<span className="text-muted-foreground italic">Информация размещается.</span>} />
                <Row label="Учредитель" value="Образовательную деятельность осуществляет индивидуальный предприниматель. Учредитель не предусмотрен." />
                <Row label="ИНН" value="771003636304" />
                <Row label="ОГРНИП" value="319774600128719" />
                <Row
                  label="Место нахождения / адрес осуществления образовательной деятельности"
                  value={<span className="text-muted-foreground italic">Информация размещается.</span>}
                />
                <Row label="Режим и график работы" value={<span className="text-muted-foreground italic">Информация размещается.</span>} />
                <Row label="Контактный телефон" value={<span className="text-muted-foreground italic">Информация размещается.</span>} />
                <Row
                  label="Адрес электронной почты"
                  value={<a href="mailto:staffacademy@yandex.ru" className="text-primary hover:underline">staffacademy@yandex.ru</a>}
                />
                <Row label="Адрес сайта" value={<a href="https://staff-academia.ru" className="text-primary hover:underline">staff-academia.ru</a>} />
              </div>
            </section>

            <section id="struct" className="scroll-mt-28">
              <h2 className="heading-md mb-4">Структура и органы управления образовательной организацией</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Образовательную деятельность осуществляет индивидуальный предприниматель
                непосредственно. Структурные подразделения (филиалы, представительства) отсутствуют.
              </p>
            </section>

            <section id="document" className="scroll-mt-28">
              <h2 className="heading-md mb-4">Документы</h2>
              <Placeholder />
            </section>

            {/* Образование */}
            <section id="education" className="scroll-mt-28">
              <h2 className="heading-md mb-5">Образование</h2>
              <div className="rounded-2xl border border-border bg-card/60 px-5 mb-5">
                <Row label="Реализуемая образовательная программа" value="Дополнительная общеразвивающая программа «Няня, которую выбирают»" />
                <Row label="Форма обучения" value="Очная, с применением исключительно электронного обучения, дистанционных образовательных технологий" />
                <Row label="Нормативный срок обучения" value="6 месяцев" />
                <Row label="Объём программы" value="42,8 академических часа" />
                <Row label="Язык обучения" value="Русский" />
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={PROGRAM_FILE}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-full text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors"
                >
                  <Download size={16} />
                  Скачать программу (PDF)
                </a>
                <Link to="/sveden/education" className="text-sm text-primary hover:underline">
                  Подробнее о программе и учебном плане →
                </Link>
              </div>
            </section>

            <section id="eduStandarts" className="scroll-mt-28">
              <h2 className="heading-md mb-4">Образовательные стандарты и требования</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Реализуемая программа относится к дополнительным общеразвивающим программам. Федеральные
                государственные образовательные стандарты и федеральные государственные требования к ней
                не применяются.
              </p>
            </section>

            <section id="employees" className="scroll-mt-28">
              <h2 className="heading-md mb-4">Руководство. Педагогический (научно-педагогический) состав</h2>
              <Placeholder />
            </section>

            <section id="objects" className="scroll-mt-28">
              <h2 className="heading-md mb-4">Материально-техническое обеспечение и оснащённость образовательного процесса</h2>
              <Placeholder />
            </section>

            <section id="grants" className="scroll-mt-28">
              <h2 className="heading-md mb-4">Стипендии и меры поддержки обучающихся</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Стипендии не предусмотрены. Общежития, интерната, жилых помещений в жилищном фонде
                образовательная организация не имеет.
              </p>
            </section>

            <section id="paid_edu" className="scroll-mt-28">
              <h2 className="heading-md mb-4">Платные образовательные услуги</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Образовательная деятельность осуществляется полностью на платной основе — за счёт
                средств физических лиц. Порядок оказания платных образовательных услуг и образец
                договора размещаются в подразделе «Документы».
              </p>
            </section>

            <section id="budget" className="scroll-mt-28">
              <h2 className="heading-md mb-4">Финансово-хозяйственная деятельность</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Бюджетные ассигнования из бюджетов бюджетной системы Российской Федерации не поступают.
                Финансовое обеспечение образовательной деятельности осуществляется за счёт средств,
                полученных от оказания платных образовательных услуг.
              </p>
            </section>

            <section id="vacant" className="scroll-mt-28">
              <h2 className="heading-md mb-4">Вакантные места для приёма (перевода) обучающихся</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Приём на обучение по договорам об оказании платных образовательных услуг ведётся
                в течение всего года. Количество мест не ограничено. Бюджетные места отсутствуют.
              </p>
            </section>

            <section id="ovz" className="scroll-mt-28">
              <h2 className="heading-md mb-4">Доступная среда</h2>
              <Placeholder />
            </section>

            <section id="inter" className="scroll-mt-28">
              <h2 className="heading-md mb-4">Международное сотрудничество</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Договоры с иностранными и (или) международными организациями по вопросам образования
                и науки не заключались. Международная аккредитация образовательных программ не проводилась.
              </p>
            </section>

            <section id="catering" className="scroll-mt-28">
              <h2 className="heading-md mb-4">Организация питания в образовательной организации</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Обучение проводится исключительно с применением дистанционных образовательных
                технологий. Организация питания обучающихся не осуществляется.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sveden;
