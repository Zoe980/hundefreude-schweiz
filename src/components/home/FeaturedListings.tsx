import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PROVIDERS } from "@/data/providers";

export default function FeaturedListings() {
  const featured = PROVIDERS.filter(p => p.sponsored).slice(0, 4);

  return (
    <section className="py-16 gradient-warm">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Empfohlene Partner</h2>
          <p className="text-muted-foreground">Geprüfte Züchter, Tierheime und Dienstleister</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((provider, i) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/anbieter/${provider.slug}`}
                className="block bg-card rounded-2xl p-5 shadow-card hover:shadow-hover transition-all hover:-translate-y-1 h-full"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary" className="bg-vanilla text-vanilla-foreground text-xs">
                    Gesponsert
                  </Badge>
                  {provider.verified && (
                    <Badge variant="secondary" className="bg-mint text-mint-foreground text-xs">
                      ✓ Verifiziert
                    </Badge>
                  )}
                </div>
                <h3 className="font-bold text-foreground mb-1">{provider.name}</h3>
                <p className="text-sm text-primary font-medium mb-2">{provider.typeLabel}</p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                  {provider.city}, {provider.canton}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{provider.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/anbieter">
            <Button variant="outline" className="rounded-xl border-primary/30 hover:bg-primary/5">
              Alle Anbieter anzeigen <ExternalLink className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
