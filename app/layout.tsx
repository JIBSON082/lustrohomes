import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant" 
});

const dmSans = DM_Sans({ 
  subsets: ["latin"], 
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans" 
});

export const metadata: Metadata = {
  title: "Lustro Homes | Premium Staycation in Lagos",
  description: "Experience luxury living, signature dining, and lucrative investment opportunities with Lustro Homes in Yaba, Lagos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${cormorant.variable} ${dmSans.variable} font-body bg-cream text-charcoal antialiased`}>
        {children}
      </body>
    </html>
  );
}

