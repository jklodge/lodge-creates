import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { isMobile } from "react-device-detect"
import Social from "./social"
import "../styles.scss"

import colours from "../colours"
import AniLink from "gatsby-plugin-transition-link/AniLink"
import Menu from "./Menu"
import Modal from "react-modal"

const Sidebar = ({ sitePage }) => {
  const [modalIsOpen, setIsOpen] = useState(false)
  const [welcomeText, setWelcomeText] = useState(false)
  function openModal() {
    setIsOpen(true)
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00"
  }

  function closeModal() {
    setIsOpen(false)
  }

  useEffect(() => {
    const today = new Date()
    const curHr = today.getHours()

    if (curHr < 12) {
      setWelcomeText("good morning")
    } else if (curHr < 18) {
      setWelcomeText("good afternoon")
    } else {
      setWelcomeText("good evening")
    }
  }, [])

  return (
    <Container sitePage={sitePage} isMobile={isMobile}>
      {isMobile && (
        <MenuContainer onClick={openModal}>
          <MenuItem>_</MenuItem>
          <MenuItem>_</MenuItem>
          <MenuItem>_</MenuItem>
        </MenuContainer>
      )}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
      >
        <CloseStyled onClick={closeModal}>X</CloseStyled>
        <Menu closeModal={closeModal} />
      </Modal>
      <AniLink swipe direction="right" to="/">
        <H1Styled>{welcomeText}</H1Styled>
      </AniLink>
      {!sitePage || (sitePage && !isMobile) ? (
        <PStyled>
          I am a Frontend developer based in London. In short, I am passionate
          about bringing fun, meaningful and unique ideas to life. I enjoy
          working on new projects with different technologies. Here is a
          selection of projects I have worked on professionally, plus my own
          projects. Please feel free to explore & tell me what you think!
        </PStyled>
      ) : null}
      {!isMobile && (
        <LinkContainer>
          {sitePage && (
            <LinkStyled1 swipe direction="right" to="/">
              Home >
            </LinkStyled1>
          )}
          <LinkStyled1 swipe direction="right" to="/about">
            About Me >
          </LinkStyled1>
        </LinkContainer>
      )}

      {!isMobile && <Social />}
    </Container>
  )
}

export default Sidebar

const Container = styled.div`
  width: 100%;
  margin: 0;
  padding: ${({ sitePage, isMobile }) => (sitePage && isMobile ? 30 : 60)}px;
  max-width: 360px;
  min-width: 420px;
  min-height: 100vh;
  a {
    text-decoration: none;
  }
  button {
    position: absolute;
    top: 0;
    left: 0;
  }

  @media only screen and (max-width: 768px) {
    width: 300px;
    max-width: 100%;
    min-height: 160px;
    min-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px 60px 20px;
    margin: auto;
  }
  @media only screen and (max-width: 378px) {
    min-width: 315px;
    width: 280px;
    padding: 40px;
    padding-bottom: 20px;
  }
`
const MenuContainer = styled.div`
  position: absolute;
  top: -20px;
  left: 10px;
  padding: 0 10px;
  cursor: pointer;
`
const MenuItem = styled.p`
  margin: 1px;
  height: 6px;
  font-size: 55px;
`

const H1Styled = styled.h1`
  text-transform: uppercase;
  font-size: 22px;
  background-color: ${colours.bgGray};
  border: solid 15px ${colours.bgGray};
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
const PStyled = styled.p`
  margin-top: 20px;
  font-size: 17px;
`

const CloseStyled = styled.p`
  cursor: pointer;
  font-size: 30px;
  font-weight: 700;
`

const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
  padding: 0;
  margin: 20px;
`

const LinkStyled1 = styled(AniLink)`
  color: black;
  cursor: pointer;
  font-weight: 700;
  &:hover {
    transform: scale(1.1);
  }
`
