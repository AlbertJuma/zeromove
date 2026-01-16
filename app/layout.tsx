import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZeroMove - Practical Decision Support",
  description: "Practical decision support for people with limited resources",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
