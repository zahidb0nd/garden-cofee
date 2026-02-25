// Sanity image URL builder helper
import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./sanity";

// Only build the URL builder if client exists
const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

/** Chainable stub that returns itself for .width()/.height()/.url() when Sanity is not configured */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const emptyBuilder: any = new Proxy(
    {},
    {
        get: (_target, prop) => {
            if (prop === "url") return () => "";
            return () => emptyBuilder;
        },
    }
);

/** Generate an optimised image URL from a Sanity image reference */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
    if (!builder) return emptyBuilder;
    return builder.image(source);
}
