import { motion } from "framer-motion";
import { BookOpen, Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  const links = {
    product: ["Features", "Pricing", "API", "Integrations"],
    resources: ["Documentation", "Blog", "Community", "Support"],
    company: ["About", "Careers", "Privacy", "Terms"],
  };

  return (
    <footer className="border-t border-border bg-card py-16 px-4">
      <div className="container max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-bold text-xl">StudyBuddy</span>
            </div>
            <p className="text-muted-foreground text-sm mb-4">
              Empowering engineering students to achieve their academic goals through AI-powered learning.
            </p>
            <div className="flex gap-3">
              {[Twitter, Github, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4 capitalize">{category}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 StudyBuddy. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Made with ❤️ for engineering students
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
