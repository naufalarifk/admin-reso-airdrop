export interface Language {
  nativeName: string;
  abbr: string;
  displayAbbr: string;
}

export const langs: Language[] = [
  {
    nativeName: "English",
    abbr: "en",
    displayAbbr: "EN",
  },
  {
    nativeName: "Indonesia",
    abbr: "id",
    displayAbbr: "id",
  },
  {
    nativeName: "日本語",
    abbr: "ja",
    displayAbbr: "JA",
  },
  {
    nativeName: "Español",
    abbr: "es",
    displayAbbr: "ES",
  },
  {
    nativeName: "한국어",
    abbr: "ko",
    displayAbbr: "KO",
  },
  {
    nativeName: "中文",
    abbr: "zh",
    displayAbbr: "ZH",
  },
  {
    nativeName: "Русский",
    abbr: "ru",
    displayAbbr: "RU",
  },
  {
    nativeName: "Français",
    abbr: "fr",
    displayAbbr: "FR",
  },
  {
    nativeName: "Deutsch",
    abbr: "de",
    displayAbbr: "DE",
  },
];
