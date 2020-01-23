import React, { useState, useEffect } from 'react';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableGroupRow,
  GroupingPanel,
  TableEditRow,
  TableEditColumn,
  Toolbar,
  DragDropProvider,
  TableColumnReordering,
  SearchPanel,
} from '@devexpress/dx-react-grid-bootstrap4';

import {
  SortingState,
  IntegratedSorting,
  GroupingState,
  IntegratedGrouping,
  EditingState,
  SearchState,
  IntegratedFiltering
} from '@devexpress/dx-react-grid';

import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';

const getRowId = row => row.id;

const initialArray = [
  { name: "Sandra Sonder", email: "sandra.sonder@planned.com", group: "Marketing", },
  { name: "Paul Poli", email: "paul.poli@planned.com", group: "Marketing", },
  { name: "Mark Marker", email: "mark.marker@planned.com", group: "Human Resources", },
  { name: "Paul Paulizky", email: "paul.paulizky@planned.com", group: "Engineering", },
  { name: "Linda Linder", email: "linda.linder@planned.com", group: "Management", }
]

const initialRows = initialArray.map((row, index) => ({ ...row, id: index }))

function App() {

  const [columns] = useState(
    [
      { name: "name", title: "Employee" },
      { name: "email", title: "Email" },
      { name: "group", title: "Group" },
    ]
  );
  const [rows, setRows] = useState(
    localStorage.getItem("rows")
      ? JSON.parse(localStorage.getItem("rows")) : initialRows);

  const [sorting, setSorting] = useState([{ columnName: 'group', direction: 'asc' }]);

  const [grouping, setGrouping] = useState([]);

  const [columnOrder, setColumnOrder] = useState(['name', 'email', 'group']);
  
  const [searchValue, setSearchState] = useState('');

  const [editingColumnExtensions] = useState([
    {
      columnName: 'name',
      createRowChange: (row, value) => ({ ...row, name: value }),
    },
    {
      columnName: 'email',
      createRowChange: (row, value) => ({ ...row, email: value }),
    },
    {
      columnName: 'group',
      createRowChange: (row, value) => ({ ...row, group: value }),
    },
  ]);
  // const [filters, setFilters] = useState([{ columnName: '', value: '' }]);



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

  useEffect(() => {
    localStorage.setItem("rows", JSON.stringify(rows))
    localStorage.setItem("sorting", JSON.stringify(sorting))
    localStorage.setItem("grouping", JSON.stringify(grouping))
    localStorage.setItem("columnOrder", JSON.stringify(columnOrder))
  }, [rows, sorting, grouping, columnOrder]);

  return (
    <div className="card">
      <Grid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
      >
        <DragDropProvider />

        <SortingState
          sorting={sorting}
          onSortingChange={setSorting}
        />
        <IntegratedSorting />

        <GroupingState
          grouping={grouping}
          onGroupingChange={setGrouping}
        />
        <IntegratedGrouping />

        <EditingState
          columnExtensions={editingColumnExtensions}
          onCommitChanges={commitChanges}
        />

        <SearchState
          value={searchValue}
          onValueChange={setSearchState}
        />
        <IntegratedFiltering />
        <Table
        // tableComponent={TableComponent}
        />
        <TableColumnReordering
          order={columnOrder}
          onOrderChange={setColumnOrder}
        />
        <TableHeaderRow showGroupingControls showSortingControls />
        <TableGroupRow />
        <TableEditRow />
        <Toolbar />
        <GroupingPanel showGroupingControls showSortingControls />
        <TableEditColumn showAddCommand showEditCommand showDeleteCommand />
        <SearchPanel />
      </Grid>
    </div>
  );
}

export default App;
