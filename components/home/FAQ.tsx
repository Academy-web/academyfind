import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does AcademyFind rank coaching institutes?",
    answer:
      "Institutes are ranked using ratings, reviews, popularity, and other quality signals.",
  },
  {
    question: "Can I compare two coaching institutes?",
    answer:
      "Yes. AcademyFind provides detailed comparison pages to compare fees, ratings, reviews, and more.",
  },
  {
    question: "Are institute reviews verified?",
    answer:
      "We continuously work to improve review quality and detect suspicious activity.",
  },
  {
    question: "How can I find coaching institutes in my city?",
    answer:
      "Search by exam category and city to discover relevant coaching institutes.",
  },
  {
    question: "Does AcademyFind cover online coaching platforms?",
    answer:
      "Yes. Online coaching providers are also listed and compared.",
  },
];

export function FAQSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-12 text-center">
          <span className="text-sm font-medium text-amber-500">
            FAQ
          </span>

          <h2 className="mt-2 text-4xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="mt-3 text-muted-foreground">
            Everything you need to know about AcademyFind.
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="w-full"
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
            >
              <AccordionTrigger>
                {faq.question}
              </AccordionTrigger>

              <AccordionContent>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}