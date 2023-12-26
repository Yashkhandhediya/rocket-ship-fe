import { Tabs } from "../../../../common/components";
import ShipmentCourierPartnersTable from "./components/ShipmentCourierPartnersTable";
import ShipmentSelfFullfiled from "./components/ShipmentSelfFullfiled";

const ShipmentDrawerSelectCourier = ({orderId}) => {
  // eslint-disable-next-line no-console
  console.log(orderId)

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
      panel: <ShipmentCourierPartnersTable courierCompanies={[]} />,
    },
    {
      title: 'Self-Fullfilled',
      id: 'selfFullfilled',
      panel: <ShipmentSelfFullfiled />,
    },
  ]

  return <div className="mt-3"><Tabs tabs={tabsData} tabClassNames={"px-6 text-[#888]"} /></div>;
};

export default ShipmentDrawerSelectCourier;
