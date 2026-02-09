export const CANTONS = [
  "Aargau", "Appenzell Ausserrhoden", "Appenzell Innerrhoden", "Basel-Landschaft",
  "Basel-Stadt", "Bern", "Freiburg", "Genf", "Glarus", "Graubünden",
  "Jura", "Luzern", "Neuenburg", "Nidwalden", "Obwalden", "Schaffhausen",
  "Schwyz", "Solothurn", "St. Gallen", "Thurgau", "Tessin", "Uri",
  "Waadt", "Wallis", "Zug", "Zürich"
] as const;

export type Canton = typeof CANTONS[number];
