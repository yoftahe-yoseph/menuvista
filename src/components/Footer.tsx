"use client";

import React from "react";
import Link from "next/link";
import {
  UtensilsCrossed,
  MapPin,
  Phone,
  Mail,
  Clock,
  QrCode,
  Building2,
  SlidersHorizontal,
  Heart,
} from "lucide-react";
import { useMenu } from "@/context/MenuContext";

export default function Footer() {
  const { hotelInfo } = useMenu();

  return (
    <footer className="bg-forest-950 text-cream-100 border-t border-gold-500/30 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand & Story */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-forest-900 border border-gold-500/50 flex items-center justify-center">
                <UtensilsCrossed className="w-5 h-5 text-gold-400" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-cream-50">
                  {hotelInfo.name}
                </h3>
                <p className="text-xs text-gold-400 tracking-wider uppercase">
                  {hotelInfo.restaurantName}
                </p>
              </div>
            </div>
            <p className="text-sm text-cream-200/80 leading-relaxed">
              {hotelInfo.description}
            </p>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-gold-400 mb-4">
              Explore MenuVista
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="flex items-center gap-2 text-cream-200/85 hover:text-gold-300 transition-colors"
                >
                  <UtensilsCrossed className="w-4 h-4 text-gold-500" />
                  <span>Customer Digital Menu</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/qr"
                  className="flex items-center gap-2 text-cream-200/85 hover:text-gold-300 transition-colors"
                >
                  <QrCode className="w-4 h-4 text-gold-500" />
                  <span>Hotel QR Code & Poster Generator</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/hotel"
                  className="flex items-center gap-2 text-cream-200/85 hover:text-gold-300 transition-colors"
                >
                  <Building2 className="w-4 h-4 text-gold-500" />
                  <span>About Hawassa Lake Hotel</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  className="flex items-center gap-2 text-cream-200/85 hover:text-gold-300 transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4 text-gold-500" />
                  <span>Manager Settings</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Dining Hours */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-gold-400 mb-4">
              Dining & Ceremony Hours
            </h4>
            <ul className="space-y-2.5 text-sm text-cream-200/85">
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-cream-50 block">Breakfast Buffet & À La Carte</span>
                  <span>{hotelInfo.openingHours.breakfast}</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-cream-50 block">All-Day Lakeside Dining</span>
                  <span>{hotelInfo.openingHours.allDayDining}</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium text-cream-50 block">Sidama Coffee Ceremony</span>
                  <span>{hotelInfo.openingHours.coffeeCeremony}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-gold-400 mb-4">
              Location & Reservations
            </h4>
            <ul className="space-y-3 text-sm text-cream-200/85">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-1" />
                <span>
                  {hotelInfo.address}, {hotelInfo.city}, {hotelInfo.country}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span>{hotelInfo.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <span>{hotelInfo.email}</span>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-forest-800 text-xs text-gold-300/90">
              {hotelInfo.serviceNote}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-forest-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-200/60">
          <p>
            © {new Date().getFullYear()} {hotelInfo.name} ({hotelInfo.city}, {hotelInfo.country}). Powered by{" "}
            <span className="text-gold-400 font-semibold">MenuVista QR Digital Menu</span>.
          </p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-gold-400 fill-gold-400" /> for Ethiopian Hospitality & Luxury Dining
          </p>
        </div>
      </div>
    </footer>
  );
}
