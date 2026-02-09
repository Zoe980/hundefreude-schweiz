import { useParams, Link } from "react-router-dom";
import { PROVIDERS } from "@/data/providers";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Globe, ArrowLeft, Heart } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function AnbieterDetail() {
  const { slug } = useParams();
  const provider = PROVIDERS.find(p => p.slug === slug);

  if (!provider) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Anbieter nicht gefunden</h1>
          <Link to="/anbieter"><Button variant="outline" className="rounded-xl"><ArrowLeft className="w-4 h-4 mr-2" /> Zurück</Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <Link to="/anbieter" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" /> Alle Anbieter
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                {provider.sponsored && <Badge variant="secondary" className="bg-vanilla text-vanilla-foreground">Gesponsert</Badge>}
                {provider.verified && <Badge variant="secondary" className="bg-mint text-mint-foreground">✓ Verifiziert</Badge>}
                <Badge variant="outline">{provider.typeLabel}</Badge>
              </div>
              <h1 className="text-3xl font-extrabold text-foreground mb-2">{provider.name}</h1>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="w-4 h-4" /> {provider.city}, {provider.canton}
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-card">
              <h2 className="font-bold text-foreground mb-3">Über uns</h2>
              <p className="text-muted-foreground">{provider.description}</p>
            </div>

            {provider.breeds.length > 0 && (
              <div className="bg-card rounded-2xl p-6 shadow-card">
                <h2 className="font-bold text-foreground mb-3">
                  {provider.type === "tierheim" ? "Wir vermitteln" : "Unsere Rassen"}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {provider.breeds.map(b => (
                    <Badge key={b} variant="secondary" className="bg-muted">{b}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-6 shadow-card sticky top-24">
              <h3 className="font-bold text-foreground mb-4">Kontakt</h3>
              <div className="space-y-3">
                {provider.phone && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4" /> {provider.phone}
                  </div>
                )}
                {provider.email && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" /> {provider.email}
                  </div>
                )}
                {provider.website && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Globe className="w-4 h-4" /> <a href={provider.website} target="_blank" rel="noopener noreferrer" className="hover:text-primary underline">Website besuchen</a>
                  </div>
                )}
              </div>
              <Link to={`/anfrage?anbieter=${encodeURIComponent(provider.name)}`}>
                <Button className="w-full mt-6 rounded-xl bg-primary text-primary-foreground">
                  <Heart className="w-4 h-4 mr-2" /> Kontakt anfragen
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
