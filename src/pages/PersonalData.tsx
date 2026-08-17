import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

const PersonalData = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Обработка персональных данных — Staff Concierge Academy"
        description="Политика обработки персональных данных в соответствии с ФЗ-152 на сайте Staff Concierge Academy."
        path="/personal-data"
      />
      <Header />
      <main className="section-padding">
        <div className="container-wide max-w-4xl">
          <h1 className="heading-xl mb-8">Политика обработки персональных данных</h1>
          
          <div className="prose prose-lg max-w-none space-y-6 text-foreground">
            <section>
              <h2 className="heading-md mb-4">1. Основные понятия</h2>
              <p className="text-muted-foreground leading-relaxed">
                Настоящая Политика разработана в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ 
                «О персональных данных» и определяет порядок обработки персональных данных в ООО «Стафф Консьерж».
              </p>
            </section>

            <section>
              <h2 className="heading-md mb-4">2. Принципы обработки персональных данных</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Законность и справедливость</li>
                <li>Ограничение конкретными целями</li>
                <li>Соответствие целям обработки</li>
                <li>Точность и актуальность данных</li>
                <li>Хранение в формате, позволяющем идентифицировать субъекта</li>
              </ul>
            </section>

            <section>
              <h2 className="heading-md mb-4">3. Состав персональных данных</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Оператор обрабатывает следующие категории персональных данных:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>ФИО</li>
                <li>Контактные данные (телефон, email)</li>
                <li>Данные об образовании и опыте работы</li>
                <li>Иные данные, предоставленные субъектом</li>
              </ul>
            </section>

            <section>
              <h2 className="heading-md mb-4">4. Меры по защите персональных данных</h2>
              <p className="text-muted-foreground leading-relaxed">
                Оператор применяет технические и организационные меры для защиты персональных данных от 
                неправомерного доступа, уничтожения, изменения, блокирования, копирования, предоставления, 
                распространения, а также от иных неправомерных действий.
              </p>
            </section>

            <section>
              <h2 className="heading-md mb-4">5. Права субъектов персональных данных</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Субъект персональных данных имеет право:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Получать информацию, касающуюся обработки его персональных данных</li>
                <li>Требовать уточнения, блокирования или уничтожения персональных данных</li>
                <li>Отозвать согласие на обработку персональных данных</li>
                <li>Обжаловать действия или бездействие Оператора</li>
              </ul>
            </section>

            <section>
              <h2 className="heading-md mb-4">6. Контактная информация</h2>
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

export default PersonalData;
