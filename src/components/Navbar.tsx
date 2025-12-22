import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Doubt Solver", href: "#doubt-solver" },
    { name: "Community", href: "#community" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
    >
      <nav className="container max-w-6xl mx-auto">
        <div className="glass rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="font-bold text-lg hidden sm:block">StudyBuddy</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button variant="accent" size="sm">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-2 glass rounded-2xl p-4"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <hr className="my-2 border-border" />
              <Button variant="ghost" className="justify-start">
                Sign In
              </Button>
              <Button variant="accent">Get Started</Button>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Navbar;
