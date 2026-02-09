import { useState } from "react";
import { FileText, CheckCircle, Mail, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { STARTER_GUIDE } from "@/data/crossSell";
import { toast } from "@/hooks/use-toast";

export default function StarterGuide() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast({ title: "Bitte gib eine gültige E-Mail ein.", variant: "destructive" });
      return;
    }
    console.log("Starter guide email:", email);
    setSubmitted(true);
    toast({ title: "Checkliste wird gesendet!", description: "Prüfe dein E-Mail-Postfach." });
  };

  return (
    <section className="bg-gradient-to-br from-vanilla/40 to-mint/20 rounded-2xl p-6 shadow-card">
      <div className="flex items-center gap-2 mb-3">
        <FileText className="w-5 h-5 text-primary" />
        <h3 className="font-bold text-foreground">{STARTER_GUIDE.title}</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{STARTER_GUIDE.description}</p>

      <ul className="space-y-2 mb-5">
        {STARTER_GUIDE.items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-foreground">
            <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="email"
            placeholder="Deine E-Mail-Adresse"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl flex-1"
          />
          <Button type="submit" className="rounded-xl bg-primary text-primary-foreground shrink-0">
            <Download className="w-4 h-4 mr-1" /> Gratis holen
          </Button>
        </form>
      ) : (
        <div className="flex items-center gap-2 text-sm text-primary font-medium">
          <Mail className="w-4 h-4" /> Checkliste wurde an {email} gesendet!
        </div>
      )}
    </section>
  );
}
