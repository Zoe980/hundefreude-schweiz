import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function QuizCTA() {
  return (
    <section className="py-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary rounded-3xl p-8 md:p-12 text-primary-foreground text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-8 text-6xl">🐾</div>
            <div className="absolute bottom-4 right-8 text-6xl">🐶</div>
            <div className="absolute top-1/2 left-1/4 text-4xl">❤️</div>
          </div>
          <div className="relative z-10">
            <Sparkles className="w-10 h-10 mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
              Welche Hunderasse passt zu dir?
            </h2>
            <p className="text-lg opacity-90 mb-6 max-w-lg mx-auto">
              Unser kostenloses Quiz hilft dir in unter 2 Minuten, die perfekte Rasse für deinen Lebensstil zu finden.
            </p>
            <Link to="/quiz">
              <Button size="lg" variant="secondary" className="rounded-xl text-base font-bold px-8 shadow-soft">
                Quiz starten <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
