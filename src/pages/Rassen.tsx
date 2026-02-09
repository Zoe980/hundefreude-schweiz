import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BREEDS, Breed } from "@/data/breeds";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Rassen() {
  const [searchParams] = useSearchParams();
  const initialFilter = searchParams.get("filter") || "";
  const [search, setSearch] = useState("");
  const [sizeFilter, setSizeFilter] = useState<string>(
    ["klein", "mittel", "gross"].includes(initialFilter) ? initialFilter : ""
  );
  const [specialFilter, setSpecialFilter] = useState<string>(
    ["family", "beginner", "apartment"].includes(initialFilter) ? initialFilter : ""
  );

  const filtered = useMemo(() => {
    return BREEDS.filter(b => {
      if (search && !b.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (sizeFilter && b.size !== sizeFilter) return false;
      if (specialFilter === "family" && !b.familyFriendly) return false;
      if (specialFilter === "beginner" && !b.beginnerFriendly) return false;
      if (specialFilter === "apartment" && !b.apartmentOk) return false;
      return true;
    });
  }, [search, sizeFilter, specialFilter]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <h1 className="text-3xl font-extrabold text-foreground mb-2">Hunderassen</h1>
        <p className="text-muted-foreground mb-6">Entdecke über {BREEDS.length} Rassen und finde die perfekte für dich</p>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Rasse suchen..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 rounded-xl"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["klein", "mittel", "gross"].map(s => (
              <Button
                key={s}
                size="sm"
                variant={sizeFilter === s ? "default" : "outline"}
                onClick={() => setSizeFilter(sizeFilter === s ? "" : s)}
                className="rounded-xl capitalize"
              >
                {s}
              </Button>
            ))}
            {[
              { key: "family", label: "Familienfreundlich" },
              { key: "beginner", label: "Anfänger" },
              { key: "apartment", label: "Wohnung" },
            ].map(f => (
              <Button
                key={f.key}
                size="sm"
                variant={specialFilter === f.key ? "default" : "outline"}
                onClick={() => setSpecialFilter(specialFilter === f.key ? "" : f.key)}
                className="rounded-xl"
              >
                {f.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((breed, i) => (
            <motion.div
              key={breed.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.03, 0.3) }}
            >
              <Link
                to={`/rasse/${breed.slug}`}
                className="block bg-card rounded-2xl p-5 shadow-card hover:shadow-hover transition-all hover:-translate-y-1 h-full"
              >
                <div className="text-4xl mb-3">{breed.emoji}</div>
                <h2 className="font-bold text-foreground mb-1">{breed.name}</h2>
                <p className="text-sm text-muted-foreground mb-3">{breed.shortDescription}</p>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="secondary" className="bg-muted text-xs capitalize">{breed.size}</Badge>
                  <Badge variant="secondary" className="bg-muted text-xs">Energie: {breed.energy}</Badge>
                  {breed.beginnerFriendly && (
                    <Badge variant="secondary" className="bg-mint text-mint-foreground text-xs">Anfänger ✓</Badge>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-12">Keine Rassen gefunden. Versuche andere Filter.</p>
        )}
      </main>
      <Footer />
    </div>
  );
}
