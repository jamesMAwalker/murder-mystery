import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Providers } from "./(context)/_providers";
import { Navbar } from "./(layout-components)/navbar";
import { BottomNav } from "./(layout-components)/bottom-nav";

import "./globals.css";
import { BE_Test } from "./(layout-components)/be-test";
import { ToastHandler } from "./(layout-components)/toast-handler";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Murder Mystery",
  description: "A fun murder mystery game to prep students for IELTS!",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`relative flex flex-col items-center justify-center  ${inter.className}`}
      >
        <Providers>
          <Navbar />
          <main className="py-24 w-[90%] min-h-screen h-auto relative w-full flex flex-col items-center z-10">
            <div className="content-wrapper h-auto w-[90%] z-10">
              {children}
            </div>
          </main>
          <ToastHandler />
          <BE_Test />

          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
