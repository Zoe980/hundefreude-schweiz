import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { BREED_NAMES } from "@/data/breeds";
import { CANTONS } from "@/data/cantons";
import { PROVIDERS } from "@/data/providers";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, CheckCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  firstName: z.string().min(2, "Mindestens 2 Zeichen").max(50),
  lastName: z.string().min(2, "Mindestens 2 Zeichen").max(50),
  email: z.string().email("Gültige E-Mail eingeben").max(255),
  phone: z.string().min(10, "Gültige Telefonnummer").max(20),
  plz: z.string().min(4, "Gültige PLZ").max(6),
  canton: z.string().min(1, "Kanton wählen"),
  breed: z.string().min(1, "Rasse wählen"),
  preference: z.string().min(1, "Bitte wählen"),
  timeframe: z.string().min(1, "Bitte wählen"),
  experience: z.string().min(1, "Bitte wählen"),
  living: z.string().min(1, "Bitte wählen"),
  garden: z.string().min(1, "Bitte wählen"),
  kids: z.string().min(1, "Bitte wählen"),
  message: z.string().max(1000).optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "Zustimmung erforderlich" }) }),
});

type FormData = z.infer<typeof formSchema>;

export default function Anfrage() {
  const [searchParams] = useSearchParams();
  const preselectedBreed = searchParams.get("rasse") || "";
  const preselectedProvider = searchParams.get("anbieter") || "";
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "", lastName: "", email: "", phone: "", plz: "",
      canton: "", breed: preselectedBreed, preference: "", timeframe: "",
      experience: "", living: "", garden: "", kids: "", message: "",
      consent: undefined as any,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Lead submitted:", { ...data, source: preselectedProvider ? "provider" : "breed_form" });
    setSubmitted(true);
    toast({ title: "Anfrage gesendet!", description: "Wir melden uns bald bei dir." });
  };

  const matchedProviders = PROVIDERS.filter(p => p.sponsored || p.verified).slice(0, 3);

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-16 max-w-2xl mx-auto text-center">
          <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
          <h1 className="text-3xl font-extrabold text-foreground mb-3">Vielen Dank!</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Deine Anfrage wurde erfolgreich gesendet. Wir leiten sie an passende Anbieter weiter und melden uns in Kürze.
          </p>
          {matchedProviders.length > 0 && (
            <div>
              <h2 className="font-bold text-foreground mb-4">Passende Anbieter für dich</h2>
              <div className="grid gap-4">
                {matchedProviders.map(p => (
                  <Link key={p.id} to={`/anbieter/${p.slug}`} className="block bg-card rounded-2xl p-5 shadow-card text-left hover:shadow-hover transition-all">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-foreground">{p.name}</span>
                      {p.sponsored && <Badge variant="secondary" className="bg-vanilla text-vanilla-foreground text-xs">Gesponsert</Badge>}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" /> {p.city}, {p.canton}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          <Link to="/" className="inline-block mt-8">
            <Button variant="outline" className="rounded-xl">Zurück zur Startseite</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8 max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold text-foreground mb-2">
          <Heart className="inline w-7 h-7 mr-2 text-primary" />
          Anfrage senden
        </h1>
        <p className="text-muted-foreground mb-6">
          Fülle das Formular aus und wir verbinden dich mit passenden Anbietern in deiner Region.
          {preselectedProvider && <span className="block text-primary font-medium mt-1">Anfrage an: {preselectedProvider}</span>}
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="bg-card rounded-2xl p-6 shadow-card space-y-4">
              <h2 className="font-bold text-foreground">Persönliche Daten</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField control={form.control} name="firstName" render={({ field }) => (
                  <FormItem><FormLabel>Vorname *</FormLabel><FormControl><Input {...field} className="rounded-xl" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="lastName" render={({ field }) => (
                  <FormItem><FormLabel>Nachname *</FormLabel><FormControl><Input {...field} className="rounded-xl" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem><FormLabel>E-Mail *</FormLabel><FormControl><Input type="email" {...field} className="rounded-xl" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem><FormLabel>Telefon *</FormLabel><FormControl><Input {...field} className="rounded-xl" placeholder="+41 ..." /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="plz" render={({ field }) => (
                  <FormItem><FormLabel>PLZ / Ort *</FormLabel><FormControl><Input {...field} className="rounded-xl" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="canton" render={({ field }) => (
                  <FormItem><FormLabel>Kanton *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl><SelectTrigger className="rounded-xl"><SelectValue placeholder="Kanton wählen" /></SelectTrigger></FormControl>
                      <SelectContent>{CANTONS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                    </Select><FormMessage />
                  </FormItem>
                )} />
              </div>
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-card space-y-4">
              <h2 className="font-bold text-foreground">Was suchst du?</h2>
              <FormField control={form.control} name="breed" render={({ field }) => (
                <FormItem><FormLabel>Gesuchte Rasse *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger className="rounded-xl"><SelectValue placeholder="Rasse wählen" /></SelectTrigger></FormControl>
                    <SelectContent>{BREED_NAMES.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
                  </Select><FormMessage />
                </FormItem>
              )} />
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField control={form.control} name="preference" render={({ field }) => (
                  <FormItem><FormLabel>Bevorzugt *</FormLabel>
                    <Select onValueChange={field.onChange}><FormControl><SelectTrigger className="rounded-xl"><SelectValue placeholder="Wählen" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="tierheim">Tierheim</SelectItem>
                        <SelectItem value="zuechter">Züchter</SelectItem>
                        <SelectItem value="egal">Egal</SelectItem>
                      </SelectContent>
                    </Select><FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="timeframe" render={({ field }) => (
                  <FormItem><FormLabel>Zeitrahmen *</FormLabel>
                    <Select onValueChange={field.onChange}><FormControl><SelectTrigger className="rounded-xl"><SelectValue placeholder="Wählen" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="sofort">Sofort</SelectItem>
                        <SelectItem value="1-3">1–3 Monate</SelectItem>
                        <SelectItem value="3-6">3–6 Monate</SelectItem>
                        <SelectItem value="spaeter">Später</SelectItem>
                      </SelectContent>
                    </Select><FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="experience" render={({ field }) => (
                  <FormItem><FormLabel>Erfahrung *</FormLabel>
                    <Select onValueChange={field.onChange}><FormControl><SelectTrigger className="rounded-xl"><SelectValue placeholder="Wählen" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="anfaenger">Anfänger</SelectItem>
                        <SelectItem value="erfahren">Erfahren</SelectItem>
                      </SelectContent>
                    </Select><FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="living" render={({ field }) => (
                  <FormItem><FormLabel>Wohnsituation *</FormLabel>
                    <Select onValueChange={field.onChange}><FormControl><SelectTrigger className="rounded-xl"><SelectValue placeholder="Wählen" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="wohnung">Wohnung</SelectItem>
                        <SelectItem value="haus">Haus</SelectItem>
                      </SelectContent>
                    </Select><FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="garden" render={({ field }) => (
                  <FormItem><FormLabel>Garten *</FormLabel>
                    <Select onValueChange={field.onChange}><FormControl><SelectTrigger className="rounded-xl"><SelectValue placeholder="Wählen" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="ja">Ja</SelectItem>
                        <SelectItem value="nein">Nein</SelectItem>
                      </SelectContent>
                    </Select><FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="kids" render={({ field }) => (
                  <FormItem><FormLabel>Kinder im Haushalt *</FormLabel>
                    <Select onValueChange={field.onChange}><FormControl><SelectTrigger className="rounded-xl"><SelectValue placeholder="Wählen" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="ja">Ja</SelectItem>
                        <SelectItem value="nein">Nein</SelectItem>
                      </SelectContent>
                    </Select><FormMessage />
                  </FormItem>
                )} />
              </div>
              <FormField control={form.control} name="message" render={({ field }) => (
                <FormItem><FormLabel>Nachricht (optional)</FormLabel><FormControl><Textarea {...field} className="rounded-xl" rows={3} placeholder="Weitere Wünsche oder Fragen..." /></FormControl><FormMessage /></FormItem>
              )} />
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-card">
              <FormField control={form.control} name="consent" render={({ field }) => (
                <FormItem className="flex items-start gap-3">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} className="mt-1" />
                  </FormControl>
                  <div>
                    <FormLabel className="text-sm">
                      Ich stimme den <Link to="/datenschutz" className="text-primary underline">Datenschutzbestimmungen</Link> zu und bin damit einverstanden, dass meine Daten an passende Anbieter weitergeleitet werden. *
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )} />
            </div>

            <Button type="submit" size="lg" className="w-full rounded-xl bg-primary text-primary-foreground text-base">
              <Heart className="w-5 h-5 mr-2" /> Anfrage senden
            </Button>
          </form>
        </Form>
      </main>
      <Footer />
    </div>
  );
}
