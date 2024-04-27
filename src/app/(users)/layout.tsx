import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "/src/app/globals.css"
// import "./globals.css";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import SessionWrapper from "@/components/SessionWrapper";
import SmoothScrolling from "@/components/parallax";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ballotic",
  description: "A robust platform to manage elections",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <SmoothScrolling>
              <Navbar />
              {children}
            </SmoothScrolling>
          </ThemeProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
