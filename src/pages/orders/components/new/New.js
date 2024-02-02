import axios from 'axios';
import { Fragment, useState } from 'react';
import { Link, generatePath, useNavigate } from 'react-router-dom';
import { MoreDropdown, CustomTooltip, CustomDataTable } from '../../../../common/components';
import moment from 'moment';
import { Badge } from 'flowbite-react';
import { filterIcon, moreAction } from '../../../../common/icons';
import { moreActionOptions, allFilterFields } from '../utils';
import DrawerWithSidebar from '../../../../common/components/drawer-with-sidebar/DrawerWithSidebar';
import { ShipmentDrawerOrderDetails } from '../shipment-drawer-order-details';
import ShipmentDrawerSelectCourier from '../shipment-drawer-select-courier/ShipmentDrawerSelectCourier';
import { useDispatch, useSelector } from 'react-redux';
import { setAllOrders, setClonedOrder } from '../../../../redux';
import { toast } from 'react-toastify';
import { MoreFiltersDrawer } from '../more-filters-drawer';
import { getClonedOrderFields } from '../../../../common/utils/ordersUtils';
import { setDomesticOrder } from '../../../../redux/actions/addOrderActions';
import { createColumnHelper } from '@tanstack/react-table';
import { CommonBadge } from '../../../../common/components/common-badge';
import { BACKEND_URL } from '../../../../common/utils/env.config';

export const New = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allOrdersList = useSelector((state) => state?.ordersList);
  const newOrdersList =
    allOrdersList?.filter((order) => (order?.status_name || '')?.toLowerCase() === 'new') || [];
  const [selectShipmentDrawer, setSelectShipmentDrawer] = useState({
    isOpen: false,
    orderDetails: {},
  });
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);

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
            <div className="flex flex-col gap-2 text-left text-xs">
              <div className="pb-0.5">
                <Link
                  to={generatePath(`/track-order/:orderId`, { orderId: row?.original?.id || 1 })}
                  className="border-b-2 border-b-purple-700 text-purple-700">
                  {row?.original?.id}
                </Link>
              </div>
              <div className="text-[11px]">{formattedDate}</div>
              <div>{(row?.original?.channel || '')?.toUpperCase()}</div>
              <div>
                <CustomTooltip
                  text={row?.original?.product_info.map((product, i) => {
                    return (
                      <Fragment key={`${product?.id}-${i}`}>
                        {i !== 0 && <div className="my-2 h-[1px] w-full bg-gray-500" />}
                        <div key={`${product?.id}-${i} w-full`}>
                          <div>{product?.name}</div>
                          <div>SKU: {product?.sku}</div>
                          <div>QTY: {product?.quantity}</div>
                        </div>
                      </Fragment>
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
            <div className="flex flex-col gap-2 text-left text-xs">
              {row?.original?.buyer_info?.first_name && <div>{row?.original?.buyer_info?.first_name}</div>}
              {row?.original?.buyer_info?.email_address && (
                <div>{row?.original?.buyer_info?.email_address}</div>
              )}
              {row?.original?.buyer_info?.contact_no && <div>{row?.original?.buyer_info?.contact_no}</div>}
            </div>
          );
        },
      }),
      columnHelper.accessor('packageDetails', {
        header: 'Package Details',
        cell: ({ row }) => {
          return (
            <div className="flex flex-col gap-2 text-left text-xs">
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
            <div className="flex flex-col gap-2 text-left text-xs">
              <div>
                {'₹ '}
                {row?.original?.total_amount?.toFixed(2)}
              </div>
              <CommonBadge type={(row?.original?.payment_type_name || '').toUpperCase()} />
            </div>
          );
        },
      }),
      columnHelper.accessor('pickupAddress', {
        header: 'Pickup Address',
        cell: ({ row }) => {
          return (
            <div className="flex flex-col gap-1 text-left text-xs">
              <div>
                <CustomTooltip
                  text={
                    <>
                      {row?.original?.user_info?.tag && (
                        <div className="font-medium">{`${row?.original?.user_info?.tag}`}</div>
                      )}
                      {row?.original?.user_info?.complete_address && (
                        <div>{`${row?.original?.user_info?.complete_address ?? ''}`}</div>
                      )}
                      {row?.original?.user_info?.city && <div>{row?.original?.user_info?.city ?? ''}</div>}
                      <div>
                        {row?.original?.user_info?.state ?? ''}-{row?.original?.user_info?.pincode}
                      </div>
                      <div>{row?.original?.user_info?.contact_no}</div>
                    </>
                  }>
                  <div className="relative cursor-pointer whitespace-pre-wrap pb-0.5 before:absolute before:bottom-0 before:w-full before:border before:border-dashed before:border-[#555]">
                    {row?.original?.user_info?.tag || 'Primary'}
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
            <div className="flex flex-col gap-1 text-left text-xs">
              <CommonBadge type={'SUCCESS'} text={row?.original?.status_name} />
            </div>
          );
        },
      }),
      columnHelper.accessor('action', {
        header: 'Action',
        cell: ({ row }) => {
          return (
            <div className="flex gap-2 text-left text-xs">
              {row?.original?.status_name == 'new' ? (
                <button
                  id={row?.original?.id}
                  className="min-w-fit rounded bg-indigo-700 px-4 py-1.5 text-white"
                  onClick={() => {
                    setSelectShipmentDrawer({
                      isOpen: true,
                      orderDetails: row.original,
                    });
                  }}>
                  {'Ship Now'}
                </button>
              ) : (
                <button
                  id={row?.original?.id}
                  className="min-w-fit rounded bg-indigo-700 px-4 py-1.5 text-white"
                  onClick={() => {
                    axios.get(BACKEND_URL+'/order/track?order_id=' + row?.original?.id);
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
                    cloneOrder: () => cloneOrder(row?.original),
                    cancelOrder: () => cancelOrder(row?.original?.id),
                  })}
                />
              </div>
            </div>
          );
        },
      }),
    ];
  };

  function cancelOrder(orderDetails) {
    axios
      .put(`${BACKEND_URL}/order/?id=${orderDetails}`, {
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
      window.location.reload();
  }

  function cloneOrder(orderDetails) {
    const clonedOrder = getClonedOrderFields(orderDetails);
    dispatch(setClonedOrder(clonedOrder));
    dispatch(setDomesticOrder(clonedOrder));
    navigate('/add-order');
  }

  const closeShipmentDrawer = () => {
    setSelectShipmentDrawer({
      isOpen: false,
      orderDetails: '',
    });
  };

  const rowSubComponent = () => {
    return (
      <Badge className="flex w-fit items-center rounded-lg bg-sky-200 text-[8px]">
        <div className="flex items-center">
          <span className="mr-1 inline-flex h-4 w-4 rounded-full border-4 border-black"></span>
          {'Secured'}
        </div>
      </Badge>
    );
  };

  return (
    <div className="mt-5">
      <div className="mb-4 flex w-full">
        <div>
          <button
            className="inline-flex items-center rounded-sm border border-[#e6e6e6] bg-white px-2.5 py-2 text-xs font-medium hover:border-indigo-700"
            onClick={() => setOpenFilterDrawer(true)}>
            <img src={filterIcon} className="mr-2 w-4" />
            {'More Filters'}
          </button>
        </div>
      </div>

      <CustomDataTable
        columns={getColumns()}
        rowData={newOrdersList}
        enableRowSelection={true}
        shouldRenderRowSubComponent={() => Boolean(Math.ceil(Math.random() * 10) % 2)}
        onRowSelectStateChange={(selected) => console.log('selected-=-', selected)}
        rowSubComponent={rowSubComponent}
        enablePagination={true}
        tableWrapperStyles={{ height: '78vh' }}
      />

      <DrawerWithSidebar
        isOpen={selectShipmentDrawer?.isOpen}
        onClose={closeShipmentDrawer}
        leftHeading={'Order Details'}
        rightHeading={'Select Courier Partner'}
        leftComponent={<ShipmentDrawerOrderDetails orderDetails={selectShipmentDrawer?.orderDetails} />}
        rightComponent={
          <ShipmentDrawerSelectCourier
            orderDetails={selectShipmentDrawer?.orderDetails}
            isOpen={selectShipmentDrawer?.isOpen}
            onClose={closeShipmentDrawer}
          />
        }
      />
      <MoreFiltersDrawer
        isOpen={openFilterDrawer}
        onClose={() => setOpenFilterDrawer(false)}
        fieldNames={allFilterFields}
      />
    </div>
  );
};

export default New;
