import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Политика конфиденциальности — Staff Concierge Academy"
        description="Порядок обработки и защиты персональных данных пользователей сайта Staff Concierge Academy."
        path="/privacy"
      />
      <Header />
      <main className="section-padding">
        <div className="container-wide max-w-4xl">
          <h1 className="heading-xl mb-8">Политика конфиденциальности</h1>
          
          <div className="prose prose-lg max-w-none space-y-6 text-foreground">
            <section>
              <h2 className="heading-md mb-4">1. Общие положения</h2>
              <p className="text-muted-foreground leading-relaxed">
                Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных 
                пользователей сайта Staff Concierge Academy (далее — «Сайт»), принадлежащего ООО «Стафф Консьерж» 
                (далее — «Оператор»).
              </p>
            </section>

            <section>
              <h2 className="heading-md mb-4">2. Персональные данные</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Оператор собирает следующие персональные данные:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Фамилия, имя, отчество</li>
                <li>Контактный телефон</li>
                <li>Адрес электронной почты</li>
                <li>Иные данные, предоставленные пользователем добровольно</li>
              </ul>
            </section>

            <section>
              <h2 className="heading-md mb-4">3. Цели обработки персональных данных</h2>
              <p className="text-muted-foreground leading-relaxed">
                Персональные данные обрабатываются в целях предоставления образовательных услуг, 
                связи с пользователями, обработки заявок и улучшения качества сервиса.
              </p>
            </section>

            <section>
              <h2 className="heading-md mb-4">4. Права пользователей</h2>
              <p className="text-muted-foreground leading-relaxed">
                Пользователь имеет право на доступ, исправление, удаление своих персональных данных, 
                а также право на отзыв согласия на обработку персональных данных.
              </p>
            </section>

            <section>
              <h2 className="heading-md mb-4">5. Контакты</h2>
              <p className="text-muted-foreground leading-relaxed">
                По вопросам обработки персональных данных обращайтесь: 
                <a href="mailto:info@staffconcierge.ru" className="text-primary hover:underline ml-1">
                  info@staffconcierge.ru
                </a>
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

export default PrivacyPolicy;
