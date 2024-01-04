import { Badge, Table } from 'flowbite-react';
import { useReactTable, flexRender, getCoreRowModel, createColumnHelper } from '@tanstack/react-table';
import { CustomTooltip, MoreDropdown } from '../../../../../common/components';
import { moreAction } from '../../../../../common/icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Link, generatePath, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { moreActionOptions } from '../../utils';
import { setAllOrders, setClonedOrder } from '../../../../../redux';
import { getClonedOrderFields } from '../../../../../common/utils/ordersUtils';
import { setDomesticOrder } from '../../../../../redux/actions/addOrderActions';
import { Fragment, useMemo } from 'react';

const ShipmentCourierPartnersTable2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // temporary
  const allOrdersList = useSelector((state) => state?.ordersList);
  const newOrdersList =
    allOrdersList?.filter((order) => (order?.status_name || '')?.toLowerCase() === 'new') || [];

  function cancelOrder(orderDetails) {
    axios
      .put(`http://43.252.197.60:8030/order/?id=${orderDetails?.id}`, {
        ...orderDetails,
        status: 'cancelled',
        status_name: 'cancelled',
      })
      .then((resp) => {
        if (resp?.status === 200) {
          dispatch(setAllOrders(null));
          toast('Order cancelled successfully', { type: 'success' });
        }
      })
      .catch(() => {
        toast('Unable to cancel Order', { type: 'error' });
      });
  }

  function cloneOrder(orderDetails) {
    const clonedOrder = getClonedOrderFields(orderDetails);
    dispatch(setClonedOrder(clonedOrder));
    dispatch(setDomesticOrder(clonedOrder));
    navigate('/add-order');
  }

  const getColumns = () => {
    const columnHelper = createColumnHelper();
    return [
      columnHelper.accessor('orderDetails', {
        header: 'Order Details',
        cell: ({ row }) => {
          const formattedDate = row?.original?.created_date
            ? moment(row?.original?.created_date).format('DD MMM YYYY | hh:mm A')
            : 'No date available.';
          return (
            <div className="flex flex-col gap-1 py-2 text-left">
              <div className="pb-0.5">
                <Link
                  to={generatePath(`/track-order/:orderId`, { orderId: row?.original?.id })}
                  className="border-b-2 border-b-purple-700 text-purple-700">
                  {row?.original?.id}
                </Link>
              </div>
              <div className="text-xs">{formattedDate}</div>
              <div>{row?.original?.channel}</div>
              <div className="">
                <CustomTooltip
                  text={row?.original?.product_info?.map((product, i) => {
                    return (
                      <div key={`${product?.id}-${i}`}>
                        <div>{product?.name}</div>
                        <div>SKU: {product?.sku}</div>
                        <div>QTY: {product?.quantity}</div>
                      </div>
                    );
                  })}
                  wrapperClassNames={'whitespace-pre-wrap '}>
                  <div className="relative cursor-pointer pb-0.5 text-purple-700 before:absolute before:bottom-0 before:w-full before:border before:border-dashed before:border-purple-700">
                    {'View Products'}
                  </div>
                </CustomTooltip>
              </div>
            </div>
          );
        },
      }),
      columnHelper.accessor('customerDetails', {
        header: 'Customer details',
        cell: ({ row }) => {
          return (
            <div className="flex flex-col gap-1 py-2 text-left">
              <div>{row?.original?.buyer_info?.first_name}</div>
              <div>{row?.original?.buyer_info?.email_address}</div>
              <div>{row?.original?.buyer_info?.contact_no}</div>
            </div>
          );
        },
      }),
      columnHelper.accessor('packageDetails', {
        header: 'Package Details',
        cell: ({ row }) => {
          return (
            <div className="flex flex-col gap-1 py-2 text-left">
              <div className="text-wrap">
                {'Deat wt.: '}
                {row?.original?.deadweight}
              </div>
              <div className="text-wrap">
                {row?.original?.height?.toFixed(2)}x{row?.original?.width?.toFixed(2)}x
                {row?.original?.length?.toFixed(2)} {' (cm)'}
              </div>
              <div className="text-wrap">
                {'Volumetric wt.: '} {row?.original?.volumatric_weight} {' Kg'}
              </div>
            </div>
          );
        },
      }),
      columnHelper.accessor('payment', {
        header: 'Payment',
        cell: ({ row }) => {
          return (
            <div className="flex flex-col gap-1 py-2 text-left">
              <div>
                {'₹ '}
                {row?.original?.total_amount?.toFixed(2)}
              </div>
              <div>
                <Badge
                  color="success"
                  className="h-fit w-fit rounded-sm p-1 py-0.5 text-[10px] font-normal capitalize">
                  {row?.original?.payment_type_name}
                </Badge>
              </div>
            </div>
          );
        },
      }),
      columnHelper.accessor('pickupAddress', {
        header: 'Pickup Address',
        cell: ({ row }) => {
          return (
            <div className="flex flex-col gap-1 py-2 text-left">
              <div>
                <CustomTooltip
                  text={
                    <>
                      <div>{`${row?.original?.user_info?.address_line1 ?? ''} ${
                        row?.original?.user_info?.address_line2 ?? ''
                      }`}</div>
                      <div>{row?.original?.user_info?.city ?? ''}</div>
                      <div>
                        {row?.original?.user_info?.state ?? ''}-{row?.original?.user_info?.pincode}
                      </div>
                      <div>{row?.original?.user_info?.contact_no}</div>
                    </>
                  }>
                  <div className="relative cursor-pointer whitespace-pre-wrap pb-0.5 before:absolute before:bottom-0 before:w-full before:border before:border-dashed before:border-[#555]">
                    {'Primary'}
                  </div>
                </CustomTooltip>
              </div>
            </div>
          );
        },
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        cell: ({ row }) => {
          return (
            <div className="flex flex-col gap-1 py-2 text-left">
              <Badge color="success" className="text-[10px] uppercase">
                {row?.original?.status_name}
              </Badge>
            </div>
          );
        },
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => {
          return (
            <div className="flex gap-2 py-2 text-left">
              {row?.original?.status_name == 'new' ? (
                <button
                  id={row?.original?.id}
                  className="min-w-fit rounded bg-indigo-700 px-4 py-1.5 text-white"
                  onClick={() => {
                    // setSelectShipmentDrawer({
                    //   isOpen: true,
                    //   orderDetails: row,
                    // })
                  }}>
                  {'Ship Now'}
                </button>
              ) : (
                <button
                  id={row?.original?.id}
                  className="min-w-fit rounded bg-indigo-700 px-4 py-1.5 text-white"
                  onClick={() => {
                    axios.get('http://43.252.197.60:8030/order/track?order_id=' + row?.original?.id);
                    let newURL = `http://${window.location.host}/tracking?data=${encodeURIComponent('15')}`;
                    let newTab = window.open(newURL, '_blank');
                    if (newTab) {
                      newTab.focus();
                    }
                  }}>
                  {'Track'}
                </button>
              )}
              <div className="min-h-[32px] min-w-[32px]">
                <MoreDropdown
                  renderTrigger={() => <img src={moreAction} className="cursor-pointer" />}
                  options={moreActionOptions({
                    cloneOrder: () => cloneOrder(row),
                    cancelOrder: () => cancelOrder(row),
                  })}
                />
              </div>
            </div>
          );
        },
      }),
    ];
  };

  const columns = useMemo(() => {
    return getColumns();
  }, [newOrdersList]);

  const rowsData = useMemo(() => {
    return allOrdersList?.filter((order) => (order?.status_name || '')?.toLowerCase() === 'new') || [];
  }, [allOrdersList]);

  const table = useReactTable({
    data: rowsData,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const cellStyle = {
    0: 'rounded-l-lg',
    [columns.length - 1]: 'rounded-r-lg',
  };

  return (
    <div className="h-full w-full overflow-y-auto">
      <Table className="w-full">
        <Table.Head className="sticky top-0 w-full bg-white text-xs font-medium">
          {table.getFlatHeaders().map((header, headerInd) => {
            return (
              <Table.HeadCell
                key={`${header.id}-${headerInd}`}
                className={`bg-transparent bg-white normal-case ${cellStyle[headerInd]}`}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </Table.HeadCell>
            );
          })}
        </Table.Head>
        <Table.Body>
          {table.getRowModel().flatRows.map((row, rowInd) => {
            const cells = row?.getVisibleCells();
            return (
              <Fragment key={`${row?.id}-${rowInd}-fragment`}>
                <Table.Row key={`${row?.id}-divider-${rowInd}`}>
                  <Table.Cell className="bg-red p-1.5"></Table.Cell>
                </Table.Row>
                <Table.Row key={`${row?.id}-${rowInd}`}>
                  {cells.map((cell, cellInd) => {
                    return (
                      <Table.Cell key={`${cell.id}-${cellInd}`} className={`bg-white ${cellStyle[cellInd]}`}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </Table.Cell>
                    );
                  })}
                </Table.Row>
              </Fragment>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default ShipmentCourierPartnersTable2;
