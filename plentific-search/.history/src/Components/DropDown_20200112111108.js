import React, { useState } from "react";

const DropDown = () => {
  const [dropDown, setdropDown] = useState(["Work", "Home", "school"]);
  const handleChange = e => {
    console.log(e.target.value);
    console.log(dropDown);
    setdropDown(e.target.value);
  };
  const List = dropDown.map(list => list);

  return (
    <select
      onChange={e => handleChange(e)}
      className="browser-default custom-select"
    >
      {List.map((address, key) => (
        <option key={key} value={key}>
          {address}
        </option>
      ))}
    </select>
  );
};

export default DropDown;
