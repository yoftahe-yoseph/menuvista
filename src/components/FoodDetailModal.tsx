"use client";

import React, { useEffect } from "react";
import {
  X,
  Sparkles,
  Award,
  Leaf,
  Sprout,
  Clock,
  Flame,
  AlertCircle,
  CheckCircle2,
  Utensils,
} from "lucide-react";
import { MenuItem } from "@/types/menu";

interface FoodDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export default function FoodDetailModal({ item, onClose }: FoodDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (item) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-forest-950/75 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-food-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-cream-50 sm:rounded-3xl rounded-t-3xl overflow-hidden shadow-2xl border border-gold-500/40 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Hero Image */}
        <div className="relative h-64 sm:h-80 w-full bg-forest-900 shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/30 to-transparent" />

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close item details"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-forest-950/80 text-cream-50 hover:bg-gold-500 hover:text-forest-950 flex items-center justify-center border border-gold-500/40 transition-colors shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges on Image */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-forest-900/90 text-gold-300 border border-gold-500/40 backdrop-blur-sm">
              {item.category}
            </span>
            {item.isChefRecommended && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-gold-500 text-forest-950 shadow-sm">
                <Award className="w-3.5 h-3.5" />
                Chef&apos;s Recommendation
              </span>
            )}
            {item.isPopular && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400 text-forest-950 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                Guest Favorite
              </span>
            )}
          </div>

          {/* Title & Price Overlay */}
          <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <h2
                id="modal-food-title"
                className="font-serif text-2xl sm:text-3xl font-bold text-cream-50 drop-shadow"
              >
                {item.name}
              </h2>
            </div>
            <div className="inline-flex self-start sm:self-auto items-center px-4 py-2 rounded-2xl bg-gold-500 text-forest-950 font-serif font-bold text-xl shadow-lg shrink-0">
              ETB {item.price.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Scrollable Details Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Availability & Dietary Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-cream-200">
            <div className="flex items-center gap-2">
              {item.available ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-900 border border-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  Available Now for Table & Room Service
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-900 border border-rose-300">
                  <AlertCircle className="w-4 h-4 text-rose-700" />
                  Currently Sold Out Today
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {item.isVegan && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <Sprout className="w-3.5 h-3.5 text-emerald-600" />
                  100% Vegan (Fasting Friendly)
                </span>
              )}
              {item.isVegetarian && !item.isVegan && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-800 border border-green-200">
                  <Leaf className="w-3.5 h-3.5 text-green-600" />
                  Vegetarian
                </span>
              )}
            </div>
          </div>

          {/* Culinary Description */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gold-700">
              Chef&apos;s Tasting Notes
            </h3>
            <p className="text-base text-forest-900 leading-relaxed font-medium">
              {item.description}
            </p>
            {item.longDescription && (
              <p className="text-sm text-stone-600 leading-relaxed">
                {item.longDescription}
              </p>
            )}
          </div>

          {/* Preparation & Nutrition Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            {item.prepTime && (
              <div className="p-3.5 rounded-2xl bg-white border border-cream-200 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cream-100 flex items-center justify-center text-forest-800">
                  <Clock className="w-4 h-4 text-gold-600" />
                </div>
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-stone-400">
                    Prep Time
                  </span>
                  <span className="text-sm font-semibold text-forest-900">
                    {item.prepTime}
                  </span>
                </div>
              </div>
            )}

            {item.spiceLevel && (
              <div className="p-3.5 rounded-2xl bg-white border border-cream-200 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cream-100 flex items-center justify-center text-forest-800">
                  <Flame className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-stone-400">
                    Spice Profile
                  </span>
                  <span className="text-sm font-semibold text-forest-900">
                    {item.spiceLevel}
                  </span>
                </div>
              </div>
            )}

            {item.calories && (
              <div className="p-3.5 rounded-2xl bg-white border border-cream-200 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cream-100 flex items-center justify-center text-forest-800">
                  <Utensils className="w-4 h-4 text-gold-600" />
                </div>
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-stone-400">
                    Energy
                  </span>
                  <span className="text-sm font-semibold text-forest-900">
                    {item.calories}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Allergens Info */}
          {item.allergens && item.allergens.length > 0 && (
            <div className="p-4 rounded-2xl bg-cream-100/80 border border-cream-200 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-gold-700 shrink-0 mt-0.5" />
              <div className="text-xs text-stone-600">
                <span className="font-semibold text-forest-900">
                  Allergen Information:{" "}
                </span>
                Contains {item.allergens.join(", ")}. Please inform your server
                of any food allergies or special dietary preferences.
              </div>
            </div>
          )}

          {/* Bottom Action Button */}
          <div className="pt-2 flex items-center justify-between gap-4">
            <div className="text-xs text-stone-500">
              Ready to order? Simply mention{" "}
              <span className="font-semibold text-forest-900">
                &ldquo;{item.name}&rdquo;
              </span>{" "}
              to your table attendant or dial{" "}
              <span className="font-semibold text-forest-900">Ext. 880</span> from your room.
            </div>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-forest-900 text-cream-50 hover:bg-forest-800 font-semibold text-sm transition-colors shrink-0 shadow-md"
            >
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
