import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BREEDS } from "@/data/breeds";

const CATEGORIES = [
  { label: "Kleine Hunde", emoji: "🐕", filter: "klein", color: "bg-vanilla" },
  { label: "Mittelgrosse Hunde", emoji: "🐕‍🦺", filter: "mittel", color: "bg-mint" },
  { label: "Grosse Hunde", emoji: "🦮", filter: "gross", color: "bg-teal" },
  { label: "Familienfreundlich", emoji: "👨‍👩‍👧‍👦", filter: "family", color: "bg-warm" },
  { label: "Anfängerfreundlich", emoji: "🆕", filter: "beginner", color: "bg-coral" },
  { label: "Wohnungshunde", emoji: "🏢", filter: "apartment", color: "bg-vanilla" },
];

export default function BreedCategories() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Hunderassen entdecken</h2>
          <p className="text-muted-foreground">Finde die perfekte Rasse für deinen Lebensstil</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/rassen?filter=${cat.filter}`}
                className={`block ${cat.color} rounded-2xl p-5 text-center hover:shadow-hover transition-all hover:-translate-y-1`}
              >
                <span className="text-3xl block mb-2">{cat.emoji}</span>
                <span className="text-sm font-semibold text-foreground">{cat.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-10">
          <h3 className="font-bold text-foreground mb-4">Beliebte Rassen</h3>
          <div className="flex flex-wrap gap-2">
            {BREEDS.slice(0, 12).map(breed => (
              <Link
                key={breed.id}
                to={`/rasse/${breed.slug}`}
                className="px-3 py-1.5 rounded-full bg-card border hover:border-primary/50 hover:bg-primary/5 transition-colors text-sm font-medium text-foreground"
              >
                {breed.emoji} {breed.name}
              </Link>
            ))}
            <Link
              to="/rassen"
              className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
            >
              Alle Rassen →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
