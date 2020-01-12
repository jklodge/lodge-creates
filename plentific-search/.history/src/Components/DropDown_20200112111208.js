import React, { useState } from "react";

const DropDown = () => {
  const [dropDown, setdropDown] = useState(["Work", "Home", "school"]);
  const handleChange = e => {
    console.log(e.target.value);
    console.log(dropDown);
    setdropDown(e.target.value);
  };
  const List = dropDown;

  return (
    <select
      onChange={e => handleChange(e)}
      className="browser-default custom-select"
    >
      {List.map((category, key) => (
        <option key={key} value={key}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default DropDown;
