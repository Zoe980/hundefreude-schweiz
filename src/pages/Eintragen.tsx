import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Star, MapPin, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const BENEFITS = [
  { icon: Users, title: "Leads von Interessenten", desc: "Erhalte Anfragen von Personen mit klarer Kauf-/Adoptionsabsicht." },
  { icon: MapPin, title: "Regionale Sichtbarkeit", desc: "Werde in deinem Kanton und deiner Region gefunden." },
  { icon: Star, title: "Gesponserte Platzierungen", desc: "Mehr Sichtbarkeit durch Top-Platzierungen." },
  { icon: Zap, title: "In 5 Minuten online", desc: "Einfaches Profil erstellen und sofort sichtbar werden." },
];

const PACKAGES = [
  { name: "Kostenlos", price: "CHF 0", period: "", features: ["Basisprofil im Directory", "Standard-Sichtbarkeit", "Bis zu 3 Bilder"], highlighted: false },
  { name: "Plus", price: "CHF 49", period: "/Monat", features: ["Featured Badge", "Höhere Platzierung", "Anzeige auf Rasse-Seiten", "Bis zu 10 Bilder", "Priorität bei Leads"], highlighted: true },
  { name: "Premium", price: "CHF 99", period: "/Monat", features: ["Top Platzierungen überall", "Bannerplatz optional", "Maximale Lead-Priorität", "Unbegrenzte Bilder", "Exklusivität möglich"], highlighted: false },
];

export default function Eintragen() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero */}
        <section className="gradient-hero py-16">
          <div className="container text-center max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Badge variant="secondary" className="bg-vanilla text-vanilla-foreground mb-4">Für Anbieter</Badge>
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
                Mehr Sichtbarkeit für Ihren Hunde-Anbieter in der Schweiz
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Erhalten Sie Anfragen von kaufbereiten Interessenten – fair & transparent.
              </p>
              <Button size="lg" className="rounded-xl bg-primary text-primary-foreground text-base px-8">
                Jetzt eintragen
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16">
          <div className="container">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {BENEFITS.map((b, i) => (
                <motion.div key={b.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="bg-card rounded-2xl p-6 shadow-card">
                  <div className="w-12 h-12 rounded-xl bg-mint flex items-center justify-center mb-4">
                    <b.icon className="w-6 h-6 text-mint-foreground" />
                  </div>
                  <h3 className="font-bold text-foreground mb-1">{b.title}</h3>
                  <p className="text-sm text-muted-foreground">{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 gradient-warm">
          <div className="container">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-10">Pakete & Preise</h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {PACKAGES.map((pkg, i) => (
                <motion.div key={pkg.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className={`bg-card rounded-2xl p-6 shadow-card ${pkg.highlighted ? "ring-2 ring-primary" : ""}`}>
                  {pkg.highlighted && <Badge className="bg-primary text-primary-foreground mb-3">Beliebt</Badge>}
                  <h3 className="text-xl font-bold text-foreground">{pkg.name}</h3>
                  <div className="mt-2 mb-4">
                    <span className="text-3xl font-extrabold text-foreground">{pkg.price}</span>
                    <span className="text-muted-foreground text-sm">{pkg.period}</span>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {pkg.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full rounded-xl ${pkg.highlighted ? "bg-primary text-primary-foreground" : ""}`} variant={pkg.highlighted ? "default" : "outline"}>
                    Auswählen
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <div className="container max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">Häufige Fragen</h2>
            <div className="space-y-4">
              {[
                { q: "Wie funktioniert die Lead-Weiterleitung?", a: "Interessenten senden über unser Formular eine Anfrage. Wir leiten diese an passende Anbieter in der Region weiter. Sie können den Interessenten dann direkt kontaktieren." },
                { q: "Wie werden Anbieter geprüft?", a: "Wir prüfen jeden Eintrag manuell auf Vollständigkeit und Seriosität. Verifizierte Anbieter erhalten ein spezielles Badge." },
                { q: "Kann ich mein Paket jederzeit ändern?", a: "Ja, Sie können Ihr Paket jederzeit upgraden oder downgraden. Änderungen werden zum nächsten Abrechnungszeitraum wirksam." },
                { q: "Welche Regionen werden unterstützt?", a: "Wir decken alle 26 Kantone der Schweiz ab. Sie können Ihren Eintrag auf bestimmte Regionen fokussieren." },
              ].map(item => (
                <div key={item.q} className="bg-card rounded-2xl p-6 shadow-card">
                  <h3 className="font-bold text-foreground mb-2">{item.q}</h3>
                  <p className="text-sm text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
