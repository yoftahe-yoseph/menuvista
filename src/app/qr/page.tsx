"use client";

import React, { useState, useEffect, useCallback } from "react";
import QRCode from "qrcode";
import {
  QrCode,
  Download,
  Printer,
  Link as LinkIcon,
  Sparkles,
  CheckCircle2,
  UtensilsCrossed,
  Smartphone,
  Info,
  Copy,
  Check,
} from "lucide-react";
import { useMenu } from "@/context/MenuContext";

export default function QRGeneratorPage() {
  const { hotelInfo, updateHotelInfo } = useMenu();

  const [urlInput, setUrlInput] = useState<string>(
    hotelInfo.qrMenuUrl || "https://menuvista-hawassa.vercel.app"
  );
  const [customHotelTitle, setCustomHotelTitle] = useState<string>(
    hotelInfo.name
  );
  const [tableLabel, setTableLabel] = useState<string>(
    hotelInfo.qrTableLabel || "Lakeside Terrace • Table 08"
  );
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Detect current browser origin on mount so user can test with their live URL immediately,
  // but prefer a saved URL from settings when available.
  useEffect(() => {
    if (!hotelInfo.qrMenuUrl && typeof window !== "undefined" && window.location?.origin) {
      setUrlInput(window.location.origin);
    }
  }, [hotelInfo.qrMenuUrl]);

  useEffect(() => {
    setCustomHotelTitle(hotelInfo.name);
  }, [hotelInfo.name]);

  // Persist QR inputs back to settings so they survive navigation/refresh.
  useEffect(() => {
    if (urlInput && urlInput !== hotelInfo.qrMenuUrl) {
      updateHotelInfo({ qrMenuUrl: urlInput });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlInput]);

  useEffect(() => {
    if (tableLabel && tableLabel !== hotelInfo.qrTableLabel) {
      updateHotelInfo({ qrTableLabel: tableLabel });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableLabel]);

  // Keep QR inputs in sync when settings change elsewhere.
  useEffect(() => {
    if (hotelInfo.qrMenuUrl && hotelInfo.qrMenuUrl !== urlInput) {
      setUrlInput(hotelInfo.qrMenuUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotelInfo.qrMenuUrl]);

  useEffect(() => {
    if (hotelInfo.qrTableLabel && hotelInfo.qrTableLabel !== tableLabel) {
      setTableLabel(hotelInfo.qrTableLabel);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotelInfo.qrTableLabel]);

  const generateQrImage = useCallback(async (targetUrl: string) => {
    const trimmed = targetUrl.trim();
    if (!trimmed) {
      setErrorMsg("Please enter a valid website URL to encode into the QR code.");
      setQrDataUrl("");
      return;
    }
    try {
      setIsGenerating(true);
      setErrorMsg(null);
      const dataUrl = await QRCode.toDataURL(trimmed, {
        width: 640,
        margin: 2,
        errorCorrectionLevel: "H",
        color: {
          dark: "#0D241B", // Deep forest green
          light: "#FDFBF7", // Warm cream background
        },
      });
      setQrDataUrl(dataUrl);
    } catch {
      setErrorMsg("Could not generate QR code for the entered text.");
    } finally {
      setIsGenerating(false);
    }
  }, []);

  useEffect(() => {
    generateQrImage(urlInput);
  }, [urlInput, generateQrImage]);

  const handleDownloadPng = () => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    const safeName = customHotelTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    link.download = `${safeName || "menuvista"}-qr-menu.png`;
    link.href = qrDataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintPoster = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const handleCopyUrl = async () => {
    if (!urlInput) return;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(urlInput);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = urlInput;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access may be blocked; ignore silently
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header (Hidden when printing) */}
        <div className="no-print max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-900 text-gold-300 text-xs font-semibold uppercase tracking-widest mb-3">
            <QrCode className="w-3.5 h-3.5 text-gold-400" />
            <span>Hotel Table & Room Service QR Studio</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900">
            Generate Your Hotel QR Code & Printable Table Poster
          </h1>
          <p className="mt-2 text-sm sm:text-base text-stone-600 leading-relaxed">
            Enter your live deployed Vercel website URL below to generate a
            high-resolution QR code. Download the standalone PNG or print a ready-to-frame
            table tent poster for <span className="font-semibold text-forest-900">{hotelInfo.name}</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Controls & Configuration (Hidden when printing) */}
          <div className="no-print lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-cream-200 p-6 sm:p-8 shadow-luxury space-y-6">
              <h2 className="font-serif text-xl font-bold text-forest-900 flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-gold-600" />
                1. Configure Menu Destination URL
              </h2>

              {/* Website URL Field */}
              <div>
                <label
                  htmlFor="qr-url-input"
                  className="block text-xs font-bold uppercase tracking-wider text-forest-800 mb-2"
                >
                  Public Menu Website URL
                </label>
                <div className="flex gap-2">
                  <input
                    id="qr-url-input"
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://your-hotel-menu.vercel.app"
                    className="w-full px-4 py-3 rounded-xl bg-cream-50 border border-cream-300 text-forest-900 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                  <button
                    type="button"
                    onClick={handleCopyUrl}
                    title="Copy URL"
                    className="px-3.5 py-3 rounded-xl bg-cream-100 hover:bg-cream-200 text-forest-900 border border-cream-300 transition-colors shrink-0"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-700" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <p className="mt-1.5 text-xs text-stone-500">
                  The QR code updates automatically in real time as you type any URL.
                </p>
              </div>

              {/* Hotel Name on Poster */}
              <div>
                <label
                  htmlFor="poster-hotel-name"
                  className="block text-xs font-bold uppercase tracking-wider text-forest-800 mb-2"
                >
                  Hotel / Restaurant Display Name
                </label>
                <input
                  id="poster-hotel-name"
                  type="text"
                  value={customHotelTitle}
                  onChange={(e) => setCustomHotelTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-cream-50 border border-cream-300 text-forest-900 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>

              {/* Optional Table / Room Badge */}
              <div>
                <label
                  htmlFor="poster-table-label"
                  className="block text-xs font-bold uppercase tracking-wider text-forest-800 mb-2"
                >
                  Table or Suite Badge (Optional)
                </label>
                <input
                  id="poster-table-label"
                  type="text"
                  value={tableLabel}
                  onChange={(e) => setTableLabel(e.target.value)}
                  placeholder="e.g., Lakeside Terrace • Table 08"
                  className="w-full px-4 py-3 rounded-xl bg-cream-50 border border-cream-300 text-forest-900 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500"
                />
              </div>

              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-medium">
                  {errorMsg}
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 space-y-3">
                <button
                  type="button"
                  onClick={() => generateQrImage(urlInput)}
                  disabled={isGenerating}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-forest-900 text-gold-300 hover:bg-forest-800 font-semibold text-sm shadow-md transition-colors"
                >
                  <QrCode className="w-4 h-4" />
                  {isGenerating ? "Generating QR Code..." : "Generate / Refresh QR Code"}
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleDownloadPng}
                    disabled={!qrDataUrl}
                    className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-gold-500 text-forest-950 hover:bg-gold-400 disabled:opacity-50 font-semibold text-sm shadow-sm transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download PNG
                  </button>

                  <button
                    type="button"
                    onClick={handlePrintPoster}
                    disabled={!qrDataUrl}
                    className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-white text-forest-900 border-2 border-forest-900 hover:bg-cream-100 disabled:opacity-50 font-semibold text-sm transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                    Print QR Poster
                  </button>
                </div>
              </div>
            </div>

            {/* Deployment Guidance Box */}
            <div className="bg-forest-900 text-cream-50 rounded-3xl p-6 border border-gold-500/40 space-y-3">
              <div className="flex items-center gap-2 text-gold-400 font-serif font-bold text-base">
                <Info className="w-5 h-5 shrink-0" />
                <span>Best Practice for Production Deployment</span>
              </div>
              <p className="text-xs sm:text-sm text-cream-200/90 leading-relaxed">
                After deploying <span className="text-gold-300 font-semibold">MenuVista</span> to{" "}
                <span className="underline decoration-gold-400">Vercel</span>, open this{" "}
                <code className="px-1.5 py-0.5 rounded bg-forest-950 text-gold-300">/qr</code> page on
                your live Vercel domain. Your public production URL will automatically
                populate above so you can print permanent QR table stands for your guests.
              </p>
            </div>
          </div>

          {/* Right Column: Printable Luxury Hotel QR Poster Preview */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="print-only-poster w-full max-w-lg bg-forest-950 text-cream-50 rounded-[32px] p-6 sm:p-10 shadow-2xl border-2 border-gold-500/60 relative overflow-hidden">
              {/* Ornamental Corner Frame */}
              <div className="border border-gold-500/35 rounded-[24px] p-6 sm:p-8 flex flex-col items-center text-center relative bg-gradient-to-b from-forest-900/90 to-forest-950">
                {/* Hotel Emblem */}
                <div className="w-14 h-14 rounded-2xl bg-forest-800 border border-gold-500/60 flex items-center justify-center shadow-lg mb-4">
                  <UtensilsCrossed className="w-7 h-7 text-gold-400" />
                </div>

                <span className="text-[11px] uppercase tracking-[0.25em] text-gold-400 font-semibold">
                  {hotelInfo.city}, {hotelInfo.country}
                </span>

                <h2 className="mt-1 font-serif text-2xl sm:text-3xl font-bold text-cream-50 tracking-wide">
                  {customHotelTitle || hotelInfo.name}
                </h2>

                <p className="text-xs sm:text-sm text-gold-300/90 font-medium mt-1">
                  {hotelInfo.restaurantName}
                </p>

                {tableLabel && (
                  <div className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gold-500/15 border border-gold-500/40 text-gold-300 text-xs font-semibold">
                    <Sparkles className="w-3 h-3" />
                    <span>{tableLabel}</span>
                  </div>
                )}

                {/* Main Call to Action Headline Required by Spec */}
                <div className="mt-6 mb-4">
                  <span className="inline-block px-5 py-2 rounded-full bg-gold-500 text-forest-950 font-serif font-bold text-lg sm:text-xl tracking-wide shadow-md">
                    Scan to View Our Menu
                  </span>
                </div>

                {/* QR Code Canvas Card */}
                <div className="p-4 sm:p-5 rounded-3xl bg-cream-50 border-4 border-gold-500 shadow-xl my-2">
                  {qrDataUrl ? (
                    <img
                      src={qrDataUrl}
                      alt={`QR Code for ${customHotelTitle}`}
                      className="w-56 h-56 sm:w-64 sm:h-64 object-contain mx-auto"
                    />
                  ) : (
                    <div className="w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center text-forest-900 text-xs">
                      Enter a valid URL to preview QR
                    </div>
                  )}
                </div>

                {/* Encoded URL Readout */}
                <p className="mt-3 text-[11px] text-cream-200/75 font-mono break-all max-w-xs">
                  {urlInput}
                </p>

                {/* 3-Step Guest Instructions */}
                <div className="mt-6 pt-5 border-t border-gold-500/25 grid grid-cols-3 gap-3 w-full text-left">
                  <div className="bg-forest-900/70 p-3 rounded-xl border border-gold-500/20">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400 block">
                      Step 1
                    </span>
                    <p className="text-xs text-cream-100 mt-0.5 font-medium">
                      Open phone camera
                    </p>
                  </div>
                  <div className="bg-forest-900/70 p-3 rounded-xl border border-gold-500/20">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400 block">
                      Step 2
                    </span>
                    <p className="text-xs text-cream-100 mt-0.5 font-medium">
                      Point at QR code
                    </p>
                  </div>
                  <div className="bg-forest-900/70 p-3 rounded-xl border border-gold-500/20">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400 block">
                      Step 3
                    </span>
                    <p className="text-xs text-cream-100 mt-0.5 font-medium">
                      Browse dishes & prices
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-gold-300/80">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>No app download required • Works on iPhone & Android</span>
                </div>
              </div>
            </div>

            {/* Verification Footnote (Hidden on print) */}
            <div className="no-print mt-4 flex items-center gap-2 text-xs text-stone-600">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>
                This QR code encodes the exact URL:{" "}
                <strong className="text-forest-900">{urlInput}</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
