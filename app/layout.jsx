import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Diana Garcia Studio",
  description: "UGC Creator — Authentic & premium content that converts and engages.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <div className="bg-mesh" aria-hidden="true">
          <div className="bg-mesh-orb" />
          <div className="bg-mesh-orb" />
          <div className="bg-mesh-orb" />
        </div>
        {children}
      </body>
    </html>
  );
}
