export interface Language {
  nativeName: string;
  abbr: string;
  displayAbbr: string;
  icon: string;
}

export const langs: Language[] = [
  {
    nativeName: "English",
    abbr: "en",
    displayAbbr: "EN",
    icon: "/images/lang/en.png",
  },
  {
    nativeName: "Indonesia",
    abbr: "id",
    displayAbbr: "id",
    icon: "/images/lang/id.png",
  },
  {
    nativeName: "日本語",
    abbr: "ja",
    displayAbbr: "JA",
    icon: "/images/lang/jp.png",
  },
  {
    nativeName: "Español",
    abbr: "esp",
    displayAbbr: "ESP",
    icon: "/images/lang/esp.png",
  },
  {
    nativeName: "한국어",
    abbr: "ko",
    displayAbbr: "KO",
    icon: "/images/lang/kr.png",
  },
  {
    nativeName: "中文",
    abbr: "zh",
    displayAbbr: "ZH",
    icon: "/images/lang/cn.png",
  },
  // {
  //   nativeName: "Русский",
  //   abbr: "ru",
  //   displayAbbr: "RU",
  // },
  {
    nativeName: "Français",
    abbr: "fr",
    displayAbbr: "FR",
    icon: "/images/lang/fr.png",
  },
  {
    nativeName: "Brazil",
    abbr: "pt",
    displayAbbr: "PT",
    icon: "/images/lang/br.png",
  },
  {
    nativeName: "Italiano",
    abbr: "it",
    displayAbbr: "IT",
    icon: "/images/lang/it.png",
  },
];
