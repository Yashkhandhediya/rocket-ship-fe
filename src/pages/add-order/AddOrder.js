import { useLocation,Link } from 'react-router-dom';
import { BulkOrder, DomesticOrder, InternationalOrder, QuickShipment } from './components';
import { Tabs } from '../../common/components';
import { blackLeftArrow } from '../../common/icons';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';

const AddOrder = () => {
  const location = useLocation();
  const { isEdit } = location.state || { isEdit: false }; 
  const tabData = [
    {
      title: 'Domestic Order',
      id: 'domestic-order',
      panel: <DomesticOrder />,
      tooltip: 'Add & ship your order by adding buyer & package details',
    },
    {
      title: 'International Order',
      id: 'international-order',
      panel: <InternationalOrder />,
      tooltip: 'Add & ship your international orders by adding buyer & package details',
    },
    {
      title: 'Bulk Order',
      id: 'bulk-order',
      panel: <BulkOrder />,
      tooltip: 'Upload multiple orders in bulk with an excel sheet',
    },
    {
      title: 'Quick Shipment',
      id: 'quick-shipment',
      panel: <QuickShipment/>,
      tooltip: 'Ship an order quickly by  adding buyer & package details and selecting courier all at once.',
    },
  ];

  return (
    <PageWithSidebar>
      <div className="h-full bg-[#f8f8f8] pl-4">
        <div className="py-4">
          <Link to={'/orders'} className="text-decoration-none flex items-center text-lg font-bold">
            <img src={blackLeftArrow} className="mr-2 mt-1 h-4 w-4" />
            <span>{isEdit ? 'Edit Order' : 'Add Order'}</span>
          </Link>
        </div>
        <Tabs tabs={tabData} tabClassNames={'font-normal'} />
      </div>
    </PageWithSidebar>
  );
};

export default AddOrder;
