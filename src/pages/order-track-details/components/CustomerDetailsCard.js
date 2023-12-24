import DetailsLabelValue from './DetailsLabelValue';
import DetailsCard from './DetailsCard';
import { CustomerDetailsIcon } from '../../../common/icons/order-details';

const CustomerDetailsCard = ({ customerDetails }) => {
  return (
    <DetailsCard heading={'Customer Details'} headingIcon={CustomerDetailsIcon}>
      <div className="flex w-full flex-wrap">
        {/* change to dynamic value */}
        <DetailsLabelValue label="Name" value={customerDetails?.name || 'N/A'} />
        <DetailsLabelValue label="Contact No." value={customerDetails?.contact_no || 'N/A'} />
        <DetailsLabelValue label="Email" value={customerDetails?.email || 'N/A'} />
        <DetailsLabelValue
          label="Address"
          value={
            <>
              <div>
                <div>{`${customerDetails.address_line1 || ''}, ${customerDetails.address_line2 || ''}`}</div>
                <div>{`${customerDetails.city || ''}, ${customerDetails.state || ''}`}</div>
                <div>{`${customerDetails?.pincode || ''}, ${customerDetails?.country || ''}`}</div>
              </div>
            </>
          }
        />
      </div>
    </DetailsCard>
  );
};

export default CustomerDetailsCard;
