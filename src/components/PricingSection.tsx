
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { usePricingPlans } from "@/hooks/use-pricing-plans";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export function PricingSection() {
  const { data: pricingPlans, isLoading, error } = usePricingPlans();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  /**
   * Handle subscription purchase click
   * Redirects to auth page if not logged in, or initiates payment process
   */
  const handleSubscribe = () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    
    // Will be replaced with actual checkout process
    navigate("/checkout");
  };

  if (isLoading) {
    return (
      <section id="pricing" className="py-24 bg-coffee-gray/50">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Loading pricing plans...</h2>
        </div>
      </section>
    );
  }

  if (error) {
    console.error("Error loading pricing plans:", error);
    return (
      <section id="pricing" className="py-24 bg-coffee-gray/50">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Failed to load pricing plans</h2>
          <p className="text-muted-foreground">Please try again later</p>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="py-24 bg-coffee-gray/50">
      <div className="container">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            No hidden fees or complicated plans. Choose the option that fits your needs.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans?.map((plan, index) => (
            <div 
              key={plan.id}
              className={`bg-card rounded-xl overflow-hidden shadow-lg border 
                ${plan.is_popular ? 'border-primary scale-105 shadow-xl' : 'border-primary/30'}
                transition-all duration-500 hover:scale-105 hover:shadow-xl
                animate-fade-in`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="p-8 text-center border-b relative">
                {plan.is_popular && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 rounded-bl-lg font-medium text-sm">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  {Number(plan.price) === 0 ? (
                    <div>
                      <span className="text-4xl font-bold">Free</span>
                    </div>
                  ) : (
                    <div>
                      <span className="text-4xl font-bold">${Number(plan.price).toFixed(2)}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                  )}
                </div>
                <p className="text-muted-foreground">
                  {plan.description}
                </p>
              </div>
              <div className="p-8">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full py-6" size="lg" onClick={handleSubscribe}>
                  {Number(plan.price) === 0 ? 'Get started for free' : 'Subscribe now'}
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            All plans include fraud protection and secure payment processing.
          </p>
        </div>
      </div>
    </section>
  );
}
