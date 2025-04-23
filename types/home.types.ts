import type { PageHeader } from "./common.types";

export interface Introduction {
  image: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  text: string;
  author: string;
}

export interface TestimonialSection {
  quotes: Testimonial[];
}

export interface HomeContent {
  pageHeader: PageHeader;
  introduction: Introduction;
  features: Feature[];
  testimonials: TestimonialSection;
}
