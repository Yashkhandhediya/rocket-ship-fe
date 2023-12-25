import { Tabs } from "../../../../common/components";
import ShipmentCourierPartnersTable from "./components/ShipmentCourierPartnersTable";

const ShipmentDrawerSelectCourier = () => {
  const tabsData = [
    {
      title: 'All',
      id: 'all',
      panel: <ShipmentCourierPartnersTable courierCompanies={[]} />,
    },
    {
      title: 'Air',
      id: 'air',
      panel: <ShipmentCourierPartnersTable courierCompanies={[]} />,
    },
    {
      title: 'Surface',
      id: 'surface',
      panel: <ShipmentCourierPartnersTable courierCompanies={[]} />,
    },
    {
      title: 'Local',
      id: 'local',
      panel: <>{'In Transit'}</>,
    },
    {
      title: 'Self-Fullfilled',
      id: 'selfFullfilled',
      panel: <>{'In Transit'}</>,
    },
  ] 

  return <div className="mt-3"><Tabs tabs={tabsData} tabClassNames={"px-6 text-[#888]"} /></div>;
};

export default ShipmentDrawerSelectCourier;
