
import { useState, useEffect } from "react";
import { Menu, X, Phone, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import NLVLogo from "./NLVLogo";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Properties", href: "#properties" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    
    // Check if token exists
    const token = localStorage.getItem("adminToken");
    setIsAdmin(!!token);

    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsAdmin(false);
    window.location.reload(); // Reload to remove edit buttons from other components quickly
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-panel shadow-luxury py-3" : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <NLVLogo scrolled={scrolled} />

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-sans font-medium tracking-wide transition-colors hover:text-accent ${
                scrolled ? "text-foreground" : "text-primary-foreground"
              }`}
            >
              {link.label}
            </a>
          ))}
          
          {isAdmin ? (
            <div className="flex items-center gap-4 ml-2">
              <Link
                to="/admin-dashboard-8472"
                className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold font-sans transition-transform hover:scale-105"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500/10 border border-red-500/50 text-red-500 hover:text-white px-4 py-2.5 rounded-lg text-sm font-semibold font-sans flex items-center gap-2 transition-all hover:bg-red-600"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          ) : (
            <a
              href="#contact"
              className="bg-accent text-accent-foreground px-5 py-2.5 rounded-lg text-sm font-semibold font-sans shadow-gold transition-transform hover:scale-105"
            >
              Book a Visit
            </a>
          )}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-2 ${scrolled ? "text-foreground" : "text-primary-foreground"}`}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-t border-border"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-foreground font-sans font-medium py-2"
                >
                  {link.label}
                </a>
              ))}
              
              {isAdmin ? (
                <div className="flex flex-col gap-3 mt-2 border-t border-border pt-4">
                  <Link
                    to="/admin-dashboard-8472"
                    className="bg-emerald-600 text-white px-5 py-3 rounded-lg text-center font-semibold font-sans mb-1"
                  >
                    Admin Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500/10 border border-red-500/50 text-red-500 px-5 py-3 rounded-lg text-center font-semibold font-sans flex items-center justify-center gap-2 mb-2 transition-all hover:bg-red-600 hover:text-white"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              ) : (
                <a
                  href="#contact"
                  className="bg-accent text-accent-foreground px-5 py-3 rounded-lg text-center font-semibold font-sans shadow-gold mb-2 mt-2"
                >
                  Book a Visit
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
