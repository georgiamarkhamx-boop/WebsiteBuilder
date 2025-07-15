import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

interface NavigationProps {
  onShowLogin: () => void;
  onShowTryIt: () => void;
}

export default function Navigation({ onShowLogin, onShowTryIt }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <button
      onClick={() => scrollToSection(href.replace('#', ''))}
      className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
    >
      {children}
    </button>
  );

  const MobileNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <button
      onClick={() => scrollToSection(href.replace('#', ''))}
      className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary w-full text-left"
    >
      {children}
    </button>
  );

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="feature-icon feature-icon-purple">
                <span>🛡️</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-800">Security Enhance</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="#courses">Courses</NavLink>
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#dashboard">Dashboard</NavLink>
            <NavLink href="#pricing">Pricing</NavLink>
            <Button variant="ghost" onClick={onShowLogin}>
              Login
            </Button>
            <Button onClick={onShowTryIt}>
              Try It Free
            </Button>
          </div>
          
          <div className="flex md:hidden items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 mt-8">
                  <MobileNavLink href="#courses">Courses</MobileNavLink>
                  <MobileNavLink href="#services">Services</MobileNavLink>
                  <MobileNavLink href="#dashboard">Dashboard</MobileNavLink>
                  <MobileNavLink href="#pricing">Pricing</MobileNavLink>
                  <Button variant="ghost" onClick={onShowLogin} className="justify-start">
                    Login
                  </Button>
                  <Button onClick={onShowTryIt} className="justify-start">
                    Try It Free
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
