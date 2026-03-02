import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Mail, CheckCircle2, Loader2, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { QUIZ_QUESTIONS, QuizAnswers } from "@/data/quiz";
import { BREEDS } from "@/data/breeds";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import InsuranceCrossSell from "@/components/crosssell/InsuranceCrossSell";
import TrainingCrossSell from "@/components/crosssell/TrainingCrossSell";
import StarterGuide from "@/components/crosssell/StarterGuide";
import { sendLeadToCRM } from "@/lib/crm";

/* ── Scoring ─────────────────────────────────────────────── */

function scoreBreeds(answers: QuizAnswers) {
  const scores: { breed: (typeof BREEDS)[0]; score: number }[] = [];
  for (const breed of BREEDS) {
    let score = 0;
    if (answers.activity === "low" && breed.energy === "niedrig") score += 3;
    else if (answers.activity === "medium" && breed.energy === "mittel") score += 3;
    else if (answers.activity === "high" && breed.energy === "hoch") score += 3;
    else if (answers.activity === "low" && breed.energy === "mittel") score += 1;
    else if (answers.activity === "high" && breed.energy === "mittel") score += 1;

    if (answers.living === "apartment" && breed.apartmentOk) score += 3;
    else if (answers.living === "apartment" && !breed.apartmentOk) score -= 2;
    else if (answers.living === "house") score += 2;

    if (answers.experience === "beginner" && breed.beginnerFriendly) score += 3;
    else if (answers.experience === "beginner" && !breed.beginnerFriendly) score -= 2;

    if ((answers.kids === "young_kids" || answers.kids === "older_kids") && breed.goodWithKids) score += 3;
    else if (answers.kids === "young_kids" && !breed.goodWithKids) score -= 3;

    if (answers.size === breed.size) score += 3;

    if (answers.grooming === "low" && breed.grooming === "niedrig") score += 2;
    else if (answers.grooming === "low" && breed.grooming === "hoch") score -= 2;

    if (breed.familyFriendly) score += 1;
    scores.push({ breed, score });
  }
  return scores.sort((a, b) => b.score - a.score);
}

/* ── Interest tags from quiz answers ─────────────────────── */

function buildInterestTags(
  breed: (typeof BREEDS)[0],
  answers: QuizAnswers
) {
  const tags: { label: string; defaultChecked: boolean }[] = [
    { label: `Empfehlung: ${breed.name}`, defaultChecked: true },
    { label: `Grösse: ${breed.size}`, defaultChecked: true },
  ];

  const activityMap: Record<string, string> = { low: "niedrig", medium: "mittel", high: "hoch" };
  if (answers.activity) {
    tags.push({ label: `Aktivität: ${activityMap[answers.activity] ?? answers.activity}`, defaultChecked: true });
  }

  if (breed.beginnerFriendly) {
    tags.push({ label: "Anfängerfreundlich", defaultChecked: true });
  } else {
    tags.push({ label: "Für Erfahrene", defaultChecked: true });
  }

  return tags;
}

/* ── Bullet-point reasoning ──────────────────────────────── */

function buildReasoning(breed: (typeof BREEDS)[0], answers: QuizAnswers): string[] {
  const points: string[] = [];

  const activityLabels: Record<string, string> = { low: "gemütlich", medium: "durchschnittlich aktiv", high: "sehr aktiv" };
  const energyMatch = (answers.activity === "low" && breed.energy === "niedrig") ||
    (answers.activity === "medium" && breed.energy === "mittel") ||
    (answers.activity === "high" && breed.energy === "hoch");
  if (energyMatch) points.push(`Passt zu deinem ${activityLabels[answers.activity] ?? ""} Lebensstil`);

  if (answers.size === breed.size) points.push(`Entspricht deiner Grössenpräferenz (${breed.size})`);
  if (breed.goodWithKids && (answers.kids === "young_kids" || answers.kids === "older_kids")) points.push("Kinderfreundlich – ideal für Familien");
  if (breed.beginnerFriendly && answers.experience === "beginner") points.push("Anfängerfreundlich – perfekt für Erstbesitzer");
  if (breed.apartmentOk && answers.living === "apartment") points.push("Wohnungstauglich – auch ohne Garten geeignet");

  if (points.length < 2) points.push(breed.shortDescription);
  return points.slice(0, 4);
}

/* ── Email regex ─────────────────────────────────────────── */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ── Newsletter Block Component ──────────────────────────── */

function NewsletterBlock({
  breedName,
  tags,
  activeTags,
  onToggleTag,
  email,
  onEmailChange,
  optIn,
  onOptInChange,
  onSubmit,
  isSubmitting,
  isSuccess,
}: {
  breedName: string;
  tags: { label: string; defaultChecked: boolean }[];
  activeTags: Set<string>;
  onToggleTag: (label: string) => void;
  email: string;
  onEmailChange: (v: string) => void;
  optIn: boolean;
  onOptInChange: (v: boolean) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  isSuccess: boolean;
}) {
  const [emailTouched, setEmailTouched] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const emailValid = EMAIL_REGEX.test(email.trim());
  const formValid = emailValid && optIn;

  const emailError =
    (emailTouched || submitAttempted) && !emailValid && email.length > 0
      ? "Bitte gib eine gültige E-Mail-Adresse ein."
      : submitAttempted && email.length === 0
        ? "E-Mail ist erforderlich."
        : null;

  const optInError = submitAttempted && !optIn ? "Bitte stimme den Datenschutzbestimmungen zu." : null;

  const handleSubmit = () => {
    setSubmitAttempted(true);
    if (!formValid) return;
    onSubmit();
  };

  if (isSuccess) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/10 border border-primary/20">
        <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
        <p className="text-sm font-medium text-foreground">
          Danke! Du erhältst ab jetzt Tipps speziell zu <strong>{breedName}</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Mail className="w-5 h-5 text-primary" />
          Tipps &amp; Updates für {breedName}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Erhalte passende Tipps zur Haltung, Erziehung und Gesundheit von {breedName} – plus
          Hinweise zu seriösem Hundekauf in der Schweiz.
        </p>
      </div>

      {/* Interest tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const active = activeTags.has(tag.label);
          return (
            <button
              key={tag.label}
              type="button"
              onClick={() => onToggleTag(tag.label)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${active
                  ? "bg-primary/10 border-primary/30 text-primary"
                  : "bg-muted/50 border-border text-muted-foreground"
                }`}
            >
              <Tag className="w-3 h-3" />
              {tag.label}
            </button>
          );
        })}
      </div>

      {/* Email field */}
      <div>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="email"
            placeholder="deine@email.ch"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            onBlur={() => setEmailTouched(true)}
            className={`pl-10 ${emailError ? "border-destructive focus-visible:ring-destructive" : ""}`}
            disabled={isSubmitting}
          />
        </div>
        {emailError && <p className="text-sm text-destructive mt-1">{emailError}</p>}
      </div>

      {/* Opt-in */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <Checkbox
            checked={optIn}
            onCheckedChange={(c) => onOptInChange(c === true)}
            disabled={isSubmitting}
            className="mt-0.5"
          />
          <span className="text-sm text-muted-foreground leading-snug">
            Ich stimme zu, dass meine Daten gemäss{" "}
            <Link to="/datenschutz" className="text-primary underline hover:text-primary/80">
              Datenschutz
            </Link>{" "}
            verarbeitet werden und ich per E-Mail kontaktiert werden darf.
          </span>
        </label>
        {optInError && <p className="text-sm text-destructive mt-1">{optInError}</p>}
      </div>

      <Button onClick={handleSubmit} disabled={isSubmitting} className="w-full rounded-xl" size="lg">
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Wird gesendet…
          </>
        ) : (
          "Abonnieren & Tipps erhalten"
        )}
      </Button>
    </div>
  );
}

/* ── Main Quiz Page ──────────────────────────────────────── */

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [showResults, setShowResults] = useState(false);

  // Newsletter state
  const [email, setEmail] = useState("");
  const [optIn, setOptIn] = useState(false);
  const [nlSubmitting, setNlSubmitting] = useState(false);
  const [nlSuccess, setNlSuccess] = useState(false);
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());
  const [tagsInitialized, setTagsInitialized] = useState(false);

  const currentQ = QUIZ_QUESTIONS[step];
  const questionProgress = ((step + 1) / QUIZ_QUESTIONS.length) * 100;

  // Compute results
  const results = useMemo(() => (showResults ? scoreBreeds(answers).slice(0, 3) : null), [showResults, answers]);
  const topBreed = results?.[0]?.breed;

  // Build tags once
  const tags = useMemo(() => {
    if (!topBreed) return [];
    return buildInterestTags(topBreed, answers);
  }, [topBreed, answers]);

  // Initialize active tags when results appear
  if (tags.length > 0 && !tagsInitialized) {
    const initial = new Set(tags.filter((t) => t.defaultChecked).map((t) => t.label));
    setActiveTags(initial);
    setTagsInitialized(true);
  }

  const reasoning = useMemo(() => {
    if (!topBreed) return [];
    return buildReasoning(topBreed, answers);
  }, [topBreed, answers]);

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQ.id]: value };
    setAnswers(newAnswers);
    if (step < QUIZ_QUESTIONS.length - 1) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      setTimeout(() => setShowResults(true), 300);
    }
  };

  const handleNewsletterSubmit = async () => {
    if (!topBreed) return;
    setNlSubmitting(true);

    await sendLeadToCRM({
      email: email.trim(),
      opt_in: true,
      recommended_breed: topBreed.name,
      interest_tags: Array.from(activeTags),
      quiz_answers: answers,
      timestamp: new Date().toISOString(),
      page_url: window.location.href,
    });

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1000));
    setNlSubmitting(false);
    setNlSuccess(true);
  };

  const handleToggleTag = (label: string) => {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setShowResults(false);
    setEmail("");
    setOptIn(false);
    setNlSubmitting(false);
    setNlSuccess(false);
    setActiveTags(new Set());
    setTagsInitialized(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8 max-w-2xl mx-auto">
        {/* ── Quiz Questions ──────────────────────────────── */}
        {!showResults && (
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="text-center mb-8">
              <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
              <h1 className="text-2xl font-extrabold text-foreground mb-2">Welche Rasse passt zu dir?</h1>
              <p className="text-muted-foreground text-sm">
                Frage {step + 1} von {QUIZ_QUESTIONS.length}
              </p>
              <Progress value={questionProgress} className="mt-4 h-2" />
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-card">
              <h2 className="text-xl font-bold text-foreground mb-6 text-center">
                {currentQ.emoji} {currentQ.question}
              </h2>
              <div className="space-y-3">
                {currentQ.options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleAnswer(opt.value)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all hover:border-primary hover:bg-primary/5 ${
                      answers[currentQ.id] === opt.value ? "border-primary bg-primary/10" : "border-border"
                    }`}
                  >
                    <span className="text-lg mr-3">{opt.emoji}</span>
                    <span className="font-medium text-foreground">{opt.label}</span>
                  </button>
                ))}
              </div>

              {step > 0 && (
                <Button variant="ghost" onClick={() => setStep(step - 1)} className="mt-4">
                  <ArrowLeft className="w-4 h-4 mr-1" /> Zurück
                </Button>
              )}
            </div>
          </motion.div>
        )}

        {/* ── Results ─────────────────────────────────────── */}
        {showResults && results && topBreed && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center mb-8">
              <span className="text-5xl block mb-4">🎉</span>
              <h1 className="text-2xl font-extrabold text-foreground mb-2">Deine Ergebnisse</h1>
              <p className="text-muted-foreground">Basierend auf deinen Antworten passen diese Rassen am besten zu dir</p>
            </div>

            {/* Central result card with newsletter + result */}
            <div className="bg-card rounded-2xl shadow-card overflow-hidden ring-2 ring-primary">
              {/* Newsletter block */}
              <div className="p-6 border-b border-border bg-primary/[0.03]">
                <NewsletterBlock
                  breedName={topBreed.name}
                  tags={tags}
                  activeTags={activeTags}
                  onToggleTag={handleToggleTag}
                  email={email}
                  onEmailChange={setEmail}
                  optIn={optIn}
                  onOptInChange={setOptIn}
                  onSubmit={handleNewsletterSubmit}
                  isSubmitting={nlSubmitting}
                  isSuccess={nlSuccess}
                />
              </div>

              {/* Result block */}
              <div className="p-6">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Dein Ergebnis</h2>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-primary text-primary-foreground">Beste Übereinstimmung</Badge>
                  <Badge variant="secondary" className="capitalize">{topBreed.size}</Badge>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {topBreed.emoji} {topBreed.name}
                </h3>
                <p className="text-muted-foreground mb-4">{topBreed.shortDescription}</p>

                {/* Reasoning bullets */}
                <ul className="space-y-1.5 mb-6">
                  {reasoning.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="flex gap-2 flex-wrap">
                  <Link to={`/rasse/${topBreed.slug}`}>
                    <Button size="sm" className="rounded-xl">Mehr über {topBreed.name}</Button>
                  </Link>
                  <Link to={`/anfrage?rasse=${encodeURIComponent(topBreed.name)}`}>
                    <Button size="sm" variant="outline" className="rounded-xl">Anfrage senden</Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Runner-up breeds */}
            {results.slice(1).map((r) => (
              <div key={r.breed.id} className="bg-card rounded-2xl p-6 shadow-card mt-4">
                <Badge variant="secondary" className="capitalize mb-2">{r.breed.size}</Badge>
                <h3 className="text-xl font-bold text-foreground mb-1">
                  {r.breed.emoji} {r.breed.name}
                </h3>
                <p className="text-muted-foreground mb-4">{r.breed.shortDescription}</p>
                <div className="flex gap-2 flex-wrap">
                  <Link to={`/rasse/${r.breed.slug}`}>
                    <Button size="sm" variant="outline" className="rounded-xl">Mehr über diese Rasse</Button>
                  </Link>
                </div>
              </div>
            ))}

            {/* Cross-sell */}
            <div className="mt-10 space-y-8">
              <StarterGuide />
              <InsuranceCrossSell />
              <TrainingCrossSell />
            </div>

            <div className="text-center mt-6">
              <Button variant="ghost" onClick={handleRestart}>Neue Empfehlung starten</Button>
            </div>
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
}
