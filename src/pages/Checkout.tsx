import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { supabase } from "@/integrations/supabase/client";

/**
 * Checkout page that integrates with Stripe
 * Creates a checkout session and redirects the user to Stripe payment page
 */
const Checkout = () => {
  const { user, loading } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" />;
  }

  /**
   * Creates a Stripe checkout session and redirects to Stripe payment page
   */
  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke(
        "create-checkout-session",
        {
          body: { priceId: "price_premium" },
        }
      );

      if (error) {
        console.error("Supabase invoke error:", JSON.stringify(error, null, 2));
        throw new Error(error.message || "Failed to create checkout session");
      }

      if (!data?.url) {
        console.error("No checkout URL in response:", data);
        throw new Error("No checkout URL returned");
      }

      window.location.href = data.url;
    } catch (error: any) {
      console.error("Checkout error:", JSON.stringify(error, null, 2));
      toast({
        title: "Checkout error",
        description: error.message || "An error occurred during checkout",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container py-12 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-lg mx-auto">
          <Card className="bg-white rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl border border-gray-100">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-gray-800">
                Complete Your Purchase
              </CardTitle>
              <CardDescription className="text-gray-600">
                Subscribe to the Premium plan for exclusive features.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-700 font-medium">
                    Premium Plan (Monthly)
                  </span>
                  <span className="text-gray-800 font-semibold">$9.99</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center font-semibold text-lg">
                    <span className="text-gray-800">Total</span>
                    <span className="text-blue-600">$9.99</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-sm text-gray-500">
                <p>✔ Unlimited access to premium features</p>
                <p>✔ Cancel anytime</p>
                <p>✔ Secure payment powered by Stripe</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full font-semibold py-3 rounded-lg transition-colors duration-200"
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Proceed to Payment"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
