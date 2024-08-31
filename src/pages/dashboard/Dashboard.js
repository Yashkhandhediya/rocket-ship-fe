import axios from 'axios';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { BACKEND_URL } from '../../common/utils/env.config';
import { useState, useEffect, useRef } from 'react';
import { noShipment } from '../../common/images';
import { toast } from 'react-toastify';
import { Loader } from '../../common/components';
import { Link, useNavigate } from 'react-router-dom';
import { Card, DonutChart } from './components';
import ShipmentDetailCard from './components/shipment-card/ShipmentDetailCard';
import { ShipmentOverview } from './components/shipment-overview';
import GeoChart from './components/GeoChart';
import ShipmentZone from './components/ShipmentZone';

const Dashboard = () => {
  const navigate = useNavigate();
  const id_user = localStorage.getItem('user_id');
  const company_id = localStorage.getItem('company_id');
  const oneMonthAgo = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().slice(0, 10);
  const todayDate = new Date().toISOString().slice(0, 10);
  const [fromDate, setFromDate] = useState(oneMonthAgo.toString());
  const [toDate, setToDate] = useState(todayDate.toString());
  const [todayOrder, setTodayOrder] = useState(0);
  const [todayRevenue, setTodayRevenue] = useState(0);
  const [yesterdayOrder, setYesterdayOrder] = useState(0);
  const [yesterdayRevenue, setYesterdayRevenue] = useState(0);
  const [averageShipment, setAverageShipment] = useState(0);
  const [shipData, setShipData] = useState([]);
  const [result, setResult] = useState([]);
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('Overview');
  const hasFetched = useRef(false);
  const [stateWiseOrderCount, setStateWiseOrderCount] = useState([]);
  const [zoneWiseOrderCount, setZoneWiseOrderCount] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [shipmentDetail, setShipmentDetail] = useState({
    total_shipment: 0,
    pickup_pending: 0,
    in_transit: 0,
    delivered: 0,
    ndr_pending: 0,
    rto: 0,
  });

  const shipmentDetails = [
    { label: 'Total Shipments', value: shipmentDetail.total_shipment },
    { label: 'Pickup Pending', value: shipmentDetail.pickup_pending },
    { label: 'In-Transit', value: shipmentDetail.in_transit },
    { label: 'Delivered', value: shipmentDetail.delivered },
    { label: 'NDR Pending', value: shipmentDetail.ndr_pending },
    { label: 'RTO', value: shipmentDetail.rto },
  ];

  const ndrDetails = [
    { label: 'Total NDR', value: shipmentDetail.in_transit },
    { label: 'Your Reattempt Request', value: shipmentDetail.delivered },
    { label: 'Buyer Reattempt Request', value: shipmentDetail.ndr_pending },
    { label: 'NDR Delivered', value: shipmentDetail.rto },
  ];

  const codDetails = [
    { label: 'Total COD (Last 30 Days)', value: shipmentDetail.total_shipment },
    { label: 'COD Available', value: shipmentDetail.pickup_pending },
    { label: 'COD Pending (Greater than 8 days)', value: shipmentDetail.in_transit },
    { label: 'Last COD Remitted', value: shipmentDetail.delivered },
  ];

  const columnNames = [
    { label: 'Courier Name', key: 'partner_name' },
    { label: 'Pickup Unscheduled', key: '0' },
    { label: 'Pickup Scheduled', key: '1' },
    { label: 'In-Transit', key: '4' },
    { label: 'Delivered', key: '5' },
    { label: 'NDR Raised', key: 'ndr_raised' },
    { label: 'NDR Delivered', key: 'ndr_delivered' },
    { label: 'NDR Pending', key: 'ndr_pending' },
    { label: 'RTO', key: '6' },
    { label: 'Lost/Damaged', key: 'lost_damaged' },
    { label: 'Total Shipment', key: 'total_counts' },
  ];

  const backgroundColor = ['#bcbaff', '#ffb98f', '#60eba0', '#4f7de9', '#f47ac2', '#daf490', '#c88888'];

  const sampleData1 = {
    labels: shipData.map((item) => item.partner_name),
    datasets: [
      {
        data: shipData.map((item) => item.status_count),
        backgroundColor: backgroundColor,
      },
    ],
  };

  const sampleData2 = {
    labels: shipmentDetails.map((item) => item.label),
    datasets: [
      {
        data: shipmentDetails.map((item) => item.value),
        backgroundColor: backgroundColor,
      },
    ],
  };

  const tabs = [
    'Overview',
    'Orders',
    'Shipments',
    'NDR',
    'WhatsApp Comm',
    'RTO',
    'Courier',
    'Delays',
    'Tracking Page',
  ];

  const handleData = () => {
    axios
      .post(
        BACKEND_URL +
          `/dashboard/user_order_analysis/?user_id=${id_user}&start_date=${fromDate}&end_date=${toDate}`,
      )
      .then((res) => {
        setTodayOrder(res.data.todays_order_count);
        setYesterdayOrder(res.data.yesterdays_order_count);
        setTodayRevenue(res.data.todays_revenue);
        setYesterdayRevenue(res.data.yesterdays_revenue);
        setAverageShipment(res.data.average_shipment);
        let total = 0;
        const data = res.data.order_details;
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            total += data[key];
          }
        }
        setShipmentDetail({
          total_shipment: total,
          pickup_pending: res.data.order_details['invoiced'] + res.data.order_details['manifested'] || 0,
          in_transit: res.data.order_details['In transit'] || 0,
          delivered: res.data.order_details['Delivered'] || 0,
          ndr_pending: res.data.order_details['ndr_initiated'] || 0,
          rto: res.data.order_details['RTO'] || 0,
        });
        setShipData(res.data.shipment_details);
        setFlag(true);
        setLoading(false);
        setStateWiseOrderCount(res.data.state_wise_order_count);
        setZoneWiseOrderCount(res.data.zone_wise_order_count);
        setRevenue(res.data.revenue);
      })
      .catch((err) => {
        console.log('ERRRRRR', err);
      });
  };

  const StatusCounts = (data) => {
    // Calculate the total status count based on partner_name and status_id
    const calculateStatusCounts = () => {
      const counts = {};

      data.forEach((entry) => {
        const partnerName = entry.partner_name.trim();
        const statusId = entry.status_id;
        const statusCount = entry.status_count;

        if (!counts[partnerName]) {
          counts[partnerName] = {}; // Initialize as an empty object
        }

        if (counts[partnerName][statusId]) {
          counts[partnerName][statusId] += statusCount;
        } else {
          counts[partnerName][statusId] = statusCount;
        }
      });

      // Convert the counts object to an array of objects
      const resultArray = Object.entries(counts).map(([partnerName, statusCounts]) => {
        // Construct an object with the partner name and a list of status counts
        const statusArray = [];
        let total = 0;
        for (let statusId = 1; statusId <= 9; statusId++) {
          statusArray.push(statusCounts[statusId] || 0);
        }

        for (let i = 0; i < statusArray.length; i++) {
          total += parseInt(statusArray[i]);
        }
        return {
          partner_name: partnerName,
          status_counts: statusArray,
          total_counts: total,
        };
      });
      // Update the state with the calculated results
      setResult(resultArray);
      console.log('RESUUUUUU', result);
    };

    // Call the function to calculate the status counts
    calculateStatusCounts();
  };

  const checkDate = (fromDate, toDate) => {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    return from <= to;
  };

  const handleDateChange = () => {
    setLoading(true);
    if (checkDate(fromDate, toDate)) {
      handleData();
      StatusCounts(shipData);
    } else {
      toast.error('From date should be less than To date');
    }
  };

  useEffect(() => {
    if (!flag) {
      if (!hasFetched.current) {
        handleData();
        hasFetched.current = true;
      }
    }
    StatusCounts(shipData);
  }, [fromDate, toDate, shipData]);

  return (
    <PageWithSidebar>
      <div className="flex w-full flex-col px-5 py-1 pb-4">
        <div className="flex items-center">
          <span className="text-xl font-bold">Dashboard</span>
          <div className="ml-4">
            <select
              id="travel-type"
              name="travel-type"
              className="block w-auto rounded-md border border-gray-300 px-3 py-2 text-base shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              <option value="domestic">Domestic</option>
              <option value="international">International</option>
            </select>
          </div>
        </div>
        <div className="flex w-full flex-col">
          <div className="flex w-full gap-10 border-b">
            {tabs.map((tab) => (
              <div
                key={tab}
                className={`cursor-pointer px-4 py-2 ${
                  activeTab === tab ? 'border-b-2 border-[#912517]' : 'border-b-2 border-transparent'
                }`}
                onClick={() => setActiveTab(tab)}>
                {tab}
              </div>
            ))}
          </div>
          <div className="flex-1">
            {activeTab === 'Overview' && (
              <div style={{ textAlign: 'center' }}>
                {loading && <Loader />}
                {/* <h1>Dashboard</h1> */}
                {localStorage.getItem('is_kyc') == 1 && (
                  <div className="ml-4 mr-4 mt-2 w-[98%] rounded-lg border bg-red-600 p-2 shadow-md hover:underline">
                    <Link to={'/seller/kyc'} className="text-white">
                      Click here to complete your KYC and get non-disrupted shipping and COD remittances
                    </Link>
                  </div>
                )}
                <div>
                  <div className="flex flex-col items-center justify-between md:w-full lg:flex-row">
                    <Card
                      bgColor="bg-[#dadafc]"
                      icon={
                        <svg
                          className="dark:text-white h-12 w-12 text-gray-800"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24">
                          <path
                            stroke="red"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-3 5h3m-6 0h.01M12 16h3m-6 0h.01M10 3v4h4V3h-4Z"
                          />
                        </svg>
                      }
                      title="Today's Orders"
                      mainText={todayOrder}
                      subText={`Yesterday ${yesterdayOrder}`}
                    />
                    <ShipmentDetailCard
                      title="Shipments Details"
                      details={shipmentDetails}
                      bgColor="bg-[#dadafc]"
                    />
                  </div>
                  <div className="flex flex-col items-center justify-between md:w-full lg:flex-row">
                    <Card
                      bgColor="bg-[#c2e7c7]"
                      icon={
                        <svg
                          className="dark:text-white h-12 w-12 text-gray-800"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24">
                          <path
                            stroke="red"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-3 5h3m-6 0h.01M12 16h3m-6 0h.01M10 3v4h4V3h-4Z"
                          />
                        </svg>
                      }
                      title="Today's Revenue"
                      mainText={
                        <span className="flex">
                          <em className="fa fa fa-inr mr-1 text-left text-lg font-semibold"></em>
                          {todayRevenue}
                        </span>
                      }
                      subText={
                        <span>
                          Yesterday <em className="fa fa fa-inr mr-1 text-xs"></em>
                          {yesterdayRevenue}
                        </span>
                      }
                    />
                    <ShipmentDetailCard title="NDR Details" details={ndrDetails} bgColor="bg-gray-100" />
                  </div>
                  <div className="flex flex-col items-center justify-between md:w-full lg:flex-row">
                    <Card
                      bgColor="bg-[#dadafc]"
                      icon={
                        <svg
                          className="dark:text-white h-12 w-12 text-gray-800"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24">
                          <path
                            stroke="red"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-3 5h3m-6 0h.01M12 16h3m-6 0h.01M10 3v4h4V3h-4Z"
                          />
                        </svg>
                      }
                      title="Average Shipping"
                      mainText={
                        <span className="flex">
                          <em className="fa fa fa-inr mr-1 text-left text-lg font-semibold"></em>
                          {averageShipment}
                        </span>
                      }
                    />
                    <ShipmentDetailCard title="COD Status" details={codDetails} bgColor="bg-gray-100" />
                  </div>
                </div>
                <div className="flex justify-between gap-8">
                  <DonutChart data={sampleData1} title={'Couriers Split'} />
                  <DonutChart data={sampleData2} title={'Overall Shipment Status'} />
                  <DonutChart data={{}} title={'Delivery Performance'} />
                </div>
                <div className="flex justify-between gap-8">
                  <GeoChart stateWiseOrderCount={stateWiseOrderCount} />
                  <ShipmentZone data={zoneWiseOrderCount} title={`Shipment Zone`} />
                  <ShipmentZone title={`Revenue`} data={revenue} />
                </div>
                <ShipmentOverview
                  title={'Shipment Overview By Courier'}
                  fromDate={fromDate}
                  setFromDate={setFromDate}
                  toDate={toDate}
                  setToDate={setToDate}
                  handleDateChange={handleDateChange}
                  shipData={shipData}
                  result={result}
                  columnNames={columnNames}
                  noShipment={noShipment}
                />
              </div>
            )}
            {activeTab === 'Orders' && <div>Orders Content</div>}
            {activeTab === 'Shipments' && <div>Shipment Content</div>}
          </div>
        </div>
      </div>
    </PageWithSidebar>
  );
};

export default Dashboard;
