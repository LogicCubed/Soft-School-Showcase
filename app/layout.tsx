import type { Metadata } from "next";
import { Baloo_2 } from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-baloo",
});

export const metadata: Metadata = {
  title: "Soft School",
  description: "Learn soft skills with gamified lessons",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${baloo.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}