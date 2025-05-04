import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agent Genesis Protocol - Join the Waitlist",
  description: "Be first to enter the age of autonomous agents. Join the waitlist for exclusive Alpha access, rewards, and early adoption perks.",
  keywords: "agent genesis protocol, autonomous agents, AI agents, waitlist, early access",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white`}
      >
        <header className="py-4 px-6 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">Agent Genesis Protocol</Link>
          </div>
          <nav>
            <Link
              href="/check-rank"
              className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
            >
              Check Rank
            </Link>
          </nav>
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="py-6 px-4 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Agent Genesis Protocol. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
