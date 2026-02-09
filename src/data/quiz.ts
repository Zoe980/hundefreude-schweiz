export interface QuizQuestion {
  id: string;
  question: string;
  emoji: string;
  options: { label: string; value: string; emoji: string }[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "activity",
    question: "Wie aktiv bist du im Alltag?",
    emoji: "🏃",
    options: [
      { label: "Eher gemütlich – kurze Spaziergänge reichen mir", value: "low", emoji: "🛋️" },
      { label: "Durchschnittlich – tägliche Spaziergänge", value: "medium", emoji: "🚶" },
      { label: "Sehr aktiv – Joggen, Wandern, Sport", value: "high", emoji: "🏔️" },
    ],
  },
  {
    id: "living",
    question: "Wie wohnst du?",
    emoji: "🏠",
    options: [
      { label: "Wohnung ohne Garten", value: "apartment", emoji: "🏢" },
      { label: "Wohnung mit Garten", value: "apartment_garden", emoji: "🌿" },
      { label: "Haus mit Garten", value: "house", emoji: "🏡" },
    ],
  },
  {
    id: "experience",
    question: "Hast du Erfahrung mit Hunden?",
    emoji: "📚",
    options: [
      { label: "Nein, Erstbesitzer", value: "beginner", emoji: "🆕" },
      { label: "Etwas Erfahrung", value: "some", emoji: "📖" },
      { label: "Ja, erfahren", value: "experienced", emoji: "🎓" },
    ],
  },
  {
    id: "kids",
    question: "Hast du Kinder im Haushalt?",
    emoji: "👶",
    options: [
      { label: "Ja, kleine Kinder (unter 6)", value: "young_kids", emoji: "🧒" },
      { label: "Ja, ältere Kinder", value: "older_kids", emoji: "👦" },
      { label: "Nein", value: "no_kids", emoji: "🚫" },
    ],
  },
  {
    id: "size",
    question: "Welche Grösse bevorzugst du?",
    emoji: "📏",
    options: [
      { label: "Klein (bis 10 kg)", value: "klein", emoji: "🐕" },
      { label: "Mittel (10–25 kg)", value: "mittel", emoji: "🐕‍🦺" },
      { label: "Gross (über 25 kg)", value: "gross", emoji: "🦮" },
    ],
  },
  {
    id: "grooming",
    question: "Wie viel Fellpflege ist dir recht?",
    emoji: "✂️",
    options: [
      { label: "So wenig wie möglich", value: "low", emoji: "😊" },
      { label: "Ab und zu Bürsten ist OK", value: "medium", emoji: "🪮" },
      { label: "Kein Problem, ich pflege gerne", value: "high", emoji: "💅" },
    ],
  },
  {
    id: "alone_time",
    question: "Wie lange ist der Hund täglich allein?",
    emoji: "⏰",
    options: [
      { label: "Fast nie – Homeoffice/zu Hause", value: "rarely", emoji: "🏠" },
      { label: "2–4 Stunden", value: "medium", emoji: "⏳" },
      { label: "4–8 Stunden", value: "long", emoji: "🕐" },
    ],
  },
];

export interface QuizAnswers {
  [key: string]: string;
}

export function scoreBreeds(answers: QuizAnswers) {
  const { BREEDS } = require('./breeds');
  const scores: { breedId: string; score: number }[] = [];

  for (const breed of BREEDS) {
    let score = 0;

    // Activity match
    if (answers.activity === 'low' && breed.energy === 'niedrig') score += 3;
    else if (answers.activity === 'low' && breed.energy === 'mittel') score += 1;
    else if (answers.activity === 'medium' && breed.energy === 'mittel') score += 3;
    else if (answers.activity === 'medium' && breed.energy === 'niedrig') score += 1;
    else if (answers.activity === 'medium' && breed.energy === 'hoch') score += 1;
    else if (answers.activity === 'high' && breed.energy === 'hoch') score += 3;
    else if (answers.activity === 'high' && breed.energy === 'mittel') score += 1;

    // Living situation
    if (answers.living === 'apartment' && breed.apartmentOk) score += 3;
    else if (answers.living === 'apartment' && !breed.apartmentOk) score -= 2;
    else if (answers.living === 'house') score += 2;
    else if (answers.living === 'apartment_garden') score += 1;

    // Experience
    if (answers.experience === 'beginner' && breed.beginnerFriendly) score += 3;
    else if (answers.experience === 'beginner' && !breed.beginnerFriendly) score -= 2;
    else if (answers.experience === 'experienced') score += 1;

    // Kids
    if ((answers.kids === 'young_kids' || answers.kids === 'older_kids') && breed.goodWithKids) score += 3;
    else if ((answers.kids === 'young_kids' || answers.kids === 'older_kids') && !breed.goodWithKids) score -= 3;

    // Size
    if (answers.size === breed.size) score += 3;

    // Grooming
    if (answers.grooming === 'low' && breed.grooming === 'niedrig') score += 2;
    else if (answers.grooming === 'low' && breed.grooming === 'hoch') score -= 2;
    else if (answers.grooming === 'high' && breed.grooming === 'hoch') score += 1;
    else if (answers.grooming === 'medium') score += 1;

    // Family friendly bonus
    if (breed.familyFriendly) score += 1;

    scores.push({ breedId: breed.id, score });
  }

  return scores.sort((a, b) => b.score - a.score);
}
