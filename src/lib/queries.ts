// GROQ queries for fetching content from Sanity CMS

/** Fetch all products, ordered by title */
export const allProductsQuery = `*[_type == "product"] | order(title asc) {
  _id,
  title,
  slug,
  category,
  description,
  image,
  price,
  isFeatured
}`;

/** Fetch only featured products (for Home page strip) */
export const featuredProductsQuery = `*[_type == "product" && isFeatured == true] | order(title asc) {
  _id,
  title,
  slug,
  category,
  description,
  image,
  price,
  isFeatured
}`;

/** Fetch global site settings (single document) */
export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  _id,
  storeName,
  tagline,
  address,
  phone,
  email,
  openingHours
}`;

/** Fetch About Us page content (single document) */
export const aboutPageQuery = `*[_type == "aboutPage"][0] {
  _id,
  brandStory,
  heritageStory,
  heritageImage,
  values
}`;
