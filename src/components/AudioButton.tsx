"use client";

import { Pause, Volume2 } from "lucide-react";
import { useItalianSpeech } from "@/lib/speech";

interface AudioButtonProps {
  text: string;
  id?: string;
  rate?: number;
  label?: string;
  size?: "sm" | "md";
  tone?: "terracotta" | "oliva" | "quiet";
}

const toneClasses = {
  terracotta:
    "border-terracotta-200 bg-terracotta-50 text-terracotta-700 hover:bg-terracotta-100",
  oliva: "border-oliva-200 bg-oliva-50 text-oliva-700 hover:bg-oliva-100",
  quiet:
    "border-marmo-300 bg-marmo-50 text-inchiostro-400 hover:bg-marmo-200 hover:text-inchiostro-600",
};

/** Runder Play-Button, der einen italienischen Satz vorliest. */
export function AudioButton({
  text,
  id,
  rate = 1,
  label,
  size = "sm",
  tone = "terracotta",
}: AudioButtonProps) {
  const { supported, speakingId, toggle } = useItalianSpeech();
  const key = id ?? text;
  const active = speakingId === key;

  if (!supported) return null;

  const dimension = size === "sm" ? "h-7 w-7" : "h-9 w-9";
  const icon = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        toggle(text, { rate, id: key });
      }}
      aria-label={label ?? (active ? "Wiedergabe stoppen" : `Vorlesen: ${text}`)}
      aria-pressed={active}
      className={`inline-flex shrink-0 items-center justify-center rounded-full border transition-colors ${dimension} ${
        active ? "border-terracotta-500 bg-terracotta-500 text-marmo-50" : toneClasses[tone]
      }`}
    >
      {active ? <Pause className={icon} aria-hidden /> : <Volume2 className={icon} aria-hidden />}
    </button>
  );
}
