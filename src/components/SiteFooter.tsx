import { Landmark } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-marmo-300/70 bg-marmo-50/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-inchiostro-400 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="flex items-center gap-2">
          <Landmark className="h-4 w-4 text-terracotta-500" aria-hidden />
          <span className="font-display text-base italic text-inchiostro-500">
            «Roma, non basta una vita.»
          </span>
        </p>
        <p className="text-xs">
          Kulturtexte mit Bezug auf UNESCO-Welterbestätten · Audio über die Web Speech API deines Browsers
        </p>
      </div>
    </footer>
  );
}
