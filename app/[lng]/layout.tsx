import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "./globals.css";
import { ChildProps } from "@/types";
import { languages } from "@/i18n/settings";
import { dir } from "i18next";
import { Toaster } from "sonner";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export const metadata: Metadata = {
  title: "Outgame.uz | Home",
  description: "The site for booking tech products",
  icons: "/logoo.png",
};

interface Props extends ChildProps {
  params: { lng: string };
}

export default function RootLayout({ children, params: { lng } }: Props) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={`${orbitron.variable} antialiased dark`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
