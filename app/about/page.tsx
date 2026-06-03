import AboutHero from "@/components/about/AboutHero";
import MissionSection from "@/components/about/MissionSection";
import WhyChooseUs from "@/components/about/WhyChooseUs";
import StatsSection from "@/components/about/StatsSection";
import AboutCTA from "@/components/about/AboutSection";

export default function AboutPage() {
  return (
    <>
      <AboutHero />

      <main className="mx-auto max-w-7xl px-4 py-16 space-y-24">
        <MissionSection />
        <WhyChooseUs />
        <StatsSection />
        <AboutCTA />
      </main>
    </>
  );
}