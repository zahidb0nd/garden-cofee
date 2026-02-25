// GoogleMapEmbed — Store location map using iframe embed
interface GoogleMapEmbedProps {
    /** Custom CSS class */
    className?: string;
}

export function GoogleMapEmbed({ className = "" }: GoogleMapEmbedProps) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const query =
        process.env.NEXT_PUBLIC_GOOGLE_MAPS_QUERY ||
        "Garden+Coffee+and+Tea+Centre";

    if (!apiKey) {
        return (
            <div
                className={`flex items-center justify-center rounded-card bg-sage h-[250px] lg:h-[400px] ${className}`}
            >
                <p className="font-body text-sm text-muted text-center px-4">
                    Map unavailable. Please configure your Google Maps API key.
                </p>
            </div>
        );
    }

    const embedUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${query}`;

    return (
        <iframe
            src={embedUrl}
            title="Garden Coffee and Tea Centre store location"
            className={`w-full rounded-card h-[250px] lg:h-[400px] border-0 ${className}`}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
        />
    );
}
