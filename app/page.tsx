import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { AboutSection } from '@/components/about-section';
import { ProjectsSection } from '@/components/projects-section';
import { SkillsSection } from '@/components/SkillsSection';
import DataJourney from '@/components/DataJourney';
import ContactSection from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { PortfolioAssistantLazy } from '@/components/portfolio-assistant-lazy';

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />  
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <DataJourney />
      <ContactSection />
      <Footer />
      <PortfolioAssistantLazy />
    </main>
  );
}