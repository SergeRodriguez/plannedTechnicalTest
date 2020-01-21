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
  )
};

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