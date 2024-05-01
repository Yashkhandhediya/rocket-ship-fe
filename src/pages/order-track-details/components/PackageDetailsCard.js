import { PackageDetailsIcon } from '../../../common/icons/order-details';
import DetailsCard from './DetailsCard';
import DetailsLabelValue from './DetailsLabelValue';

const PackageDetailsCard = ({ packageDetails }) => {
  return (
    <DetailsCard heading={'Package Details'} headingIcon={PackageDetailsIcon}>
      <div className="flex w-full flex-wrap">
        <DetailsLabelValue
          label="Dead Weight (in Kg)"
          value={packageDetails?.dead_weight?.toFixed(2) || 'N/A'}
        />
        <DetailsLabelValue
          label="Dimensions (in cm)"
          value={`${packageDetails?.length?.toFixed(3)}x${packageDetails?.width?.toFixed(
            3,
          )}x${packageDetails?.height?.toFixed(3)}`}
        />
        <DetailsLabelValue
          label="Volumetric Weight (in Kg)"
          value={packageDetails?.volumatric_weight?.toFixed(4) || 'N/A'}
        />
        <DetailsLabelValue
          label="Applied Weight (in Kg)"
          value={packageDetails?.applicable_weight?.toFixed(2) || 'N/A'}
        />
      </div>
    </DetailsCard>
  );
};

export default PackageDetailsCard;
