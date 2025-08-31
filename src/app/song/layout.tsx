import "../globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beatwave - Add Song",
  description: "Beatwave ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
