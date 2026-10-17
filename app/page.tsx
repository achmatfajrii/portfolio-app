import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { AboutSection } from '@/components/about-section';
import { ProjectsSection } from '@/components/projects-section';
import { SkillsSection } from '@/components/SkillsSection';
import { DataSection } from '@/components/DataSection';
import ContactSection from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <DataSection />
      <ContactSection />
      <Footer />
    </main>
  );
}