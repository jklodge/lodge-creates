import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import MaterialTable from "material-table";

export const Table = () => {
  const [state, setState] = useState({
    columns: [
      { title: "id", field: "id" },
      { title: "Name", field: "name" },
      { title: "Postcode", field: "postcode" },
      { title: "Review rating", field: "rating" }
    ],
    data: []
  });

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        "https://d1i9eedhsgvpdh.cloudfront.net/production-plentific-static/api-cache/find-a-pro/api/v1/categories/all.json"
      );
      return result;
    }
    fetchData().then(result => setState({ data: result.data }));
    console.log("useEffect hook is called", state);
  }, []);

  console.log("state.data", state.data);
  return state.data.length === 0 ? (
    "no data to display"
  ) : (
    <MaterialTable
      title="Members List"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.push(newData);
              setState({ ...state, data });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              setState({ ...state, data });
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              setState({ ...state, data });
            }, 600);
          })
      }}
    />
  );
};
