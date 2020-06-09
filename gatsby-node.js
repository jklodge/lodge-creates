/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path")
exports.createPages = async ({ reporter, actions, graphql }) => {
  const { createPage } = actions
  const sitePage = path.resolve("src/components/sitePage.js")
  const result = await graphql(`
    {
      sites: allPrismicSites {
        edges {
          node {
            id
            uid
            data {
              title {
                text
              }
              image {
                url
              }
              rich_text {
                text
              }
              site_link {
                url
              }
              built_with {
                text
              }
            }
          }
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panic(result.errors)
  }
  result.data.sites.edges.forEach(({ node }) => {
    // Create a page for each blog post
    createPage({
      path: `/${node.uid}`,
      component: sitePage,
      context: {
        id: node.id,
      },
    })
  })
}
