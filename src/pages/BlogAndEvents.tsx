import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const BLOG_POSTS = [
  { slug: "serioeser-hundekauf", title: "Seriöser Hundekauf in der Schweiz – worauf achten?", category: "Hundekauf", excerpt: "Tipps und Checklisten für den verantwortungsvollen Hundekauf.", date: "15. Jan 2025" },
  { slug: "kosten-hund-schweiz", title: "Was kostet ein Hund in der Schweiz?", category: "Kosten", excerpt: "Anschaffung, laufende Kosten, Versicherung – der komplette Überblick.", date: "10. Jan 2025" },
  { slug: "adoption-vs-kauf", title: "Adoption vs. Kauf: Was ist besser?", category: "Rasseberatung", excerpt: "Vor- und Nachteile beider Optionen im Vergleich.", date: "5. Jan 2025" },
  { slug: "welpensozialisierung", title: "Welpensozialisierung: Die ersten Wochen", category: "Erziehung", excerpt: "Was in den ersten Wochen mit dem Welpen besonders wichtig ist.", date: "1. Jan 2025" },
];

const EVENTS = [
  { title: "Hunde-Adoptions-Tag Zürich", date: "15. März 2025", location: "Zürich", canton: "Zürich" },
  { title: "Hundemesse Bern", date: "22. April 2025", location: "Bern", canton: "Bern" },
  { title: "Welpenkurs Frühling", date: "1. Mai 2025", location: "Luzern", canton: "Luzern" },
];

export function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <h1 className="text-3xl font-extrabold text-foreground mb-2">Blog</h1>
        <p className="text-muted-foreground mb-6">Ratgeber rund um Hundekauf, Haltung und Erziehung</p>
        <div className="grid sm:grid-cols-2 gap-6">
          {BLOG_POSTS.map(post => (
            <div key={post.slug} className="bg-card rounded-2xl p-6 shadow-card hover:shadow-hover transition-shadow">
              <Badge variant="secondary" className="bg-muted mb-3">{post.category}</Badge>
              <h2 className="font-bold text-foreground mb-2">{post.title}</h2>
              <p className="text-sm text-muted-foreground mb-3">{post.excerpt}</p>
              <span className="text-xs text-muted-foreground">{post.date}</span>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function Events() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">
        <h1 className="text-3xl font-extrabold text-foreground mb-2">Events</h1>
        <p className="text-muted-foreground mb-6">Hundemessen, Adoptions-Events und Workshops</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {EVENTS.map(event => (
            <div key={event.title} className="bg-card rounded-2xl p-6 shadow-card">
              <h2 className="font-bold text-foreground mb-2">{event.title}</h2>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                <Calendar className="w-3.5 h-3.5" /> {event.date}
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" /> {event.location}, {event.canton}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
