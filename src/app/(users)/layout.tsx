import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "/src/app/globals.css"
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
      <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
        <body className={`${inter.className} dark bg-background text-foreground antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" disableTransitionOnChange>
            <SmoothScrolling>
              <div className="relative min-h-screen overflow-hidden">
                <div className="mesh-bg" />
                <Navbar />
                {children}
              </div>
            </SmoothScrolling>
          </ThemeProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}