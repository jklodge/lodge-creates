/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
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
      <Container>
        <Main>{children}</Main>
        <footer>© {new Date().getFullYear()}</footer>
      </Container>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

const Container = styled.div`
  background: #f4f4f4;
  @media only screen and (max-width: 600px) {
  }
`
const Main = styled.div`
  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    padding: 30px;
  }
`
