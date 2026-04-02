import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProblemSection from "./components/ProblemSection";
import SolutionSection from "./components/SolutionSection";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import ServicesDetail from "./components/ServicesDetail";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import Process from "./components/Process";
import LeadForm from "./components/LeadForm";
import Footer from "./components/Footer";

export default function Page() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <Services />
      <Portfolio />
      <ServicesDetail />
      <WhyChooseUs />
      <Testimonials />
      <Process />
      <LeadForm />
      <Footer />
    </main>
  );
}
