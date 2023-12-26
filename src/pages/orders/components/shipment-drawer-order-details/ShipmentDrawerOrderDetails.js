import { openBox } from '../../../../common/icons';
import LabelValue from './components/LabelValue';

const ShipmentDrawerOrderDetails = ({ orderDetails }) => {
  return (
    <div>
      <LabelValue
        label={'Pickup From'}
        value={`${orderDetails?.user_info?.pincode}, ${orderDetails?.user_info?.state}`}
        tooltipText={
          <div>
            <div>{`${orderDetails?.user_info?.complete_address}`}</div>
            <div>{`${orderDetails?.user_info?.state}-${orderDetails?.user_info?.pincode}`}</div>
            <div>{`${orderDetails?.user_info?.contact_no}`}</div>
          </div>
        }
      />
      <LabelValue
        label={'Deliver To'}
        value={`${orderDetails?.buyer_info?.pincode}, ${orderDetails?.buyer_info?.state}`}
        tooltipText={
          <div>
            <div>{`${orderDetails?.buyer_info?.complete_address}`}</div>
            <div>{`${orderDetails?.buyer_info?.state}-${orderDetails?.buyer_info?.pincode}`}</div>
            <div>{`${orderDetails?.buyer_info?.contact_no}`}</div>
          </div>
        }
      />
      <LabelValue label={'Order Value'} value={`₹ ${orderDetails?.total_amount}`} />
      <LabelValue label={'Payment Mode'} value={orderDetails?.payment_type_name} />
      <LabelValue label={'Applicable Weight (in Kg)'} value={`${orderDetails?.applicable_weight} Kg`} />
      <div className="text-left">
        <div className="mb-6 text-lg font-medium">{'Buyer Insights'}</div>
        <div>
          <div className="text-wrap mb-1.5 text-xs text-[#888]">{'Last Successful Delivery To Buyer:'}</div>
          <div className="text-wrap mb-3 text-xs font-medium">{'On Your Store'}</div>
          <div className="text-wrap mb-3 text-xs font-medium">
            <img src={openBox} className="inline-flex w-[1.875rem]" />
            <span className="mb-3 ml-2.5 inline-flex">{'No Orders'}</span>
          </div>
          <div className="text-wrap mb-3 text-xs font-medium">{'On Ship Rocket'}</div>
          <div className="text-wrap mb-3 text-xs font-medium">
            <img src={openBox} className="inline-flex w-[1.875rem]" />
            <span className="mb-3 ml-2.5 inline-flex">{'No Orders'}</span>
          </div>
          <button className="text-wrap rounded-md border border-indigo-700 bg-transparent px-6 py-2 text-xs text-indigo-700">
            {'View All Details'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShipmentDrawerOrderDetails;
