import React, { useState, useEffect } from "react";
import axios from "axios";
import { stat } from "fs";
export const DropDown = () => {
  // const [selectedCat, setCategory] = useState("Category");
  const [state, setState] = useState({
    data: [],
    search: ""
  });

  const handleChange = e => {
    console.log(e.target);
    setState({ selectedCat: [e.target.value] });
    console.log(state.dropDown);
  };

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        "https://d1i9eedhsgvpdh.cloudfront.net/production-plentific-static/api-cache/find-a-pro/api/v1/categories/all.json"
      );
      setState({ data: result.data });
      console.log("useEffect hook is called", state);
      return result;
    }
    console.log(fetchData());
    // fetchData().then(result => setState({ data: result.data }));
    // .then(result => setState({}));
  }, []);
  return state.data.length === 0 ? (
    "no data to display"
  ) : (
    <div className="input">
      <select
        onChange={e => handleChange(e)}
        className="browser-default custom-select"
      >
        {state.data.id}
        {/* {state.data.map((category, key) => (
          <option key={key} value={category}>
            {category}
          </option>
        ))} */}
      </select>
    </div>
  );
};
