import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./breadcrumb";
import { SidebarTrigger } from "./sidebar";

interface AppBreadcrumbProps {
  routes: { href: string; label: string }[];
}

export function AppBreadcrumb({ routes }: AppBreadcrumbProps) {
  const t = useTranslations();

  const breadcrumbItems = routes.flatMap((route) => [
    <BreadcrumbSeparator key={route.href + "separator"} />,
    <BreadcrumbItem key={route.href}>
      <BreadcrumbLink asChild>
        <Link href={route.href}>{route.label}</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>,
  ]);

  return (
    <div className="flex flex-row gap-2 items-center">
      <SidebarTrigger />

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">{t("navigation.home")}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {breadcrumbItems}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
