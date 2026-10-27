"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock, ShieldCheck, ArrowRight, AlertTriangle } from "lucide-react";

function LoginContent() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/settings";

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError("Incorrect password. Please try again.");
        return;
      }
      router.replace(next);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center px-4 py-20">
      <div className="max-w-md w-full bg-white rounded-3xl border border-cream-200 shadow-luxury p-8 sm:p-10">
        <div className="w-14 h-14 rounded-2xl bg-forest-900 text-gold-400 flex items-center justify-center mx-auto mb-6">
          <Lock className="w-7 h-7" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-gold-700 text-center mb-2">
          Restricted Area
        </p>
        <h1 className="font-serif text-2xl font-bold text-forest-900 text-center">
          Manager Access
        </h1>
        <p className="mt-2 text-sm text-stone-600 text-center leading-relaxed">
          Enter the manager password to access the QR generator and settings panel.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label
              htmlFor="password"
              className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-1.5"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-cream-50 border border-cream-300 text-sm text-forest-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-forest-900 text-gold-300 font-semibold text-sm hover:bg-forest-800 transition-colors shadow-md disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign In"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-stone-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          Session lasts 8 hours.
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-xs text-stone-500 hover:text-gold-700 transition-colors">
            ← Back to Digital Menu
          </Link>
        </div>
      </div>
    </div>
  );
}
export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream-50 flex items-center justify-center text-stone-500 text-sm">Loading…</div>}>
      <LoginContent />
    </Suspense>
  );
}
