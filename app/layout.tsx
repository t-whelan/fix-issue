import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
const inter = Inter({ subsets: ["latin"] });
import Navbar from "./Navbar";
import AuthWrapper from "./api/lib/auth-wrapper";
import QueryClientProvider from "@/QueryClientProvider";

export const metadata: Metadata = {
  title: "Issue Tracker app",
  description: "Issue tracker app tracks all the issue, assigned to technician",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <AuthWrapper>
      <body className={inter.className} suppressHydrationWarning>
        <QueryClientProvider>
        <Theme>
          
          <Navbar />
        <div className="px-5">{children}</div>
        </Theme>
        </QueryClientProvider>
        </body>
        </AuthWrapper>
    </html>
  );
}
