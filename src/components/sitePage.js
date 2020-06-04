import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
const SitePage = ({ data }) => {
  console.log("data:", data)
  const { title, rich_text, site_link } = data.prismicSites.data

  return (
    <div>
      <p>{title.text}</p>
      <p>{rich_text.text}</p>
      <a href={site_link.url}>{site_link.url}</a>
    </div>
  )
}

export const pageQuery = graphql`
  query Sites($id: String!) {
    prismicSites(id: { eq: $id }) {
      uid
      data {
        title {
          text
        }
        rich_text {
          text
        }
        site_link {
          url
        }
      }
    }
  }
`
export default SitePage
