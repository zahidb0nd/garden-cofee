// Sanity CMS client configuration
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

// Create a client only when the projectId is configured.
// During build without env vars, we export a null client.
export const sanityClient = projectId
    ? createClient({
        projectId,
        dataset,
        apiVersion: "2024-01-01",
        useCdn: true,
    })
    : null;

/**
 * Safe fetch helper — returns null when the CMS client is not configured
 * rather than throwing an error during build.
 */
export async function sanityFetch<T>(query: string): Promise<T | null> {
    if (!sanityClient) return null;
    try {
        return await sanityClient.fetch<T>(query);
    } catch {
        return null;
    }
}
