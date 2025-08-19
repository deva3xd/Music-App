import "../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spotify - Add Song",
  description: "Spotify ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
