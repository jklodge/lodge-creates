import React, { useState, useEffect } from "react";
import axios from "axios";
export const DropDown = props => {
  const [selectedCat, setCategory] = useState();
  const [state, setState] = useState({
    search: "",
    categories: [],
    data: []
  });

  const handleChange = e => {
    setCategory(e.target.value);
    props.selectedCat(selectedCat);
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

  return (
    <div className="input">
      <select
        onChange={e => handleChange(e)}
        className="browser-default custom-select"
      >
        {state.data ? (
          state.data.map((category, key) => (
            <option key={key} value={category.id}>
              {category.name}
            </option>
          ))
        ) : (
          <span></span>
        )}
      </select>
    </div>
  );
};
