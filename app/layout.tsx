import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {cn} from "@/lib/utils";
import Navbar from "@/components/Navbar";
import {Toaster} from "@/components/ui/sonner"

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Bezpieczna szkoła za gola",
  description: "Platforma do głosowania",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
    <body className={cn(
      'min-h-screen font-sans antialiased grainy',
      inter.className
    )}>
    <Navbar/>
    {children}
    <Toaster richColors position="bottom-center"/>
    </body>
    </html>
  );
}
