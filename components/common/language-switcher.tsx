"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "./button";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div className="flex gap-2">
      <Button
        variant={locale === "es" ? "default" : "outline"}
        size="sm"
        onClick={() => switchLocale("es")}
        className="flex items-center gap-2"
      >
        <Globe className="w-4 h-4" />
        ES
      </Button>
      <Button
        variant={locale === "en" ? "default" : "outline"}
        size="sm"
        onClick={() => switchLocale("en")}
        className="flex items-center gap-2"
      >
        <Globe className="w-4 h-4" />
        EN
      </Button>
    </div>
  );
}
