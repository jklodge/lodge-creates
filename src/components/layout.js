/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import Header from "./header"
import "./layout.css"
import SEO from "./seo"

const Layout = ({ children }) => {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true)
    }, 500)
  }, [])
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      {/* <Header siteTitle={data.site.siteMetadata.title} /> */}
      <Container loaded={loaded}>
        <SEO title={"Lodge Creates"} />
        <Main>{children}</Main>
      </Container>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

const Container = styled.div`
  transition: opacity 0.5s ease-in, visibility 0.1s ease-in;
  opacity: ${({ loaded }) => (loaded ? 1 : 0)};
  visibility: ${({ loaded }) => (loaded ? "visible" : "hidden")};
  background: #f4f4f4;
  @media only screen and (max-width: 600px) {
  }
`
const Main = styled.div`
  display: flex;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    padding: 30px;
  }
`
