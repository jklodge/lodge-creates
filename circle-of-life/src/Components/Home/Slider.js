import React from "react";
import "./Slider.scss";
import { IntroData } from "./IntroData.js";

const Slider = props => {
  const style = {
    left: props.left,
    width: 350,
    height: 300
  };

  return (
    <div className="HomeTextContainer">
      <h1>The COL Philosophy</h1>
      <div className="slider-wrapper">
        <ul className="slider">
          {Object.keys(IntroData).map((keyName, i) => (
            <li
              key={i}
              style={style}
              className={i + 1 === props.activeIndex ? "slider-item" : "hide"}
            >
              <div className="SliderTextContainer">
                <h3>{IntroData[keyName].title}</h3>
                <p>{IntroData[keyName].firstPara}</p>
                <p>{IntroData[keyName].secondPara}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* <div className="buttons-wrapper">
        <button className="prev-button" onClick={props.prevSlide}></button>
        <button className="next-button" onClick={props.nextSlide}></button>
      </div> */}
      <div className="indicators-wrapper">
        <ul className="indicators">
          {props.slider.map((item, index) => {
            return (
              <li
                key={index}
                className={
                  index + 1 === props.activeIndex ? "active-indicator" : ""
                }
                onClick={props.clickIndicator}
              >
                {index + 1}
              </li>
            );
          }, this)}
        </ul>
      </div>
    </div>
  );
};

export default Slider;
