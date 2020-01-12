import React, { useState, useEffect } from "react";
import axios from "axios";
import { stat } from "fs";
export const DropDown = () => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  // const [selectedCat, setCategory] = useState("Category");
  const [state, setState] = useState({
    data: [],
    search: "",
    categories: [],
    selectedCat: ""
  });

  const handleChange = e => {
    console.log(e.target.value);
    setState({ selectedCat: [e.target.value] });
    console.log(state);
  };

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        "https://d1i9eedhsgvpdh.cloudfront.net/production-plentific-static/api-cache/find-a-pro/api/v1/categories/all.json"
      );
      return result;
    }
    fetchData().then(result => setState({ data: result.data }));
  }, []);

  const List = state.data;

  return (
    <div className="input">
      <select
        onChange={e => handleChange(e)}
        className="browser-default custom-select"
      >
        {List.id}
        {List.map((category, key) => (
          <option key={key} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};
