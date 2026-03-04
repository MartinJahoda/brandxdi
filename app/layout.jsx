import { Playfair_Display_SC, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display_SC({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-display",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Klaudia Milcz — UGC Creator",
  description: "Authentic & premium content that converts and engages.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body>
        <div className="site-container">
          {children}
        </div>
      </body>
    </html>
  );
}
