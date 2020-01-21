import React, { useState } from 'react';
// import './App.css';
import { Grid, Table, TableHeaderRow } from '@devexpress/dx-react-grid-bootstrap4';
import {
  SortingState,
  IntegratedSorting,
} from '@devexpress/dx-react-grid';
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';


const TableComponent = ({ ...restProps }) => (
  <Table.Table
    {...restProps}
    className="table-striped"
  />
);

const HighlightedCell = ({ value, style, ...restProps }) => {
  console.log("value >>>>>>>", value)
  return (
  <Table.Cell
    {...restProps}
    style={{
      backgroundColor: value === "Paris" ? 'red' : undefined,
      ...style,
    }}
  >
    <span
      style={{
        color: value === "Paris" ? 'white' : undefined,
      }}
    >
      {value}
    </span>
  </Table.Cell>
)};

const Cell = (props) => {
  const { column } = props;
  if (column.name === 'group') {
    return <HighlightedCell {...props} />;
  }
  return <Table.Cell {...props} />;
};

const styles = {
  sandra: {
    backgroundColor: '#f5f5f5',
  },
  paul: {
    backgroundColor: '#a2e2a4',
  },
  mark: {
    backgroundColor: '#b3e5fc',
  }
};
const TableRow = ({ row, ...restProps }) => (
  <Table.Row
    {...restProps}
    // eslint-disable-next-line no-alert
    onClick={() => alert(JSON.stringify(row))}
    style={{
      cursor: 'pointer',
      ...styles[row.name.toLowerCase()],
    }}
  />
);
function App() {

  const [columns] = useState([
    { name: "name", title: "Name" },
    { name: "group", title: "Group" }
  ]);
  const [rows] = useState([
    { name: "Sandra", group: "Las Vegas", },
    { name: "Paul", group: "Paris", },
    { name: "Mark", group: "Paris", },
    { name: "Paul", group: "Paris", },
    { name: "Linda", group: "Austin", }
  ]);
  const [sorting, setSorting] = useState([{ columnName: '', direction: 'asc' }]);


  return (
    <div className="card">
      <Grid
        rows={rows}
        columns={columns}
      >
         <SortingState
          sorting={sorting}
          onSortingChange={setSorting}
        />
        <IntegratedSorting />
        <Table
          tableComponent={TableComponent}
          // cellComponent={Cell}
          // rowComponent = {TableRow}
        />
        <TableHeaderRow showSortingControls />
      </Grid>
    </div>
  );
}

export default App;
