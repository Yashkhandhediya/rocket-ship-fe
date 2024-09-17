import React, { useEffect, useState } from 'react';
import Customer from '../customer-overview/Customer';
import Address from './components/Address';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { useParams } from 'react-router-dom';
import { BACKEND_URL } from '../../common/utils/env.config';
import { toast } from 'react-toastify';
import { Loader } from '../../common/components';
import apiClient from '../../common/utils/apiClient';

function CustomerAddresses() {
  const { addressId, buyerId } = useParams();
  const [addressesData, setAddressesData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCustomerAddresses = async () => {
    setLoading(true);
    try {
      const response = await apiClient.put(
        `${BACKEND_URL}/users/update_customers_address/${addressId}?buyer_id=${buyerId}`,
        {},
      );
      setAddressesData(response.data.all_addresses);
      setLoading(false);
    } catch (err) {
      toast('There is Error while fetching', { type: 'error' });
      setLoading(false);
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
