import { useTranslation } from "react-i18next"
export default function TermsOfService() {
  const { t } = useTranslation();
  return (
    <div className="mt-20 max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">{t("terms.title")}</h1>

      <p className="mb-4">
       {t("terms.intro")}
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">{t("terms.acceptanceTitle")}</h2>
      <p className="mb-4">
        {t("terms.acceptance")}
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">{t("terms.servicesTitle")}</h2>
      <p className="mb-4">{t("terms.providence")}</p>
      <ul className="list-disc ml-6">
        <li>{t("terms.servicesList.home")}</li>
        <li>{t("terms.servicesList.rent")}</li>
        <li>{t("terms.servicesList.gallery")}</li>
        <li>{t("terms.servicesList.contact")}</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">{t("terms.accountsTitle")}</h2>
      <p className="mb-4">{t("terms.accountsText")}</p>
      <ul className="list-disc ml-6">
        <li>{t("terms.accountRules.accurateInfo")}</li>
        <li>{t("terms.accountRules.secureCredentials")}</li>
        <li>{t("terms.accountRules.responsibility")}</li>
      </ul>
      <p className="mt-4">{t("terms.contentOwnershipText")}</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">{t("terms.responsibilitiesTitle")}</h2>
      <p className="mb-4">{t("terms.responsibilitiesText")}</p>
      <ul className="list-disc ml-6">
        <li>{t("terms.contentRules.rights")}</li>
        <li>{t("terms.contentRules.noInfringement")}</li>
        <li>{t("terms.contentRules.noOffensive")}</li>
      </ul>
      <p className="mt-4">{t("terms.contentRemoval")}</p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">{t("terms.contentOwnershipTitle")}</h2>
      <p className="mb-4">
        {t("terms.contentLicense")}
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">{t("terms.prohibitedTitle")}</h2>
      <p className="mb-4">{t("terms.accountRulesTitle")}</p>
      <ul className="list-disc ml-6">
        <li>{t("terms.prohibitedList.illegal")}</li>
        <li>{t("terms.prohibitedList.harmful")}</li>
        <li>{t("terms.prohibitedList.hack")}</li>
        <li>{t("terms.prohibitedList.misuse")}</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">{t("terms.rentalTitle")}</h2>
      <p className="mb-4">
        {t("terms.rentalText")}
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">{t("terms.liabilityTitle")}</h2>
      <p className="mb-4">
        {t("terms.liabilityText")}
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">{t("terms.terminationTitle")}</h2>
      <p className="mb-4">
        {t("terms.terminationText")}
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">{t("terms.changesTitle")}</h2>
      <p className="mb-4">
       {t("terms.changesText")}
      </p>

      {/* <p className="mt-6">Last updated: {new Date().toLocaleDateString()}</p> */}
      
      <p className="mt-6">{t("terms.lastUpdated")} 11.01.2026</p>
    </div>
  );
}
