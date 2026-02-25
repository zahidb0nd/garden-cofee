// FilterTabs — Pill-shaped filter buttons for the product catalogue
"use client";

interface FilterTabsProps {
    /** Currently active filter */
    activeFilter: string;
    /** Callback when a filter is selected */
    onFilterChange: (filter: string) => void;
}

const FILTERS = [
    { label: "All", value: "all" },
    { label: "Coffee", value: "coffee" },
    { label: "Tea", value: "tea" },
] as const;

export function FilterTabs({ activeFilter, onFilterChange }: FilterTabsProps) {
    return (
        <div
            className="flex items-center justify-center gap-2 flex-wrap"
            role="tablist"
            aria-label="Filter products"
        >
            {FILTERS.map((filter) => {
                const isActive = activeFilter === filter.value;
                return (
                    <button
                        key={filter.value}
                        onClick={() => onFilterChange(filter.value)}
                        role="tab"
                        aria-selected={isActive}
                        className={`rounded-full px-5 py-2 font-body text-sm font-bold uppercase tracking-wider transition-colors duration-150 ease-in-out ${isActive
                                ? "bg-primary text-background"
                                : "bg-background text-primary border-2 border-primary hover:bg-sage"
                            }`}
                    >
                        {filter.label}
                    </button>
                );
            })}
        </div>
    );
}
