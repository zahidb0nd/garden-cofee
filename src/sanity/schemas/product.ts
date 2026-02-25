// Sanity schema: Product — individual coffee/tea powder product
export const product = {
    name: "product",
    title: "Product",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Product Name",
            type: "string",
            validation: (Rule: { required: () => unknown }) => Rule.required(),
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "title", maxLength: 96 },
            validation: (Rule: { required: () => unknown }) => Rule.required(),
        },
        {
            name: "category",
            title: "Category",
            type: "string",
            options: {
                list: [
                    { title: "Coffee", value: "coffee" },
                    { title: "Tea", value: "tea" },
                ],
                layout: "radio",
            },
            validation: (Rule: { required: () => unknown }) => Rule.required(),
        },
        {
            name: "description",
            title: "Description",
            type: "text",
            rows: 4,
            validation: (Rule: { required: () => unknown }) => Rule.required(),
        },
        {
            name: "image",
            title: "Product Image",
            type: "image",
            options: { hotspot: true },
        },
        {
            name: "price",
            title: "Price (optional)",
            type: "number",
            description: "Leave blank to hide price on the website.",
        },
        {
            name: "isFeatured",
            title: "Featured Product",
            type: "boolean",
            description: "Show this product on the home page featured strip.",
            initialValue: false,
        },
    ],
    preview: {
        select: { title: "title", subtitle: "category", media: "image" },
    },
};
