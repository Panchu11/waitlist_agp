import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { motion } from "framer-motion";

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900 via-slate-900 to-black"></div>
        <header className="fixed top-0 left-0 right-0 z-50 py-6 px-8">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <Link href="/" className="text-2xl font-bold gradient-text">
                Agent Genesis Protocol
              </Link>
            </motion.div>
            <motion.nav
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/check-rank"
                className="btn btn-secondary"
              >
                Check Rank
              </Link>
            </motion.nav>
          </div>
        </header>
        <main className="container mx-auto px-4 py-24">
          {children}
        </main>
        <footer className="py-8 px-4 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Agent Genesis Protocol. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}