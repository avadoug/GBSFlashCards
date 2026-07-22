import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GBSHeader } from "./components/GBSHeader";
import { PwaRegister } from "./components/PwaRegister";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return {
    metadataBase: new URL(`${protocol}://${host}`),
    title: { default: "GBS Strain Flip", template: "%s · GBS Strain Flip" },
    description: "A premium interactive breeder archive for learning cannabis lineage, traits, history, and confidence—one tactile card at a time.",
    manifest: "/manifest.webmanifest",
    applicationName: "GBS Strain Flip",
    appleWebApp: { capable: true, title: "GBS Strain Flip", statusBarStyle: "black-translucent" },
    openGraph: { title: "GBS Strain Flip", description: "Learn the lineage. Know the plant.", type: "website", images: ["/og.png"] },
    twitter: { card: "summary_large_image", title: "GBS Strain Flip", description: "Learn the lineage. Know the plant.", images: ["/og.png"] },
    icons: { icon: "/icon.svg", shortcut: "/icon.svg", apple: "/icon.svg" },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PwaRegister />
        <div className="ambient-bg" aria-hidden="true" />
        <GBSHeader />
        {children}
        <footer className="site-footer"><span>GBS Strain Flip</span><p>Source-led breeder archive · catalog existence is never presented as full documentation</p><span>© {new Date().getFullYear()} GBS</span></footer>
      </body>
    </html>
  );
}
