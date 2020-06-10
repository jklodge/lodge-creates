import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import colours from "../colours"

const SitePage = ({ data }) => {
  const {
    title,
    rich_text,
    site_link,
    image,
    built_with,
  } = data.prismicSites.data

  return (
    <Container>
      <ContentContainer>
        <H1Styled>{title.text}</H1Styled>
        <PStyled>{rich_text.text}</PStyled>
        <P1Styled>{built_with.text}</P1Styled>
        {site_link.url ? (
          <AImageStyled href={site_link.url}>
            <img src={image.url} alt={title.text} />
          </AImageStyled>
        ) : (
          <img src={image.url} alt={title.text} />
        )}
        {site_link.url && (
          <AStyled target="_blank" href={site_link.url}>
            Explore the site
          </AStyled>
        )}
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
  background: ${colours.bgGray};
  width: 100%;
  min-height: 100vh;

  @media only screen and (max-width: 768px) {
  }
`

const H1Styled = styled.h1`
  color: #000;
  text-shadow: 1px 1px #ccc;
`

const AImageStyled = styled.a`
  img {
    margin: auto;
  }
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
  background: ${colours.bgGray};
  position: relative;
  padding: 60px 120px;
  height: 100%;
  flex-direction: column;
  a {
    color: black;
    text-decoration: none;
    cursor: pointer;
    width: fit-content;
    margin: 20px auto;
    &:hover {
      transition: all 0.5s ease;
      transform: scale(1.1);
    }
  }
  img {
    max-width: 600px;
    max-height: 400px;
    width: 90%;
    border-radius: 5px;
    @media only screen and (max-width: 768px) {
      max-width: 400px;
      max-height: 400px;
      width: 90%;
    }
  }

  @media only screen and (max-width: 1100px) {
    padding: 50px;
  }
`
