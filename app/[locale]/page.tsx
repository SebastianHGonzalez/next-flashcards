import { useTranslations } from "next-intl";
import { AppBreadcrumb } from "@/components/common/app-breadcrumb";
import { Text } from "@/components/common/text";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/common/button";

export default function Home() {
  const t = useTranslations();

  return (
    <div className="p-4 w-full">
      <AppBreadcrumb
        routes={[{ href: "/", label: t("navigation.flashcards") }]}
      />

      <Text variant="heading" asChild>
        <h1>{t("flashcards.title")}</h1>
      </Text>
      <Text variant="subheading">{t("flashcards.subtitle")}</Text>

      <div className="mt-8 space-y-4">
        <Text variant="default">{t("flashcards.welcome")}</Text>

        <div className="flex gap-4">
          <Button asChild>
            <Link href="/demo-zustand">
              {t("common.add")} {t("flashcards.title")}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
