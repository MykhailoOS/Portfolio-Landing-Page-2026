import { Lora, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

const lora = Lora({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-editorial",
});

export const metadata = {
  title: "Michael Pashchenko - UI/UX Designer & Web Developer",
  description:
    "Portfolio of Michael Pashchenko - crafting digital experiences at the intersection of design and technology.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${lora.variable}`}>
      <body>{children}</body>
    </html>
  );
}
