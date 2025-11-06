import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import translationEN from "./en.json";
import translationAR from "./ar.json";
import translationHE from "./he.json";

i18n.use(initReactI18next).init({
	resources: {
		en: {translation: translationEN},
		ar: {translation: translationAR},
		he: {translation: translationHE},
	},
	lng: "en",
	fallbackLng: ["ar", "he"],
	interpolation: {escapeValue: false},
});

export default i18n;
