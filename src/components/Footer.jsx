import { Link } from "react-router";
import { useTranslation } from "react-i18next";


export default function Footer(){
    const { t } = useTranslation();
    return (
        <footer className="bg-[#0D1117] text-gray-400 py-6 mt-auto">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
                <p className="text-sm">&copy; {new Date().getFullYear()} {t("footer.copy")}</p>
                <ul className="flex space-x-6 mt-4 md:mt-0">
                    <li><Link to="/privacyPolicy" className="btn-orange">{t("footer.privacy")}</Link></li>
                    <li><Link to="/termsOfService" className="btn-orange">{t("footer.terms")}</Link></li>
                    <li><Link to="/contacts" className="btn-orange">{t("footer.contacts")}</Link></li>
                </ul>
            </div>
        </footer>
    )
}