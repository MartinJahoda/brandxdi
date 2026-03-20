import { Playfair_Display_SC, DM_Sans } from "next/font/google";
import { readFile } from "fs/promises";
import { join } from "path";
import { DEFAULT_CONFIG } from "@/lib/config";
import "./globals.css";

export const dynamic = "force-dynamic";

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

async function getSiteMetadata() {
  try {
    const raw = await readFile(join(process.cwd(), "data", "config.json"), "utf-8");
    const cfg = JSON.parse(raw);
    return {
      title: cfg.siteTitle || DEFAULT_CONFIG.siteTitle,
      description: cfg.siteDescription || DEFAULT_CONFIG.siteDescription,
    };
  } catch {
    return {
      title: DEFAULT_CONFIG.siteTitle,
      description: DEFAULT_CONFIG.siteDescription,
    };
  }
}

export async function generateMetadata() {
  return await getSiteMetadata();
}

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
