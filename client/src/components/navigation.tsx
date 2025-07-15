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
      className="text-gray-300 hover:text-green-400 px-3 py-2 text-sm font-medium transition-colors duration-200 hover:bg-green-400/10 rounded-md"
    >
      {children}
    </button>
  );

  const MobileNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <button
      onClick={() => scrollToSection(href.replace('#', ''))}
      className="block px-3 py-3 text-base font-medium text-gray-300 hover:text-green-400 w-full text-left btn-touch rounded-md hover:bg-green-400/10 transition-colors duration-200"
    >
      {children}
    </button>
  );

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 border-b border-green-400/20 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-cyan-400 rounded-lg flex items-center justify-center border border-green-400/30 shadow-lg shadow-green-400/20">
                <span className="text-xl">🛡️</span>
              </div>
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">Security Enhance</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <NavLink href="#courses">Courses</NavLink>
            <NavLink href="#ttx">TTX</NavLink>
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#dashboard">Dashboard</NavLink>
            <NavLink href="#pricing">Pricing</NavLink>
            <Button 
              variant="ghost" 
              onClick={onShowLogin}
              className="text-gray-300 hover:text-green-400 hover:bg-green-400/10 border-green-400/20"
            >
              Login
            </Button>
            <Button 
              onClick={onShowTryIt}
              className="bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 text-white shadow-lg shadow-green-600/20 border-0"
            >
              Try It Free
            </Button>
          </div>
          
          <div className="flex md:hidden items-center">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-green-400 hover:bg-green-400/10">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-gradient-to-b from-slate-900 to-gray-900 border-l border-green-400/20">
                <div className="flex flex-col space-y-3 mt-8">
                  <MobileNavLink href="#courses">Courses</MobileNavLink>
                  <MobileNavLink href="#ttx">TTX</MobileNavLink>
                  <MobileNavLink href="#services">Services</MobileNavLink>
                  <MobileNavLink href="#dashboard">Dashboard</MobileNavLink>
                  <MobileNavLink href="#pricing">Pricing</MobileNavLink>
                  <div className="pt-4 border-t border-green-400/20">
                    <Button 
                      variant="ghost" 
                      onClick={onShowLogin} 
                      className="justify-start w-full btn-touch mb-2 text-gray-300 hover:text-green-400 hover:bg-green-400/10"
                    >
                      Login
                    </Button>
                    <Button 
                      onClick={onShowTryIt} 
                      className="justify-start w-full btn-touch bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 text-white shadow-lg shadow-green-600/20 border-0"
                    >
                      Try It Free
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
