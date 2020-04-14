import React from "react";
import "./Home.scss";
import BookImage from "../Assets/Images/2020HCP.jppeg";

function Home() {
  return (
    <div className="home">
      <img src={logo} className="App-logo" alt="logo" />

      <p>
        Helping Healthcare Professionals build multiple streams of passive
        income by creating a niche expert brand
      </p>
    </div>
  );
}

export default Home;
