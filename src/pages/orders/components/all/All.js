import DataTable from 'react-data-table-component';
import { Link, generatePath, useNavigate } from 'react-router-dom';
import { MoreDropdown, CustomTooltip } from '../../../../common/components';
import moment from 'moment';
import { Badge } from 'flowbite-react';
import { filterIcon, moreAction } from '../../../../common/icons';
import { filterAllOrders, moreActionOptions } from '../utils';
import { useDispatch, useSelector } from 'react-redux';
import { setAllOrders, setClonedOrder } from '../../../../redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { MoreFiltersDrawer } from '../more-filters-drawer';
import { getClonedOrderFields } from '../../../../common/utils/ordersUtils';
import { setDomesticOrder } from '../../../../redux/actions/addOrderActions';
import NoOrdersFound from '../no-order-found/NoOrdersFound';

export const All = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allOrdersList = useSelector((state) => state?.ordersList);
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
      name: 'Payment',
      selector: (row) => (
        <div className="flex flex-col gap-1 py-2 text-left">
          <div>
            {'₹ '}
            {row?.total_amount?.toFixed(2)}
          </div>
          <div>
            <Badge
              color={(row?.payment_type_name || '')?.toLowerCase() === 'cod' ? 'failure' : 'success'}
              className={`h-fit w-fit rounded-sm p-1 py-0.5 text-[10px] font-normal ${
                (row?.payment_type_name || '')?.toLowerCase() === 'cod' ? 'uppercase' : 'capitalize'
              }`}>
              {row?.payment_type_name || ''}
            </Badge>
          </div>
        </div>
      ),
    },
    {
      name: 'Pickup/RTO Address',
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
      name: 'Shipping Details',
      selector: (row) => {
        return (
          <div className="flex flex-col gap-1 py-2 text-left">
            <div>{row?.courier_name}</div>
            <div>{'AWB#'}</div>
            <div className="pb-0.5">
              {(row?.status_name || '')?.toLowerCase() === 'new' ? (
                'Not Assigned'
              ) : (
                <Link
                  to={generatePath(`/tracking/:orderId`, { orderId: row?.id })}
                  className="border-b-2 border-b-purple-700 text-purple-700">
                  {'Track order'}
                </Link>
              )}
            </div>
          </div>
        );
      },
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
            onClick={() => {}}>
            {(row?.status_name || '')?.toLowerCase() == 'new' ? 'Ship Now' : 'Download Menifest'}
          </button>
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
      <DataTable
        columns={columns}
        data={allOrdersList || []}
        noDataComponent={<NoOrdersFound />}
        customStyles={{
          responsiveWrapper: {
            style: { overflow: 'visible' },
          },
        }}
      />
      <MoreFiltersDrawer
        isOpen={openFilterDrawer}
        onClose={() => setOpenFilterDrawer(false)}
        fieldNames={filterAllOrders}
      />
    </div>
  );
};

export default All;
