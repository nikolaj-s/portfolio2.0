"use client"
import { Rubik } from "next/font/google";
import "./globals.css";
import { Head } from "@/components/Head/Head";
import { Nav } from "@/components/Nav/Nav";
import { SessionProvider } from "next-auth/react";
import Footer from "@/components/Footer/Footer";

const bigShouldersInlineText = Rubik({
  variable: "--font",
  subsets: ["latin"],
});


export default function RootLayout({ children}) {
  return (
    <html lang="en">
      <Head />
      <body className={`${bigShouldersInlineText.variable}`}>
        <Nav />
        <SessionProvider >
        {children}
        </SessionProvider>
        <Footer />
      </body>
    </html>
  );
}
