import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Zap, Sparkles, X, Menu, LogOut, User } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const room_uid = localStorage.getItem('room_uid');
  const role = localStorage.getItem('role');

  const loc = useLocation();

  useEffect(() => {
    setIsMenuOpen(false); // Close menu on route change
  }, [loc.pathname])


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

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Rules', href: '/rules' },
    { name: 'Players', href: '/players' },
    ...(isLoggedIn ?
      [
        (
          (role === "auctioneer" || role === "participant") ?
            { name: 'Dashboard', href: `/${role}/${room_uid}` } :
            { name: 'Dashboard', href: '/admin/dashboard' }
        ),
        { name: 'Logout', href: '/logout' }
      ]
      : [{ name: 'Login', href: '/participant/login' }]
    )
  ]



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
            {links.map((link) => (
              <NavLink key={link.name} href={link.href} isButton={link.name === 'Login'}>
                {link.name}
              </NavLink>
            ))}
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
            {links.map((link) => (
              <MobileNavLink key={link.name} href={link.href}>
                {link.name}
              </MobileNavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

// Reusable NavLink component
const NavLink = ({ href, children, isButton }) => (
  <Link to={href} className="group relative text-gray-300 hover:text-white transition-all">
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
  </Link>
);

// Reusable MobileNavLink component
const MobileNavLink = ({ href, children, isButton }) => (
  <Link to={href}
    className={`block px-4 py-3 ${
      isButton 
        ? 'text-orange-400 hover:text-white' 
        : 'text-gray-300 hover:text-white'
    } bg-gray-900/50 rounded-lg`}
  >
    {children}
  </Link>
);

export default Navbar;