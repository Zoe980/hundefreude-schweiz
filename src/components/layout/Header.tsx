import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Dog, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "Startseite", path: "/" },
  { label: "Rassen", path: "/rassen" },
  { label: "Anbieter", path: "/anbieter" },
  { label: "Quiz", path: "/quiz" },
  { label: "Blog", path: "/blog" },
  { label: "Eintragen", path: "/eintragen" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-md border-b shadow-soft">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary text-primary-foreground">
            <Dog className="w-5 h-5" />
          </span>
          <span className="text-foreground">Hund<span className="text-primary">finder</span>.ch</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/anfrage">
            <Button size="sm" className="ml-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
              <Heart className="w-4 h-4 mr-1" /> Anfrage senden
            </Button>
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t bg-card overflow-hidden"
          >
            <div className="container py-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link to="/anfrage" onClick={() => setOpen(false)}>
                <Button className="w-full mt-2 rounded-xl bg-primary text-primary-foreground">
                  <Heart className="w-4 h-4 mr-1" /> Anfrage senden
                </Button>
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
