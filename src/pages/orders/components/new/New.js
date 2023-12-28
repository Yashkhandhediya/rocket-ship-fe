import axios from 'axios';
import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link, generatePath } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MoreDropdown, CustomTooltip } from '../../../../common/components';
import moment from 'moment';
import { Badge } from 'flowbite-react';
import { moreAction } from '../../../../common/icons';
import { moreActionOptions } from '../utils';
import DrawerWithSidebar from '../../../../common/components/drawer-with-sidebar/DrawerWithSidebar';
import { ShipmentDrawerOrderDetails } from '../shipment-drawer-order-details';
import ShipmentDrawerSelectCourier from '../shipment-drawer-select-courier/ShipmentDrawerSelectCourier';
import { setAllOrders } from '../../../../redux';
import { useDispatch, useSelector } from 'react-redux';

export const New = () => {
  const dispatch = useDispatch();
  const allOrdersList = useSelector(state => state?.ordersList);
  const [selectShipmentDrawer, setSelectShipmentDrawer] = useState({
    isOpen: false,
    orderDetails: {},
  });
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
          <div className="min-h-[32px] min-w-[32px]">
            <MoreDropdown
              renderTrigger={() => <img src={moreAction} className="cursor-pointer" />}
              options={moreActionOptions()}
            />
          </div>
        </div>
      ),
    },
  ];

  const fetchNewOrders = () => {
    axios
      .get('http://43.252.197.60:8030/order/get_filtered_orders')
      .then(async (resp) => {
        if (resp.status === 200) {
          dispatch(setAllOrders(resp?.data || []));
        } else {
          toast('There is some error while fetching orders.', { type: 'error' });
        }
      })
      .catch(() => {
        toast('There is some error while fetching orders.', { type: 'error' });
      });
  };

  const closeShipmentDrawer = () => {
    setSelectShipmentDrawer({
      isOpen: false,
      orderDetails: '',
    });
  };

  useEffect(() => {
    if(!allOrdersList) {
      fetchNewOrders();
    }
  }, [allOrdersList]);

  return (
    <div className="mt-5">
      <DataTable
        columns={columns}
        data={allOrdersList|| []}
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
    </div>
  );
};

export default New;
