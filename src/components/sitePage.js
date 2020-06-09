import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import styled from "styled-components"

const SitePage = ({ data }) => {
  const {
    title,
    rich_text,
    site_link,
    image,
    built_with,
  } = data.prismicSites.data
  console.log("image:", image)

  return (
    <Container>
      <ContentContainer>
        <H1Styled>{title.text}</H1Styled>
        <PStyled>{rich_text.text}</PStyled>
        <P1Styled>{built_with.text}</P1Styled>
        <a href={site_link.url}>
          <img src={image.url} alt={title.text} />
        </a>
        <AStyled
          className="animate__animated animate__bounce"
          target="_blank"
          href={site_link.url}
        >
          Explore the site
        </AStyled>
      </ContentContainer>
    </Container>
  )
}

export const pageQuery = graphql`
  query Sites($id: String!) {
    prismicSites(id: { eq: $id }) {
      uid
      data {
        title {
          text
        }
        rich_text {
          text
        }
        site_link {
          url
        }
        image {
          url
        }
        built_with {
          text
        }
      }
    }
  }
`
export default SitePage

const Container = styled.div`
  background: #b1eaea;
  width: 100%;
  @media only screen and (max-width: 768px) {
  }
`

const H1Styled = styled.h1`
  color: #000;
  text-shadow: 1px 1px #ccc;
`

const AStyled = styled.a`
  font-weight: 700;
  &:hover {
    border-bottom: solid 1px black;
    width: fit-content;
  }
`

const PStyled = styled.p``

const P1Styled = styled.p`
  color: #008b8b;
  font-weight: 700;
`
const ContentContainer = styled.div`
  display: flex;
  background: #b1eaea;
  position: relative;
  padding: 60px 120px;
  height: 100vh;
  flex-direction: column;
  a {
    color: black;
    text-decoration: none;
    cursor: pointer;
    width: fit-content;
    margin: auto;
    &:hover {
      transition: all 0.5s ease;
      transform: scale(1.1);
    }
  }
  img {
    max-width: 400px;
    max-height: 400px;
    border-radius: 5px;
  }
  @media only screen and (max-width: 1100px) {
    height: 100%;
  }
  @media only screen and (max-width: 768px) {
    padding: 50px;
    height: 100%;
  }
`
