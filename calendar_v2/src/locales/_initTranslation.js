import i18n from "i18next";
import PL_translation from "./PL_translation.json";
import EN_translation from "./EN_translation.json";
import RU_translation from "./RU_translation.json";

function _initTranslation() {
  i18n.init({
    interpolation: { escapeValue: false },
    languages: ["pl, en, ru"],
    lng: "pl",
    load: "current",
    resources: {
      ru: {
        translation: RU_translation,
      },
      en: {
        translation: EN_translation,
      },
      pl: {
        translation: PL_translation,
      },
    },
  });

  return i18n;
}

export { _initTranslation as initTranslation };
