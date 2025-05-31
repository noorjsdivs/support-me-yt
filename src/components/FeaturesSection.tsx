
import { Calendar, CreditCard, Heart, Link } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: <Heart className="h-10 w-10 text-primary" />,
      title: "One-time & monthly support",
      description: "Accept one-time or recurring payments from your supporters with just a few clicks.",
    },
    {
      icon: <Link className="h-10 w-10 text-primary" />,
      title: "Custom support page",
      description: "Personalize your page with your branding, content, and style to make it uniquely yours.",
    },
    {
      icon: <Calendar className="h-10 w-10 text-primary" />,
      title: "Membership tiers",
      description: "Create different membership tiers and offer exclusive benefits to your supporters.",
    },
    {
      icon: <CreditCard className="h-10 w-10 text-primary" />,
      title: "Easy withdrawals",
      description: "Transfer your earnings to your bank account anytime with just a few clicks.",
    },
  ];

  return (
    <section id="features" className="py-24 bg-coffee-gray/50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to get supported</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our platform provides all the tools you need to connect with your audience 
            and receive their support, without the complexity.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card bg-white p-6 rounded-lg shadow-sm border">
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                Create your page in minutes, not days
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="bg-primary/20 text-primary-foreground rounded-full p-1 mr-3 mt-1">✓</span>
                  <span>Free to start, no monthly fees</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/20 text-primary-foreground rounded-full p-1 mr-3 mt-1">✓</span>
                  <span>Works with all payment methods</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/20 text-primary-foreground rounded-full p-1 mr-3 mt-1">✓</span>
                  <span>Share your page everywhere</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary/20 text-primary-foreground rounded-full p-1 mr-3 mt-1">✓</span>
                  <span>Low 5% transaction fee</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border">
                <div className="bg-coffee-yellow/10 p-4 border-b">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="w-full bg-coffee-gray/20 h-12 rounded-md mb-4"></div>
                  <div className="w-2/3 bg-coffee-gray/20 h-12 rounded-md mb-4"></div>
                  <div className="w-full bg-coffee-gray/20 h-24 rounded-md mb-4"></div>
                  <div className="w-1/2 bg-coffee-yellow h-10 rounded-md"></div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary/20 w-32 h-32 rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
