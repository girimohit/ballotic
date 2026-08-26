import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "/src/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider";
import SessionWrapper from "@/components/SessionWrapper";
import AdminNavbar from "@/components/admin/adminNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ballotic Admin Control Panel",
  description: "Secure cryptographic election administration panel",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
        <body className={`${inter.className} dark bg-[#030303] text-foreground antialiased`} >
          <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" disableTransitionOnChange>
            <div className="flex h-screen w-screen overflow-hidden bg-[#030303]">
              {/* Sidebar */}
              <AdminNavbar />
              
              {/* Main Content Area */}
              <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#09090b] border-l border-border/40">
                <main className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth">
                  {children}
                </main>
              </div>
            </div>
          </ThemeProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
