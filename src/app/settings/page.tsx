"use client";

import React, { useState } from "react";
import {
  SlidersHorizontal, AlertTriangle, RotateCcw, CheckCircle2, Building2,
  UtensilsCrossed, LogOut, Download, Upload, Plus, Trash2, Pencil, X, Save,
  Globe, Mail, Phone, MapPin, QrCode, Search, Copy, Check,
} from "lucide-react";
import { useMenu } from "@/context/MenuContext";
import { MENU_CATEGORIES } from "@/data/menuData";
import { MenuItem } from "@/types/menu";

type Tab = "hotel" | "menu" | "qr" | "backup";

const emptyItem: MenuItem = {
  id: "", name: "", description: "", price: 0, category: "Main Courses",
  image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80",
  available: true, isVegetarian: false, isVegan: false,
};

function Field({ label, value, onChange, type = "text", placeholder }: { label: string; value: string | number; onChange: (v: string) => void; type?: string; placeholder?: string; }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-1.5">{label}</label>
      <input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-sm text-forest-900 focus:outline-none focus:ring-2 focus:ring-gold-500" />
    </div>
  );
}

function TextAreaField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void; }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-1.5">{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className="w-full px-4 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-sm text-forest-900 focus:outline-none focus:ring-2 focus:ring-gold-500 resize-y" />
    </div>
  );
}

export default function SettingsPage() {
  const { hotelInfo, menuItems, isModified, hydrated, updateHotelInfo, toggleItemAvailability, updateItemPrice, addMenuItem, updateMenuItem, removeMenuItem, resetDemoData } = useMenu();
  const [tab, setTab] = useState<Tab>("hotel");
  const [savedBanner, setSavedBanner] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingDraft, setEditingDraft] = useState<MenuItem | null>(null);
  const [adding, setAdding] = useState(false);
  const [newItem, setNewItem] = useState<MenuItem>({ ...emptyItem, id: `item-${Date.now()}` });
  const [amenityInput, setAmenityInput] = useState("");
  const [menuSearch, setMenuSearch] = useState("");
  const [menuCategoryFilter, setMenuCategoryFilter] = useState<string>("All");
  const [qrCopied, setQrCopied] = useState(false);

  const flash = () => { setSavedBanner(true); setTimeout(() => setSavedBanner(false), 2000); };
  const handleLogout = async () => { await fetch("/api/auth/logout", { method: "POST" }); window.location.href = "/"; };
  const handleExport = () => {
    const blob = new Blob([JSON.stringify({ hotelInfo, menuItems }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `menuvista-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (parsed.hotelInfo) updateHotelInfo(parsed.hotelInfo);
        if (Array.isArray(parsed.menuItems)) parsed.menuItems.forEach((it: MenuItem) => addMenuItem(it));
        flash();
      } catch { alert("Invalid backup file."); }
    };
    reader.readAsText(file);
    e.target.value = "";
  };
  const filteredMenuItems = menuItems.filter((it) => {
    const matchesCat = menuCategoryFilter === "All" || it.category === menuCategoryFilter;
    const q = menuSearch.trim().toLowerCase();
    const matchesQ = !q || it.name.toLowerCase().includes(q) || it.description.toLowerCase().includes(q);
    return matchesCat && matchesQ;
  });
  const startEdit = (item: MenuItem) => { setEditingItemId(item.id); setEditingDraft({ ...item }); };
  const saveEdit = () => { if (!editingItemId || !editingDraft) return; updateMenuItem(editingItemId, editingDraft); setEditingItemId(null); setEditingDraft(null); flash(); };
  const cancelEdit = () => { setEditingItemId(null); setEditingDraft(null); };
  const handleAddItem = () => { if (!newItem.name.trim()) return; addMenuItem({ ...newItem, id: newItem.id || `item-${Date.now()}` }); setNewItem({ ...emptyItem, id: `item-${Date.now()}` }); setAdding(false); flash(); };
  const addAmenity = () => { if (!amenityInput.trim()) return; updateHotelInfo({ amenities: [...hotelInfo.amenities, amenityInput.trim()] }); setAmenityInput(""); flash(); };
  const removeAmenity = (idx: number) => { updateHotelInfo({ amenities: hotelInfo.amenities.filter((_, i) => i !== idx) }); flash(); };

  if (!hydrated) return <div className="min-h-screen bg-cream-50 flex items-center justify-center text-stone-500 text-sm">Loading manager data…</div>;

  return (
    <div className="min-h-screen bg-cream-50 py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-900 text-gold-300 text-xs font-semibold uppercase tracking-widest mb-3">
              <SlidersHorizontal className="w-3.5 h-3.5 text-gold-400" />
              <span>Manager Console</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest-900">Settings & Menu Manager</h1>
            <p className="mt-1 text-sm text-stone-600">Changes are saved in this browser and reflected across the menu, hotel, and QR pages.</p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            {isModified && (
              <button type="button" onClick={resetDemoData} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-900 text-cream-50 hover:bg-rose-800 text-sm font-semibold shadow-sm transition-colors">
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
            )}
            <button type="button" onClick={handleLogout} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cream-200 text-forest-900 hover:bg-cream-300 text-sm font-semibold transition-colors">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>

        <div className="p-5 sm:p-6 rounded-3xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-4 shadow-sm">
          <CheckCircle2 className="w-6 h-6 text-emerald-700 shrink-0 mt-0.5" />
          <div className="space-y-1 text-sm">
            <h2 className="font-bold text-base text-emerald-950">Persistent Local Storage</h2>
            <p className="text-emerald-900/90 leading-relaxed">Your edits are stored in this browser (localStorage) and persist across refreshes and sessions on this device. Use the <strong>Backup</strong> tab to export/import a JSON file. Clearing browser data resets to defaults.</p>
          </div>
        </div>

        {savedBanner && (
          <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-900 text-emerald-100 text-xs font-semibold shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            <span>Saved successfully.</span>
          </div>
        )}

        <div className="flex gap-2 border-b border-cream-200">
          {[
            { id: "hotel", label: "Hotel Info", icon: Building2 },
            { id: "menu", label: "Menu Items", icon: UtensilsCrossed },
            { id: "qr", label: "QR Code", icon: QrCode },
            { id: "backup", label: "Backup & Reset", icon: Download },
          ].map((t) => {
            const Icon = t.icon;
            return (
              <button key={t.id} type="button" onClick={() => setTab(t.id as Tab)} className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors ${tab === t.id ? "border-gold-600 text-forest-900" : "border-transparent text-stone-500 hover:text-forest-900"}`}>
                <Icon className="w-4 h-4" /> {t.label}
              </button>
            );
          })}
        </div>
        {tab === "hotel" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-cream-200 p-6 sm:p-8 shadow-luxury space-y-5">
              <h2 className="font-serif text-xl font-bold text-forest-900 flex items-center gap-2"><Building2 className="w-5 h-5 text-gold-600" /> Branding</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Hotel Name" value={hotelInfo.name} onChange={(v) => { updateHotelInfo({ name: v }); flash(); }} />
                <Field label="Tagline" value={hotelInfo.tagline} onChange={(v) => { updateHotelInfo({ tagline: v }); flash(); }} />
                <Field label="Restaurant Name" value={hotelInfo.restaurantName} onChange={(v) => { updateHotelInfo({ restaurantName: v }); flash(); }} />
                <Field label="Description" value={hotelInfo.description} onChange={(v) => { updateHotelInfo({ description: v }); flash(); }} />
              </div>
              <TextAreaField label="Culinary Philosophy" value={hotelInfo.culinaryPhilosophy} onChange={(v) => { updateHotelInfo({ culinaryPhilosophy: v }); flash(); }} />
              <Field label="Service Note" value={hotelInfo.serviceNote} onChange={(v) => { updateHotelInfo({ serviceNote: v }); flash(); }} />
            </div>

            <div className="bg-white rounded-3xl border border-cream-200 p-6 sm:p-8 shadow-luxury space-y-5">
              <h2 className="font-serif text-xl font-bold text-forest-900 flex items-center gap-2"><Phone className="w-5 h-5 text-gold-600" /> Contact</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Phone" value={hotelInfo.phone} onChange={(v) => { updateHotelInfo({ phone: v }); flash(); }} />
                <Field label="WhatsApp" value={hotelInfo.whatsapp} onChange={(v) => { updateHotelInfo({ whatsapp: v }); flash(); }} />
                <Field label="Email" value={hotelInfo.email} onChange={(v) => { updateHotelInfo({ email: v }); flash(); }} type="email" />
                <Field label="Website" value={hotelInfo.website} onChange={(v) => { updateHotelInfo({ website: v }); flash(); }} type="url" />
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-cream-200 p-6 sm:p-8 shadow-luxury space-y-5">
              <h2 className="font-serif text-xl font-bold text-forest-900 flex items-center gap-2"><MapPin className="w-5 h-5 text-gold-600" /> Location</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Address" value={hotelInfo.address} onChange={(v) => { updateHotelInfo({ address: v }); flash(); }} />
                <Field label="City" value={hotelInfo.city} onChange={(v) => { updateHotelInfo({ city: v }); flash(); }} />
                <Field label="Country" value={hotelInfo.country} onChange={(v) => { updateHotelInfo({ country: v }); flash(); }} />
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-cream-200 p-6 sm:p-8 shadow-luxury space-y-5">
              <h2 className="font-serif text-xl font-bold text-forest-900 flex items-center gap-2"><Globe className="w-5 h-5 text-gold-600" /> Opening Hours</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Breakfast" value={hotelInfo.openingHours.breakfast} onChange={(v) => { updateHotelInfo({ openingHours: { ...hotelInfo.openingHours, breakfast: v } }); flash(); }} />
                <Field label="All-Day Dining" value={hotelInfo.openingHours.allDayDining} onChange={(v) => { updateHotelInfo({ openingHours: { ...hotelInfo.openingHours, allDayDining: v } }); flash(); }} />
                <Field label="Lakeside Lounge" value={hotelInfo.openingHours.lakesideLounge} onChange={(v) => { updateHotelInfo({ openingHours: { ...hotelInfo.openingHours, lakesideLounge: v } }); flash(); }} />
                <Field label="Coffee Ceremony" value={hotelInfo.openingHours.coffeeCeremony} onChange={(v) => { updateHotelInfo({ openingHours: { ...hotelInfo.openingHours, coffeeCeremony: v } }); flash(); }} />
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-cream-200 p-6 sm:p-8 shadow-luxury space-y-5">
              <h2 className="font-serif text-xl font-bold text-forest-900">Amenities</h2>
              <div className="flex gap-2">
                <input value={amenityInput} onChange={(e) => setAmenityInput(e.target.value)} placeholder="Add amenity" className="flex-1 px-4 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-sm text-forest-900 focus:outline-none focus:ring-2 focus:ring-gold-500" />
                <button type="button" onClick={addAmenity} className="px-4 py-2.5 rounded-xl bg-forest-900 text-gold-300 text-sm font-semibold hover:bg-forest-800 transition-colors"><Plus className="w-4 h-4" /></button>
              </div>
              <ul className="space-y-2">
                {hotelInfo.amenities.map((a, i) => (
                  <li key={i} className="flex items-center justify-between px-3 py-2 rounded-xl bg-cream-50 border border-cream-200 text-sm">
                    <span>{a}</span>
                    <button type="button" onClick={() => removeAmenity(i)} className="text-rose-700 hover:text-rose-900"><Trash2 className="w-4 h-4" /></button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        {tab === "menu" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-cream-200 p-6 sm:p-8 shadow-luxury space-y-5">
              <div className="flex items-center justify-between border-b border-cream-200 pb-4">
                <div className="flex items-center gap-3">
                  <UtensilsCrossed className="w-5 h-5 text-gold-600" />
                  <div>
                    <h2 className="font-serif text-xl font-bold text-forest-900">Dish Availability & Pricing</h2>
                    <p className="text-xs text-stone-500">Toggle availability, adjust price, edit details, or remove dishes. Add new dishes below.</p>
                  </div>
                </div>
                <button type="button" onClick={() => setAdding((v) => !v)} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-forest-900 text-gold-300 text-sm font-semibold hover:bg-forest-800 transition-colors">
                  {adding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />} {adding ? "Cancel" : "Add Dish"}
                </button>
              </div>

              {adding && (
                <div className="p-5 rounded-2xl bg-cream-50 border border-cream-200 space-y-4">
                  <h3 className="font-serif font-bold text-forest-900">New Dish</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Name" value={newItem.name} onChange={(v) => setNewItem({ ...newItem, name: v })} />
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-1.5">Category</label>
                      <select value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value as any })} className="w-full px-4 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-sm text-forest-900 focus:outline-none focus:ring-2 focus:ring-gold-500">
                        {MENU_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <Field label="Price (ETB)" value={newItem.price} onChange={(v) => setNewItem({ ...newItem, price: Number(v) })} type="number" />
                    <div>
                      <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-1.5">Food Photo</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = () => setNewItem((prev) => ({ ...prev, image: String(reader.result) }));
                          reader.readAsDataURL(file);
                          e.target.value = "";
                        }}
                        className="w-full px-4 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-sm text-forest-900 file:mr-3 file:px-3 file:py-1.5 file:rounded-lg file:border-0 file:bg-forest-900 file:text-gold-300 file:text-xs file:font-semibold hover:file:bg-forest-800 cursor-pointer"
                      />
                      {newItem.image && <img src={newItem.image} alt="preview" className="mt-2 w-16 h-16 rounded-xl object-cover border border-cream-300" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />}
                    </div>
                  </div>
                  <TextAreaField label="Description" value={newItem.description} onChange={(v) => setNewItem({ ...newItem, description: v })} />
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!newItem.isVegetarian} onChange={(e) => setNewItem({ ...newItem, isVegetarian: e.target.checked })} /> Vegetarian</label>
                    <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!newItem.isVegan} onChange={(e) => setNewItem({ ...newItem, isVegan: e.target.checked })} /> Vegan</label>
                    <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={newItem.available} onChange={(e) => setNewItem({ ...newItem, available: e.target.checked })} /> Available</label>
                  </div>
                  <button type="button" onClick={handleAddItem} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forest-900 text-gold-300 text-sm font-semibold hover:bg-forest-800 transition-colors"><Save className="w-4 h-4" /> Save Dish</button>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={menuSearch}
                    onChange={(e) => setMenuSearch(e.target.value)}
                    placeholder="Search dishes…"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-sm text-forest-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                  />
                </div>
                <select
                  value={menuCategoryFilter}
                  onChange={(e) => setMenuCategoryFilter(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-sm text-forest-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
                >
                  <option value="All">All Categories</option>
                  {MENU_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => { menuItems.forEach((it) => { if (!it.available) toggleItemAvailability(it.id); }); flash(); }}
                    className="px-3.5 py-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-semibold hover:bg-emerald-100 transition-colors"
                  >
                    Mark All Available
                  </button>
                </div>
              </div>
              <p className="text-xs text-stone-500">
                Showing {filteredMenuItems.length} of {menuItems.length} dishes
              </p>

              <div className="divide-y divide-cream-200">
                {filteredMenuItems.map((item) => (
                  <div key={item.id} className="py-4 space-y-3">
                    {editingItemId === item.id && editingDraft ? (
                      <div className="p-4 rounded-2xl bg-cream-50 border border-cream-200 space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <Field label="Name" value={editingDraft.name} onChange={(v) => setEditingDraft({ ...editingDraft, name: v })} />
                          <div>
                            <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-1.5">Category</label>
                            <select value={editingDraft.category} onChange={(e) => setEditingDraft({ ...editingDraft, category: e.target.value as any })} className="w-full px-4 py-2.5 rounded-xl bg-white border border-cream-300 text-sm text-forest-900 focus:outline-none focus:ring-2 focus:ring-gold-500">
                              {MENU_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                            </select>
                          </div>
                          <Field label="Price (ETB)" value={editingDraft.price} onChange={(v) => setEditingDraft({ ...editingDraft, price: Number(v) })} type="number" />
                          <div>
                            <label className="text-xs font-semibold uppercase tracking-wider text-stone-500 block mb-1.5">Food Photo</label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                const reader = new FileReader();
                                reader.onload = () => setEditingDraft((prev) => (prev ? { ...prev, image: String(reader.result) } : prev));
                                reader.readAsDataURL(file);
                                e.target.value = "";
                              }}
                              className="w-full px-4 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-sm text-forest-900 file:mr-3 file:px-3 file:py-1.5 file:rounded-lg file:border-0 file:bg-forest-900 file:text-gold-300 file:text-xs file:font-semibold hover:file:bg-forest-800 cursor-pointer"
                            />
                            {editingDraft.image && <img src={editingDraft.image} alt="preview" className="mt-2 w-16 h-16 rounded-xl object-cover border border-cream-300" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />}
                          </div>
                        </div>
                        <TextAreaField label="Description" value={editingDraft.description} onChange={(v) => setEditingDraft({ ...editingDraft, description: v })} />
                        <div className="flex items-center gap-3">
                          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!editingDraft.isVegetarian} onChange={(e) => setEditingDraft({ ...editingDraft, isVegetarian: e.target.checked })} /> Vegetarian</label>
                          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!editingDraft.isVegan} onChange={(e) => setEditingDraft({ ...editingDraft, isVegan: e.target.checked })} /> Vegan</label>
                          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={editingDraft.available} onChange={(e) => setEditingDraft({ ...editingDraft, available: e.target.checked })} /> Available</label>
                        </div>
                        <div className="flex gap-2">
                          <button type="button" onClick={saveEdit} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-forest-900 text-gold-300 text-sm font-semibold hover:bg-forest-800 transition-colors"><Save className="w-4 h-4" /> Save</button>
                          <button type="button" onClick={cancelEdit} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cream-200 text-forest-900 text-sm font-semibold hover:bg-cream-300 transition-colors"><X className="w-4 h-4" /> Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                          <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover bg-forest-900 shrink-0" />
                          <div>
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-700 block">{item.category}</span>
                            <h3 className="font-serif font-bold text-forest-900 text-base">{item.name}</h3>
                            <p className="text-xs text-stone-500 line-clamp-1">{item.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 self-end sm:self-center">
                          <div className="flex items-center gap-1.5">
                            <label className="text-xs font-semibold text-stone-500">ETB</label>
                            <input type="number" min={0} step={10} value={item.price} onChange={(e) => updateItemPrice(item.id, Number(e.target.value))} className="w-24 px-3 py-1.5 rounded-xl bg-cream-50 border border-cream-300 text-sm font-semibold text-forest-900 focus:outline-none focus:ring-2 focus:ring-gold-500" />
                          </div>
                          <button type="button" onClick={() => toggleItemAvailability(item.id)} className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${item.available ? "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100" : "bg-rose-50 text-rose-800 border-rose-300 hover:bg-rose-100"}`}>
                            {item.available ? "Available" : "Sold Out"}
                          </button>
                          <button type="button" onClick={() => { addMenuItem({ ...item, id: `item-${Date.now()}`, name: `${item.name} (Copy)` }); flash(); }} className="px-3 py-1.5 rounded-xl bg-cream-200 text-forest-900 text-xs font-semibold hover:bg-cream-300 transition-colors" title="Duplicate"><Copy className="w-3.5 h-3.5" /></button>
                          <button type="button" onClick={() => startEdit(item)} className="px-3 py-1.5 rounded-xl bg-cream-200 text-forest-900 text-xs font-semibold hover:bg-cream-300 transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                          <button type="button" onClick={() => { if (confirm("Delete this dish?")) { removeMenuItem(item.id); flash(); } }} className="px-3 py-1.5 rounded-xl bg-rose-100 text-rose-800 text-xs font-semibold hover:bg-rose-200 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {tab === "qr" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-cream-200 p-6 sm:p-8 shadow-luxury space-y-5">
              <h2 className="font-serif text-xl font-bold text-forest-900 flex items-center gap-2"><QrCode className="w-5 h-5 text-gold-600" /> QR Code Defaults</h2>
              <p className="text-sm text-stone-600">Configure the default URL, table label, and title used by the QR Code Generator page.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Menu URL" value={hotelInfo.qrMenuUrl ?? ""} onChange={(v) => { updateHotelInfo({ qrMenuUrl: v }); flash(); }} type="url" placeholder="https://..." />
                <Field label="Table Label" value={hotelInfo.qrTableLabel ?? ""} onChange={(v) => { updateHotelInfo({ qrTableLabel: v }); flash(); }} placeholder="Lakeside Terrace • Table 08" />
                <Field label="Poster Title" value={hotelInfo.name} onChange={(v) => { updateHotelInfo({ name: v }); flash(); }} />
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={async () => {
                    const text = hotelInfo.qrMenuUrl ?? "";
                    try {
                      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text);
                      else {
                        const ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta);
                      }
                      setQrCopied(true); setTimeout(() => setQrCopied(false), 2000);
                    } catch { /* ignore */ }
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cream-200 text-forest-900 text-sm font-semibold hover:bg-cream-300 transition-colors"
                >
                  {qrCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {qrCopied ? "Copied" : "Copy URL"}
                </button>
                <a href="/qr" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forest-900 text-gold-300 text-sm font-semibold hover:bg-forest-800 transition-colors">
                  <QrCode className="w-4 h-4" /> Open QR Generator
                </a>
              </div>
            </div>
            <div className="bg-white rounded-3xl border border-cream-200 p-6 sm:p-8 shadow-luxury space-y-5">
              <h2 className="font-serif text-xl font-bold text-forest-900 flex items-center gap-2"><QrCode className="w-5 h-5 text-gold-600" /> Live Preview</h2>
              <p className="text-xs text-stone-500">Preview reflects the URL above. Generate and download the poster from the QR Generator page.</p>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="p-4 rounded-3xl bg-cream-50 border-4 border-gold-500 shadow-xl">
                  <img
                    alt="QR preview"
                    className="w-40 h-40 object-contain"
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(hotelInfo.qrMenuUrl ?? "")}`}
                  />
                </div>
                <div className="text-sm text-stone-600 space-y-1">
                  <p><strong>Title:</strong> {hotelInfo.name}</p>
                  <p><strong>Table:</strong> {hotelInfo.qrTableLabel || "—"}</p>
                  <p><strong>URL:</strong> {hotelInfo.qrMenuUrl || "—"}</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {tab === "backup" && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-cream-200 p-6 sm:p-8 shadow-luxury space-y-5">
              <h2 className="font-serif text-xl font-bold text-forest-900 flex items-center gap-2"><Download className="w-5 h-5 text-gold-600" /> Backup & Restore</h2>
              <p className="text-sm text-stone-600">Export your current hotel info and menu to a JSON file, or import a previously exported file to restore it.</p>
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={handleExport} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forest-900 text-gold-300 text-sm font-semibold hover:bg-forest-800 transition-colors"><Download className="w-4 h-4" /> Export JSON</button>
                <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cream-200 text-forest-900 text-sm font-semibold hover:bg-cream-300 transition-colors cursor-pointer">
                  <Upload className="w-4 h-4" /> Import JSON
                  <input type="file" accept="application/json" onChange={handleImport} className="hidden" />
                </label>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-cream-200 p-6 sm:p-8 shadow-luxury space-y-5">
              <h2 className="font-serif text-xl font-bold text-forest-900 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-rose-600" /> Danger Zone</h2>
              <p className="text-sm text-stone-600">Reset all hotel info and menu items back to the default sample data. This clears your saved changes.</p>
              <button type="button" onClick={resetDemoData} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-900 text-cream-50 hover:bg-rose-800 text-sm font-semibold shadow-sm transition-colors"><RotateCcw className="w-4 h-4" /> Reset to Defaults</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
