import React from "react";

const QuestionButtons = props => {
  return (
    <div className="buttonSpans">
      <span>
        <button onClick={props.chooseOption} value="Good">
          Good
        </button>
      </span>
      <span>
        <button onClick={props.chooseOption} value="Neutral">
          Neutral
        </button>
      </span>
      <span>
        <button onClick={props.chooseOption} value="Bad">
          Bad
        </button>
      </span>
    </div>
  );
};

export default QuestionButtons;
