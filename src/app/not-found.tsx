import Link from "next/link";
import { UtensilsCrossed, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full text-center bg-white rounded-3xl border border-cream-200 shadow-luxury p-10">
        <div className="w-16 h-16 rounded-2xl bg-forest-900 text-gold-400 flex items-center justify-center mx-auto mb-6">
          <UtensilsCrossed className="w-8 h-8" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-gold-700 mb-2">
          404 — Page Not Found
        </p>
        <h1 className="font-serif text-3xl font-bold text-forest-900">
          This page isn&apos;t on our menu
        </h1>
        <p className="mt-3 text-sm text-stone-600 leading-relaxed">
          The page you were looking for may have moved or doesn&apos;t exist. Let&apos;s get you back
          to the digital menu or hotel information.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-forest-900 text-gold-300 font-semibold text-sm hover:bg-forest-800 transition-colors shadow-md"
          >
            <Home className="w-4 h-4" />
            Back to Digital Menu
          </Link>
          <Link
            href="/hotel"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cream-100 text-forest-900 border border-cream-300 font-semibold text-sm hover:bg-cream-200 transition-colors"
          >
            Hotel Information
          </Link>
        </div>
      </div>
    </div>
  );
}