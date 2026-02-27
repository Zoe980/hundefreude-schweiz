import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Mail, Lock, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { QUIZ_QUESTIONS, QuizAnswers } from "@/data/quiz";
import { BREEDS } from "@/data/breeds";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import InsuranceCrossSell from "@/components/crosssell/InsuranceCrossSell";
import TrainingCrossSell from "@/components/crosssell/TrainingCrossSell";
import StarterGuide from "@/components/crosssell/StarterGuide";
import { sendLeadToCRM } from "@/lib/crm";

type QuizPhase = "questions" | "email_gate" | "results";

const PHASE_LABELS = ["Fragen", "E-Mail", "Ergebnis"];

function scoreBreeds(answers: QuizAnswers) {
  const scores: { breed: typeof BREEDS[0]; score: number }[] = [];
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

function PhaseIndicator({ phase }: { phase: QuizPhase }) {
  const phaseIndex = phase === "questions" ? 0 : phase === "email_gate" ? 1 : 2;
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      {PHASE_LABELS.map((label, i) => (
        <div key={label} className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                i < phaseIndex
                  ? "bg-primary text-primary-foreground"
                  : i === phaseIndex
                  ? "bg-primary text-primary-foreground ring-2 ring-primary/30 ring-offset-2 ring-offset-background"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {i < phaseIndex ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
            </div>
            <span className={`text-xs mt-1 ${i <= phaseIndex ? "text-foreground font-medium" : "text-muted-foreground"}`}>
              {label}
            </span>
          </div>
          {i < PHASE_LABELS.length - 1 && (
            <div className={`w-8 h-0.5 mb-5 ${i < phaseIndex ? "bg-primary" : "bg-muted"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [phase, setPhase] = useState<QuizPhase>("questions");

  // Email gate state
  const [email, setEmail] = useState("");
  const [optIn, setOptIn] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQ = QUIZ_QUESTIONS[step];
  const questionProgress = ((step + 1) / QUIZ_QUESTIONS.length) * 100;

  const emailValid = EMAIL_REGEX.test(email.trim());
  const formValid = emailValid && optIn;

  const emailError = (emailTouched || submitAttempted) && !emailValid && email.length > 0
    ? "Bitte gib eine gültige E-Mail-Adresse ein."
    : submitAttempted && email.length === 0
    ? "E-Mail ist erforderlich."
    : null;

  const optInError = submitAttempted && !optIn
    ? "Bitte stimme den Datenschutzbestimmungen zu."
    : null;

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQ.id]: value };
    setAnswers(newAnswers);
    if (step < QUIZ_QUESTIONS.length - 1) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      setPhase("email_gate");
    }
  };

  const handleEmailSubmit = async () => {
    setSubmitAttempted(true);
    if (!formValid) return;

    setIsSubmitting(true);

    const ranked = scoreBreeds(answers);
    const topBreed = ranked[0]?.breed.name ?? "Unbekannt";

    await sendLeadToCRM({
      email: email.trim(),
      opt_in: true,
      quiz_answers: answers,
      recommended_breed: topBreed,
      timestamp: new Date().toISOString(),
      page_url: window.location.href,
    });

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1500));

    setIsSubmitting(false);
    setPhase("results");
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setPhase("questions");
    setEmail("");
    setOptIn(false);
    setEmailTouched(false);
    setSubmitAttempted(false);
  };

  // Results are only computed when phase === "results"
  const results = phase === "results" ? scoreBreeds(answers).slice(0, 3) : null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8 max-w-2xl mx-auto">
        <PhaseIndicator phase={phase} />

        {/* STEP 1: Quiz Questions */}
        {phase === "questions" && (
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="text-center mb-8">
              <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
              <h1 className="text-2xl font-extrabold text-foreground mb-2">Welche Rasse passt zu dir?</h1>
              <p className="text-muted-foreground text-sm">Frage {step + 1} von {QUIZ_QUESTIONS.length}</p>
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

        {/* STEP 2: Email Gate */}
        {phase === "email_gate" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-card rounded-2xl p-8 shadow-card max-w-md mx-auto">
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl font-extrabold text-foreground mb-2">Ergebnis freischalten</h2>
                <p className="text-muted-foreground text-sm">
                  Gib deine E-Mail ein, damit wir dir das Ergebnis und hilfreiche Tipps senden können.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="deine@email.ch"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => setEmailTouched(true)}
                      className={`pl-10 ${emailError ? "border-destructive focus-visible:ring-destructive" : ""}`}
                      disabled={isSubmitting}
                    />
                  </div>
                  {emailError && <p className="text-sm text-destructive mt-1">{emailError}</p>}
                </div>

                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <Checkbox
                      checked={optIn}
                      onCheckedChange={(checked) => setOptIn(checked === true)}
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

                <Button
                  onClick={handleEmailSubmit}
                  disabled={isSubmitting}
                  className="w-full rounded-xl"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Wird geladen…
                    </>
                  ) : (
                    "Ergebnis anzeigen"
                  )}
                </Button>
              </div>

              <Button
                variant="ghost"
                onClick={() => { setPhase("questions"); setStep(QUIZ_QUESTIONS.length - 1); }}
                className="mt-4 w-full"
                disabled={isSubmitting}
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Zurück zu den Fragen
              </Button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: Results (only rendered after email gate success) */}
        {phase === "results" && results && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center mb-8">
              <span className="text-5xl block mb-4">🎉</span>
              <h1 className="text-2xl font-extrabold text-foreground mb-2">Deine Ergebnisse</h1>
              <p className="text-muted-foreground">Basierend auf deinen Antworten passen diese Rassen am besten zu dir</p>
            </div>

            <div className="space-y-4">
              {results.map((r, i) => (
                <div key={r.breed.id} className={`bg-card rounded-2xl p-6 shadow-card ${i === 0 ? "ring-2 ring-primary" : ""}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {i === 0 && <Badge className="bg-primary text-primary-foreground">Beste Übereinstimmung</Badge>}
                    <Badge variant="secondary" className="capitalize">{r.breed.size}</Badge>
                  </div>
                  <h2 className="text-xl font-bold text-foreground mb-1">{r.breed.emoji} {r.breed.name}</h2>
                  <p className="text-muted-foreground mb-4">{r.breed.shortDescription}</p>
                  <p className="text-sm text-muted-foreground mb-4">{r.breed.character}</p>
                  <div className="flex gap-2 flex-wrap">
                    <Link to={`/rasse/${r.breed.slug}`}>
                      <Button size="sm" className="rounded-xl bg-primary text-primary-foreground">
                        Mehr über diese Rasse
                      </Button>
                    </Link>
                    <Link to={`/anfrage?rasse=${encodeURIComponent(r.breed.name)}`}>
                      <Button size="sm" variant="outline" className="rounded-xl">Anfrage senden</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 space-y-8">
              <StarterGuide />
              <InsuranceCrossSell />
              <TrainingCrossSell />
            </div>

            <div className="text-center mt-6">
              <Button variant="ghost" onClick={handleRestart}>
                Neue Empfehlung starten
              </Button>
            </div>
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
}
