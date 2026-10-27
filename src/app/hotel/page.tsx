"use client";

import React from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Sparkles,
  UtensilsCrossed,
  QrCode,
  CheckCircle2,
  Award,
  Coffee,
  Compass,
} from "lucide-react";
import { useMenu } from "@/context/MenuContext";

export default function HotelInfoPage() {
  const { hotelInfo } = useMenu();

  return (
    <div className="min-h-screen bg-cream-50 pb-20">
      {/* Hero Banner */}
      <section className="relative bg-forest-900 text-cream-50 overflow-hidden border-b border-gold-500/30">
        <div
          className="absolute inset-0 opacity-30 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-900/80 to-forest-950/80" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-300 text-xs font-semibold uppercase tracking-widest mb-4">
              <Compass className="w-3.5 h-3.5 text-gold-400" />
              <span>Great Rift Valley • {hotelInfo.city}, {hotelInfo.country}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-cream-50 leading-tight">
              {hotelInfo.name}
            </h1>
            <p className="mt-2 font-serif text-xl sm:text-2xl text-gold-400">
              {hotelInfo.restaurantName}
            </p>
            <p className="mt-5 text-sm sm:text-base text-cream-100/90 leading-relaxed">
              {hotelInfo.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gold-500 text-forest-950 font-semibold text-sm hover:bg-gold-400 transition-colors shadow-lg"
              >
                <UtensilsCrossed className="w-4 h-4" />
                Explore Digital Menu
              </Link>
              <Link
                href="/qr"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-forest-800 text-cream-50 border border-gold-500/40 font-semibold text-sm hover:bg-forest-700 transition-colors"
              >
                <QrCode className="w-4 h-4 text-gold-400" />
                Open QR Poster Studio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card 1: Location & Contact Details */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-luxury space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-forest-900 text-gold-400 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-forest-900">
                  Address & Contact
                </h2>
                <p className="text-xs text-stone-500">
                  Direct Concierge & Dining Desk
                </p>
              </div>
            </div>

            <ul className="space-y-4 text-sm text-forest-900">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-600 shrink-0 mt-1" />
                <div>
                  <span className="font-semibold block">Lakeside Address</span>
                  <span className="text-stone-600">
                    {hotelInfo.address}, {hotelInfo.city}, {hotelInfo.country}
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gold-600 shrink-0 mt-1" />
                <div>
                  <span className="font-semibold block">Telephone</span>
                  <a
                    href={`tel:${hotelInfo.phone.replace(/\s+/g, "")}`}
                    className="text-stone-600 hover:text-gold-700 transition-colors"
                  >
                    {hotelInfo.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gold-600 shrink-0 mt-1" />
                <div>
                  <span className="font-semibold block">WhatsApp Reservations</span>
                  <a
                    href={`https://wa.me/${hotelInfo.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-600 hover:text-gold-700 transition-colors"
                  >
                    {hotelInfo.whatsapp}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gold-600 shrink-0 mt-1" />
                <div>
                  <span className="font-semibold block">Reservations Email</span>
                  <a
                    href={`mailto:${hotelInfo.email}`}
                    className="text-stone-600 hover:text-gold-700 transition-colors"
                  >
                    {hotelInfo.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Globe className="w-4 h-4 text-gold-600 shrink-0 mt-1" />
                <div>
                  <span className="font-semibold block">Official Website</span>
                  <a
                    href={hotelInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-600 hover:text-gold-700 transition-colors break-all"
                  >
                    {hotelInfo.website}
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Card 2: Opening Hours */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-luxury space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-forest-900 text-gold-400 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-forest-900">
                  Opening Hours
                </h2>
                <p className="text-xs text-stone-500">
                  East Africa Time (EAT • UTC+3)
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div className="p-3.5 rounded-2xl bg-cream-50 border border-cream-200">
                <span className="font-semibold text-forest-900 block">
                  Sunrise Breakfast Buffet & Terrace
                </span>
                <span className="text-gold-700 font-medium">
                  {hotelInfo.openingHours.breakfast}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-cream-50 border border-cream-200">
                <span className="font-semibold text-forest-900 block">
                  All-Day Fine Dining & Room Service
                </span>
                <span className="text-gold-700 font-medium">
                  {hotelInfo.openingHours.allDayDining}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-cream-50 border border-cream-200">
                <span className="font-semibold text-forest-900 block">
                  Sunset Lakeside Lounge & Cocktails
                </span>
                <span className="text-gold-700 font-medium">
                  {hotelInfo.openingHours.lakesideLounge}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-forest-900 text-cream-50 border border-gold-500/40 flex items-center gap-3">
                <Coffee className="w-5 h-5 text-gold-400 shrink-0" />
                <div>
                  <span className="font-semibold text-gold-300 block">
                    Traditional Sidama Coffee Ceremony
                  </span>
                  <span className="text-xs text-cream-100">
                    {hotelInfo.openingHours.coffeeCeremony}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Culinary Branding & Amenities */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-luxury space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-forest-900 text-gold-400 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif text-xl font-bold text-forest-900">
                  Restaurant Branding
                </h2>
                <p className="text-xs text-stone-500">
                  Farm-to-Table Sidama Heritage
                </p>
              </div>
            </div>

            <p className="text-sm text-stone-600 leading-relaxed">
              {hotelInfo.culinaryPhilosophy}
            </p>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gold-700 mb-3">
                Guest Amenities & Services
              </h3>
              <ul className="space-y-2.5 text-sm text-forest-900">
                {hotelInfo.amenities.map((amenity) => (
                  <li key={amenity} className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 border-t border-cream-200 text-xs text-stone-500 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-gold-600 shrink-0" />
              <span>{hotelInfo.serviceNote}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
