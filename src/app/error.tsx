"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full text-center bg-white rounded-3xl border border-cream-200 shadow-luxury p-10">
        <div className="w-16 h-16 rounded-2xl bg-rose-900 text-cream-50 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-rose-700 mb-2">
          Something went wrong
        </p>
        <h1 className="font-serif text-3xl font-bold text-forest-900">
          We hit an unexpected error
        </h1>
        <p className="mt-3 text-sm text-stone-600 leading-relaxed">
          An error occurred while loading this page. You can try again, or return to the
          digital menu.
        </p>
        {error?.digest && (
          <p className="mt-2 text-[11px] text-stone-400 font-mono">Ref: {error.digest}</p>
        )}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-forest-900 text-gold-300 font-semibold text-sm hover:bg-forest-800 transition-colors shadow-md"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cream-100 text-forest-900 border border-cream-300 font-semibold text-sm hover:bg-cream-200 transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Menu
          </Link>
        </div>
      </div>
    </div>
  );
}