import React from "react";
import "./HomeMiddleSection.scss";
import * as ROUTES from "../../Constants/routes";
import { useHistory } from "react-router-dom";

export const HomeMiddleSection = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push(ROUTES.QUESTIONS);
  };

  return (
    <div className="homeMiddelSecion">
      <div className="homeMiddle"></div>
      <div className="checkPoints">
        <h1>Create a better you</h1>
        <ul className="checkList">
          <li>
            Answer 12 simple questions to generate your personalised Circle Of
            Life
          </li>
          <li>
            Find out what parts of your life are doing well and what parts need
            improving
          </li>
          <li>Understand the specific problems that are holding you back</li>
          <li>Find solutions that will help you thrive</li>
        </ul>
      </div>
      <div className="buttonContainer">
        <button
          onClick={handleClick}
          // disabled={!this.props.questions}
          // style={{
          //   background: this.props.questions
          //     ? "#b666d2"
          //     : "rgba(182,102,210, 0.3)"
          // }}
        >
          <p>Start</p>
        </button>
      </div>
    </div>
  );
};
