import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ik werk op kantoor",
  description: "Letsconnect B.V. app for employees to communicate their intentions to work in office.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen justify-between bg-white dark:bg-dark dark:text-light`}>{children}</body>
    </html>
  );
}
