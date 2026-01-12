import { useTranslation } from "react-i18next"
export default function PrivacyPolicy() {
  const { t } = useTranslation();
  return (
    <div className="mt-20 max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">{t("privacy.title")}</h1>
      <p className="mb-4">
        {t("privacy.intro")}
      </p>

      <h2 className="text-2xl font-semibold mt-6">
        {t("privacy.dataCollectionTitle")}
      </h2>
      <p>
        {t("privacy.dataCollectionText")}
      </p>

      <h2 className="text-2xl font-semibold mt-6">{t("privacy.useInfoTitle")}</h2>
      <p>
        {t("privacy.useInfoText")}
      </p>

      <h2 className="text-2xl font-semibold mt-6">{t("privacy.dataSharingTitle")}</h2>
      <p>
        {t("privacy.dataSharingText")}
      </p>

      <h2 className="text-2xl font-semibold mt-6">
        {t("privacy.securityTitle")}
      </h2>
      <p>
       {t("privacy.securityText")}
      </p>

      <h2 className="text-2xl font-semibold mt-6">{t("privacy.userRightsTitle")}</h2>
      <p>
        {t("privacy.userRightsText")}
      </p>

      <p className="text-3xl font-bold mt-6">
        {t("privacy.agreement")}
      </p>
    </div>
  );
}
