export default function Table() {
  const [state, setState] = React.useState({
    columns: [
      { title: "First Name", field: "firstName" },
      { title: "Last Name", field: "lastName" }
    ],
    data: []
  });

  useEffect(() => {
    async function fetchData() {
      const result = await axios("http://localhost:3300/members");
      return result;
    }
    fetchData().then(result => setState({ data: result.data }));
    console.log("useEffect hook is called");
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
}
