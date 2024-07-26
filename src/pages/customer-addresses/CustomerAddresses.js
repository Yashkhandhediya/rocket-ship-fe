import React, { useEffect, useState } from 'react';
import Customer from '../customer-overview/Customer';
import Address from './components/Address';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../common/utils/env.config';
import { toast } from 'react-toastify';
import { Loader } from '../../common/components';
import { ACCESS_TOKEN } from '../../common/utils/config';

function CustomerAddresses() {
  const { addressId, buyerId } = useParams();
  const navigate = useNavigate()
  const [addressesData, setAddressesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const headers = {             
    'Content-Type': 'application/json',
    'Authorization': ACCESS_TOKEN};
  const fetchCustomerAddresses = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${BACKEND_URL}/users/update_customers_address/${addressId}?buyer_id=${buyerId}`,
        {},{headers:headers}
      );
      setAddressesData(response.data.all_addresses);
      setLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        sessionStorage.clear()
        navigate('/login');
    } else {
      toast('There is Error while fetching', { type: 'error' });
      setLoading(false);
    }
    }
  };

  console.log(addressesData);
  useEffect(() => {
    fetchCustomerAddresses();
  }, []);

  return (
    <PageWithSidebar>
      {loading && <Loader />}
      <Customer addressId={addressId}>
        <div className="flex flex-wrap gap-6 bg-zinc-200 px-4 py-8">
          {addressesData &&
            addressesData.map((data) => {
              return <Address key={data.id} data={data} />;
            })}
        </div>
      </Customer>
    </PageWithSidebar>
  );
}

export default CustomerAddresses;
