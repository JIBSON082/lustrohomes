import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lustro Homes | Premium Shortlet & Signature Dining · Lagos",
  description:
    "Experience world-class luxury staycation in the heart of Yaba, Lagos. Premium shortlet apartments and signature dining at Lustro Homes.",
  keywords:
    "Lustro Homes, luxury shortlet Lagos, Yaba shortlet, Lagos staycation, Lustro Lagos restaurant, premium apartments Lagos",
  openGraph: {
    title: "Lustro Homes | Premium Shortlet & Signature Dining · Lagos",
    description:
      "Staycation in Lagos | Signature Dining | Investment. 37 Ibukun Olu Street, Akoka, Yaba, Lagos.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-dm-sans bg-cream text-charcoal antialiased">
        {children}
      </body>
    </html>
  );
}
