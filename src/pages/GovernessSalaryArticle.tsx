import Header from "@/components/Header";
import Footer from "@/components/Footer";

const GovernessSalaryArticle = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="container-wide pt-32 md:pt-40 pb-20 max-w-4xl">
      <p className="section-label">Материалы</p>
      <h1 className="heading-lg mb-8">Сколько зарабатывает гувернантка в премиальном сегменте</h1>
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p>
          Доход гувернантки в премиальном сегменте зависит от региона, графика, опыта,
          языков, педагогической базы, готовности к поездкам и уровня ответственности.
        </p>
        <p>
          На оплату влияет не только количество часов. Семьи оценивают системность,
          безопасность, коммуникацию, умение планировать занятия, соблюдать этику и
          работать в команде с родителями и другими специалистами.
        </p>
        <p>
          Поэтому карьерная подготовка на курсе включает упаковку опыта, резюме,
          самопрезентацию и обсуждение условий работы. Конкретный доход не гарантируется,
          но профессиональная подача помогает увереннее обсуждать ценность своих услуг.
        </p>
      </div>
    </main>
    <Footer />
  </div>
);

export default GovernessSalaryArticle;
