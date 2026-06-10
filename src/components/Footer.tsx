const Footer = () => {
  return (
    <footer className="border-t border-border/60 py-8">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <p className="font-mono text-xs text-muted-foreground">
          <span className="text-accent">~/</span>siddarth.nilol · © {new Date().getFullYear()}
        </p>
        <p className="font-mono text-xs text-muted-foreground">
          built with React + Vite · designed in the dark
        </p>
      </div>
    </footer>
  );
};

export default Footer;
