// HeritageBlock — Glass heritage story with amber left border
import Image from "next/image";
import { AnimationWrapper } from "./AnimationWrapper";

interface HeritageBlockProps {
    /** The heritage story text */
    story?: string;
    /** Optional vintage image URL */
    imageUrl?: string;
}

const DEFAULT_STORY =
    "Garden Coffee and Tea Centre began with a simple dream — a grandfather's love for the perfect cup. Decades ago, he started blending coffee and tea powders by hand, guided by an intuition passed down through generations. What started as a humble kitchen endeavour grew into a trusted neighbourhood store, where every product carries the weight of that original passion. Today, we continue his legacy, honouring the same principles of quality and care that he instilled in every blend.";

export function HeritageBlock({ story, imageUrl }: HeritageBlockProps) {
    const heritageText = story || DEFAULT_STORY;

    return (
        <section
            className="relative bg-linen py-12 md:py-20 overflow-hidden"
            aria-labelledby="heritage-heading"
        >
            {/* Subtle floating decorations */}
            <div
                className="absolute top-[20%] right-[5%] w-40 h-40 rounded-full animate-float-slow pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(201,136,58,0.08), transparent 70%)" }}
                aria-hidden="true"
            />

            <div className="mx-auto max-w-[1200px] px-6">
                <AnimationWrapper>
                    <div
                        className="glass rounded-card p-6 md:p-8"
                        style={{ borderLeft: "4px solid var(--color-accent)" }}
                    >
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto] items-center">
                            <div>
                                <h2
                                    id="heritage-heading"
                                    className="font-heading text-2xl md:text-[32px] font-bold text-text mb-4"
                                >
                                    A Legacy in Every Leaf and Bean
                                </h2>
                                <p className="font-body text-base md:text-lg text-text leading-relaxed">
                                    {heritageText}
                                </p>
                            </div>

                            {imageUrl && (
                                <div className="relative w-full md:w-[280px] aspect-[4/3] rounded-card overflow-hidden">
                                    <Image
                                        src={imageUrl}
                                        alt="Vintage photo from Garden Coffee and Tea Centre's early years"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 280px"
                                        className="object-cover"
                                        style={{ filter: "sepia(20%)" }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </AnimationWrapper>
            </div>
        </section>
    );
}
