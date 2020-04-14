import React from "react";
import "./ComingSoon.scss";
import BookImage from "../Assets/Images/2020HCP.jpeg";

function ComingSoon() {
  return (
    <div className="comingsoon">
      <img src={BookImage} className="2020HCP" alt="book" />
      <p>Coming Soons</p>
    </div>
  );
}

export default ComingSoon;
