import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PROVIDERS, PROVIDER_TYPE_LABELS, Provider } from "@/data/providers";
import { CANTONS } from "@/data/cantons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Anbieter() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [cantonFilter, setCantonFilter] = useState<string>("");

  const filtered = useMemo(() => {
    return PROVIDERS.filter(p => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (typeFilter && p.type !== typeFilter) return false;
      if (cantonFilter && p.canton !== cantonFilter) return false;
      return true;
    }).sort((a, b) => (b.sponsored ? 1 : 0) - (a.sponsored ? 1 : 0));
  }, [search, typeFilter, cantonFilter]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <h1 className="text-3xl font-extrabold text-foreground mb-2">Anbieter in der Schweiz</h1>
        <p className="text-muted-foreground mb-6">Züchter, Tierheime und Dienstleister in deiner Region</p>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Anbieter suchen..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 rounded-xl" />
          </div>
          <Select value={typeFilter} onValueChange={v => setTypeFilter(v === "all" ? "" : v)}>
            <SelectTrigger className="w-44 rounded-xl"><SelectValue placeholder="Typ wählen" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Typen</SelectItem>
              {Object.entries(PROVIDER_TYPE_LABELS).map(([key, label]) => (
                <SelectItem key={key} value={key}>{label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={cantonFilter} onValueChange={v => setCantonFilter(v === "all" ? "" : v)}>
            <SelectTrigger className="w-44 rounded-xl"><SelectValue placeholder="Kanton" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Kantone</SelectItem>
              {CANTONS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.05, 0.3) }}>
              <Link to={`/anbieter/${p.slug}`} className="block bg-card rounded-2xl p-5 shadow-card hover:shadow-hover transition-all hover:-translate-y-1 h-full">
                <div className="flex items-center gap-2 mb-3">
                  {p.sponsored && <Badge variant="secondary" className="bg-vanilla text-vanilla-foreground text-xs">Gesponsert</Badge>}
                  {p.verified && <Badge variant="secondary" className="bg-mint text-mint-foreground text-xs">✓ Verifiziert</Badge>}
                  <Badge variant="outline" className="text-xs">{p.typeLabel}</Badge>
                </div>
                <h2 className="font-bold text-foreground mb-1">{p.name}</h2>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                  <MapPin className="w-3.5 h-3.5" /> {p.city}, {p.canton}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                {p.breeds.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {p.breeds.slice(0, 3).map(b => (
                      <Badge key={b} variant="secondary" className="bg-muted text-xs">{b}</Badge>
                    ))}
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
