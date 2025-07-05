"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/common/sidebar";
import { LanguageSwitcher } from "./language-switcher";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import { Home, CreditCard } from "lucide-react";

export function AppSidebar() {
  const t = useTranslations();
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <LanguageSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuButton asChild isActive={pathname === "/"}>
            <Link href="/">
              <Home className="w-4 h-4" />
              {t("navigation.home")}
            </Link>
          </SidebarMenuButton>
          <SidebarMenuButton asChild isActive={pathname === "/thoughts"}>
            <Link href="/thoughts">
              <CreditCard className="w-4 h-4" />
              {t("navigation.thoughts")}
            </Link>
          </SidebarMenuButton>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
