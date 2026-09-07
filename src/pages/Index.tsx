import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problems from "@/components/Problems";
import Solution from "@/components/Solution";
import Program from "@/components/Program";
import Format from "@/components/Format";
import Teachers from "@/components/Teachers";
import TrustEvidence from "@/components/TrustEvidence";
import Advantages from "@/components/Advantages";
import Certification from "@/components/Certification";
import ExamEmployment from "@/components/ExamEmployment";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import ApplicationForm from "@/components/ApplicationForm";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import CookieNotice from "@/components/CookieNotice";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Analytics from "@/components/Analytics";
import Seo from "@/components/Seo";

const Index = () => {
  // Экран загрузки не используется: страница отдаётся уже отрендеренной
  // (пререндер), поэтому контент и постер первого экрана видны сразу.
  // Лоудер только перекрывал готовую страницу и мешал старту видео.
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Staff Concierge Academy — обучение нянь и гувернанток для семей высокого уровня"
        description="Практическая онлайн-программа от кадрового агентства Staff Concierge: детская психология и безопасность, стандарты работы в частной семье, карьерная упаковка и подготовка к собеседованию."
        path="/"
      />
      <Analytics />
      <Header />
      <main>
        <Hero />
        <Problems />
        <Solution />
        <Program />
        <Format />
        <Teachers />
        <Advantages />
        <TrustEvidence />
        <Certification />
        <ExamEmployment />
        <Reviews />
        <Pricing />
        <FAQ />
        <FinalCTA />
        <ApplicationForm />
      </main>
      <Footer />
      <FloatingActions />
      <ThemeSwitcher />
      <CookieNotice />
    </div>
  );
};

export default Index;
