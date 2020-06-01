import React from "react"

import Layout from "../components/layout"

// import "../styles.scss"
import Sidebar from "../components/sidebar"
import styled from "styled-components"
import MasonryGrid from "../components/MasonryGrid"

const IndexPage = ({ data }) => (
  <Layout>
    <Sidebar />
    <MasonryGrid />
  </Layout>
)

export default IndexPage

// export const query = graphql`
//   query IndexQuery {
//     allDatoCmsWork(sort: { fields: [position], order: ASC }) {
//       edges {
//         node {
//           id
//           title
//           slug
//           excerpt
//           coverImage {
//             fluid(maxWidth: 450, imgixParams: { fm: "jpg", auto: "compress" }) {
//               ...GatsbyDatoCmsSizes
//             }
//           }
//         }
//       }
//     }
//   }
// `
