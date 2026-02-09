import { Shield, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { INSURANCE_PARTNERS } from "@/data/crossSell";

export default function InsuranceCrossSell() {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <Shield className="w-5 h-5 text-primary" />
        <h3 className="font-bold text-foreground">Hundeversicherung abschliessen</h3>
      </div>
      <p className="text-sm text-muted-foreground">
        Viele neue Hundebesitzer schliessen eine Hundeversicherung ab – schütze deinen Vierbeiner von Anfang an.
      </p>
      <div className="grid gap-3">
        {INSURANCE_PARTNERS.map((p) => (
          <a
            key={p.id}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-card rounded-2xl p-5 shadow-card hover:shadow-hover transition-all border border-border/50"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-bold text-foreground text-sm">{p.name}</span>
              {p.badge && (
                <Badge variant="secondary" className="bg-mint/30 text-mint-foreground text-xs">
                  {p.badge}
                </Badge>
              )}
              {p.sponsored && (
                <Badge variant="secondary" className="bg-vanilla text-vanilla-foreground text-xs">
                  Gesponsert
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mb-1">{p.typeLabel}</p>
            <p className="text-sm text-muted-foreground mb-3">{p.description}</p>
            <Button size="sm" variant="outline" className="rounded-xl text-xs">
              Mehr erfahren <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </a>
        ))}
      </div>
    </section>
  );
}
