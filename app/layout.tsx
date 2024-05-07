import type { Metadata } from "next";
import Image from "next/image";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import SignUpButton from "./components/SignUpButton";

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
      <body className={inter.className}>
        <header className="ml-2">
          <Link
            className="ml-5 text-3xl flex items-center hover:text-purple-500"
            href="/"
          >
            <Image
              src="/favicon.ico"
              width={80}
              height={80}
              alt="Company Logo"
            />
            FluentSubtitle
          </Link>
          <SignUpButton />
        </header>
        <main>{children}</main>
        <footer></footer>
      </body>
    </html>
  );
}
