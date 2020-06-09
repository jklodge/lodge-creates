/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// import wrapWithProvider from "./wrap-with-provider"
import CustomLayout from "./wrap-page-element"

// export const wrapRootElement = wrapWithProvider
export const wrapPageElement = CustomLayout
