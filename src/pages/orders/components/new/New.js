import axios from 'axios';
import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link, generatePath, useNavigate } from 'react-router-dom';
import { MoreDropdown, CustomTooltip } from '../../../../common/components';
import moment from 'moment';
import { Badge } from 'flowbite-react';
import { filter, moreAction } from '../../../../common/icons';
import { moreActionOptions } from '../utils';
import DrawerWithSidebar from '../../../../common/components/drawer-with-sidebar/DrawerWithSidebar';
import { ShipmentDrawerOrderDetails } from '../shipment-drawer-order-details';
import ShipmentDrawerSelectCourier from '../shipment-drawer-select-courier/ShipmentDrawerSelectCourier';
import { useDispatch, useSelector } from 'react-redux';
import { setAllOrders, setClonedOrder } from '../../../../redux';
import { toast } from 'react-toastify';
import { MoreFiltersDrawer } from '../more-filters-drawer';

export const New = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allOrdersList = useSelector((state) => state?.ordersList);
  const newOrdersList = allOrdersList?.filter((order) => (order?.status_name || '')?.toLowerCase() === 'new');
  const [selectShipmentDrawer, setSelectShipmentDrawer] = useState({
    isOpen: false,
    orderDetails: {},
  });
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  const columns = [
    {
      name: 'Order Details',
      selector: (row) => {
        const formattedDate = row?.created_date
          ? moment(row?.created_date).format('DD MMM YYYY | hh:mm A')
          : 'No date available.';
        return (
          <div className="flex flex-col gap-1 py-2 text-left">
            <div className="pb-0.5">
              <Link
                to={generatePath(`/track-order/:orderId`, { orderId: row?.id })}
                className="border-b-2 border-b-purple-700 text-purple-700">
                {row?.id}
              </Link>
            </div>
            <div className="text-xs">{formattedDate}</div>
            <div>{row.channel}</div>
            <div className="">
              <CustomTooltip
                text={row.product_info?.map((product) => {
                  return (
                    <div key={product?.id}>
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
    },
    {
      name: 'Customer details',
      selector: (row) => (
        <div className="flex flex-col gap-1 py-2 text-left">
          <div>{row?.buyer_info?.first_name}</div>
          <div>{row?.buyer_info?.email_address}</div>
          <div>{row?.buyer_info?.contact_no}</div>
        </div>
      ),
    },
    {
      name: 'Package Details',
      selector: (row) => (
        <div className="flex flex-col gap-1 py-2 text-left">
          <div className="text-wrap">
            {'Deat wt.: '}
            {row?.deadweight}
          </div>
          <div className="text-wrap">
            {row?.height?.toFixed(2)}x{row.width?.toFixed(2)}x{row.length?.toFixed(2)} {' (cm)'}
          </div>
          <div className="text-wrap">
            {'Volumetric wt.: '} {row?.volumatric_weight} {' Kg'}
          </div>
        </div>
      ),
    },
    {
      name: 'Payment',
      selector: (row) => (
        <div className="flex flex-col gap-1 py-2 text-left">
          <div>
            {'₹ '}
            {row?.total_amount?.toFixed(2)}
          </div>
          <div>
            <Badge
              color="success"
              className="h-fit w-fit rounded-sm p-1 py-0.5 text-[10px] font-normal capitalize">
              {row?.payment_type_name}
            </Badge>
          </div>
        </div>
      ),
    },
    {
      name: 'Pickup Address',
      wrap: true,
      selector: (row) => (
        <div className="flex flex-col gap-1 py-2 text-left">
          <div>
            <CustomTooltip
              text={
                <>
                  <div>{`${row?.user_info?.address_line1 ?? ''} ${row?.user_info?.address_line2 ?? ''}`}</div>
                  <div>{row?.user_info?.city ?? ''}</div>
                  <div>
                    {row?.user_info?.state ?? ''}-{row?.user_info?.pincode}
                  </div>
                  <div>{row?.user_info?.contact_no}</div>
                </>
              }>
              <div className="relative cursor-pointer whitespace-pre-wrap pb-0.5 before:absolute before:bottom-0 before:w-full before:border before:border-dashed before:border-[#555]">
                {'Primary'}
              </div>
            </CustomTooltip>
          </div>
        </div>
      ),
    },
    {
      name: 'Status',
      selector: (row) => (
        <div className="flex flex-col gap-1 py-2 text-left">
          <Badge color="success" className="text-[10px] uppercase">
            {row?.status_name}
          </Badge>
        </div>
      ),
    },
    {
      name: 'Action',
      selector: (row) => (
        <div className="flex gap-2 py-2 text-left">
          {row?.status_name == 'new' ? (
            <button
              id={row.id}
              className="min-w-fit rounded bg-indigo-700 px-4 py-1.5 text-white"
              onClick={() =>
                setSelectShipmentDrawer({
                  isOpen: true,
                  orderDetails: row,
                })
              }>
              {'Ship Now'}
            </button>
          ) : (
            <button
              id={row.id}
              className="min-w-fit rounded bg-indigo-700 px-4 py-1.5 text-white"
              onClick={() => {
                axios.get('http://43.252.197.60:8030/order/track?order_id=' + row.id);
                let newURL = `http://${window.location.host}/tracking?data=${encodeURIComponent('15')}`;
                let newTab = window.open(newURL, '_blank');
                if (newTab) {
                  newTab.focus();
                }

                // console.log('urllll',window.location.host+'/tracking/1')
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
      ),
    },
  ];

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
    dispatch(setClonedOrder(orderDetails));
    navigate('/add-order');
  }

  const closeShipmentDrawer = () => {
    setSelectShipmentDrawer({
      isOpen: false,
      orderDetails: '',
    });
  };

  return (
    <div className="mt-5">
      <div className="mb-4 flex w-full">
        <div>{''}</div>
        <div>
          <button className="inline-flex items-center border border-[#e6e6e6] bg-white px-2.5 py-2 text-xs font-medium hover:border-indigo-700 rounded-sm" onClick={() => setOpenFilterDrawer(true)}>
            <img src={filter} className="mr-2 w-4" />
            {'More Filters'}
          </button>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={newOrdersList || []}
        sortActive={false}
        customStyles={{
          responsiveWrapper: {
            style: { overflow: 'visible' },
          },
        }}
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
      <MoreFiltersDrawer isOpen={openFilterDrawer} onClose={() => setOpenFilterDrawer(false)} />
    </div>
  );
};

export default New;
