import type { Metadata } from "next";
import Image from "next/image";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import SignUpButton from "./components/SignUpButton";
import Header from "./components/header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FluentSubtitle",
  description: "Subtitle download site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <footer></footer>
      </body>
    </html>
  );
}
