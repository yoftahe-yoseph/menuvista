import type { Metadata } from "next";
import "./globals.css";
import { MenuProvider } from "@/context/MenuContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "MenuVista — Hawassa Lake Hotel | Luxury QR Digital Menu",
  description:
    "Explore the fine dining digital menu of Hawassa Lake Hotel in Hawassa, Ethiopia. Browse Ethiopian traditional cuisine, lakeside specialties, artisanal coffee ceremonies, and generate printable hotel QR posters.",
  keywords: [
    "MenuVista",
    "Hawassa Lake Hotel",
    "QR Digital Menu",
    "Ethiopia Hotel Menu",
    "Hawassa Restaurant",
    "Ethiopian Traditional Food",
  ],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "MenuVista — Hawassa Lake Hotel | Luxury QR Digital Menu",
    description:
      "Explore the fine dining digital menu of Hawassa Lake Hotel in Hawassa, Ethiopia.",
    type: "website",
    locale: "en_US",
    siteName: "MenuVista",
  },
  twitter: {
    card: "summary",
    title: "MenuVista — Hawassa Lake Hotel | Luxury QR Digital Menu",
    description:
      "Explore the fine dining digital menu of Hawassa Lake Hotel in Hawassa, Ethiopia.",
  },
  metadataBase: new URL("https://menuvista-hawassa.vercel.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-cream-50 text-forest-900 font-sans antialiased selection:bg-gold-500 selection:text-forest-950">
        <MenuProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </MenuProvider>
      </body>
    </html>
  );
}
