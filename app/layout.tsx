import "./globals.css";
import { ReactNode } from "react";

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
      <body className="flex h-screen w-screen flex-col items-center justify-center px-2 dark:bg-gray-500 lg:px-6">
        {children}
      </body>
    </html>
  );
}
