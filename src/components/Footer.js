import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Social from "./social"
import styled from "styled-components"

const Footer = () => (
  <Container>
    <Social />
  </Container>
)

Footer.propTypes = {
  siteTitle: PropTypes.string,
}

Footer.defaultProps = {
  siteTitle: ``,
}

export default Footer

const Container = styled.div`
  flex: 0 100%;
`
