import React from "react";

export const CircleTable = props => {
  return (
    <div className="circleTable">
      {props.choiceTable
        ? props.choiceTable.map((list, i) => (
            <React.Fragment key={[i]}>
              <ul>
                <h3 style={{ textTransform: "capitalize" }}>{list[0]}</h3>
                <p>{Math.round((list[1].length / 12) * 100)}%</p>
                {list[1].map((val, i) => (
                  // <p></p>
                  <li key={`${i} + ${val}`}>{val}</li>
                ))}
              </ul>
            </React.Fragment>
          ))
        : null}
    </div>
  );
};
