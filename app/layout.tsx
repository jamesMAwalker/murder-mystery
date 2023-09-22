import { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Providers } from "./(context)/_providers";
import { Navbar } from "./(layout-components)/navbar";
import { BottomNav } from "./(layout-components)/bottom-nav";

import "./globals.css";
import { NotificationPopupToast } from "./(layout-components)/notification-popup-toast";
import { BE_Test } from "./(layout-components)/be-test";

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
          <main className="py-24 w-full min-h-screen h-auto relative flex flex-col items-center">
            <div className="content-wrapper h-auto w-[90%]">{children}</div>
          </main>

          <BE_Test />
          <NotificationPopupToast />
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
