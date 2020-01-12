import React, { useState, useEffect } from "react";
import axios from "axios";
import { stat } from "fs";
export const DropDown = props => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedCat, setCategory] = useState("");
  const [state, setState] = useState({
    search: "",
    categories: [],
    data: []
  });

  const handleChange = e => {
    // console.log(e.target.value);
    setCategory(e.target.value);
    props.selectedCat(selectedCat);
    // console.log(selectedCat);
  };

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        "https://d1i9eedhsgvpdh.cloudfront.net/production-plentific-static/api-cache/find-a-pro/api/v1/categories/all.json"
      );
      return result;
    }
    fetchData().then(result => setState({ data: result.data }));
    console.log(state);
  }, []);

  return (
    <div className="input">
      <label value="ch">
        <select
          onChange={e => handleChange(e)}
          className="browser-default custom-select"
        >
          <optgroup value="Choose one" label="Choose One">
            {state.data ? (
              state.data.map((category, key) => {
                return (
                  <option
                    title="Tooltip"
                    onChange={e => handleChange(e)}
                    key={key}
                    value={category.id}
                    defaultValue={selectedCat ? selectedCat : "Choose one"}
                  >
                    {category.name}
                  </option>
                );
              })
            ) : (
              <span></span>
            )}
          </optgroup>
        </select>
      </label>
    </div>
  );
};
