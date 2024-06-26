import "./globals.css";
import "~/lib/env-validator";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "~/context/theme-provider";
import { SessionProvider } from "~/context/session-provider";
import { Toaster } from "~/components/ui/toaster";
import { QueryProvider } from "~/context/query-provider";
import { auth } from "~/lib/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SessionProvider session={session}>
            <QueryProvider>
              {children}
              <Toaster />
            </QueryProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
