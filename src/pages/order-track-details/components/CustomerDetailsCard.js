import DetailsLabelValue from './DetailsLabelValue';
import DetailsCard from './DetailsCard';
import { CustomerDetailsIcon } from '../../../common/icons/order-details';

const CustomerDetailsCard = ({ customerDetails }) => {
  return (
    <DetailsCard heading={'Customer Details'} headingIcon={CustomerDetailsIcon}>
      <div className="flex w-full flex-wrap">
        {/* change to dynamic value */}
        <DetailsLabelValue label="Name" value={customerDetails?.first_name || 'N/A'} />
        <DetailsLabelValue label="Contact No." value={customerDetails?.contact_no || 'N/A'} />
        <DetailsLabelValue label="Email" value={customerDetails?.email_address || 'N/A'} />
        <DetailsLabelValue
          label="Address"
          value={
            <>
              <div>
                {customerDetails?.complete_address && (
                  <div className="text-wrap">{`${customerDetails?.complete_address || ''}`}</div>
                )}
                {customerDetails?.landmark && (
                  <div className="text-wrap">{`${customerDetails?.landmark || ''}`}</div>
                )}
                <div className="text-wrap">{`${customerDetails?.city || ''}, ${
                  customerDetails.state || ''
                }`}</div>
                <div className="text-wrap">{`${customerDetails?.pincode || ''}, ${
                  customerDetails?.country || ''
                }`}</div>
              </div>
            </>
          }
        />
      </div>
    </DetailsCard>
  );
};

export default CustomerDetailsCard;
