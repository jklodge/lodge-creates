import React, { useState } from "react";

const DropDown = props => {
  const [DropDownValue, setDropDownValue] = useState("");

  const handleDropDownInputChanges = e => {
    setDropDownValue(e.target.value);
  };

  const resetInputField = () => {
    setDropDownValue("");
  };

  const callDropDownFunction = e => {
    e.preventDefault();
    props.DropDown(DropDownValue);
    resetInputField();
  };

  return (
    <form className="DropDown">
      <input
        value={DropDownValue}
        onChange={handleDropDownInputChanges}
        type="text"
      />
      <input onClick={callDropDownFunction} type="submit" value="DropDown" />
    </form>
  );
};

export default DropDown;
