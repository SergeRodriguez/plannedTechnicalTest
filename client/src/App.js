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
} from '@devexpress/dx-react-grid-bootstrap4';

import {
  SortingState,
  IntegratedSorting,
  GroupingState,
  IntegratedGrouping,
  EditingState,
} from '@devexpress/dx-react-grid';

import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';

const getRowId = row => row.id;

const initialArray = [
  { name: "Sandra Sonder", group: "Marketing", },
  { name: "Paul Poli", group: "Marketing", },
  { name: "Mark Marker", group: "Human Resources", },
  { name: "Paul Paulizky", group: "Engineering", },
  { name: "Linda Linder", group: "Management", }
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
  const [rows, setRows] = useState(localStorage.getItem("rows")
  ?JSON.parse(localStorage.getItem("rows")):initialRows);
  const [sorting, setSorting] = useState([{ columnName: 'group', direction: 'asc' }]);
  const [grouping, setGrouping] = useState([]);
  const [columnOrder, setColumnOrder] = useState(['name', 'email', 'group']);

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

  // const [filteringColumnExtensions] = useState([
  //   {
  //     columnName: 'saleDate',
  //     predicate: (value, filter, row) => {
  //       if (!filter.value.length) return true;
  //       if (filter && filter.operation === 'month') {
  //         const month = parseInt(value.split('-')[1], 10);
  //         return month === parseInt(filter.value, 10);
  //       }
  //       return IntegratedFiltering.defaultPredicate(value, filter, row);
  //     },
  //   },
  // ]);
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
        {/* <FilteringState
          filters={filters}
          onFiltersChange={setFilters}
          defaultFilters={[]}
        /> */}
        <GroupingState
          grouping={grouping}
          onGroupingChange={setGrouping}
        />
        <IntegratedSorting />
        {/* <IntegratedFiltering columnExtensions={filteringColumnExtensions} /> */}
        <IntegratedGrouping />
        <EditingState
          columnExtensions={editingColumnExtensions}
          onCommitChanges={commitChanges}
        />
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
        {/* <TableFilterRow
          showFilterSelector
          iconComponent={FilterIcon}
          messages={{ month: 'Month equals' }}
        /> */}
        <TableEditColumn showAddCommand showEditCommand showDeleteCommand />
      </Grid>
    </div>
  );
}

export default App;
