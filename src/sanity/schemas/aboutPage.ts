// Sanity schema: AboutPage — brand story, heritage, and values
export const aboutPage = {
    name: "aboutPage",
    title: "About Page",
    type: "document",
    fields: [
        {
            name: "brandStory",
            title: "Brand Story",
            type: "text",
            rows: 8,
            description: "The main brand story paragraph(s).",
            validation: (Rule: { required: () => unknown }) => Rule.required(),
        },
        {
            name: "heritageStory",
            title: "Heritage Story (Grandfather's Legacy)",
            type: "text",
            rows: 6,
            description: "The grandfather's story block.",
        },
        {
            name: "heritageImage",
            title: "Heritage Image",
            type: "image",
            options: { hotspot: true },
            description: "Optional vintage photo for the heritage section.",
        },
        {
            name: "values",
            title: "Values",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        {
                            name: "title",
                            title: "Value Title",
                            type: "string",
                            validation: (Rule: { required: () => unknown }) =>
                                Rule.required(),
                        },
                        {
                            name: "description",
                            title: "Description",
                            type: "text",
                            rows: 3,
                        },
                        {
                            name: "icon",
                            title: "Icon Name",
                            type: "string",
                            description:
                                'Heroicon name reference, e.g. "SparklesIcon", "HeartIcon".',
                        },
                    ],
                },
            ],
        },
    ],
    preview: {
        prepare: () => ({ title: "About Page Content" }),
    },
};
