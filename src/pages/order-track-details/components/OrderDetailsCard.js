import { Badge } from 'flowbite-react';
import DetailsLabelValue from './DetailsLabelValue';
import DetailsCard from './DetailsCard';
import { OrderDetailsIcon } from '../../../common/icons/order-details';
import { CustomTooltip } from '../../../common/components';
import moment from 'moment';

const OrderDetailsCard = ({ orderDetails }) => {
  console.log("ORDER DETAILSSSSSSSSS",orderDetails)
  return (
    <DetailsCard heading={'Order Details'} headingIcon={OrderDetailsIcon}>
      <div className="flex w-full flex-wrap">
        <DetailsLabelValue
          label="Order created on channel"
          value={
            orderDetails?.created_date
              ? moment(orderDetails?.created_date).format('DD MMM YYYY hh:mm A')
              : 'N/A'
          }
        />
        <DetailsLabelValue label="Channel" value={orderDetails?.channel ? orderDetails?.channel : 'Custom'} />
        <DetailsLabelValue
          label="Pickup Address"
          value={
            // <CustomTooltip
            //   text={
            //     <>
            //       {orderDetails?.user_info?.address_type && (
            //         <div>{orderDetails?.user_info?.address_type}</div>
            //       )}
            //       {orderDetails?.user_info?.complete_address && (
            //         <div>{orderDetails?.user_info?.complete_address}</div>
            //       )}
            //       {orderDetails?.user_info?.city && <div>{orderDetails?.user_info?.city}</div>}
            //       <div>{`${orderDetails?.user_info?.state || ''}-${
            //         orderDetails?.user_info?.pincode || ''
            //       }`}</div>
            //       {orderDetails?.user_info?.contact_no && <div>{orderDetails?.user_info?.contact_no}</div>}
            //     </>
            //   }>
            // </CustomTooltip>
              // <p className="relative mb-3 w-fit cursor-pointer text-xs font-medium before:absolute before:bottom-[-2px] before:w-full before:border before:border-dashed before:border-[#555]">
              //   {orderDetails?.user_info?.address_type}
              // </p>
              orderDetails?.user_info?.complete_address ? orderDetails?.user_info?.complete_address  : ''
          }
        />
        <DetailsLabelValue
          label="Payment"
          value={
            <>
              <span>{'₹' + orderDetails?.total_amount}</span>
              {orderDetails?.payment_type_name && (
                <Badge
                  color={'success'}
                  className="ml-1 inline h-fit w-fit rounded-sm p-1 py-0 text-[10px] font-normal capitalize">
                  {orderDetails?.payment_type_name}
                </Badge>
              )}
            </>
          }
        />
        <DetailsLabelValue
          label="Order created on system"
          value={
            orderDetails?.created_date
              ? moment(orderDetails?.created_date).format('DD MMM YYYY hh:mm A')
              : 'N/A'
          }
        />
      </div>
    </DetailsCard>
  );
};

export default OrderDetailsCard;
