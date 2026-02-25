/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: process.env.SITE_URL || "https://gardenteacentre.com",
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: "*",
                allow: "/",
            },
        ],
    },
};

module.exports = config;
