import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QR Code & Poster Generator | Hawassa Lake Hotel",
  description:
    "Generate a scannable high-resolution QR code and printable table poster for the Hawassa Lake Hotel digital menu.",
};

export default function QrLayout({ children }: { children: React.ReactNode }) {
  return children;
}