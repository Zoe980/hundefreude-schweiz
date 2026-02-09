import { GraduationCap, MapPin, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TRAINING_PARTNERS } from "@/data/crossSell";

interface Props {
  canton?: string;
  maxItems?: number;
}

export default function TrainingCrossSell({ canton, maxItems = 3 }: Props) {
  const filtered = canton
    ? [...TRAINING_PARTNERS.filter((p) => p.canton === canton), ...TRAINING_PARTNERS.filter((p) => p.canton !== canton)]
    : TRAINING_PARTNERS;

  const items = filtered.slice(0, maxItems);

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2">
        <GraduationCap className="w-5 h-5 text-primary" />
        <h3 className="font-bold text-foreground">Hundeschulen & Trainer in deiner Region</h3>
      </div>
      <p className="text-sm text-muted-foreground">
        Ein guter Start beginnt mit professionellem Training – finde passende Hundeschulen.
      </p>
      <div className="grid gap-3">
        {items.map((p) => (
          <a
            key={p.id}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-card rounded-2xl p-5 shadow-card hover:shadow-hover transition-all border border-border/50"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-bold text-foreground text-sm">{p.name}</span>
              <Badge variant="secondary" className="text-xs">{p.typeLabel}</Badge>
              {p.sponsored && (
                <Badge variant="secondary" className="bg-vanilla text-vanilla-foreground text-xs">
                  Gesponsert
                </Badge>
              )}
            </div>
            {p.canton && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                <MapPin className="w-3 h-3" /> {p.canton}
              </div>
            )}
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
