import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spotify",
  description: "Spotify Clone ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
          <main>
            {children}
          </main>
      </body>
    </html>
  );
}
