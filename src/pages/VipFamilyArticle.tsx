import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

const VipFamilyArticle = () => (
  <div className="min-h-screen bg-background">
    <Seo
      title="Как попасть работать в VIP-семью — Staff Concierge Academy"
      description="Что важно для работы в VIP-семье: безопасность, этика, границы, коммуникация и подготовка к собеседованию."
      path="/articles/vip-family"
    />
    <Header />
    <main className="container-wide pt-32 md:pt-40 pb-20 max-w-4xl">
      <p className="section-label">Материалы</p>
      <h1 className="heading-lg mb-8">Как попасть работать в VIP-семью</h1>
      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p>
          VIP-семьи выбирают специалиста не только по опыту. Важны безопасность, этика,
          аккуратная коммуникация, умение соблюдать границы и предсказуемо работать в быту.
        </p>
        <p>
          Перед собеседованием стоит подготовить резюме, рекомендации, список навыков,
          понятное описание опыта и ответы на вопросы о режиме, конфиденциальности,
          конфликтных ситуациях и развитии ребёнка.
        </p>
        <p>
          На курсе Staff Concierge Academy эти темы разбираются через практические задания,
          карьерную упаковку и подготовку к собеседованию. Обучение не гарантирует
          трудоустройство, но помогает говорить с семьёй профессионально и уверенно.
        </p>
      </div>
    </main>
    <Footer />
  </div>
);

export default VipFamilyArticle;
