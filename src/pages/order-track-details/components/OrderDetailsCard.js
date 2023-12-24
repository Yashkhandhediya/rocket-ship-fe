import { Badge } from 'flowbite-react';
import DetailsLabelValue from './DetailsLabelValue';
import DetailsCard from './DetailsCard';
import { OrderDetailsIcon } from '../../../common/icons/order-details';
import { Tooltip } from '../../../common/components';

const OrderDetailsCard = ({ orderDetails }) => {
  return (
    <DetailsCard heading={'Order Details'} headingIcon={OrderDetailsIcon}>
      <div className="flex w-full flex-wrap">
        {/* change to dynamic value */}
        <DetailsLabelValue
          label="Order created on channel"
          value={orderDetails?.created_date || '23 Dec 2023 12:00 AM'}
        />
        <DetailsLabelValue label="Channel" value={orderDetails?.channel || 'CUSTOM'} />{' '}
        {/* change to dynamic value */}
        <DetailsLabelValue
          label="Pickup Address"
          value={
            <Tooltip
              text={
                <>
                  <div>{orderDetails?.tag}</div>
                  <div>{orderDetails?.addressLine1}</div>
                  <div>{orderDetails?.city}</div>
                  <div>{`${orderDetails?.state || ''}-${orderDetails?.state || ''}`}</div>
                  <div>{orderDetails?.contact_no}</div>
                </>
              }>
              <p className="relative mb-3 w-fit cursor-pointer text-xs font-medium before:absolute before:bottom-[-2px] before:w-full before:border before:border-dashed before:border-[#555]">
                {/* change to dynamic value */}
                {orderDetails?.tag || 'Primary'}
              </p>
            </Tooltip>
          }
        />
        <DetailsLabelValue
          label="Payment"
          value={
            <>
              {/* change to dynamic value */}
              <span>{orderDetails?.total || '₹290'}</span>
              <Badge
                color={'success'}
                className="ml-1 inline h-fit w-fit rounded-sm p-1 py-0 text-[10px] font-normal capitalize">
                {/* change to dynamic value */}
                {orderDetails?.payment_t6ype || 'Prepaid'}
              </Badge>
            </>
          }
        />
        <DetailsLabelValue
          label="Order created on system"
          value={orderDetails?.created_date || '23 Dec 2023 12:00 AM'}
        />
      </div>
    </DetailsCard>
  );
};

export default OrderDetailsCard;
