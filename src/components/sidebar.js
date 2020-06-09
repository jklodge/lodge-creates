import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Social from "./social"
import "../styles.scss"
import { Link } from "gatsby"

const Sidebar = () => {
  return (
    <Container>
      <Link to="/">
        <H1Styled>Lodge Creates</H1Styled>
      </Link>
      <PStyled>
        I am Jess, a developer based in London. In short, I am passionate about
        bringing fun, meaningful or just crazy ideas to life. I enjoy working on
        new projects with different technologies. Here is a selection of
        projects I have worked on professionally, plus my own projects. Please
        feel free to explore & tell me what you think!
      </PStyled>
      <Social />
    </Container>
  )
}

export default Sidebar

const Container = styled.div`
  width: 70%;
  margin: 0 auto;
  padding: 60px;
  max-width: 360px;
  min-width: 360px;
  a {
    text-decoration: none;
  }

  @media only screen and (max-width: 768px) {
    width: auto;
  }
  @media only screen and (max-width: 378px) {
    min-width: 315px;
    padding: 40px;
  }
`

const H1Styled = styled.h1`
  text-transform: uppercase;
  font-size: 22px;
  background-color: #b1eaea;
  border: solid 15px #b1eaea;
  text-align: center;
  margin: 0 -20px;
  /* padding: 10px 4px; */
  color: #000;
  text-shadow: 1px 1px #ccc;
  @media only screen and (max-width: 768px) {
    padding: 0;
  }
`
const PStyled = styled.p`
  margin-top: 20px;
`
