import styled from "styled-components"
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelopeOpen } from "@fortawesome/fontawesome-free-solid"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"

const Social = () => (
  <Container className="contact">
    <AStyled target="_blank" href="https://github.com/jklodge">
      <FontAwesomeIcon color="black" size="lg" icon={faGithub} />
    </AStyled>
    <AStyled target="_blank" href="https://www.linkedin.com/in/jessicalodge/">
      <FontAwesomeIcon color="black" size="lg" icon={faLinkedin} />
    </AStyled>
    <AStyled
      target="_blank"
      href="mailto:jessicaklodge@gmail.com?subject=Jess Lodge"
    >
      <FontAwesomeIcon color="black" size="lg" icon={faEnvelopeOpen} />
    </AStyled>
  </Container>
)
export default Social

const Container = styled.div`
  display: flex;
  margin: 20px 0;
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    position: absolute;
    right: 0;
    top: 0;
    padding: 0 5px;
  }
`

const AStyled = styled.a`
  margin: 5px;
  border: solid 1px #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 25px;
  &:hover svg {
    transform: scale(1.1);
  }
  transition: all 0.2s ease-in-out;
`
