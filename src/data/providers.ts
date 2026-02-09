export interface Provider {
  id: string;
  name: string;
  slug: string;
  type: 'zuechter' | 'tierheim' | 'hundeschule' | 'tierarzt' | 'pension' | 'grooming';
  typeLabel: string;
  canton: string;
  city: string;
  description: string;
  breeds: string[];
  sponsored: boolean;
  verified: boolean;
  planType: 'free' | 'plus' | 'premium';
  website?: string;
  phone?: string;
  email?: string;
}

export const PROVIDERS: Provider[] = [
  { id: "1", name: "Sennenhunde vom Emmental", slug: "sennenhunde-emmental", type: "zuechter", typeLabel: "Züchter", canton: "Bern", city: "Langnau i.E.", description: "Familiäre Zucht von Berner Sennenhunden seit über 20 Jahren. Alle Welpen wachsen im Familienverband auf.", breeds: ["Berner Sennenhund"], sponsored: true, verified: true, planType: "premium", phone: "+41 34 123 45 67", email: "info@sennenhunde-emmental.ch" },
  { id: "2", name: "Tierheim Zürich", slug: "tierheim-zuerich", type: "tierheim", typeLabel: "Tierheim", canton: "Zürich", city: "Zürich", description: "Das grösste Tierheim der Schweiz. Wir vermitteln Hunde aller Rassen und Mischlinge in liebevolle Hände.", breeds: ["Mischling"], sponsored: true, verified: true, planType: "plus", website: "https://tierheim-zuerich.ch", phone: "+41 44 123 45 67" },
  { id: "3", name: "Golden Paradise Kennel", slug: "golden-paradise-kennel", type: "zuechter", typeLabel: "Züchter", canton: "Luzern", city: "Sursee", description: "Spezialisierte Zucht von Golden Retrievern und Labrador Retrievern. VDH-zertifiziert.", breeds: ["Golden Retriever", "Labrador Retriever"], sponsored: false, verified: true, planType: "plus", email: "kontakt@golden-paradise.ch" },
  { id: "4", name: "Hundeschule Alpenpfote", slug: "hundeschule-alpenpfote", type: "hundeschule", typeLabel: "Hundeschule", canton: "St. Gallen", city: "St. Gallen", description: "Professionelle Hundeschule mit Welpenkursen, Grundgehorsam und Agility. Positive Verstärkung.", breeds: [], sponsored: true, verified: true, planType: "premium", website: "https://alpenpfote.ch" },
  { id: "5", name: "Tierschutz Bern", slug: "tierschutz-bern", type: "tierheim", typeLabel: "Tierheim", canton: "Bern", city: "Bern", description: "Wir geben Hunden aus schwierigen Verhältnissen ein neues Zuhause. Adoption statt Kauf.", breeds: ["Mischling"], sponsored: false, verified: true, planType: "free", phone: "+41 31 123 45 67" },
  { id: "6", name: "Pudel-Paradies Aargau", slug: "pudel-paradies-aargau", type: "zuechter", typeLabel: "Züchter", canton: "Aargau", city: "Aarau", description: "Liebevolle Zucht von Pudeln in allen Grössen. Gesundheitsgetestet.", breeds: ["Pudel", "Zwergpudel", "Toypudel"], sponsored: false, verified: false, planType: "free", email: "info@pudel-paradies.ch" },
  { id: "7", name: "Tierarztpraxis Dr. Müller", slug: "tierarztpraxis-mueller", type: "tierarzt", typeLabel: "Tierarzt", canton: "Zürich", city: "Winterthur", description: "Ihre Tierarztpraxis für Hunde und Katzen. Vorsorge, Chirurgie, Zahnmedizin.", breeds: [], sponsored: true, verified: true, planType: "plus", phone: "+41 52 123 45 67" },
  { id: "8", name: "Hundepension Alpenblick", slug: "hundepension-alpenblick", type: "pension", typeLabel: "Hundepension", canton: "Graubünden", city: "Chur", description: "Liebevolle Betreuung für Ihren Hund während der Ferien. Grosses Freigelände.", breeds: [], sponsored: false, verified: true, planType: "free", phone: "+41 81 123 45 67" },
];

export const PROVIDER_TYPE_LABELS: Record<Provider['type'], string> = {
  zuechter: 'Züchter',
  tierheim: 'Tierheim',
  hundeschule: 'Hundeschule',
  tierarzt: 'Tierarzt',
  pension: 'Hundepension',
  grooming: 'Hundesalon',
};
