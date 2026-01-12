import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const switchLanguage = () => {
    const nextLang = currentLang === "en" ? "bg" : "en";
    i18n.changeLanguage(nextLang);
    localStorage.setItem("lang", nextLang);
  };

  return (
    <button
      onClick={switchLanguage}
      className="text-xl hover:scale-110 transition"
      title={currentLang === "en" ? "Български" : "English"}
    >
      {currentLang === "en" ? <span className="fi fi-bg"></span> : <span className="fi fi-gb"></span>}
    </button>
  );
}

