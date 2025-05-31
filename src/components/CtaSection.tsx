
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="bg-primary/10 rounded-2xl p-8 md:p-12 lg:p-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to start receiving support?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Join thousands of creators who are already growing their income and connecting with their audience.
            </p>
            <Button size="lg" className="text-lg py-6 px-8 animate-wiggle">
              Create your page for free
            </Button>
            <p className="mt-4 text-muted-foreground">
              No credit card required. Set up in minutes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
