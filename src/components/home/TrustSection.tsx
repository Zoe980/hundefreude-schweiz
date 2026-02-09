import { Shield, Heart, Users, Eye } from "lucide-react";
import { motion } from "framer-motion";

const TRUST_ITEMS = [
  { icon: Shield, title: "Seriöse Vermittlung", desc: "Wir prüfen unsere Partner sorgfältig und setzen auf Qualität statt Quantität." },
  { icon: Heart, title: "Tierschutz zuerst", desc: "Kein Impulskauf – wir fördern verantwortungsvolle Hundehaltung." },
  { icon: Users, title: "Schweizer Anbieter", desc: "Züchter und Tierheime aus allen Kantonen der Schweiz." },
  { icon: Eye, title: "Transparente Vermittlung", desc: "Wir sind kein Händler. Wir verbinden Interessenten mit passenden Anbietern." },
];

export default function TrustSection() {
  return (
    <section className="py-16 gradient-section">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Warum Hundfinder.ch?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Verantwortungsvoller Hundekauf beginnt mit der richtigen Beratung
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-card hover:shadow-hover transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-mint flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-mint-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
