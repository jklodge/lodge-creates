module.exports = {
  siteMetadata: {
    title: `Lodge creates`,
    description: `A selection of websites built by Lodge Creates`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-source-prismic",
      options: {
        repositoryName: "LodgeCreates",
        // Get the correct URLs in blog posts
        linkResolver: ({ node, key, value }) => doc => {
          // Your link resolver
          if (doc.type === "sites") return `/${doc.uid}`
          // URL for a product type
          // Backup for all other types
          return "/"
        },
        // PrismJS highlighting for labels and slices
        // Remove this config option if you only have one language in your Prismic repository
        schemas: {
          sites: require("./src/schemas/sites.json"),
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/icon-96x96.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
