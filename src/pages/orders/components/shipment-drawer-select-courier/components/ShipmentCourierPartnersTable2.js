import { Table } from 'flowbite-react';
import { useReactTable, flexRender, getCoreRowModel } from '@tanstack/react-table';
import { Fragment } from 'react';

const ShipmentCourierPartnersTable2 = ({
  columns,
  rowData,
  isHeaderSticky = true,
  shouldRenderRowSubComponent,
  rowSubComponent,
  tableWrapperStyles,
}) => {
  const table = useReactTable({
    data: rowData,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const headerCellStyle = {
    0: 'rounded-l-lg',
    [columns.length - 1]: 'rounded-r-lg',
  };

  const rowCellStyle = (cellIndex, hasSubRow) => {
    const styles = {
      0: hasSubRow ? 'rounded-tl-lg' : 'rounded-l-lg',
      [columns.length - 1]: hasSubRow ? 'rounded-tl-lg' : 'rounded-r-lg',
    };
    return styles[cellIndex];
  };

  return (
    <div
      className={`h-full w-full overflow-y-auto`}
      style={{ ...tableWrapperStyles, scrollbarGutter: 'stable' }}>
      <Table className="w-full">
        <Table.Head
          className={`h-[2.875rem] text-xs font-medium ${isHeaderSticky ? 'sticky top-0 z-[1]' : ''}`}>
          {table.getFlatHeaders().map((header, headerInd) => {
            return (
              <Table.HeadCell
                key={`${header.id}-${headerInd}`}
                className={`min-w-[9.75rem] bg-transparent bg-white p-3 normal-case leading-4 ${headerCellStyle[headerInd]}`}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </Table.HeadCell>
            );
          })}
        </Table.Head>
        <Table.Body className="align-top">
          {table.getRowModel().flatRows.map((row, rowInd) => {
            const cells = row?.getVisibleCells();
            const hasSubRow = shouldRenderRowSubComponent({ row });
            return (
              <Fragment key={`${row?.id}-${rowInd}-fragment`}>
                <Table.Row key={`${row?.id}-divider-${rowInd}`}>
                  <Table.Cell className="bg-red p-1.5"></Table.Cell>
                </Table.Row>
                <Table.Row key={`${row?.id}-${rowInd}`}>
                  {cells.map((cell, cellInd) => {
                    return (
                      <Table.Cell
                        key={`${cell.id}-${cellInd}`}
                        className={`bg-white px-3 py-4 ${rowCellStyle(cellInd, hasSubRow)}`}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </Table.Cell>
                    );
                  })}
                </Table.Row>
                {hasSubRow && (
                  <Table.Row
                    key={`${row?.id}-${rowInd}-tags`}
                    className="border-[rgba(112, 112, 112, 0.1)] border-t">
                    <Table.Cell
                      className="bg-red rounded-b-lg bg-white p-3"
                      colSpan={row.getVisibleCells().length}>
                      {rowSubComponent({ row })}
                    </Table.Cell>
                  </Table.Row>
                )}
              </Fragment>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default ShipmentCourierPartnersTable2;
