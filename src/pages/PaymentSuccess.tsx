
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";

/**
 * Payment success page displayed after successful Stripe checkout
 * Records the payment in the database
 */
const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [isRecording, setIsRecording] = useState(false);
  const sessionId = searchParams.get("session_id");
  
  // Record the payment in the database
  useEffect(() => {
    const recordPayment = async () => {
      if (!user || !sessionId) return;
      
      setIsRecording(true);
      try {
        // Call the create-payment-record edge function to record the payment
        const { error } = await supabase.functions.invoke("create-payment-record", {
          body: { 
            sessionId,
            amount: 999,
            productName: "Premium Subscription",
            status: "active"
          }
        });
        
        if (error) {
          throw new Error(error.message || "Failed to record payment");
        }
        
        toast({
          title: "Subscription activated",
          description: "Your subscription has been successfully activated.",
          variant: "default",
        });
      } catch (error: any) {
        console.error("Payment record error:", error);
        toast({
          title: "Warning",
          description: "Your payment was successful, but we couldn't update your account. Please contact support.",
          variant: "destructive",
        });
      } finally {
        setIsRecording(false);
      }
    };
    
    recordPayment();
  }, [user, sessionId]);
  
  // Automatically navigate to account page after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/account");
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container">
        <div className="flex items-center justify-center h-full py-16">
          <Card className="w-full max-w-md animate-fade-in">
            <CardContent className="pt-6 text-center">
              <div className="mx-auto rounded-full bg-green-100 p-4 w-fit mb-4">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
              <p className="text-muted-foreground mb-6">
                Thank you for your subscription. Your payment was processed successfully.
              </p>
              {isRecording && (
                <div className="flex items-center justify-center mb-4">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  <span className="text-sm text-muted-foreground">Activating your subscription...</span>
                </div>
              )}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Plan</span>
                  <span>Premium</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount</span>
                  <span>$9.99/month</span>
                </div>
                <div className="flex justify-between">
                  <span>Status</span>
                  <span className="text-green-600 font-medium">Paid</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center gap-4">
              <Button onClick={() => navigate("/account")}>
                View Account
              </Button>
              <Button variant="outline" onClick={() => navigate("/")}>
                Return Home
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default PaymentSuccess;
