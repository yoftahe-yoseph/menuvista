"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  X,
  Sparkles,
  Leaf,
  Clock,
  MapPin,
  QrCode,
  UtensilsCrossed,
  Filter,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";
import { useMenu } from "@/context/MenuContext";
import { MENU_CATEGORIES } from "@/data/menuData";
import { MenuCategory, MenuItem } from "@/types/menu";
import FoodCard from "@/components/FoodCard";
import FoodDetailModal from "@/components/FoodDetailModal";

export default function CustomerMenuPage() {
  const { hotelInfo, menuItems } = useMenu();

  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | "All">("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dietaryFilter, setDietaryFilter] = useState<"all" | "vegetarian" | "vegan">("all");
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Compute counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: menuItems.length };
    for (const cat of MENU_CATEGORIES) {
      counts[cat] = menuItems.filter((i) => i.category === cat).length;
    }
    return counts;
  }, [menuItems]);

  // Filter items based on category, search query, dietary filter, and availability
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === "" ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      const matchesDietary =
        dietaryFilter === "all" ||
        (dietaryFilter === "vegetarian" && (item.isVegetarian || item.isVegan)) ||
        (dietaryFilter === "vegan" && item.isVegan);

      const matchesAvailability = !onlyAvailable || item.available;

      return (
        matchesCategory &&
        matchesSearch &&
        matchesDietary &&
        matchesAvailability
      );
    });
  }, [menuItems, selectedCategory, searchQuery, dietaryFilter, onlyAvailable]);

  const clearAllFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setDietaryFilter("all");
    setOnlyAvailable(false);
  };

  return (
    <div className="min-h-screen bg-cream-50 pb-20">
      {/* Luxury Lakeside Hero Banner */}
      <section className="relative bg-forest-900 text-cream-50 overflow-hidden border-b border-gold-500/30">
        <div
          className="absolute inset-0 opacity-25 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/80 via-forest-900/85 to-forest-950/95" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/15 border border-gold-500/40 text-gold-300 text-xs font-semibold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>{hotelInfo.restaurantName}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-cream-50 tracking-tight leading-tight">
              {hotelInfo.name}
              <span className="block text-gold-400 text-xl sm:text-2xl font-normal mt-2">
                {hotelInfo.tagline}
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-base text-cream-200/90 leading-relaxed max-w-2xl">
              Welcome to our interactive QR digital menu. Explore authentic Ethiopian
              delicacies, fresh Lake Hawassa catch, wood-fired artisanal classics,
              and ceremonial Sidama coffee—crafted fresh to order.
            </p>

            {/* Quick Info Pills */}
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-cream-100/90">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-forest-800/90 border border-gold-500/30">
                <MapPin className="w-3.5 h-3.5 text-gold-400" />
                {hotelInfo.city}, {hotelInfo.country}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-forest-800/90 border border-gold-500/30">
                <Clock className="w-3.5 h-3.5 text-gold-400" />
                All-Day Dining: {hotelInfo.openingHours.allDayDining}
              </span>
              <Link
                href="/qr"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gold-500 text-forest-950 font-semibold hover:bg-gold-400 transition-colors"
              >
                <QrCode className="w-3.5 h-3.5" />
                Table QR Poster
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Search & Category Filter Bar */}
      <section
        aria-label="Menu Search and Category Filters"
        className="sticky top-20 z-30 bg-cream-50/95 backdrop-blur-md border-b border-cream-200 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3.5">
          {/* Search Input & Quick Dietary Toggles */}
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Search Box */}
            <div className="relative flex-grow max-w-xl">
              <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes, ingredients, or cravings (e.g., Doro Wat, Tilapia, Spris, Coffee)..."
                aria-label="Search menu items"
                className="w-full pl-11 pr-10 py-3 rounded-2xl bg-white border border-cream-300 text-forest-900 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent shadow-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search query"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-stone-400 hover:text-forest-900 hover:bg-cream-100"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Dietary & Availability Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-stone-500 flex items-center gap-1 mr-1">
                <Filter className="w-3.5 h-3.5 text-gold-600" />
                Dietary:
              </span>
              <button
                type="button"
                onClick={() =>
                  setDietaryFilter(
                    dietaryFilter === "vegetarian" ? "all" : "vegetarian"
                  )
                }
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  dietaryFilter === "vegetarian"
                    ? "bg-green-800 text-white border-green-800 shadow-sm"
                    : "bg-white text-forest-900 border-cream-300 hover:border-gold-500"
                }`}
              >
                <Leaf className="w-3.5 h-3.5" />
                Vegetarian
              </button>

              <button
                type="button"
                onClick={() =>
                  setDietaryFilter(dietaryFilter === "vegan" ? "all" : "vegan")
                }
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  dietaryFilter === "vegan"
                    ? "bg-emerald-800 text-white border-emerald-800 shadow-sm"
                    : "bg-white text-forest-900 border-cream-300 hover:border-gold-500"
                }`}
              >
                <Leaf className="w-3.5 h-3.5" />
                Vegan / Fasting
              </button>

              <button
                type="button"
                onClick={() => setOnlyAvailable(!onlyAvailable)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  onlyAvailable
                    ? "bg-forest-900 text-gold-300 border-forest-900 shadow-sm"
                    : "bg-white text-forest-900 border-cream-300 hover:border-gold-500"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Available Only
              </button>
            </div>
          </div>

          {/* Horizontal Scrollable Category Pills */}
          <div
            className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 pt-0.5"
            role="tablist"
            aria-label="Food Categories"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === "All"}
              onClick={() => setSelectedCategory("All")}
              className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === "All"
                  ? "bg-forest-900 text-gold-300 shadow-sm border border-gold-500/50"
                  : "bg-white text-forest-800 border border-cream-200 hover:border-gold-400 hover:bg-cream-100"
              }`}
            >
              <span>All Categories</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[11px] ${
                  selectedCategory === "All"
                    ? "bg-gold-500 text-forest-950 font-bold"
                    : "bg-cream-100 text-stone-600"
                }`}
              >
                {categoryCounts.All}
              </span>
            </button>

            {MENU_CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategory(category)}
                  className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isSelected
                      ? "bg-forest-900 text-gold-300 shadow-sm border border-gold-500/50"
                      : "bg-white text-forest-800 border border-cream-200 hover:border-gold-400 hover:bg-cream-100"
                  }`}
                >
                  <span>{category}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[11px] ${
                      isSelected
                        ? "bg-gold-500 text-forest-950 font-bold"
                        : "bg-cream-100 text-stone-600"
                    }`}
                  >
                    {categoryCounts[category] || 0}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Menu Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Active Filter Summary Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-900">
              {selectedCategory === "All"
                ? "Complete Culinary Selection"
                : selectedCategory}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
              Showing <span className="font-semibold text-forest-900">{filteredItems.length}</span>{" "}
              {filteredItems.length === 1 ? "dish" : "dishes"} • Prices in Ethiopian Birr (ETB)
            </p>
          </div>

          {(selectedCategory !== "All" ||
            searchQuery !== "" ||
            dietaryFilter !== "all" ||
            onlyAvailable) && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-forest-800 bg-cream-200/70 hover:bg-cream-200 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All Filters
            </button>
          )}
        </div>

        {/* Empty State if no items match */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-3xl border border-cream-200 p-12 text-center max-w-lg mx-auto my-8 shadow-luxury">
            <div className="w-16 h-16 rounded-2xl bg-cream-100 border border-gold-500/30 flex items-center justify-center mx-auto mb-4 text-forest-800">
              <UtensilsCrossed className="w-8 h-8 text-gold-600" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-forest-900">
              No Matching Dishes Found
            </h3>
            <p className="mt-2 text-sm text-stone-600 leading-relaxed">
              We couldn&apos;t find any menu items matching your current search or
              dietary filters. Try clearing your search query or exploring all 11
              categories.
            </p>
            <button
              type="button"
              onClick={clearAllFilters}
              className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-forest-900 text-gold-300 font-semibold text-sm hover:bg-forest-800 transition-colors shadow-md"
            >
              <RotateCcw className="w-4 h-4" />
              Show Entire Menu
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
              <FoodCard
                key={item.id}
                item={item}
                onSelect={(clicked) => setSelectedItem(clicked)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Item Detail Modal */}
      <FoodDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );
}
