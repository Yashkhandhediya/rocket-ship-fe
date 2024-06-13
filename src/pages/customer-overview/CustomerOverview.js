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
import Customer from './Customer';

function CustomerOverview() {
  const [viewData, setViewData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { buyerId } = useParams();
  const id_user = localStorage.getItem('user_id');
  const id_company = localStorage.getItem('company_id');
  const is_company = localStorage.getItem('is_company');

  const user_id = is_company == 1 ? id_company : id_user;

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

  return (
    <Customer>
      {loading && <Loader />}
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
    </Customer>
  );
}

export default CustomerOverview;
