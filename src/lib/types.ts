// TypeScript type definitions for Sanity CMS content models

// Sanity image reference type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = Record<string, any>;

/** A single product entry from the CMS */
export interface Product {
  _id: string;
  _type: "product";
  title: string;
  slug: { current: string };
  category: "coffee" | "tea";
  description: string;
  image: SanityImageSource;
  fallbackImage?: string;
  price?: number;
  isFeatured: boolean;
}

/** Global site settings (store name, contact, hours) */
export interface SiteSettings {
  _id: string;
  _type: "siteSettings";
  storeName: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  openingHours: string;
}

/** A single value item (Quality, Tradition, Community) */
export interface Value {
  _key: string;
  title: string;
  description: string;
  icon: string; // Heroicon name reference
}

/** About Us page content from the CMS */
export interface AboutPageContent {
  _id: string;
  _type: "aboutPage";
  brandStory: string;
  heritageStory: string;
  heritageImage?: SanityImageSource;
  values: Value[];
}
