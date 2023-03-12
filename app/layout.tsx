import clsx from "clsx";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Spotify Playlist to List",
  description: "Generate/export Spotify playlists as text and image just in a seconds!",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={clsx(
          inter.className,
          "flex-col items-center justify-center bg-slate-600 p-2 text-black dark:bg-gray-600 dark:text-white"
        )}
      >
        {children}
      </body>
    </html>
  );
}
