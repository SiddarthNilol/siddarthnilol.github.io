import { useEffect, useState } from "react";
import { Github, Linkedin, Mail } from "@/lib/icons";

const links = [
  { href: "#timeline", label: "Journey", index: "01" },
  { href: "#projects", label: "Projects", index: "02" },
  { href: "#visitors", label: "Visitors", index: "03" },
  { href: "#contact", label: "Contact", index: "04" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-nav" : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="font-mono text-sm tracking-widest text-foreground">
          <span className="text-accent">~/</span>siddarth<span className="text-primary">.nilol</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group font-mono text-xs tracking-wider text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="text-accent/70 group-hover:text-accent mr-1.5">{link.index}.</span>
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/siddarth-nilol-k-s"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href="https://github.com/SiddarthNilol"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground hover:text-accent transition-colors"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="mailto:sk12590@nyu.edu"
            aria-label="Email"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
