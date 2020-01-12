import React, { useState } from "react";

const DropDown = () => {
  const [dropDown, setdropDown] = useState(["Work", "Home", "school"]);
  const [selectedCat, setCategory] = useState("Category");
  const handleChange = e => {
    console.log(e.target);
    setCategory([e.target.value]);
    console.log(selectedCat);
  };
  // const List = if(dropDown);

  return (
    <select
      onChange={e => handleChange(e)}
      className="browser-default custom-select"
    >
      {dropDown.map((category, key) => (
        <option key={key} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default DropDown;
