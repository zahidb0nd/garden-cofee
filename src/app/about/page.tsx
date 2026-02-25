// About Us page — Brand story, Heritage block, Values row
import type { Metadata } from "next";
import { HeroSection } from "@/components/HeroSection";
import { HeritageBlock } from "@/components/HeritageBlock";
import { ValuesRow } from "@/components/ValuesRow";
import { AnimationWrapper } from "@/components/AnimationWrapper";
import { sanityFetch } from "@/lib/sanity";
import { aboutPageQuery } from "@/lib/queries";
import { urlFor } from "@/lib/sanity-image";
import type { AboutPageContent } from "@/lib/types";

export const metadata: Metadata = {
    title: "About Us",
    description:
        "Learn about Garden Coffee and Tea Centre's heritage — a story rooted in a grandfather's passion for the perfect blend, spanning generations of quality and craftsmanship.",
};

const DEFAULT_BRAND_STORY =
    "Garden Coffee and Tea Centre is more than a store — it is a story. A story that began decades ago, when a grandfather with a discerning palate and an unwavering commitment to quality started blending coffee and tea powders by hand. His methods were simple, his standards exacting, and his love for the craft infectious. Over the years, that small endeavour grew into a trusted name in the community — a place where neighbours became friends over cups of perfectly brewed coffee and aromatic tea. Today, we carry forward that legacy with the same dedication. Every product on our shelves is a testament to the values he instilled: quality without compromise, tradition with purpose, and a deep respect for the ingredients that nature provides.";

export default async function AboutPage() {
    const aboutContent = await sanityFetch<AboutPageContent>(aboutPageQuery);

    const brandStory = aboutContent?.brandStory || DEFAULT_BRAND_STORY;
    const heritageStory = aboutContent?.heritageStory;
    const heritageImageUrl = aboutContent?.heritageImage
        ? urlFor(aboutContent.heritageImage).url()
        : undefined;

    return (
        <>
            {/* Page Header */}
            <HeroSection title="About Us" compact />

            {/* Brand Story Section */}
            <section
                className="theme-bg py-12 md:py-20"
                aria-labelledby="brand-story-heading"
            >
                <div className="mx-auto max-w-[680px] px-6 text-center">
                    <AnimationWrapper>
                        <h2
                            id="brand-story-heading"
                            className="font-heading text-2xl md:text-[32px] font-bold theme-text mb-6"
                        >
                            Our Story
                        </h2>
                        <p className="font-body text-base md:text-lg theme-text leading-relaxed">
                            {brandStory}
                        </p>
                    </AnimationWrapper>
                </div>
            </section>

            {/* Heritage Block */}
            <HeritageBlock story={heritageStory} imageUrl={heritageImageUrl} />

            {/* Values Row */}
            <ValuesRow
                values={
                    aboutContent?.values?.map((v) => ({
                        title: v.title,
                        description: v.description,
                        icon: v.icon,
                    })) || undefined
                }
            />
        </>
    );
}
