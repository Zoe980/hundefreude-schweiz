import { motion } from "framer-motion";
import { Search, Send, MessageSquare, CheckCircle } from "lucide-react";

const STEPS = [
  { icon: Search, title: "Rasse finden", desc: "Suche eine Rasse oder mache unser Quiz", color: "bg-vanilla" },
  { icon: Send, title: "Anfrage senden", desc: "Fülle das Formular mit deinen Wünschen aus", color: "bg-mint" },
  { icon: MessageSquare, title: "Anbieter kontaktieren", desc: "Wir leiten deine Anfrage an passende Anbieter weiter", color: "bg-teal" },
  { icon: CheckCircle, title: "Hund finden", desc: "Die Anbieter melden sich direkt bei dir", color: "bg-coral" },
];

export default function HowItWorks() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">So funktioniert's</h2>
          <p className="text-muted-foreground">In 4 einfachen Schritten zum Traumhund</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <step.icon className="w-7 h-7 text-foreground" />
              </div>
              <div className="text-sm font-bold text-primary mb-1">Schritt {i + 1}</div>
              <h3 className="font-bold text-foreground mb-1">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
