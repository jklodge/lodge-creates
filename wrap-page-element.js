import React from "react"

import Layout from "./src/components/Layout"

// Pass all props (hence the ...props) to the layout component so it has access to things like pageContext or location
export default function wrapPageElement({ element, props }) {
  let sitePage = false
  if (props.path.length > 1) {
    sitePage = true
  }
  return (
    <Layout sitePage={sitePage} {...props}>
      {element}
    </Layout>
  )
}
