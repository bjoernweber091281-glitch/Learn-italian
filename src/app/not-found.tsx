import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-start px-4 py-24 sm:px-6">
      <Compass className="h-10 w-10 text-terracotta-500" aria-hidden />
      <h1 className="mt-4 font-display text-4xl font-semibold text-inchiostro-800">
        Ci siamo persi.
      </h1>
      <p className="mt-2 text-inchiostro-500">
        Diese Lektion gibt es (noch) nicht. Vielleicht steht sie im Percorso schon als
        «in arrivo».
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-terracotta-500 px-5 py-2.5 text-sm font-semibold text-marmo-50 transition-colors hover:bg-terracotta-600"
      >
        Zurück zum Percorso
      </Link>
    </div>
  );
}
