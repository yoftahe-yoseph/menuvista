import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | MenuVista",
  description:
    "Manage hotel branding, menu items, QR codes, and backups for your MenuVista digital menu.",
  robots: { index: false, follow: false },
};

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return children;
}