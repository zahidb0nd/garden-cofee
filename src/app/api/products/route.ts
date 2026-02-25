// API route: Fetch all products from Sanity CMS
import { NextResponse } from "next/server";
import { sanityFetch } from "@/lib/sanity";
import { allProductsQuery } from "@/lib/queries";

export async function GET() {
    const products = await sanityFetch(allProductsQuery);
    return NextResponse.json(products || []);
}
