import ContactHero from "@/components/contact/ContactHero";
import ContactSection from "@/components/contact/ContactSection";
import ContactFAQ from "@/components/contact/ContactFAQ";

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <main className="mx-auto max-w-7xl px-4 py-16 space-y-24">
        <ContactSection />
        <ContactFAQ />
      </main>
    </>
  );
}