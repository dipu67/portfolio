import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Full Stack Developer Portfolio | React, Next.js, MERN Stack",
  description:
    "Portfolio of a Full Stack Developer specializing in React, Next.js, MERN stack, and Express.js. Building modern web applications with cutting-edge technologies.",
  keywords: [
    "Full Stack Developer",
    "React",
    "Next.js",
    "MERN Stack",
    "Express.js",
    "TypeScript",
    "Web Development",
    "JavaScript",
    "MongoDB",
    "Node.js",
  ],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourportfolio.com",
    title: "Full Stack Developer Portfolio",
    description:
      "Portfolio showcasing modern web applications built with React, Next.js, and MERN stack",
    siteName: "Full Stack Developer Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Full Stack Developer Portfolio",
    description:
      "Portfolio showcasing modern web applications built with React, Next.js, and MERN stack",
    creator: "@yourusername",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      {children}
      </body>
    </html>
  );
}
