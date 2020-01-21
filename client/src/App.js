import React, { useState } from 'react';
// import './App.css';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableGroupRow,
  GroupingPanel,
  Toolbar,
  TableEditRow,
  TableEditColumn,
  TableFilterRow
} from '@devexpress/dx-react-grid-bootstrap4';

import {
  SortingState,
  IntegratedSorting,
  GroupingState,
  IntegratedGrouping,
  FilteringState,
  IntegratedFiltering,
  EditingState
} from '@devexpress/dx-react-grid';

import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';

const TableComponent = ({ ...restProps }) => (
  <Table.Table
    {...restProps}
    className="table-striped"
  />
);

const getRowId = row => row.id;

const initialArray = [
  { firstName: "Sandra", lastName: "Sonder", group: "Marketing", },
  { firstName: "Paul", lastName: "Poli", group: "Marketing", },
  { firstName: "Mark", lastName: "Marker", group: "Human Resources", },
  { firstName: "Paul", lastName: "Paulizky", group: "Engineering", },
  { firstName: "Linda", lastName: "Linder", group: "Management", }
]

const initialRows = initialArray.map((row, index) => ({ ...row, id: index }))

function App() {

  const [columns] = useState([
    { name: "firstName", title: "First Name" },
    { name: "lastName", title: "Last Name" },
    { name: "group", title: "Group" },
  ]);
  const [rows, setRows] = useState(initialRows);
  const [sorting, setSorting] = useState([{ columnName: '', direction: 'asc' }]);
  const [editingColumnExtensions] = useState([
    {
      columnName: 'firstName',
      createRowChange: (row, value) => ({ ...row, firstName: value }),
    },
    {
      columnName: 'lastName',
      createRowChange: (row, value) => ({ ...row, lastName: value }),
    },
    {
      columnName: 'group',
      createRowChange: (row, value) => ({ ...row, group: value }),
    },
  ]);
  const [filters, setFilters] = useState([{ columnName: 'group', value: '' }]);


  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rows.filter(row => !deletedSet.has(row.id));
    }
    setRows(changedRows);
  };

  return (
    <div className="card">
      <Grid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
      >
        <SortingState
          sorting={sorting}
          onSortingChange={setSorting}
        />
           <FilteringState
          filters={filters}
          onFiltersChange={setFilters}
        />
        {/* <GroupingState
          defaultGrouping={[{ columnName: 'group' }]}
        /> */}
        <IntegratedSorting />
        <IntegratedFiltering />
        {/* <IntegratedGrouping /> */}
        <EditingState
          columnExtensions={editingColumnExtensions}
          onCommitChanges={commitChanges}
        />
        <Table
          tableComponent={TableComponent}
        // cellComponent={Cell}
        // rowComponent = {TableRow}
        />
        <TableHeaderRow showSortingControls />
        {/* <TableGroupRow /> */}
        <TableEditRow />
        {/* <Toolbar />
        <GroupingPanel showSortingControls /> */}
        <TableFilterRow />
        <TableEditColumn showAddCommand showEditCommand showDeleteCommand />
      </Grid>
    </div>
  );
}

export default App;
