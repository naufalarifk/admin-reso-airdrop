import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ChainedBackend from "i18next-chained-backend";
import HttpBackend from "i18next-http-backend";
import LocalStorageBackend from "i18next-localstorage-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import { EN_TRANSLATION } from "./en";
import { JPN_TRANSLATION } from "./ja";
import { ID_TRANSLATION } from "./id";
import { ESP_TRANSLATION } from "./esp";
import { KO_TRANSLATION } from "./ko";
import { RU_TRANSLATION } from "./ru";
import { FR_TRANSLATION } from "./fr";
import { PT_TRANSLATION } from "./pt";
import { IT_TRANSLATION } from "./it";
import { CN_TRANSLATION } from "./zh-cn";

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
      esp: {
        translation: ESP_TRANSLATION,
      },
      ko: {
        translation: KO_TRANSLATION,
      },
      ru: {
        translation: RU_TRANSLATION,
      },
      fr: {
        translation: FR_TRANSLATION,
      },
      pt: {
        translation: PT_TRANSLATION,
      },
      it: {
        translation: IT_TRANSLATION,
      },
      zh: {
        translation: CN_TRANSLATION,
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
