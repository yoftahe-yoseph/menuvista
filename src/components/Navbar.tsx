"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  UtensilsCrossed,
  QrCode,
  Building2,
  SlidersHorizontal,
  Menu,
  X,
  MapPin,
  Sparkles,
} from "lucide-react";
import { useMenu } from "@/context/MenuContext";

export default function Navbar() {
  const pathname = usePathname();
  const { hotelInfo, isModified } = useMenu();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Digital Menu", icon: UtensilsCrossed },
    { href: "/qr", label: "QR Generator", icon: QrCode },
    { href: "/hotel", label: "Hotel Info", icon: Building2 },
    { href: "/settings", label: "Settings", icon: SlidersHorizontal },
  ];

  return (
    <header className="sticky top-0 z-40 bg-forest-900/95 backdrop-blur-md border-b border-gold-500/25 text-cream-50 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-11 h-11 rounded-xl bg-forest-800 border border-gold-500/50 flex items-center justify-center shadow-inner group-hover:border-gold-400 transition-colors">
              <UtensilsCrossed className="w-5 h-5 text-gold-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-cream-50">
                  {hotelInfo.name}
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-gold-500/20 text-gold-300 border border-gold-500/30">
                  MenuVista
                </span>
              </div>
              <p className="text-xs text-cream-200/80 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-gold-400 shrink-0" />
                <span>
                  {hotelInfo.city}, {hotelInfo.country}
                </span>
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-gold-500 text-forest-950 font-semibold shadow-sm"
                      : "text-cream-100 hover:bg-forest-800 hover:text-gold-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                  {link.href === "/settings" && isModified && (
                    <span
                      className="w-2 h-2 rounded-full bg-amber-300 animate-pulse"
                      title="Customized settings active"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2.5 rounded-xl text-cream-100 hover:text-gold-300 hover:bg-forest-800 border border-gold-500/30 focus:outline-none"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gold-400" />
              ) : (
                <Menu className="w-6 h-6 text-gold-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-forest-950/98 border-b border-gold-500/30 px-4 pt-3 pb-5 space-y-2 animate-fadeIn">
          <div className="flex items-center justify-between px-3 pb-2 border-b border-forest-800 text-xs text-gold-300/90">
            <span className="flex items-center gap-1.5 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              {hotelInfo.restaurantName}
            </span>
            <span className="uppercase tracking-wider text-[10px]">MenuVista QR</span>
          </div>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  isActive
                    ? "bg-gold-500 text-forest-950 font-semibold"
                    : "text-cream-100 hover:bg-forest-800 hover:text-gold-300"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  {link.label}
                </span>
                {link.href === "/settings" && isModified && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">
                    Modified
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
