import React, { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import Logo from "@/components/Logo";

const Auth = () => {
  const { user, signIn, signUp, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Redirect to home if already logged in
  if (user) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (isLogin) {
        await signIn(email, password);
        navigate("/");
      } else {
        await signUp(email, password, username, fullName);
        setIsLogin(true);
        setPassword("");
      }
    } catch (err) {
      setError(err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background/95 p-4">
      <Card className="w-full max-w-md shadow-lg animate-fade-in-up">
        <CardHeader className="space-y-4">
          <Logo />
          <Tabs
            defaultValue="login"
            onValueChange={(value) => setIsLogin(value === "login")}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" className="text-base">
                Login
              </TabsTrigger>
              <TabsTrigger value="register" className="text-base">
                Register
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <h2 className="text-2xl font-bold text-center">
            {isLogin ? "Welcome Back" : "Create Your Account"}
          </h2>
          <p className="text-center text-muted-foreground">
            {isLogin
              ? "Sign in to access your SupportMe account"
              : "Join SupportMe to get started"}
          </p>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="login">
            <TabsContent value="login">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-10"
                  />
                </div>
                {error && (
                  <div className="text-destructive text-sm text-center">
                    {error}
                  </div>
                )}
                <Button
                  type="submit"
                  className="w-full h-10"
                  disabled={isSubmitting || loading}
                >
                  {isSubmitting || loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium">
                    Username
                  </Label>
                  <Input
                    id="username"
                    placeholder="johndoe"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-10"
                  />
                </div>
                {error && (
                  <div className="text-destructive text-sm text-center">
                    {error}
                  </div>
                )}
                <Button
                  type="submit"
                  className="w-full h-10"
                  disabled={isSubmitting || loading}
                >
                  {isSubmitting || loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing up...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>

        <div className="pb-6 text-center">
          <p className="text-sm text-muted-foreground">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              className="text-primary underline ml-1"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Auth;
