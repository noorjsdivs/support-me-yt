import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-background via-primary/10 to-background pt-12 pb-16 sm:pt-16 sm:pb-20 md:pt-20 md:pb-24 lg:pt-24 lg:pb-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <div className="max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6">
            A simple way to{" "}
            <span className="text-primary">support creators</span> you love
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-xl sm:max-w-2xl mx-auto">
            Create your own page, share it with your audience, and start
            receiving support in minutes. No monthly fees, no technical skills
            required.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="text-base sm:text-lg py-5 sm:py-6 px-6 sm:px-8"
            >
              <Link to="/auth">Start for free</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-base sm:text-lg py-5 sm:py-6 px-6 sm:px-8"
            >
              <Link to="/demo">See how it works</Link>
            </Button>
          </div>
        </div>

        <div className="relative w-full max-w-full sm:max-w-3xl md:max-w-6xl mt-6 sm:mt-8 md:mt-12 lg:mt-16">
          <div className="rounded-2xl overflow-hidden shadow-xl border">
            <img
              src="/banner.jpg"
              alt="Creator receiving support on SupportMe platform"
              className="w-full h-auto object-cover aspect-[16/9] sm:aspect-[3/2]"
            />
            <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 w-11/12 sm:w-auto">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-lg border max-w-xs sm:max-w-sm">
                <div className="flex items-center justify-between gap-3 sm:gap-4 text-xs sm:text-sm md:text-base">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-600">
                      New support from Sarah
                    </span>
                    <span className="font-bold text-base sm:text-lg">
                      $5.00
                    </span>
                  </div>
                  <div className="h-7 w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-white font-bold text-xs sm:text-sm md:text-base">
                      ❤️
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 md:mt-14 lg:mt-16 flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16">
          <div className="text-center min-w-[100px]">
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold">100K+</p>
            <p className="text-sm sm:text-base text-muted-foreground">
              Active creators
            </p>
          </div>
          <div className="text-center min-w-[100px]">
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold">5M+</p>
            <p className="text-sm sm:text-base text-muted-foreground">
              Supporters
            </p>
          </div>
          <div className="text-center min-w-[100px]">
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold">$10M+</p>
            <p className="text-sm sm:text-base text-muted-foreground">
              Monthly support
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
