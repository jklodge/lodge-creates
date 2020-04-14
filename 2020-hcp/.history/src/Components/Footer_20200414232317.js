import React from "react";
import "./Nav.scss";
import BookImage from "../Assets/Images/2020HCP.jpeg";

function Nav() {
  return (
    <div className="nav">
      <img src={BookImage} className="2020HCP" alt="book" />
    </div>
  );
}

export default Nav;
