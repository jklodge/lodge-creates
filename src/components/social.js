import { Link } from "gatsby"
import PropTypes from "prop-types"
import styled from "styled-components"
import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelopeOpen } from "@fortawesome/fontawesome-free-solid"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"

const Social = () => (
  <div className="contact">
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
  </div>
)
export default Social

const AStyled = styled.a`
  margin: 5px;
  border: solid 1px #ccc;
  padding: 6px;
  border-radius: 25px;
  &:hover svg {
    transform: scale(1.1);
  }
  transition: all 0.2s ease-in-out;
`
