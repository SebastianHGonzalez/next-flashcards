import { SidebarProvider } from "@/components/common/sidebar";
import { AppSidebar } from "@/components/common/app-sidebar";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <NextIntlClientProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full max-w-6xl">{children}</main>
      </SidebarProvider>
    </NextIntlClientProvider>
  );
}
