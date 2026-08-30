"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cloud, CloudOff, Layers, Loader2, Sparkles } from "lucide-react";
import { useProgress } from "@/lib/progress";
import { publishedLessons } from "@/content";

const navigation = [
  { href: "/", label: "Percorso", hint: "Der Lernpfad" },
  { href: "/vocabolario", label: "Vocabolario", hint: "Karteikarten" },
];

function SyncBadge() {
  const { syncState } = useProgress();

  const config = {
    loading: { Icon: Loader2, text: "lädt", title: "Fortschritt wird geladen", spin: true },
    synced: { Icon: Cloud, text: "sincronizzato", title: "Fortschritt in der Datenbank gesichert", spin: false },
    local: { Icon: CloudOff, text: "solo locale", title: "Kein Server erreichbar — Fortschritt liegt nur in diesem Browser", spin: false },
  }[syncState];

  return (
    <span
      title={config.title}
      className="hidden items-center gap-1.5 rounded-full border border-marmo-300 bg-marmo-50/80 px-2.5 py-1 text-[11px] font-medium text-inchiostro-400 sm:inline-flex"
    >
      <config.Icon className={`h-3 w-3 ${config.spin ? "animate-spin" : ""}`} aria-hidden />
      {config.text}
    </span>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const { completedLessons } = useProgress();

  return (
    <header className="sticky top-0 z-40 border-b border-marmo-300/70 bg-marmo-100/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="group flex min-w-0 items-center gap-2.5 sm:gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-terracotta-500 to-terracotta-700 shadow-carta">
            <Sparkles className="h-5 w-5 text-marmo-50" aria-hidden />
          </span>
          <span className="leading-tight">
            <span className="block whitespace-nowrap font-display text-lg font-semibold tracking-tight text-inchiostro-800 sm:text-xl">
              La Via Italiana
            </span>
            <span className="hidden text-[11px] uppercase tracking-[0.18em] text-inchiostro-400 sm:block">
              Il Manuale Immersivo
            </span>
          </span>
        </Link>

        <nav className="ml-auto flex shrink-0 items-center gap-1">
          {navigation.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.hint}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-terracotta-500 text-marmo-50 shadow-carta"
                    : "text-inchiostro-500 hover:bg-marmo-200"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 border-l border-marmo-300 pl-3 sm:flex">
          <SyncBadge />
          <span
            className="inline-flex items-center gap-1.5 rounded-full bg-oliva-100 px-2.5 py-1 text-[11px] font-semibold text-oliva-700"
            title={`${completedLessons.length} von ${publishedLessons} verfügbaren Lektionen abgeschlossen`}
          >
            <Layers className="h-3 w-3" aria-hidden />
            {completedLessons.length}/{publishedLessons}
          </span>
        </div>
      </div>
    </header>
  );
}
