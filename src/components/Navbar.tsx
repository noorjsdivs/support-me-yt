
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8 overflow-hidden">
              <div className="absolute inset-0 bg-coffee-yellow rounded-full"></div>
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-3 bg-coffee-dark rounded-t-full"></div>
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-3 bg-white rounded-full"></div>
            </div>
            <span className="font-bold text-xl">SupportMe</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <a href="#features" className="transition-colors hover:text-primary">Features</a>
          <a href="#testimonials" className="transition-colors hover:text-primary">Testimonials</a>
          <a href="#pricing" className="transition-colors hover:text-primary">Pricing</a>
          <a href="#faq" className="transition-colors hover:text-primary">FAQ</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          {user ? (
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <User size={18} />
                    {user.email?.split('@')[0]}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/account")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>My Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              <Button variant="outline" className="hidden md:flex" onClick={() => navigate("/auth")}>
                Log in
              </Button>
              <Button className="hidden md:flex" onClick={() => navigate("/auth")}>
                Get started
              </Button>
            </>
          )}
          <button 
            className="md:hidden" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden container py-4">
          <nav className="flex flex-col space-y-4">
            <a 
              href="#features" 
              className="py-2 transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#testimonials" 
              className="py-2 transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </a>
            <a 
              href="#pricing" 
              className="py-2 transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </a>
            <a 
              href="#faq" 
              className="py-2 transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </a>
            <div className="flex flex-col space-y-2 pt-2">
              {user ? (
                <>
                  <Button variant="outline" onClick={() => navigate("/account")}>
                    <User className="mr-2 h-4 w-4" />
                    My Account
                  </Button>
                  <Button variant="destructive" onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={() => navigate("/auth")}>
                    Log in
                  </Button>
                  <Button onClick={() => navigate("/auth")}>
                    Get started
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
