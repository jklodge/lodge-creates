import React, { useState } from "react";

const DropDown = () => {
  const [dropDown, setdropDown] = useState(["Work", "Home", "school"]);
  const Add = dropDown.map(Add => Add);
  const handleChange = e => {
    // console.clear(), console.log(dropDown[e.target.value]);
  };

  return (
    <select
      onChange={e => handleChange(e)}
      className="browser-default custom-select"
    >
      {Add.map((address, key) => (
        <option key={key} value={key}>
          {address}
        </option>
      ))}
    </select>
  );
};

export default DropDown;
