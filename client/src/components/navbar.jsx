import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Zap, Sparkles, X, Menu, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const room_uid = localStorage.getItem('room_uid');
  const role = localStorage.getItem('role');


  // Sync with localStorage
  useEffect(() => {
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem('login') === 'true';
      const name = localStorage.getItem('Name') || '';
  
      if (loginStatus !== isLoggedIn) {
        setIsLoggedIn(loginStatus);
        setUserName(name);
      }
    };
  
    checkLoginStatus(); // Initial check
  
    // Listen for storage changes (detects login from another tab)
    const handleStorageChange = (event) => {
      if (event.key === 'login' || event.key === 'Name') {
        checkLoginStatus();
      }
    };
  
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [isLoggedIn]); // Run only when `isLoggedIn` changes
  
  // Handle scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('login');
    localStorage.removeItem('token');
    localStorage.removeItem('Name');
    localStorage.removeItem('room_uid');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setUserName('');
    window.location.href = '/';
  };



  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gray-950/95 backdrop-blur-xl shadow-2xl border-b border-gray-800/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <div className="flex items-center justify-between h-20">
          <div className="flex flex-col items-start">
            <NavLink href="/" className="flex items-center space-x-3">
              <img 
                src="/e_cell_logo.png" 
                alt="E Cell" 
                className="h-14 w-auto animate-pulse" 
              />
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/rules">Rules</NavLink>

            {!isLoggedIn ? <></> :
              (role === "auctioneer" || role === "participant") ? 
                (<NavLink href={`/${role}/${room_uid}`}>Dashboard</NavLink>) : 
                (<NavLink href={`/admin/dashboard`}>Dashboard</NavLink>)
            }

            
            
            {isLoggedIn ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-gray-800/50 text-gray-300 hover:text-white"
                  >
                    <User className="h-6 w-6" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent 
                  className="w-48 p-2 bg-gray-900 border border-gray-800 rounded-lg"
                  align="end"
                  side="bottom"
                >
                  <div className="flex flex-col space-y-2">
                    <div className="px-3 py-2 text-sm text-gray-300 truncate">
                      {userName}
                    </div>
                    <Button
                      onClick={handleLogout}
                      className="w-full justify-start gap-2 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                      variant="ghost"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <NavLink href="/participant/login" isButton>
                Login
              </NavLink>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:bg-gray-800/50"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-950/95 backdrop-blur-xl border-b border-gray-800/50">
          <div className="px-4 py-3 space-y-3">
            <MobileNavLink href="/">Home</MobileNavLink>
            <MobileNavLink href="/rules">Rules</MobileNavLink>
            <NavLink href={`/${role}/${room_uid}`}>Dashboard</NavLink>
            
            {isLoggedIn ? (
              <>
                <div className="px-4 py-3 text-gray-300 bg-gray-900/50 rounded-lg">
                  Welcome {userName}
                </div>
                <Button 
                  onClick={handleLogout}
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <MobileNavLink href="/participant/login" isButton>
                <Sparkles className="mr-2 h-4 w-4" />
                Login
              </MobileNavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

// Reusable NavLink component
const NavLink = ({ href, children, isButton }) => (
  <a href={href} className="group relative text-gray-300 hover:text-white transition-all">
    {isButton ? (
      <Button className="relative overflow-hidden bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-400 hover:to-yellow-400 px-6 py-2 rounded-full font-medium text-gray-900 hover:text-gray-950 transition-all group">
        {children}
      </Button>
    ) : (
      <>
        <span className="text-sm font-medium">{children}</span>
        <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-green-400 to-cyan-400 group-hover:w-full transition-all duration-300" />
      </>
    )}
  </a>
);

// Reusable MobileNavLink component
const MobileNavLink = ({ href, children, isButton }) => (
  <a
    href={href}
    className={`block px-4 py-3 ${
      isButton 
        ? 'text-orange-400 hover:text-white' 
        : 'text-gray-300 hover:text-white'
    } bg-gray-900/50 rounded-lg`}
  >
    {children}
  </a>
);

export default Navbar;