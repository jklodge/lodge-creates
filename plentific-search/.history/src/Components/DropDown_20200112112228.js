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
  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        "https://d1i9eedhsgvpdh.cloudfront.net/production-plentific-static/api-cache/find-a-pro/api/v1/categories/all.json"
      );
      return result;
    }
    fetchData().then(result => setState({ categorys: result.name }));
    // .then(result => setState({}));
    console.log("useEffect hook is called", state);
  }, []);
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
