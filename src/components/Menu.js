import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { isMobile } from "react-device-detect"
import Social from "./social"
import "../styles.scss"
import { Link } from "gatsby"
import colours from "../colours"
import AniLink from "gatsby-plugin-transition-link/AniLink"

const Menu = ({ sitePage, closeModal }) => {
  return (
    <Container sitePage={sitePage} isMobile={isMobile}>
      <LinkStyled onClick={() => closeModal()} swipe direction="right" to="/">
        <H1Styled>Home</H1Styled>
      </LinkStyled>
      <LinkStyled
        onClick={() => closeModal()}
        swipe
        direction="right"
        to="/about"
      >
        <H1Styled>About Me</H1Styled>
      </LinkStyled>

      <Social />
    </Container>
  )
}

export default Menu

const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const H1Styled = styled.h1`
  text-transform: uppercase;
  font-size: 22px;
  text-align: center;
  margin: 0 -20px;
  color: #000;
  text-shadow: 1px 1px #ccc;
  margin: 0;
  width: auto;
  @media only screen and (max-width: 768px) {
    padding: 0;
    width: 280px;
  }
`

const LinkStyled = styled(AniLink)`
  color: black;
  cursor: pointer;
  font-weight: 700;
  padding: 20px;
  &:hover {
    transform: scale(1.1);
  }
`
