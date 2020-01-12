import React, { useState, useEffect } from "react";
import axios from "axios";
import { stat } from "fs";
export const DropDown = () => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
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

  fetch(
    "https://d1i9eedhsgvpdh.cloudfront.net/production-plentific-static/api-cache/find-a-pro/api/v1/categories/all.json"
  )
    .then(response => response.json())
    .then(response => setState({ data: response }))
    .then(jsonResponse => {
      if (jsonResponse === "True") {
        setState({ data: jsonResponse.Search });
        setLoading(false);
      } else {
        setErrorMessage(jsonResponse.Error);
        setLoading(false);
      }
    });
  // useEffect(() => {
  //     const result = await axios(
  //       "https://d1i9eedhsgvpdh.cloudfront.net/production-plentific-static/api-cache/find-a-pro/api/v1/categories/all.json"
  //     );
  //     setState(prevState => ({
  //       ...prevState,
  //       data: result.data
  //     }));
  //     console.log("useEffect hook is called", state);
  //     result => setState({ data: result.data });
  //   })
  // fetchData().then(result => setState({ data: result.data }));
  // .then(result => setState({}));

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
