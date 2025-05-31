
import React from "react";
import { useSubscriptions } from "@/hooks/use-subscriptions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Loader2, AlertCircle } from "lucide-react";

/**
 * Component to display user's subscription history
 * Will be expanded after implementing Stripe payment
 */
export function SubscriptionsList() {
  const { data: subscriptions, isLoading, error } = useSubscriptions();
  const navigate = useNavigate();
  
  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="p-4 text-center">
        <div className="flex justify-center mb-4">
          <AlertCircle className="h-12 w-12 text-destructive" />
        </div>
        <h3 className="text-lg font-medium">Failed to load subscriptions</h3>
        <p className="text-muted-foreground">Please try again later.</p>
      </div>
    );
  }
  
  // Placeholder for empty state - will be replaced with actual subscription data
  // once we implement the Stripe payment system
  return (
    <div className="space-y-8">
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No active subscriptions</h3>
        <p className="text-muted-foreground mb-6">
          You don't have any active subscriptions yet.
        </p>
        <Button onClick={() => navigate('/#pricing')}>
          View Plans
        </Button>
      </div>
    </div>
  );
}
