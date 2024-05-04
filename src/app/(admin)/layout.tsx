import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";
import "/src/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider";
import SessionWrapper from "@/components/SessionWrapper";
import AdminNavbar from "@/components/admin/adminNav";
import { ScrollArea } from "@/components/ui/scroll-area";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin",
  description: "A robust platform to manage elections with admin features",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={inter.className} >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <main className="flex dark:bg-black bg-gray-400 h-screen">
              <AdminNavbar />
              <ScrollArea className="w-full scroll-smooth rounded-2xl dark:bg-[#151516]  bg-white mt-16 pb-8"  >
                {children}
              </ScrollArea>
            </main>
          </ThemeProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
