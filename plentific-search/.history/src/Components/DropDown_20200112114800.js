import React, { useState, useEffect } from "react";
import axios from "axios";
const DropDown = () => {
  // const [selectedCat, setCategory] = useState("Category");
  const [state, setState] = useState({
    dropDown: [],
    selectedCat: "Category",
    categories: []
  });
  console.log(state.dropDown);

  const handleChange = e => {
    console.log(e.target);
    setState({ selectedCat: [e.target.value] });
    console.log(state.dropDown);
  };
  const List = state.dropDown;
  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        "https://d1i9eedhsgvpdh.cloudfront.net/production-plentific-static/api-cache/find-a-pro/api/v1/categories/all.json"
      );
      return result;
    }
    fetchData().then(result =>
      setState(prevState => ({
        ...prevState,
        categories: result.categories
      }))
    );
    // .then(result => setState({}));
    console.log("useEffect hook is called", state);
  }, []);
  return (
    <select
      onChange={e => handleChange(e)}
      className="browser-default custom-select"
    >
      {/* {List.map((category, key) => (
        <option key={key} value={category}>
          {category}
        </option>
      ))} */}
    </select>
  );
};

export default DropDown;
