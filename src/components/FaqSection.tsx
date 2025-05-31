
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
  const faqs = [
    {
      question: "How do I create a support page?",
      answer: "Simply sign up for an account, set up your profile with your details and payment information, customize your page, and share it with your audience. The entire process takes less than 10 minutes.",
    },
    {
      question: "How much does it cost to use SupportMe?",
      answer: "SupportMe is free to set up and has no monthly fees. We only charge a 5% transaction fee on the support you receive.",
    },
    {
      question: "How do I withdraw my earnings?",
      answer: "You can withdraw your earnings at any time by going to your dashboard, clicking on the 'Withdraw' button, and entering your bank details. The funds will be transferred to your account within 1-3 business days.",
    },
    {
      question: "Can I offer subscriptions to my supporters?",
      answer: "Yes, you can set up monthly membership tiers with different pricing and perks for your supporters. They'll be charged automatically each month until they decide to cancel.",
    },
    {
      question: "Do I need technical knowledge to use SupportMe?",
      answer: "Not at all! Our platform is designed to be user-friendly and requires no technical knowledge. If you can use social media, you can use SupportMe.",
    },
    {
      question: "What payment methods do you support?",
      answer: "We support major credit cards, debit cards, and popular digital payment methods including PayPal, Apple Pay, and Google Pay.",
    },
  ];

  return (
    <section id="faq" className="py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently asked questions</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find answers to common questions about using our platform.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
