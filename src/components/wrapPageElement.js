import React from "react"
import "./src/sass/main.scss"

import Layouts from "./src/components/Layouts"

// Pass all props (hence the ...props) to the layout component so it has access to things like pageContext or location
export default function wrapPageElement({ element, props }) {
  return <Layouts {...props}>{element}</Layouts>
}
