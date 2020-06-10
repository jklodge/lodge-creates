import React from "react"

import "../styles.scss"

import styled from "styled-components"
import MasonryGrid from "../components/MasonryGrid"
import colours from "../colours"
import ProfilePic from "../images/jess.jpg"
const AboutPage = ({ data }) => (
  <Container>
    <H1Styled>About Me</H1Styled>
    <PStyled>
      I am Jess, a Front-end developer based and born in London, having been a
      product manager previously, I understand the importance of pixel perfect
      development. I am passionate about bringing unique and important ideas to
      life. I love working on new projects and trialling different technologies,
      most recently volunteering for a Covid19 not for profit organisation,
      whilst also continuing my work at a women's health start-up. I have
      created and developed a variety of projects both personally and
      professionally, so please feel free to click and explore.
    </PStyled>
    <img src={ProfilePic} alt="me" />
  </Container>
)

export default AboutPage

const Container = styled.div`
  width: 100%;
  padding: 60px;
  min-height: 100vh;
  height: 100%;
  background: ${colours.bgGray};
  img {
    border-radius: 30%;
  }
`

const H1Styled = styled.h1``

const PStyled = styled.p``
