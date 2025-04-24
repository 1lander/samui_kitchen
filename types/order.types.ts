import type { PageHeader } from "./common.types";
import type { DishChoice } from "./menu.types";

export interface OrderContent {
  pageHeader: PageHeader;
}

export interface OrderItem {
  name: string;
  price: number;
  dishChoice?: DishChoice;
  notes?: string;
}

export interface Order {
  items: OrderItem[];
  subtotal: number;
  total: number;
  totalItems: number;
}
