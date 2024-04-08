import type { Metadata } from "next";
import Image from 'next/image'
import { Inter } from "next/font/google";
import "./globals.css";

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
        <header className='flex'>
          <Image 
            src='/favicon.ico'
            width={320}
            height={320} 
            alt="Company Logo"
          />
          <h1>FluentSubtitle</h1>
        </header>
        {children}
      </body>
    </html>
  );
}
