import { SiteFrame } from "@/app/components/site/SiteFrame";
import localFont from "next/font/local";
import type { ReactNode } from "react";

const sans = localFont({
  src: "../fonts/radio-canada-big-latin.woff2",
  weight: "400 700",
  display: "swap",
  variable: "--font-sans",
});

const serif = localFont({
  src: "../fonts/source-serif-4-latin.woff2",
  weight: "400",
  display: "swap",
  variable: "--font-serif",
});

const mono = localFont({
  src: "../fonts/geist-mono-latin.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-mono",
});

export const metadata = {
  title: {
    default: "Join Looms",
    template: "%s · Join Looms",
  },
  description:
    "Join Looms is the school office desk: teachers, classes, families, and the notes that keep the day moving.",
};

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${sans.variable} ${serif.variable} ${mono.variable} ${sans.className}`}>
      <SiteFrame>{children}</SiteFrame>
    </div>
  );
}
