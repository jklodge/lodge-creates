import React, { useState } from "react";
import "./HomeTopSection.scss";
import * as ROUTES from "../../Constants/routes";
import { useHistory } from "react-router-dom";

export const HomeTopSection = props => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const handleClick = () => {
    setIsLoading(true);
    history.push(ROUTES.QUESTIONS);
  };

  return (
    <div className="homeTopPage">
      <h1>Your life improvement tool</h1>
      <div className="homeTopPara">
        <p>
          Want to improve your life, but unsure how? Don’t worry we’ve got you
          covered.
        </p>
        <p>
          We understand that life can be overwhelming, so we will help you take
          control and manage it in a better way.
        </p>
      </div>
      <div className="buttonContainer">
        <button
          disabled={isLoading}
          onClick={handleClick}
          // style={{
          //   background: isLoading ? "#b666d2" : "rgba(182,102,210, 0.3)"
          // }}
        >
          {!isLoading ? "Start" : "Loading questions..."}
        </button>
      </div>
    </div>
  );
};
