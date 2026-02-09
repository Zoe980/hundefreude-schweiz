import { useParams, Link } from "react-router-dom";
import { getBreedBySlug, BREEDS } from "@/data/breeds";
import { PROVIDERS } from "@/data/providers";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, ArrowLeft, CheckCircle, X } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function RasseDetail() {
  const { slug } = useParams();
  const breed = getBreedBySlug(slug || "");

  if (!breed) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Rasse nicht gefunden</h1>
          <Link to="/rassen"><Button variant="outline" className="rounded-xl"><ArrowLeft className="w-4 h-4 mr-2" /> Zurück</Button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  const matchingProviders = PROVIDERS.filter(
    p => p.breeds.some(b => b.toLowerCase().includes(breed.name.toLowerCase().split(" ")[0])) || p.type === "tierheim"
  );

  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between py-2 border-b last:border-0">
      <span className="text-muted-foreground text-sm">{label}</span>
      <span className="font-medium text-sm text-foreground">{value}</span>
    </div>
  );

  const BoolRow = ({ label, value }: { label: string; value: boolean }) => (
    <div className="flex justify-between py-2 border-b last:border-0">
      <span className="text-muted-foreground text-sm">{label}</span>
      {value ? <CheckCircle className="w-4 h-4 text-primary" /> : <X className="w-4 h-4 text-muted-foreground" />}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <Link to="/rassen" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4 mr-1" /> Alle Rassen
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="text-5xl block mb-4">{breed.emoji}</span>
              <h1 className="text-3xl font-extrabold text-foreground mb-2">{breed.name}</h1>
              <p className="text-lg text-muted-foreground">{breed.shortDescription}</p>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-card">
              <h2 className="font-bold text-foreground mb-3">Charakter</h2>
              <p className="text-muted-foreground">{breed.character}</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-card rounded-2xl p-6 shadow-card">
                <h3 className="font-bold text-foreground mb-2">🏃 Bewegung</h3>
                <p className="text-sm text-muted-foreground">{breed.exercise}</p>
              </div>
              <div className="bg-card rounded-2xl p-6 shadow-card">
                <h3 className="font-bold text-foreground mb-2">✂️ Pflege</h3>
                <p className="text-sm text-muted-foreground">{breed.care}</p>
              </div>
              <div className="bg-card rounded-2xl p-6 shadow-card">
                <h3 className="font-bold text-foreground mb-2">🏥 Gesundheit</h3>
                <p className="text-sm text-muted-foreground">{breed.health}</p>
              </div>
              <div className="bg-card rounded-2xl p-6 shadow-card">
                <h3 className="font-bold text-foreground mb-2">💰 Typische Kosten</h3>
                <p className="text-sm text-muted-foreground">{breed.costRange}</p>
              </div>
            </div>

            {/* FAQ Schema section */}
            <div className="bg-card rounded-2xl p-6 shadow-card">
              <h2 className="font-bold text-foreground mb-4">Häufige Fragen</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-sm text-foreground">Ist ein {breed.name} für Anfänger geeignet?</h3>
                  <p className="text-sm text-muted-foreground">{breed.beginnerFriendly ? `Ja, der ${breed.name} ist gut für Anfänger geeignet.` : `Der ${breed.name} ist eher für erfahrene Hundehalter empfohlen.`}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-foreground">Was kostet ein {breed.name} in der Schweiz?</h3>
                  <p className="text-sm text-muted-foreground">Die typischen Kosten liegen bei {breed.costRange}. Dazu kommen laufende Kosten für Futter, Tierarzt und Versicherung.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-6 shadow-card sticky top-24">
              <h3 className="font-bold text-foreground mb-4">Kurzprofil</h3>
              <InfoRow label="Grösse" value={breed.size} />
              <InfoRow label="Energie" value={breed.energy} />
              <InfoRow label="Fellpflege" value={breed.grooming} />
              <InfoRow label="Lebenserwartung" value={breed.lifeExpectancy} />
              <BoolRow label="Familienfreundlich" value={breed.familyFriendly} />
              <BoolRow label="Anfängerfreundlich" value={breed.beginnerFriendly} />
              <BoolRow label="Wohnungshaltung" value={breed.apartmentOk} />
              <BoolRow label="Kinderfreundlich" value={breed.goodWithKids} />

              <Link to={`/anfrage?rasse=${encodeURIComponent(breed.name)}`}>
                <Button className="w-full mt-6 rounded-xl bg-primary text-primary-foreground">
                  <Heart className="w-4 h-4 mr-2" /> Anfrage zur Rasse senden
                </Button>
              </Link>
            </div>

            {matchingProviders.length > 0 && (
              <div className="bg-card rounded-2xl p-6 shadow-card">
                <h3 className="font-bold text-foreground mb-4">Passende Anbieter</h3>
                <div className="space-y-3">
                  {matchingProviders.slice(0, 3).map(p => (
                    <Link key={p.id} to={`/anbieter/${p.slug}`} className="block p-3 rounded-xl border hover:border-primary/50 transition-colors">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm text-foreground">{p.name}</span>
                        {p.sponsored && <Badge variant="secondary" className="bg-vanilla text-vanilla-foreground text-xs">Gesponsert</Badge>}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="w-3 h-3" /> {p.city}, {p.canton}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
