import React from "react";
import "./Footer.scss";
import BookImage from "../Assets/Images/2020HCP.jpeg";

function Footer() {
  return (
    <div className="footer">
      <img src={BookImage} className="2020HCP" alt="book" />
    </div>
  );
}

export default Footer;
