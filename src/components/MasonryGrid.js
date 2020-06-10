import React from "react"
import { Link } from "gatsby"
import colours from "../colours"

// import Masonry from "react-masonry-component"
import Masonry from "react-masonry-css"

import TransitionLink from "gatsby-plugin-transition-link"
import AniLink from "gatsby-plugin-transition-link/AniLink"
// import Img from "gatsby-image"
import Layout from "./layout"
import Crimeno from "../images/crimeno.png"
import Crumbs from "../images/crumbs.png"
import Daye from "../images/daye.png"
import tfa from "../images/tfa.png"
import PowWow from "../images/powwownow.png"
import GoogleAds from "../images/googleads.png"
import DayeVitals from "../images/vitals.png"
import Isthisin from "../images/isthisin.png"
import PoemPortraits from "../images/Poemportraits.png"
import MoulinRouge from "../images/moulinrouge.png"
import RadicalLux from "../images/radicallux.png"
import RollingStones from "../images/rollingstones.png"
import Audemars from "../images/audemars.png"

import "../styles.scss"
// import { useStaticQuery } from "gatsby"
import styled from "styled-components"

const breakpointColumnsObj = {
  default: 3,
  1100: 3,
  700: 2,
  500: 1,
}

const MasonryGrid = ({ data }) => (
  <Container>
    <Masonry
      className="grid"
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      <AniLink swipe direction="right" to="moulin-rouge">
        <ImageContainer className="grid-item">
          <Image src={MoulinRouge} alt="Sony Moulin Rouge website" />
          <TextContainer>
            <h3>Sony - Moulin Rouge Character Match</h3>
            <p>Built with: Angular 2+, Typsecript, Spotify API</p>
          </TextContainer>
        </ImageContainer>
      </AniLink>
      <AniLink swipe direction="right" to="/daye-blog-site">
        <ImageContainer className="grid-item">
          <Image src={DayeVitals} alt="Vitals website" />
          <TextContainer>
            <h3>Daye - Blog Site</h3>
            <p>Built with: React, Typsecript, Gatsby, Node</p>
          </TextContainer>
        </ImageContainer>
      </AniLink>
      <AniLink swipe direction="right" to="testing-for-all">
        <ImageContainer className="grid-item">
          <Image src={tfa} alt="Tfa website" />
          <TextContainer>
            <h3>Testing For All - Covid Testing Kit Site</h3>
            <p>Built with: React, Material UI, Node</p>
          </TextContainer>
        </ImageContainer>
      </AniLink>
      <AniLink swipe direction="right" to="/google-ads">
        <ImageContainer className="grid-item">
          <Image src={GoogleAds} alt="Google ads website" />
          <TextContainer>
            <h3>Google Ads</h3>
            <p>Maintained with: Angular, Python, Material UI</p>
          </TextContainer>
        </ImageContainer>
      </AniLink>
      <AniLink swipe direction="right" to="/powwownow">
        <ImageContainer className="grid-item">
          <Image src={PowWow} alt="PowWow website" />
          <TextContainer>
            <h3>PowWowNow - Sign in/Sign up Journey</h3>
            <p>Built with: React, Python</p>
          </TextContainer>
        </ImageContainer>
      </AniLink>
      {/* <ImageContainer className="grid-item">
        <Image src={Crimeno} alt="crimeno" />
        <TextContainer>
          <h3>Heading</h3>
          <p>Description</p>
        </TextContainer>
      </ImageContainer>
      <ImageContainer className="grid-item">
        <Image src={Crumbs} alt="Crumbs" />
        <TextContainer>
          <h3>Heading</h3>
          <p>Description</p>
        </TextContainer>
      </ImageContainer>
      <ImageContainer className="grid-item">
        <Image src={Isthisin} alt="Isthisin" />
        <TextContainer>
          <h3>Heading</h3>
          <p>Description</p>
        </TextContainer>
      </ImageContainer> */}
      <AniLink swipe direction="right" to="piguet-audemars">
        <ImageContainer className="grid-item">
          <Image src={Audemars} alt="Audemars site image" />
          <TextContainer>
            <h3>Financial Times - Audemars Piguet Partnership</h3>
            <p>Built with: Vanilla JS, Hugo</p>
          </TextContainer>
        </ImageContainer>
      </AniLink>
      <AniLink swipe direction="right" to="/daye-ecommerce">
        <ImageContainer className="grid-item">
          <Image src={Daye} alt="Daye website" />
          <TextContainer>
            <h3>Daye - Ecommerce</h3>
            <p>Built with: React, Typsecript, Gatsby, Node</p>
          </TextContainer>
        </ImageContainer>
      </AniLink>
      <AniLink swipe direction="right" to="selfridges-rolling-stones">
        <ImageContainer className="grid-item">
          <Image src={RollingStones} alt="RollingStones" />
          <TextContainer>
            <h3>Selfridges - Rolling Stones Site</h3>
            <p>Built with: Vanilla JS/Adobe Experience Manager </p>
          </TextContainer>
        </ImageContainer>
      </AniLink>
      <AniLink swipe direction="right" to="/poem-portraits">
        <ImageContainer className="grid-item">
          <Image src={PoemPortraits} alt="PoemPortraits" />
          <TextContainer>
            <h3>Google Arts & Culture</h3>
            <p>Managed the build of this AI experience</p>
          </TextContainer>
        </ImageContainer>
      </AniLink>
      <AniLink swipe direction="right" to="selfridges-radical-luxury">
        <ImageContainer className="grid-item">
          <Image src={RadicalLux} alt="RadicalLux" />
          <TextContainer>
            <h3>Selfridges - Radical Luxury Site</h3>
            <p>Built with: Vanilla JS/Adobe Experience Manager </p>
          </TextContainer>
        </ImageContainer>
      </AniLink>
    </Masonry>
    <Footer>© {new Date().getFullYear()}</Footer>
  </Container>
)

export default MasonryGrid

const Container = styled.div`
  display: flex;
  background: ${colours.bgGray};
  position: relative;
  padding: 35px 60px;
  a {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  p {
    color: #008b8b;
    font-weight: 700;
  }
  @media only screen and (max-width: 768px) {
    padding: 5px;
  }
`
const Image = styled.img`
  display: block;
  margin: 0;
  width: 100%;
  background: transparent;
`

const ImageContainer = styled.div`
  box-shadow: 0 0 5px #ccc;
  margin: 30px 10px;
  &:hover {
    transform: scale(1.1);
  }
  transition: all 0.3s ease-in-out;
`

const TextContainer = styled.div`
  padding: 25px;
  background: white;
`

const Footer = styled.footer`
  bottom: 0;
  position: absolute;
  margin: 11px;
`
