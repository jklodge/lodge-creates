import React from "react"
// import Masonry from "react-masonry-component"
import Masonry from "react-masonry-css"

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
import Spinner from "../images/spinner.png"
import MoulinRouge from "../images/moulinrouge.png"
import RadicalLux from "../images/radicallux.png"
import RollingStones from "../images/rollingstones.png"
import "../styles.scss"
// import { useStaticQuery } from "gatsby"
import styled from "styled-components"

const breakpointColumnsObj = {
  default: 4,
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
      <ImageContainer className="grid-item">
        <Image src={GoogleAds} alt="Google ads website" />
        <TextContainer>
          <h3>Heading</h3>
          <p>Description</p>
        </TextContainer>
      </ImageContainer>
      <ImageContainer className="grid-item">
        <Image src={Daye} alt="Daye website" />
        <TextContainer>
          <h3>Heading</h3>
          <p>Description</p>
        </TextContainer>
      </ImageContainer>
      <ImageContainer className="grid-item">
        <Image src={DayeVitals} alt="Vitals website" />
        <TextContainer>
          <h3>Heading</h3>
          <p>Description</p>
        </TextContainer>
      </ImageContainer>
      <ImageContainer className="grid-item">
        <Image src={MoulinRouge} alt="Sony Moulin Rouge website" />
        <TextContainer>
          <h3>Heading</h3>
          <p>Description</p>
        </TextContainer>
      </ImageContainer>
      <ImageContainer className="grid-item">
        <Image src={PowWow} alt="PowWow website" />
        <TextContainer>
          <h3>Heading</h3>
          <p>Description</p>
        </TextContainer>
      </ImageContainer>
      <ImageContainer className="grid-item">
        <Image src={tfa} alt="Tfa website" />
        <TextContainer>
          <h3>Heading</h3>
          <p>Description</p>
        </TextContainer>
      </ImageContainer>
      <ImageContainer className="grid-item">
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
      </ImageContainer>
      <ImageContainer className="grid-item">
        <Image src={PoemPortraits} alt="PoemPortraits" />
        <TextContainer>
          <h3>Heading</h3>
          <p>Description</p>
        </TextContainer>
      </ImageContainer>
      <ImageContainer className="grid-item">
        <Image src={RollingStones} alt="RollingStones" />
        <TextContainer>
          <h3>Heading</h3>
          <p>Description</p>
        </TextContainer>
      </ImageContainer>
      <ImageContainer className="grid-item">
        <Image src={Spinner} alt="Spinner" />
        <TextContainer>
          <h3>Heading</h3>
          <p>Description</p>
        </TextContainer>
      </ImageContainer>
      <ImageContainer className="grid-item">
        <Image src={RadicalLux} alt="RadicalLux" />
        <TextContainer>
          <h3>Heading</h3>
          <p>Description</p>
        </TextContainer>
      </ImageContainer>
    </Masonry>
  </Container>
)

export default MasonryGrid

const Container = styled.div`
  display: flex;
  background: white;
  padding: 60px;
`
const Image = styled.img`
  display: block;
  margin: 0;
  width: 100%;
  background: white;
`

const ImageContainer = styled.div`
  margin: 0 10px;
  &:hover {
    transform: scale(1.1);
  }
  transition: all 0.2s ease-in-out;
`

const TextContainer = styled.div`
  padding: 25px;
  background: white;
`
