import React from "react";
import "./Footer.scss";
import instagram from "../Assets/Images/instagram.png";
import BookImage from "../Assets/Images/2020HCP.jpeg";

function Footer() {
  return (
    <div className="footer">
      <img src={BookImage} alt="book" />
      <img src={instagram} alt="instagram" />
    </div>
  );
}

export default Footer;
