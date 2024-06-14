import React, { useEffect, useState } from 'react';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import OrdersOverview from './components/OrdersOverview';
import Details from './components/Details';
import ShipmentTable from './components/ShipmentTable';
import axios from 'axios';
import { BACKEND_URL } from '../../common/utils/env.config';
import { toast } from 'react-toastify';
import { Loader } from '../../common/components';

function CustomerOverview() {
  const [viewData, setViewData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { buyerId } = useParams();
  const id_user = localStorage.getItem('user_id');
  const id_company = localStorage.getItem('company_id');
  const is_company = localStorage.getItem('is_company');

  const user_id = is_company == 1 ? id_company : id_user;
  const queryParams = new URLSearchParams(location.search);
  const isSuccess = queryParams.get('success');
  const [showSuccess, setShowSuccess] = useState(false);

  const fetchCustomerViewDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BACKEND_URL}/users/get_customer_view_details/${buyerId}/detail?user_id=${user_id}`,
      );
      console.log(response);
      setViewData(response.data);
      setLoading(false);
    } catch (err) {
      toast('There is Error while fetching', { type: 'error' });
      setLoading(false);
    }
  };

  const ordersOverviewData = [
    {
      title: 'Total Orders',
      value: viewData?.total_orders,
    },
    {
      title: 'Total Revenue',
      value: viewData?.total_revenue,
    },
    {
      title: 'Delivered Orders',
      value: viewData?.delivered_orders,
    },
    {
      title: 'RTO Orders',
      value: viewData?.rto_orders,
    },
  ];

  const customerContactDetails = [
    {
      title: 'Customer Contact Details',
      info: {
        name: viewData?.buyer_info?.buyer_name,
        email: viewData?.buyer_info?.buyer_email,
        phone: viewData?.buyer_info?.buyer_phone,
      },
    },
    {
      title: 'Delivery Address (default)',
      info: {
        address: viewData?.buyer_info?.address,
        city: viewData?.buyer_info?.city,
        country: viewData?.buyer_info?.country,
        state: viewData?.buyer_info?.state,
        pincode: viewData?.buyer_info?.pincode,
      },
    },
    {
      title: 'Other Details',
      info: {
        source: viewData?.buyer_info?.buyer_channel,
        createdDate: viewData?.buyer_info?.buyer_created_date,
      },
    },
  ];

  console.log(ordersOverviewData, customerContactDetails);

  useEffect(() => {
    fetchCustomerViewDetails();
  }, []);

  useEffect(() => {
    console.log(isSuccess)
    if (isSuccess === 'true') {
      setShowSuccess(true);
      window.history.replaceState({}, document.title, window.location.pathname);

      const timer = setTimeout(() => {
        console.log("Timeout triggered");

        setShowSuccess(false);
      }, 5000);
      return () => clearTimeout(5000);
    }
  }, [isSuccess]);

  const handleDismissSuccess = () => {
    setShowSuccess(false);
  };


  return (
    <PageWithSidebar>
      {showSuccess && (
        <div className="bg-green-500 text-white py-2 px-4 flex items-center">
          <span className="flex-grow text-center">Customer details updated successfully!</span>
          <button onClick={handleDismissSuccess} className="text-white">X</button>
        </div>
      )}
      <div className="ml-2">
        {loading && <Loader />}
        <div className="flex items-center justify-between bg-red-100 p-1">
          <div className="flex items-center gap-2">
            <Link to={`/customers`}>
              <FontAwesomeIcon icon={faArrowLeft} className="rounded bg-red-800 p-1 text-lg text-white" />
            </Link>
            <Link
              to={`/cutomer-overview/${buyerId}`}
              className="border-b-2 border-r border-b-red-800 border-r-gray-300 px-4 py-1 text-[17px] font-semibold text-red-800">
              Customer Overview
            </Link>
            <Link className="px-2 text-[17px]">Addresses</Link>
          </div>
          <button className="flex items-center gap-2 rounded bg-gray-200 px-4 py-1 text-sm text-red-800">
            <FontAwesomeIcon icon={faPlus} />
            <span>Add Cutomer</span>
          </button>
        </div>
        <div className="h-screen bg-zinc-200 px-4 py-8">
          <div className="flex w-full gap-4">
            {ordersOverviewData &&
              ordersOverviewData.map((data, index) => {
                return <OrdersOverview key={index} {...data} />;
              })}
          </div>
          <div className="flex w-full gap-8 pt-8">
            {customerContactDetails &&
              customerContactDetails.map((data, index) => {
                return <Details key={index} {...data} />;
              })}
          </div>
          <ShipmentTable orderDetails={viewData?.order_details} />
        </div>
      </div>
    </PageWithSidebar>
  );
}

export default CustomerOverview;
