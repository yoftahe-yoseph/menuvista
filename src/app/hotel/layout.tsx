import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hotel Information | Hawassa Lake Hotel",
  description:
    "Discover Hawassa Lake Hotel — lakeside address, contact details, dining hours, amenities, and culinary philosophy in Hawassa, Ethiopia.",
};

export default function HotelLayout({ children }: { children: React.ReactNode }) {
  return children;
}