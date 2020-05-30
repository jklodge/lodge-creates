import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import Social from "./social"

const Sidebar = ({ siteTitle }) => (
  <Container>
    <H4Styled>Lodge Creates</H4Styled>
    <p>
      I am Jess, a developer based in London. In short, I am passionate about
      bringing fun, helpful or just crazy ideas to life. I enjoy working on new
      things with different technologies. Here is a selection of projects I've
      worked on professionally, plus my own projects. Please feel free to
      explore & tell me what you think!
    </p>
    <Social />
  </Container>
)

export default Sidebar

const Container = styled.div`
  width: 85%;
  margin: 0;
  margin-right: 40px;
  padding: 60px;
  &:hover {
    transform: scale(1.1);
  }
  transition: all 0.2s ease-in-out;
`

const H4Styled = styled.h4`
  text-transform: uppercase;
`
