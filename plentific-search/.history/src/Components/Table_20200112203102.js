import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import MaterialTable from "material-table";

export const Table = props => {
  console.log(props);

  useEffect(() => {
    if (props.pros.length > 0) {
      console.log(props.pros);
      props.pros.map(e => console.log(e));
    }
  });

  return props.length === 0 ? (
    "no data to display"
  ) : (
    <div className="input">
      <MaterialTable
        title="Your site"
        columns={[
          { title: "id", field: "id" },
          { title: "Name", field: "name" },
          { title: "Postcode", field: "postcode" },
          { title: "Review rating", field: "rating" }
        ]}
        data={props.pros}
        // editable={{
        //   onRowAdd: newData =>
        //     new Promise(resolve => {
        //       setTimeout(() => {
        //         resolve();
        //         const data = [...state.data];
        //         data.push(newData);
        //         setState({ ...state, data });
        //       }, 600);
        //     }),
        //   onRowUpdate: (newData, oldData) =>
        //     new Promise(resolve => {
        //       setTimeout(() => {
        //         resolve();
        //         const data = [...state.data];
        //         data[data.indexOf(oldData)] = newData;
        //         setState({ ...state, data });
        //       }, 600);
        //     }),
        //   onRowDelete: oldData =>
        //     new Promise(resolve => {
        //       setTimeout(() => {
        //         resolve();
        //         const data = [...state.data];
        //         data.splice(data.indexOf(oldData), 1);
        //         setState({ ...state, data });
        //       }, 600);
        //     })
        // }}
      />
    </div>
  );
};
