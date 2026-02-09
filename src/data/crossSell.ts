export interface CrossSellPartner {
  id: string;
  name: string;
  type: 'versicherung' | 'hundeschule' | 'zubehoer' | 'training';
  typeLabel: string;
  description: string;
  canton?: string;
  url: string;
  badge?: string;
  sponsored: boolean;
}

export const INSURANCE_PARTNERS: CrossSellPartner[] = [
  {
    id: "ins-1",
    name: "Animalia Hundeversicherung",
    type: "versicherung",
    typeLabel: "Krankenversicherung",
    description: "Rundum-Schutz für Ihren Hund: Tierarztkosten, Operationen & Vorsorge ab CHF 29/Monat.",
    url: "#",
    badge: "Beliebt",
    sponsored: true,
  },
  {
    id: "ins-2",
    name: "HelvetiaProtect Haftpflicht",
    type: "versicherung",
    typeLabel: "Haftpflichtversicherung",
    description: "Obligatorische Hundehaftpflicht für die Schweiz – schnell abgeschlossen, ab CHF 5/Monat.",
    url: "#",
    badge: "Pflicht in vielen Kantonen",
    sponsored: true,
  },
];

export const TRAINING_PARTNERS: CrossSellPartner[] = [
  {
    id: "train-1",
    name: "Hundeschule Alpenpfote",
    type: "hundeschule",
    typeLabel: "Hundeschule",
    description: "Welpenkurse, Grundgehorsam & Agility – positive Verstärkung in der ganzen Deutschschweiz.",
    canton: "St. Gallen",
    url: "#",
    sponsored: true,
  },
  {
    id: "train-2",
    name: "DogCoach Zürich",
    type: "training",
    typeLabel: "Hundetrainer",
    description: "Individuelles Training & Verhaltensberatung – online und vor Ort in der Region Zürich.",
    canton: "Zürich",
    url: "#",
    sponsored: true,
  },
  {
    id: "train-3",
    name: "WelpenStart Bern",
    type: "hundeschule",
    typeLabel: "Welpentraining",
    description: "Spezialisiert auf Welpenkurse: Sozialisierung, Grundkommandos & Stubenreinheit.",
    canton: "Bern",
    url: "#",
    sponsored: false,
  },
];

export const STARTER_GUIDE = {
  title: "Gratis Checkliste für neue Hundebesitzer",
  description: "Alles was du vor dem Hundekauf wissen musst – von der Erstausstattung bis zum ersten Tierarztbesuch.",
  items: [
    "Erstausstattung: Leine, Halsband, Napf, Körbchen",
    "Tierarzt: Erste Untersuchung & Impfplan",
    "Versicherung: Haftpflicht (obligatorisch) & Krankenversicherung",
    "Hundeschule: Welpenkurs buchen",
    "Futter: Altersgerechte Ernährung",
    "Registrierung: AMICUS Datenbank (Pflicht CH)",
    "Hundemarke & Mikrochip",
    "Notfallnummern: Tierarzt & Tierspital",
  ],
};
