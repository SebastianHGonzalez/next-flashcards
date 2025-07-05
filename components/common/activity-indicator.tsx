import { LoaderCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export function ActivityIndicator(props: React.ComponentProps<typeof LoaderCircle>) {
  const t = useTranslations("activity-indicator");

  return (
    <div className="flex items-center justify-center" role="progressbar" aria-label={t("ariaLabel")}>
      <LoaderCircle className="animate-spin" {...props} />
    </div>
  );
}
