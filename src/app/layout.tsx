import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import MainBody from "@/components/layout/MainBody";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default:
      "VanRoute Pakistan | Find Verified School Vans in Rawalpindi",
    template: "%s | VanRoute Pakistan",
  },
  description:
    "Find verified school vans with vacant seats on your route in Rawalpindi. Parents and students can send one request to matching van drivers.",
  keywords: [
    "school van Rawalpindi",
    "school van service Rawalpindi",
    "van seats Rawalpindi",
    "student transport Rawalpindi",
    "school transport Rawalpindi",
    "van drivers Rawalpindi",
  ],
  applicationName: "VanRoute Pakistan",
  authors: [{ name: "VanRoute Pakistan" }],
  creator: "VanRoute Pakistan",
  openGraph: {
    title: "VanRoute Pakistan",
    description:
      "Find verified school vans with vacant seats on your route in Rawalpindi.",
    siteName: "VanRoute Pakistan",
    locale: "en_PK",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-PK">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-white font-sans text-gray-950 antialiased`}
      ><div className="flex min-h-screen flex-col">
        <Navbar />
        <MainBody>{children}</MainBody>
        <Footer />
      </div>
      <Toaster
    richColors
    position="top-center"
    closeButton
  />
      </body>
    </html>
  );
}