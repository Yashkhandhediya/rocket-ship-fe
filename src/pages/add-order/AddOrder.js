import { Link } from 'react-router-dom';
import { DomesticOrder } from './components';
import { Tabs } from '../../common/components';

const AddOrder = () => {
  const tabData = [
    {
      title: 'Domestic Order',
      id: 'domestic-order',
      panel: <DomesticOrder />,
    },
    {
      title: 'Intrnational Order',
      id: 'intrnational-order',
      panel: <>{'Intrnational Order'}</>,
    },
    {
      title: 'Bulk Order',
      id: 'bulk-order',
      panel: <>{'Bulk Order'}</>,
    },
    {
      title: 'Quick Shipment',
      id: 'quick-shipment',
      panel: <>{'Quick Shipment'}</>,
    },
  ];

  return (
    <div className='bg-[#f8f8f8] h-full overflow-auto'>
      <Link to={'/orders'} className="text-decoration-none p-4 text-lg font-bold">
        {'< Add Order'}
      </Link>
      <Tabs tabs={tabData} />
    </div>
  );
};

export default AddOrder;
