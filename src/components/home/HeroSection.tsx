import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-dog.jpg";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden gradient-hero">
      <div className="container py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              🇨🇭 Schweizer Plattform
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-foreground mb-4">
              Hund kaufen in der Schweiz –{" "}
              <span className="text-primary">finde die passende Rasse</span> & seriöse Anbieter
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Wir verbinden dich mit geprüften Züchtern und Tierheimen in deiner Region.
              Verantwortungsvoll, transparent und kostenlos für dich.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/anfrage">
                <Button size="lg" className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 text-base px-6 w-full sm:w-auto shadow-soft">
                  <Search className="w-5 h-5 mr-2" />
                  Ich weiss, welche Rasse ich suche
                </Button>
              </Link>
              <Link to="/quiz">
                <Button size="lg" variant="outline" className="rounded-xl text-base px-6 w-full sm:w-auto border-primary/30 hover:bg-primary/5">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Welche Rasse passt zu mir?
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-hover">
              <img
                src={heroImg}
                alt="Glücklicher Hund auf einer Schweizer Alpenwiese"
                className="w-full h-64 md:h-96 object-cover"
                loading="eager"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-card rounded-xl shadow-card p-3 flex items-center gap-2 animate-float">
              <span className="text-2xl">🐾</span>
              <div>
                <p className="text-sm font-bold text-foreground">200+ Rassen</p>
                <p className="text-xs text-muted-foreground">im Directory</p>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-card rounded-xl shadow-card p-3 flex items-center gap-2 animate-float" style={{ animationDelay: '1s' }}>
              <span className="text-2xl">✅</span>
              <div>
                <p className="text-sm font-bold text-foreground">Geprüfte Anbieter</p>
                <p className="text-xs text-muted-foreground">in der ganzen Schweiz</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
