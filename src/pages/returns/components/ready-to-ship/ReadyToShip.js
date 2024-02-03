import { Fragment, useState } from 'react';
import { Link, generatePath, useNavigate } from 'react-router-dom';
import { MoreDropdown, CustomTooltip, CommonBadge, CustomDataTable } from '../../../../common/components';
import moment from 'moment';
import { Badge } from 'flowbite-react';
import { filterIcon, moreAction } from '../../../../common/icons';
import { filterReadyToShip, moreActionOptions } from '../utils';
import DrawerWithSidebar from '../../../../common/components/drawer-with-sidebar/DrawerWithSidebar';
import { ShipmentDrawerOrderDetails } from '../shipment-drawer-order-details';
import ShipmentDrawerSelectCourier from '../shipment-drawer-select-courier/ShipmentDrawerSelectCourier';
import { useDispatch, useSelector } from 'react-redux';
import { setClonedOrder } from '../../../../redux';
import { SchedulePickupModal } from '../schedule-pickup-modal';
import { MoreFiltersDrawer } from '../more-filters-drawer';
import { getClonedOrderFields } from '../../../../common/utils/ordersUtils';
import { setDomesticOrder } from '../../../../redux/actions/addOrderActions';
import { createColumnHelper } from '@tanstack/react-table';

export const ReadyToShip = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allOrdersList = useSelector((state) => state?.returnsList);
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  const readyShipOrdersList = allOrdersList?.filter(
    (order) => (order?.status_name || '')?.toLowerCase() !== 'new',
  ) || [];

  const [selectShipmentDrawer, setSelectShipmentDrawer] = useState({
    isOpen: false,
    orderDetails: {},
  });
  const [scheduleModal, setScheduleModal] = useState({ isOpen: false, pickupDetails: {} });

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
                  to={generatePath(`/track-order/:orderId`, { orderId: row?.original?.id || 1})}
                  className="border-b-2 border-b-red-700 text-red-700">
                  {row?.original?.id}
                </Link>
              </div>
              <div className="text-[11px]">{formattedDate}</div>
              <div>{(row?.original?.channel || '')?.toUpperCase()}</div>
              <div>
                <CustomTooltip
                  text={[row?.original?.product_info, row?.original?.product_info].map((product, i) => {
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
                  <div className="relative cursor-pointer pb-0.5 text-red-700 before:absolute before:bottom-0 before:w-full before:border before:border-dashed before:border-red-700">
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
      columnHelper.accessor('pickup/rtoAddress', {
        header: 'Pickup/RTO Address',
        cell: (row) => (
          <div className="flex flex-col gap-1 text-left text-xs">
            <div>
              <CustomTooltip
                text={
                  <>
                    <div>{`${row?.user_info?.address_line1 ?? ''} ${
                      row?.user_info?.address_line2 ?? ''
                    }`}</div>
                    <div>{row?.user_info?.city ?? ''}</div>
                    <div>
                      {row?.user_info?.state ?? ''}-{row?.user_info?.pincode}
                    </div>
                    <div>{row?.user_info?.contact_no}</div>
                  </>
                }>
                <div className="relative cursor-pointer whitespace-pre-wrap pb-0.5 before:absolute before:bottom-0 before:w-full before:border before:border-dashed before:border-[#555]">
                  {row?.original?.user_info?.tag || 'Primary'}
                </div>
              </CustomTooltip>
            </div>
          </div>
        ),
      }),
      columnHelper.accessor('shippingDetails', {
        header: 'Shipping Details',
        cell: ({row}) => {
          return (
            <div className="flex flex-col gap-1 text-left text-xs">
              <div>{row?.courier_name}</div>
              <div>{'AWB#'}</div>
              <div className="pb-0.5">
                {(row?.status_name || '')?.toLowerCase() === 'new' ? (
                  'Not Assigned'
                ) : (
                    <Link
                    to={generatePath(`/return-tracking/:orderId`, { orderId: row?.original?.id || 1 })}
                    className="border-b-2 border-b-red-700 text-red-700">
                    {'Track order'}
                  </Link>
                  // let newURL = `http://${window.location.host}/tracking?data=${encodeURIComponent(row.id)}`;
                  // let newTab = window.open(newURL, '_blank');
                  // if (newTab) {
                  //   newTab.focus();
                  // }
                  // <Link
                  //   to={generatePath(`/tracking/:orderId`, { orderId: row?.id })}
                  //   className="border-b-2 border-b-red-700 text-red-700">
                  //   {'Track order'}
                  // </Link>
                )}
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
        cell: ({row}) => (
          <div className="flex gap-2 text-left text-xs">
            <button
              id={row?.original?.id}
              className="min-w-fit rounded bg-orange-700 px-4 py-1.5 text-white"
              onClick={() => {
                setScheduleModal({
                  isOpen: true,
                  pickupDetails: row?.original,
                });
                // const resp = axios.get(BACKEND_URL+'/order/track?order_id=' + row.id);
                // let newURL = `http://${window.location.host}/tracking?data=${encodeURIComponent(row.id)}`;
                // let newTab = window.open(newURL, '_blank');
                // if (newTab) {
                //   newTab.focus();
                // }
              }}>
              {'Schedule Pickup'}
            </button>
            <div className="min-h-[32px] min-w-[32px]">
              <MoreDropdown
                renderTrigger={() => <img src={moreAction} className="cursor-pointer" />}
                options={moreActionOptions({
                  cloneOrder: () => cloneOrder(row),
                })}
              />
            </div>
          </div>
        ),
      }),
    ];
  };

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
      <Badge className="flex w-fit items-center rounded-lg bg-red-200 text-[8px]">
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
            className="inline-flex items-center rounded-sm border border-[#e6e6e6] bg-white px-2.5 py-2 text-xs font-medium hover:border-orange-700"
            onClick={() => setOpenFilterDrawer(true)}>
            <img src={filterIcon} className="mr-2 w-4" />
            {'More Filters'}
          </button>
        </div>
      </div>
      <CustomDataTable
        columns={getColumns()}
        rowData={readyShipOrdersList}
        enableRowSelection={true}
        shouldRenderRowSubComponent={() => Boolean(Math.ceil(Math.random() * 10) % 2)}
        onRowSelectStateChange={(selected) => console.log('selected-=-', selected)}
        rowSubComponent={rowSubComponent}
        enablePagination={true}
        tableWrapperStyles={{ height: '78vh' }}
      />
      {/* <DataTable
        columns={columns}
        data={readyShipOrdersList || []}
        noDataComponent={<NoOrdersFound />}
        customStyles={{
          responsiveWrapper: {
            style: { overflow: 'visible' },
          },
        }}
      /> */}
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
      <SchedulePickupModal
        isOpen={scheduleModal.isOpen}
        onClose={() =>
          setScheduleModal({
            isOpen: false,
            pickupDetails: {},
          })
        }
        pickupDetails={scheduleModal.pickupDetails}
      />
      <MoreFiltersDrawer
        isOpen={openFilterDrawer}
        onClose={() => setOpenFilterDrawer(false)}
        fieldNames={filterReadyToShip}
      />
    </div>
  );
};

export default ReadyToShip;
