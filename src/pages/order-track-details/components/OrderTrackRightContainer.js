import { Tabs } from '../../../common/components';
import ActivityLogTab from './ActivityLogTab';

const OrderTrackRightContainer = () => {
  const tabsData = [
    {
      title: 'Activity Log',
      id: 'activityLog',
      panel: <ActivityLogTab />,
    },
    {
      title: 'Tracking Info',
      id: 'tracking-Info',
      panel: <> NO Data Available</>,
    },
  ];

  return (
    <div
      className="stable my-4 h-[650px] overflow-y-auto rounded-lg bg-white p-4 pt-2.5"
      style={{ scrollbarGutter: 'stable' }}>
      <Tabs
        tabs={tabsData}
        tabClassNames={'text-gray-400 font-normal flex-1 justify-center py-3 border-b-2'}
        panelClassNames={'bg-transparent'}
      />
    </div>
  );
};

export default OrderTrackRightContainer;
