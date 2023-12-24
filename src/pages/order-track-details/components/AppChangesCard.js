import DetailsCard from './DetailsCard';
import { AppChangesIcon } from '../../../common/icons/order-details';

const AppChangesCard = () => {
  return (
    <DetailsCard heading={'App Changes'} headingIcon={AppChangesIcon} toggle={true}>
      <div className="grid text-xs place-items-center border border-[#efefef] bg-[#fafafa] p-7 text-[#4C4C45]">
        {'No Apps found'}
      </div>
    </DetailsCard>
  );
};

export default AppChangesCard;
