import { Table, Checkbox as FlowbiteCheckbox, Button } from 'flowbite-react';
import { useReactTable, flexRender, getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { CustomMultiSelect } from '../custom-multi-select';
import NoOrdersFound from '../../../pages/orders/components/no-order-found/NoOrdersFound';

const CustomDataTable = ({
  columns,
  rowData,
  isHeaderSticky = true,
  enableRowSelection,
  onRowSelectStateChange,
  shouldRenderRowSubComponent,
  rowSubComponent,
  tableWrapperStyles,
  enablePagination,
  NoDataFoundComponent,
  paginationRowsPerPageOptions = [15, 30, 60, 100],
}) => {
  const [rowSelection, setRowSelection] = useState({});

  const preparedColumns = useMemo(() => {
    return [
      enableRowSelection && {
        id: 'select',
        header: ({ table }) => (
          <FlowbiteCheckbox
            color={'red'}
            className="px-0 opacity-50"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <FlowbiteCheckbox
            color={'red'}
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
      },
      ...columns,
    ].filter(Boolean);
  }, [columns, enableRowSelection]);

  const table = useReactTable({
    data: rowData,
    columns: preparedColumns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    enableRowSelection: enableRowSelection,
    ...(enablePagination ? { getPaginationRowModel: getPaginationRowModel() } : {}),
    state: {
      rowSelection,
    },
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

  const getCellwidth = (id) => {
    return id === 'select' ? 'w-0 pr-0' : 'min-w-[9.75rem]';
  };

  const selectedFlatRows = table.getSelectedRowModel().flatRows;

  useEffect(() => {
    if (onRowSelectStateChange) {
      const selectedRows = selectedFlatRows.map((row) => row.original);
      onRowSelectStateChange(selectedRows);
    }
  }, [onRowSelectStateChange, selectedFlatRows]);

  useEffect(() => {
    if (enablePagination && table.setPageSize) {
      table.setPageSize(Number(paginationRowsPerPageOptions[0]));
    }
  }, [enablePagination, table.setPageSize]);

  return (
    <div
      className={`h-full w-full overflow-y-auto`}
      style={{ ...tableWrapperStyles, scrollbarGutter: 'stable' }}>
      <Table className="mb-3 w-full">
        <Table.Head
          className={`h-[2.875rem] text-xs font-medium ${isHeaderSticky ? 'sticky top-0 z-[10]' : ''}`}>
          {table.getFlatHeaders().map((header, headerInd) => {
            return (
              <Table.HeadCell
                key={`${header.id}-${headerInd}`}
                className={`top-0 items-center bg-white p-3 font-medium normal-case leading-4 
                ${headerCellStyle[headerInd]} ${getCellwidth(header?.id)}`}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </Table.HeadCell>
            );
          })}
        </Table.Head>
        <Table.Body className="align-top">
          {table.getRowModel().flatRows?.length ? (
            table.getRowModel().flatRows.map((row, rowInd) => {
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
                          className={`bg-white px-3 py-4 
                        ${rowCellStyle(cellInd, hasSubRow)} ${getCellwidth(cell?.column?.id)}`}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </Table.Cell>
                      );
                    })}
                  </Table.Row>
                  {hasSubRow && (
                    <Table.Row
                      key={`${row?.id}-${rowInd}-tags`}
                      className="border-[rgba(112, 112, 112, 0.1)] border-t">
                      {enableRowSelection && (
                        <Table.Cell className={`rounded-bl-lg bg-white p-3`}></Table.Cell>
                      )}
                      <Table.Cell
                        className={`rounded-br-lg bg-white p-3 ${
                          enableRowSelection ? 'rounded-br-lg' : 'rounded-b-lg'
                        }`}
                        colSpan={
                          enableRowSelection ? row.getVisibleCells().length - 1 : row.getVisibleCells().length
                        }>
                        {rowSubComponent({ row })}
                      </Table.Cell>
                    </Table.Row>
                  )}
                </Fragment>
              );
            })
          ) : (
            <>
              <Table.Row>
                <Table.Cell className="p-1.5"></Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell className="rounded-lg bg-white" colSpan={preparedColumns?.length}>
                  {NoDataFoundComponent ? <NoDataFoundComponent /> : <NoOrdersFound />}
                </Table.Cell>
              </Table.Row>
            </>
          )}
        </Table.Body>
      </Table>
      {enablePagination && (
        <div>
          <div className="flex w-full flex-wrap-reverse justify-between gap-2 rounded-lg bg-white px-4 py-2">
            <div className="mr-2 flex items-center">
              <div className="mr-4 text-xs text-black">{'Items per page: '}</div>
              <div>
                <CustomMultiSelect
                  id={'new-pagination'}
                  isMulti={false}
                  options={paginationRowsPerPageOptions.map((value) => ({ label: value, value: value }))}
                  renderSingleCustomDisplayValue={(selected) => `${selected} Orders`}
                  selected={table.getState().pagination.pageSize}
                  onChange={(value) => table.setPageSize(Number(value))}
                  closeMenuOnSelect={true}
                  hideSelectedOptions={false}
                  CustomDropdownIndicator={() => (
                    <div className="flex cursor-pointer flex-col">
                      <FontAwesomeIcon icon={faAngleUp} className="h-2.5 text-gray-400" />
                      <FontAwesomeIcon icon={faAngleDown} className="h-2.5 text-gray-400" />
                    </div>
                  )}
                />
              </div>
            </div>
            <div className="flex items-center text-xs">
              <Button
                color="light"
                className="mr-6 border-0 *:px-3 *:text-xs *:font-normal"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}>
                <FontAwesomeIcon icon={faArrowLeft} className="mx-2 h-4 w-3" />
                {'PREV'}
              </Button>
              <button className="rounded-lg border-0 bg-gray-100 px-3 py-2 font-medium" disabled={true}>
                {'1'}
              </button>
              <Button
                color="light"
                className="ml-6 border-0 *:px-3  *:text-xs *:font-normal"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}>
                {'NEXT'} <FontAwesomeIcon icon={faArrowRight} className="mx-2 h-4 w-3" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDataTable;
