import { Badge } from 'flowbite-react';
import RightDrawer from '../../../../common/components/right-drawer/RightDrawer';
import { openBox } from '../../../../common/icons';
import LabelValue from './components/LabelValue';
import { useState } from 'react';

const ShipmentDrawerOrderDetails = ({ orderDetails }) => {
  console.log(orderDetails)
  const [openMoreDetails, setOpenMoreDetails] = useState(false);
  return (
    <div>
      <LabelValue
        label={'Pickup From'}
        value={`${orderDetails?.original?.user_info?.pincode}, ${orderDetails?.original?.user_info?.state}`}
        tooltipText={
          <div>
            <div>{`${orderDetails?.original?.user_info?.complete_address}`}</div>
            <div>{`${orderDetails?.original?.user_info?.state}-${orderDetails?.original?.user_info?.pincode}`}</div>
            <div>{`${orderDetails?.original?.user_info?.contact_no}`}</div>
          </div>
        }
      />
      <LabelValue
        label={'Deliver To'}
        value={`${orderDetails?.original?.buyer_info?.pincode}, ${orderDetails?.original?.buyer_info?.state}`}
        tooltipText={
          <div>
            <div>{`${orderDetails?.original?.buyer_info?.complete_address}`}</div>
            <div>{`${orderDetails?.original?.buyer_info?.state}-${orderDetails?.original?.buyer_info?.pincode}`}</div>
            <div>{`${orderDetails?.original?.buyer_info?.contact_no}`}</div>
          </div>
        }
      />
      <LabelValue label={'Order Value'} value={`₹ ${orderDetails?.original?.total_amount}`} />
      <LabelValue label={'Payment Mode'} value={orderDetails?.original?.payment_type_name} />
      <LabelValue label={'Applicable Weight (in Kg)'} value={`${orderDetails?.original?.applicable_weight} Kg`} />
      <div className="text-left">
        <div className="mb-6 text-lg font-medium">{'Buyer Insights'}</div>
        <div>
          <div className="text-wrap mb-1.5 text-xs text-[#888]">{'Last Successful Delivery To Buyer:'}</div>
          <div className="text-wrap mb-3 text-xs font-medium">{'On Your Store'}</div>
          <div className="text-wrap mb-3 text-xs font-medium">
            <img src={openBox} className="inline-flex w-[1.875rem]" />
            <span className="mb-3 ml-2.5 inline-flex">{'No Orders'}</span>
          </div>
          <div className="text-wrap mb-3 text-xs font-medium">{'On Cloud Cargo'}</div>
          <div className="text-wrap mb-3 text-xs font-medium">
            <img src={openBox} className="inline-flex w-[1.875rem]" />
            <span className="mb-3 ml-2.5 inline-flex">{'No Orders'}</span>
          </div>
          <button
            className="text-wrap rounded-md border border-orange-700 bg-transparent px-6 py-2 text-xs text-orange-700"
            onClick={() => setOpenMoreDetails(true)}>
            {'View All Details'}
          </button>
        </div>
      </div>
      <RightDrawer
        isOpen={openMoreDetails}
        onClose={() => setOpenMoreDetails(false)}
        heading={'Buyer Insights'}
        width={"375px"}>
        <div className="w-full">
          <LabelValue label={'Buyer Name'} value={orderDetails?.buyer_info?.first_name} />
          <div className="mb-2 mt-4 w-full border border-gray-100" />
          <div className="mb-6 inline-flex items-center text-lg font-semibold text-gray-900">
            {'Buyer History On Your Store'}
          </div>
          <div>
            <div className="mb-2.5 text-xs font-medium">{'Orders in Last 90 Days'}</div>
            <div className="mb-2.5 text-xs font-medium">{'0'}</div>
          </div>
        </div>
        <div>
          <div className="mb-2.5 text-xs font-medium">{'Last Order Details'}</div>
          <div className="flex justify-between">
            <LabelValue label={'Purchase Date'} value={orderDetails?.date} />
            <LabelValue
              label={'Status'}
              value={
                <Badge color={'green'} className="border border-green-600 py-0 text-xs">
                  {'PENDING'}
                </Badge>
              }
            />
          </div>
        </div>
        <div className="mb-2 mt-4 w-full border border-gray-100" />
        <div>
          <div className="mb-5 inline-flex items-center text-lg font-semibold text-gray-900">
            {'Last Successful Delivery To Buyer:'}
          </div>
          <div className="text-wrap mb-3 text-xs font-medium">{'On Your Store'}</div>
          <div className="text-wrap mb-3 text-xs font-medium">
            <img src={openBox} className="inline-flex w-[1.875rem]" />
            <span className="mb-3 ml-2.5 inline-flex">{'No Orders'}</span>
          </div>
          <div className="text-wrap mb-3 text-xs font-medium">{'On Cloud Cargo'}</div>
          <div className="text-wrap mb-3 text-xs font-medium">
            <img src={openBox} className="inline-flex w-[1.875rem]" />
            <span className="mb-3 ml-2.5 inline-flex">{'No Orders'}</span>
          </div>
        </div>
        <div className="">
          <div className="mb-2 mt-5 inline-flex items-center text-lg font-bold text-gray-900">
            {'Was this helpful?'}
          </div>
          <div className="flex gap-3">
            <button className="rounded-md bg-green-600 px-5 py-2 text-sm text-white">{'Yes'}</button>
            <button className="rounded-md bg-red-600 px-5 py-2 text-sm text-white">{'No'}</button>
          </div>
        </div>
      </RightDrawer>
    </div>
  );
};

export default ShipmentDrawerOrderDetails;
