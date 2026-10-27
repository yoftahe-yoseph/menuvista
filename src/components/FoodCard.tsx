"use client";

import React from "react";
import {
  Sparkles,
  Award,
  Leaf,
  Sprout,
  Clock,
  ChevronRight,
  Flame,
} from "lucide-react";
import { MenuItem } from "@/types/menu";

interface FoodCardProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
}

export default function FoodCard({ item, onSelect }: FoodCardProps) {
  return (
    <article
      onClick={() => onSelect(item)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(item);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${item.name}, priced at ${item.price} ETB`}
      className={`group relative bg-white rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col justify-between text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold-500 ${
        item.available
          ? "border-gold-500/25 shadow-luxury hover:shadow-luxury-hover hover:-translate-y-1"
          : "border-stone-200 bg-stone-50/90 opacity-85"
      }`}
    >
      <div>
        {/* Image Header */}
        <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-forest-900">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className={`w-full h-full object-cover transition-transform duration-500 ${
              item.available ? "group-hover:scale-105" : "grayscale-[45%]"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/75 via-transparent to-black/25" />

          {/* Top Left Badges: Popular / Chef Recommended */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[75%]">
            {item.isChefRecommended && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-forest-900/95 text-gold-300 border border-gold-500/50 shadow-sm backdrop-blur-sm">
                <Award className="w-3 h-3 text-gold-400" />
                Chef&apos;s Signature
              </span>
            )}
            {item.isPopular && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gold-500 text-forest-950 shadow-sm">
                <Sparkles className="w-3 h-3" />
                Popular
              </span>
            )}
          </div>

          {/* Top Right Availability Pill */}
          <div className="absolute top-3 right-3">
            {item.available ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-950/90 text-emerald-200 border border-emerald-500/40 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-950/90 text-rose-200 border border-rose-500/40 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                Sold Out Today
              </span>
            )}
          </div>

          {/* Bottom Bar on Image: Category & Price */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
            <span className="inline-block px-2.5 py-1 rounded-lg text-[11px] font-medium bg-black/55 text-cream-100 backdrop-blur-sm border border-white/10">
              {item.category}
            </span>
            <div className="px-3 py-1 rounded-xl bg-forest-900/95 border border-gold-500/60 text-gold-300 font-serif font-bold text-base shadow-md">
              ETB {item.price.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5">
          <h3 className="font-serif text-lg sm:text-xl font-bold text-forest-900 group-hover:text-forest-700 transition-colors line-clamp-1">
            {item.name}
          </h3>

          <p className="mt-2 text-sm text-stone-600 line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          {/* Dietary & Spice Tags */}
          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            {item.isVegan && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                <Sprout className="w-3 h-3 text-emerald-600" />
                100% Vegan
              </span>
            )}
            {item.isVegetarian && !item.isVegan && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-800 border border-green-200">
                <Leaf className="w-3 h-3 text-green-600" />
                Vegetarian
              </span>
            )}
            {item.spiceLevel && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
                <Flame className="w-3 h-3 text-amber-600" />
                {item.spiceLevel}
              </span>
            )}
            {item.prepTime && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs text-stone-500 bg-stone-100">
                <Clock className="w-3 h-3 text-stone-400" />
                {item.prepTime}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer CTA */}
      <div className="px-5 py-3.5 bg-cream-50/90 border-t border-cream-200/80 flex items-center justify-between text-xs font-semibold text-forest-800 group-hover:bg-cream-100 transition-colors">
        <span>Tap to view culinary details</span>
        <span className="inline-flex items-center gap-1 text-gold-700 group-hover:translate-x-1 transition-transform">
          Details <ChevronRight className="w-4 h-4" />
        </span>
      </div>
    </article>
  );
}
