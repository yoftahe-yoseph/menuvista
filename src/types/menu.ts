export type MenuCategory =
  | "Breakfast"
  | "Ethiopian Traditional Food"
  | "Starters and Appetizers"
  | "Main Courses"
  | "Burgers and Sandwiches"
  | "Pizza and Pasta"
  | "Vegetarian and Vegan"
  | "Salads"
  | "Desserts"
  | "Coffee and Tea"
  | "Fresh Juice and Soft Drinks";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  price: number; // in Ethiopian Birr (ETB)
  category: MenuCategory;
  image: string;
  available: boolean;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isPopular?: boolean;
  isChefRecommended?: boolean;
  prepTime?: string;
  calories?: string;
  allergens?: string[];
  spiceLevel?: "Mild" | "Medium" | "Spicy";
}

export interface HotelInfo {
  name: string;
  tagline: string;
  restaurantName: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  description: string;
  culinaryPhilosophy: string;
  openingHours: {
    breakfast: string;
    allDayDining: string;
    lakesideLounge: string;
    coffeeCeremony: string;
  };
  amenities: string[];
  serviceNote: string;
  qrMenuUrl?: string;
  qrTableLabel?: string;
}
