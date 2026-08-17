import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Пользовательское соглашение — Staff Concierge Academy"
        description="Условия использования сайта и образовательных материалов Staff Concierge Academy."
        path="/terms"
      />
      <Header />
      <main className="section-padding">
        <div className="container-wide max-w-4xl">
          <h1 className="heading-xl mb-8">Пользовательское соглашение</h1>
          
          <div className="prose prose-lg max-w-none space-y-6 text-foreground">
            <section>
              <h2 className="heading-md mb-4">1. Общие положения</h2>
              <p className="text-muted-foreground leading-relaxed">
                Настоящее Пользовательское соглашение (далее — «Соглашение») регулирует отношения между 
                ООО «Стафф Консьерж» (далее — «Администрация») и пользователем сайта Staff Concierge Academy 
                (далее — «Пользователь»).
              </p>
            </section>

            <section>
              <h2 className="heading-md mb-4">2. Предмет соглашения</h2>
              <p className="text-muted-foreground leading-relaxed">
                Администрация предоставляет Пользователю доступ к образовательным программам и материалам 
                на условиях, изложенных в настоящем Соглашении.
              </p>
            </section>

            <section>
              <h2 className="heading-md mb-4">3. Права и обязанности сторон</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold mb-2">3.1. Права Администрации:</h3>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Изменять условия Соглашения в одностороннем порядке</li>
                    <li>Ограничивать доступ к Сайту при нарушении условий использования</li>
                    <li>Требовать оплаты услуг в соответствии с тарифами</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-2">3.2. Обязанности Пользователя:</h3>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Предоставлять достоверную информацию</li>
                    <li>Соблюдать условия использования материалов</li>
                    <li>Не распространять материалы без согласия Администрации</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="heading-md mb-4">4. Интеллектуальная собственность</h2>
              <p className="text-muted-foreground leading-relaxed">
                Все материалы Сайта являются объектами интеллектуальной собственности Администрации. 
                Использование материалов без письменного разрешения запрещено.
              </p>
            </section>

            <section>
              <h2 className="heading-md mb-4">5. Ответственность</h2>
              <p className="text-muted-foreground leading-relaxed">
                Администрация не несет ответственности за ущерб, причиненный в результате использования 
                или невозможности использования Сайта.
              </p>
            </section>

            <section>
              <p className="text-sm text-muted-foreground mt-8">
                Дата последнего обновления: 15 июля 2026 года
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
