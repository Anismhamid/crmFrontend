import {useTranslation} from "react-i18next";

export const toggleLanguage = () => {
	const {i18n} = useTranslation();

	const newLang = i18n.language === "ar" ? "he" : i18n.language === "he" ? "en" : "ar";
	i18n.changeLanguage(newLang);
};
