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
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect"

import "./layout.css"
import SEO from "./seo"
import Sidebar from "./sidebar"
import Footer from "./Footer"

const Layout = ({ children, sitePage }) => {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    window.scrollTo(0, 0)
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
      <Container loaded={loaded} sitePage={sitePage}>
        <SEO title={"Lodge Creates"} />
        <Sidebar sitePage={sitePage} isMobile={isMobile} />
        {children}
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
  display: flex;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    padding: 0;
  }
`
