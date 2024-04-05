import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ChainedBackend from "i18next-chained-backend";
import HttpBackend from "i18next-http-backend";
import LocalStorageBackend from "i18next-localstorage-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import { EN_TRANSLATION } from "./en";
import { JPN_TRANSLATION } from "./ja";
import { ID_TRANSLATION } from "./id";

i18n
  .use(LanguageDetector)
  .use(ChainedBackend)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: EN_TRANSLATION,
      },
      ja: {
        translation: JPN_TRANSLATION,
      },
      id: {
        translation: ID_TRANSLATION,
      },
    },
    fallbackLng: "en",
    backend: {
      backends: [LocalStorageBackend, HttpBackend],
      backendOptions: [
        {
          expirationTime: 7 * 24 * 60 * 60 * 1000,
        },
      ],
    },
    interpolation: { escapeValue: false },
  });
