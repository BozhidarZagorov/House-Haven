import { Link } from "react-router";
import { useTranslation } from "react-i18next";

export default function NotFound() {
    const { t } = useTranslation();
    return (
        <>
            <main className="back404-container">
                <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
                    <p className="inline-block bg-orange-600 text-white px-2 py-1 rounded">404</p>
                    <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
                        {t("404.pgX")}
                    </h1>
                    <p className="mt-6 text-lg font-medium text-pretty text-black-500 sm:text-xl/8">
                        {t("404.srr")}
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to="/"
                            className="btn-orange"
                        >
                            {t("404.back")}
                        </Link>
                        <p className="text-lg font-medium text-pretty text-black-500 sm:text-xl/8">{t("404.or")}</p>
                        <Link 
                            to="/contacts" 
                            className="btn-orange"
                        >
                            {t("404.supp")}
                        </Link>
                    </div>
                </div>
            </main>
        </>
    )
}
