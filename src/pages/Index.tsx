import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import DoubtSolver from "@/components/DoubtSolver";
import StudyPartner from "@/components/StudyPartner";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <DoubtSolver />
      <StudyPartner />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
