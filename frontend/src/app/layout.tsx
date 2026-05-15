import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

export const metadata: Metadata = {
  title: "TravelSwap | Luxury Mobility Exchange",
  description: "The Stock Market of Premium Travel. Recover value from cancelled journeys. Buy and sell unused luxury bus tickets securely.",
  keywords: "bus tickets, resale, luxury bus, travel, ticket marketplace, TravelSwap, neo-transit",
  openGraph: {
    title: "TravelSwap | Luxury Mobility Exchange",
    description: "The Stock Market of Premium Travel. Recover value from cancelled journeys.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-sans">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
