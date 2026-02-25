// ValuesRow — Three-column values section (Quality, Tradition, Community)
import {
    SparklesIcon,
    HeartIcon,
    UserGroupIcon,
} from "@heroicons/react/24/outline";
import { AnimationWrapper } from "./AnimationWrapper";

interface ValueItem {
    title: string;
    description: string;
    icon: string;
}

interface ValuesRowProps {
    values?: ValueItem[];
}

/** Map icon name strings to Heroicon components */
function getIcon(iconName: string) {
    switch (iconName) {
        case "SparklesIcon":
            return SparklesIcon;
        case "HeartIcon":
            return HeartIcon;
        case "UserGroupIcon":
            return UserGroupIcon;
        default:
            return SparklesIcon;
    }
}

// Default values if none are provided from CMS
const DEFAULT_VALUES: ValueItem[] = [
    {
        title: "Quality",
        description:
            "Every product is sourced and prepared with the utmost care, ensuring a premium experience in every cup.",
        icon: "SparklesIcon",
    },
    {
        title: "Tradition",
        description:
            "Our recipes and processes have been perfected over generations, carrying forward a legacy of craftsmanship.",
        icon: "HeartIcon",
    },
    {
        title: "Community",
        description:
            "We are more than a store — we are a gathering place for those who share a passion for fine coffee and tea.",
        icon: "UserGroupIcon",
    },
];

export function ValuesRow({ values }: ValuesRowProps) {
    const items = values && values.length > 0 ? values : DEFAULT_VALUES;

    return (
        <section className="bg-background py-12 md:py-20" aria-labelledby="values-heading">
            <div className="mx-auto max-w-[1200px] px-6">
                <AnimationWrapper>
                    <h2
                        id="values-heading"
                        className="font-heading text-2xl md:text-[32px] font-bold text-text text-center mb-10 md:mb-14"
                    >
                        Our Values
                    </h2>
                </AnimationWrapper>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {items.map((value, index) => {
                        const IconComponent = getIcon(value.icon);
                        return (
                            <AnimationWrapper key={value.title} delay={index * 0.1}>
                                <div className="text-center">
                                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center">
                                        <IconComponent
                                            className="h-12 w-12 text-primary"
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <h3 className="font-accent text-xl md:text-2xl font-semibold text-text mb-2">
                                        {value.title}
                                    </h3>
                                    <p className="font-body text-sm md:text-base text-muted leading-relaxed max-w-xs mx-auto">
                                        {value.description}
                                    </p>
                                </div>
                            </AnimationWrapper>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
