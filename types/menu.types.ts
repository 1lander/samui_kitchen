import type { PageHeader } from "./common.types";

export type DishChoice = "chicken" | "shrimp" | "pork" | "beef" | "seafood" | "vegan";

export interface MenuItem {
  name: string;
  price: number;
  description?: string;
  dishChoices?: DishChoice[];
  image?: string;
  isPopular?: boolean;
  forbidSpecialRequests?: boolean;
}

export interface MenuCategory {
  name: string;
  items: MenuItem[];
}

export interface MenuContent {
  pageHeader: PageHeader;
  categories: MenuCategory[];
}
