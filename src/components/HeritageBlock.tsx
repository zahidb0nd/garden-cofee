// HeritageBlock — Liquid glass heritage story
import { AnimationWrapper } from "./AnimationWrapper";

interface HeritageBlockProps {
    story?: string;
    imageUrl?: string;
}

const DEFAULT_STORY =
    "Garden Coffee and Tea Centre began with a simple dream — a grandfather's love for the perfect cup. Decades ago, he started blending coffee and tea powders by hand, guided by an intuition passed down through generations. What started as a humble kitchen endeavour grew into a trusted neighbourhood store, where every product carries the weight of that original passion. Today, we continue his legacy, honouring the same principles of quality and care that he instilled in every blend.";

export function HeritageBlock({ story }: HeritageBlockProps) {
    const heritageText = story || DEFAULT_STORY;

    return (
        <section
            className="relative bg-linen py-12 md:py-20 overflow-hidden"
            aria-labelledby="heritage-heading"
        >
            {/* Morphing decorative blob */}
            <div
                className="absolute top-[20%] right-[5%] w-40 h-40 animate-morph animate-float-slow pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(201,136,58,0.08), transparent 70%)" }}
                aria-hidden="true"
            />

            <div className="mx-auto max-w-[1200px] px-6">
                <AnimationWrapper>
                    <div
                        className="liquid-glass rounded-card p-6 md:p-8"
                        style={{ borderLeft: "4px solid var(--color-accent)" }}
                    >
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
                </AnimationWrapper>
            </div>
        </section>
    );
}
