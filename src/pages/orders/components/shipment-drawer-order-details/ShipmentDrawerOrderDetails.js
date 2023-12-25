import { openBox } from '../../../../common/icons';
import LabelValue from './components/LabelValue';

const ShipmentDrawerOrderDetails = () => {
  return (
    <div>
      <LabelValue label={'Pickup From'} value={'380001, Gujarat'} tooltipText={'Address'} />
      <LabelValue label={'Deliver To'} value={'380001, Gujarat'} tooltipText={'Address'} />
      <LabelValue label={'Order Value'} value={`₹ ${290.0}`} />
      <LabelValue label={'Payment Mode'} value={`Prepaid`} />
      <LabelValue label={'Applicable Weight (in Kg)'} value={`${0.2} Kg`} />
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
