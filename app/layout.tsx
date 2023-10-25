import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

import { Providers } from "./(context)/_providers";
import { Navbar } from "./(layout-components)/navbar";
// import { ToastHandler } from "./(layout-components)/toast-handler";
import { ModalsRenderer } from "./(layout-components)/render-modals";

import "./globals.css";
import { EndingCard } from "./(layout-components)/ending-card";
import { BottomNav } from "./(layout-components)/bottom-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Murder Mystery",
  description: "A fun murder mystery game to prep students for IELTS!",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body
        className={`relative flex flex-col items-center justify-center  ${inter.className}`}
      >
        <Providers>
          <NextTopLoader />
          <Navbar />
          <EndingCard />
          <main className='layout'>
            {children}
          </main>
          {/* <ToastHandler /> */}
          <BottomNav />
          <img
            src='/site-bg.png'
            alt='darkened murder evidence board'
            className='fixed inset-0 full'
          />

          <ModalsRenderer />
        </Providers>
      </body>
    </html>
  )
}
