import { useEffect, useState } from "react";
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
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import ApplicationForm from "@/components/ApplicationForm";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import FloatingActions from "@/components/FloatingActions";
import CookieNotice from "@/components/CookieNotice";
import Analytics from "@/components/Analytics";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const finishLoading = () => {
      // Небольшая задержка, чтобы лоудер не моргал
      setTimeout(() => setIsLoading(false), 400);
    };

    if (document.readyState === "complete") {
      finishLoading();
      return;
    }

    window.addEventListener("load", finishLoading);
    return () => window.removeEventListener("load", finishLoading);
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen bg-background">
      {isLoading && <Loader />}
      <Analytics />
      <Header />
      <main>
        <Hero />
        <Problems />
        <Solution />
        <Program />
        <Format />
        <Teachers />
        <TrustEvidence />
        <Advantages />
        <Certification />
        <Pricing />
        <FAQ />
        <FinalCTA />
        <ApplicationForm />
      </main>
      <Footer />
      <FloatingActions />
      <CookieNotice />
    </div>
  );
};

export default Index;
