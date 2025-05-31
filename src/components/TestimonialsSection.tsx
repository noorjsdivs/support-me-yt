
export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Since I started using SupportMe, my monthly income has doubled. It's so easy for my fans to support my work now!",
      author: "Alex Johnson",
      role: "Indie Musician",
      avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    },
    {
      quote: "The membership tiers feature has completely changed my relationship with my audience. Now I can offer exclusive content easily.",
      author: "Sam Rivera",
      role: "Digital Artist",
      avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    },
    {
      quote: "Setting up my page took less than 10 minutes, and I started receiving support the same day. The simplicity is unmatched.",
      author: "Jordan Lee",
      role: "Podcaster",
      avatar: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    },
  ];

  return (
    <section id="testimonials" className="py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by creators worldwide</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join thousands of creators who are growing their income and connecting with their audience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center mb-4">
                <div className="flex text-amber-400">
                  {Array(5).fill(0).map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="mb-4 text-gray-700 italic">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">{testimonial.author}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
