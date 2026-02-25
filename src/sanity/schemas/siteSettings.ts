// Sanity schema: SiteSettings — global store information
export const siteSettings = {
    name: "siteSettings",
    title: "Site Settings",
    type: "document",
    fields: [
        {
            name: "storeName",
            title: "Store Name",
            type: "string",
            validation: (Rule: { required: () => unknown }) => Rule.required(),
        },
        {
            name: "tagline",
            title: "Tagline",
            type: "string",
            description: "The main tagline displayed on the home page hero.",
        },
        {
            name: "address",
            title: "Store Address",
            type: "text",
            rows: 2,
        },
        {
            name: "phone",
            title: "Phone Number",
            type: "string",
        },
        {
            name: "email",
            title: "Email Address",
            type: "string",
        },
        {
            name: "openingHours",
            title: "Opening Hours",
            type: "text",
            rows: 3,
            description: "e.g. Mon–Sat: 9AM – 7PM, Sun: Closed",
        },
    ],
    preview: {
        select: { title: "storeName" },
    },
};
