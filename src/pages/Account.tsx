
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/use-profile";
import { useSubscriptions } from "@/hooks/use-subscriptions";
import { Navigate } from "react-router-dom";
import { ProfileForm } from "@/components/ProfileForm";
import { SubscriptionsList } from "@/components/SubscriptionsList";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

/**
 * Account dashboard page with profile management and subscription history
 */
const Account = () => {
  const { user, loading } = useAuth();
  
  // If loading, show loading state
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your account...</p>
        </div>
      </div>
    );
  }
  
  // If no user, redirect to auth page
  if (!user) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container py-8">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Account Settings</h1>
            <p className="text-muted-foreground">
              Manage your profile and view your subscription history.
            </p>
          </div>
          <Separator />
          
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>
                    Update your personal information and public profile.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ProfileForm />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="subscriptions">
              <Card>
                <CardHeader>
                  <CardTitle>Subscriptions</CardTitle>
                  <CardDescription>
                    View and manage your active subscriptions and payment history.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SubscriptionsList />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
