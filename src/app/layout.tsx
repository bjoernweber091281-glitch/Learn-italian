import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { ProgressProvider } from "@/lib/progress";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "La Via Italiana — Il Manuale Immersivo",
    template: "%s · La Via Italiana",
  },
  description:
    "Italienisch lernen entlang von Geschichte, Kultur und Küche: drei Phasen von A1 bis C2, mit Racconto, Grammatica Viva, Rollenspiel-Dialogen, Shadowing-Training und Vokabelkarten.",
};

export const viewport: Viewport = {
  themeColor: "#f9f4ec",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="sfondo-marmo">
        <ProgressProvider>
          <div className="flex min-h-dvh flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </ProgressProvider>
      </body>
    </html>
  );
}
