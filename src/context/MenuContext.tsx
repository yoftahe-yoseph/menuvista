"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { DEFAULT_HOTEL_INFO, INITIAL_MENU_ITEMS } from "@/data/menuData";
import { HotelInfo, MenuItem } from "@/types/menu";

interface MenuContextType {
  hotelInfo: HotelInfo;
  menuItems: MenuItem[];
  isModified: boolean;
  hydrated: boolean;
  updateHotelInfo: (updates: Partial<HotelInfo>) => void;
  toggleItemAvailability: (itemId: string) => void;
  updateItemPrice: (itemId: string, newPrice: number) => void;
  addMenuItem: (item: MenuItem) => void;
  updateMenuItem: (itemId: string, updates: Partial<MenuItem>) => void;
  removeMenuItem: (itemId: string) => void;
  resetDemoData: () => void;
}

const STORAGE_KEY = "mv_menu_state_v1";

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [hotelInfo, setHotelInfo] = useState<HotelInfo>(DEFAULT_HOTEL_INFO);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU_ITEMS);
  const [isModified, setIsModified] = useState<boolean>(false);
  const [hydrated, setHydrated] = useState<boolean>(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as {
          hotelInfo?: HotelInfo;
          menuItems?: MenuItem[];
          isModified?: boolean;
        };
        if (parsed.hotelInfo) setHotelInfo(parsed.hotelInfo);
        if (parsed.menuItems) setMenuItems(parsed.menuItems);
        if (typeof parsed.isModified === "boolean") setIsModified(parsed.isModified);
      }
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ hotelInfo, menuItems, isModified })
      );
    } catch {
      // ignore quota errors
    }
  }, [hotelInfo, menuItems, isModified, hydrated]);

  const markModified = () => setIsModified(true);

  const updateHotelInfo = (updates: Partial<HotelInfo>) => {
    setHotelInfo((prev) => ({ ...prev, ...updates }));
    markModified();
  };

  const toggleItemAvailability = (itemId: string) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, available: !item.available } : item
      )
    );
    markModified();
  };

  const updateItemPrice = (itemId: string, newPrice: number) => {
    if (Number.isNaN(newPrice) || newPrice < 0) return;
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, price: newPrice } : item
      )
    );
    markModified();
  };

  const addMenuItem = (item: MenuItem) => {
    setMenuItems((prev) => [item, ...prev]);
    markModified();
  };

  const updateMenuItem = (itemId: string, updates: Partial<MenuItem>) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, ...updates } : item))
    );
    markModified();
  };

  const removeMenuItem = (itemId: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== itemId));
    markModified();
  };

  const resetDemoData = () => {
    setHotelInfo(DEFAULT_HOTEL_INFO);
    setMenuItems(INITIAL_MENU_ITEMS);
    setIsModified(false);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <MenuContext.Provider
      value={{
        hotelInfo,
        menuItems,
        isModified,
        hydrated,
        updateHotelInfo,
        toggleItemAvailability,
        updateItemPrice,
        addMenuItem,
        updateMenuItem,
        removeMenuItem,
        resetDemoData,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
}
