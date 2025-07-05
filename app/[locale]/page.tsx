import { useTranslations } from "next-intl";
import { AppBreadcrumb } from "@/components/common/app-breadcrumb";
import { Text } from "@/components/common/text";
import { Button } from "@/components/common/button";
import { Link } from "@/i18n/navigation";

export default function Home() {
  const t = useTranslations();

  return (
    <div className="p-4 w-full">
      <AppBreadcrumb routes={[]} />

      <Text variant="heading" asChild>
        <h1>{t("home.title")}</h1>
      </Text>
      <Text variant="subheading">{t("home.subtitle")}</Text>

      <Text className="mt-8" variant="default">
        {t("home.welcome")}
      </Text>

      <Button asChild className="mt-4">
        <Link href="/thoughts">
          {t("home.cta")}
        </Link>
      </Button>
    </div>
  );
}
