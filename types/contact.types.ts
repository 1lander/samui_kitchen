import type { PageHeader } from "./common.types";

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ContactInfo {
  address: string[];
  phone: string;
  email: string;
  social: SocialLink[];
}

export interface Hours {
  weekdays: string;
  weekends: string;
}

export interface MapLocation {
  lat: number;
  lng: number;
  zoom: number;
}

export type FormFieldType = "text" | "email" | "select" | "textarea";

export interface FormField {
  name: string;
  label: string;
  type: FormFieldType;
  options?: string[];
  required: boolean;
}

export interface ContactContent {
  pageHeader: PageHeader;
  contactInfo: ContactInfo;
  hours: Hours;
  formFields: FormField[];
  location: MapLocation;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
