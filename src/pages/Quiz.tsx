import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { QUIZ_QUESTIONS, QuizAnswers } from "@/data/quiz";
import { BREEDS } from "@/data/breeds";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import InsuranceCrossSell from "@/components/crosssell/InsuranceCrossSell";
import TrainingCrossSell from "@/components/crosssell/TrainingCrossSell";
import StarterGuide from "@/components/crosssell/StarterGuide";

function scoreBreeds(answers: QuizAnswers) {
  const scores: { breed: typeof BREEDS[0]; score: number }[] = [];
  for (const breed of BREEDS) {
    let score = 0;
    if (answers.activity === 'low' && breed.energy === 'niedrig') score += 3;
    else if (answers.activity === 'medium' && breed.energy === 'mittel') score += 3;
    else if (answers.activity === 'high' && breed.energy === 'hoch') score += 3;
    else if (answers.activity === 'low' && breed.energy === 'mittel') score += 1;
    else if (answers.activity === 'high' && breed.energy === 'mittel') score += 1;

    if (answers.living === 'apartment' && breed.apartmentOk) score += 3;
    else if (answers.living === 'apartment' && !breed.apartmentOk) score -= 2;
    else if (answers.living === 'house') score += 2;

    if (answers.experience === 'beginner' && breed.beginnerFriendly) score += 3;
    else if (answers.experience === 'beginner' && !breed.beginnerFriendly) score -= 2;

    if ((answers.kids === 'young_kids' || answers.kids === 'older_kids') && breed.goodWithKids) score += 3;
    else if ((answers.kids === 'young_kids') && !breed.goodWithKids) score -= 3;

    if (answers.size === breed.size) score += 3;

    if (answers.grooming === 'low' && breed.grooming === 'niedrig') score += 2;
    else if (answers.grooming === 'low' && breed.grooming === 'hoch') score -= 2;

    if (breed.familyFriendly) score += 1;
    scores.push({ breed, score });
  }
  return scores.sort((a, b) => b.score - a.score);
}

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [showResults, setShowResults] = useState(false);

  const currentQ = QUIZ_QUESTIONS[step];
  const progress = ((step + 1) / QUIZ_QUESTIONS.length) * 100;

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQ.id]: value };
    setAnswers(newAnswers);
    if (step < QUIZ_QUESTIONS.length - 1) {
      setTimeout(() => setStep(step + 1), 300);
    } else {
      setShowResults(true);
    }
  };

  const results = showResults ? scoreBreeds(answers).slice(0, 3) : [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8 max-w-2xl mx-auto">
        {!showResults ? (
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="text-center mb-8">
              <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
              <h1 className="text-2xl font-extrabold text-foreground mb-2">Welche Rasse passt zu dir?</h1>
              <p className="text-muted-foreground text-sm">Frage {step + 1} von {QUIZ_QUESTIONS.length}</p>
              <Progress value={progress} className="mt-4 h-2" />
            </div>

            <div className="bg-card rounded-2xl p-6 shadow-card">
              <h2 className="text-xl font-bold text-foreground mb-6 text-center">
                {currentQ.emoji} {currentQ.question}
              </h2>
              <div className="space-y-3">
                {currentQ.options.map(opt => (
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
        ) : (
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
                    <Link to={`/anfrage?rasse=${encodeURIComponent(r.breed.name)}`}>
                      <Button size="sm" className="rounded-xl bg-primary text-primary-foreground">
                        Anfrage senden
                      </Button>
                    </Link>
                    <Link to={`/rasse/${r.breed.slug}`}>
                      <Button size="sm" variant="outline" className="rounded-xl">Mehr erfahren</Button>
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
              <Button variant="ghost" onClick={() => { setStep(0); setAnswers({}); setShowResults(false); }}>
                Quiz wiederholen
              </Button>
            </div>
          </motion.div>
        )}
      </main>
      <Footer />
    </div>
  );
}
