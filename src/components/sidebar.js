import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Social from "./social"
import "../styles.scss"

const Sidebar = () => {
  return (
    <Container>
      <H1Styled>Lodge Creates</H1Styled>
      <PStyled>
        I am Jess, a developer based in London. In short, I am passionate about
        bringing fun, helpful or just crazy ideas to life. I enjoy working on
        new things with different technologies. Here is a selection of projects
        I've worked on professionally, plus my own projects. Please feel free to
        explore & tell me what you think!
      </PStyled>
      <Social />
    </Container>
  )
}

export default Sidebar

const Container = styled.div`
  width: 70%;
  margin: 0;
  padding: 60px;

  @media only screen and (max-width: 600px) {
    width: auto;
    padding: 50px 20px;
  }
`

const H1Styled = styled.h1`
  text-transform: uppercase;
  font-size: 29px;
  background-color: #b1eaea;
  border: solid 20px #b1eaea;
  text-align: center;
  margin: 0 -20px;
  padding: 10px 4px;
`
const PStyled = styled.p`
  margin-top: 20px;
`
