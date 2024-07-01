import React, { useEffect, useState } from 'react';
import { Field, Loader } from '../../common/components';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../../common/utils/env.config';
import { toast } from 'react-toastify';
import { ACCESS_TOKEN } from '../../common/utils/config';

function CustomerAddressEdit() {
  const { buyerId, addressId } = useParams();
  const [loading, setLoading] = useState(false);
  const id_user = localStorage.getItem('user_id');
  const id_company = localStorage.getItem('company_id');
  const is_company = localStorage.getItem('is_company');
  const user_id = is_company == 1 ? id_company : id_user;
  const navigate = useNavigate();
  const headers = {             
    'Content-Type': 'application/json',
    'Authorization': ACCESS_TOKEN};

  const [addressInfo, setAddressInfo] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
  });

  const handleAddressInfo = (event) => {
    const { id, value } = event.target;
    setAddressInfo({
      ...addressInfo,
      [id]: value,
    });
  };

  const fetchCustomerViewDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BACKEND_URL}/users/get_customer_view_details/${buyerId}/detail`,
        {headers:headers}
      );
      setAddressInfo({
        addressLine1: response.data?.buyer_info?.address,
        addressLine2: response.data?.buyer_info?.address,
        city: response.data?.buyer_info?.city,
        country: response.data?.buyer_info?.country,
        state: response.data?.buyer_info?.state,
        pincode: response.data?.buyer_info?.pincode,
      });
      setLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        localStorage.clear()
        toast.error('Session expired. Please login again.');
        navigate('/login');
      } else {
        toast('There is Error while fetching', { type: 'error' });
      }
      setLoading(false);
    }
  };

  const updateDetails = async () => {
    setLoading(true);

    // Check if all required fields are available
    if (
      addressInfo.addressLine1 &&
      addressInfo.addressLine1 &&
      addressInfo.city &&
      addressInfo.state &&
      addressInfo.country &&
      addressInfo.pincode
    ) {
      try {
        const response = await axios.put(
          `${BACKEND_URL}/users/update_customers_address/${addressId}?buyer_id=${buyerId}`,
          {
            id: addressId,
            users_id: buyerId,
            complete_address: addressInfo.addressLine1,
            city: addressInfo.city,
            country: addressInfo.country,
            state: addressInfo.state,
            pincode: addressInfo.pincode,
          },
          {headers:headers}
        );

        console.log(response);

        if (response.status === 200) {
          navigate(`/customer-overview/${buyerId}`);
          toast('Customer Address updated successfully!', { type: 'success' });
        } else {
          // If not successful, display an error message
          toast('There was an error while updating customer details', { type: 'error' });
        }

        setLoading(false);
      } catch (err) {
        // Handle any errors from the API request
        toast('There is Error while fetching', { type: 'error' });
        setLoading(false);
      }
    } else {
      // If any required field is missing, display an error message
      toast('Please provide all required information', { type: 'error' });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomerViewDetails();
  }, []);

  return (
    <PageWithSidebar>
      <div className="ml-3 bg-zinc-200 px-3 py-2">
        {loading && <Loader />}
        <div className="my-3 rounded-lg bg-white p-6 shadow">
          <div className="flex w-2/3 flex-col gap-6 py-4">
            <div className="flex gap-5">
              <Field
                id={'addressLine1'}
                label={'Address Line 1'}
                inputClassNames={'text-xs'}
                labelClassNames={'text-xs'}
                placeHolder={'Address 1'}
                required={true}
                value={addressInfo.addressLine1}
                onChange={handleAddressInfo}
              />
              <Field
                id={'city'}
                label={'City'}
                inputClassNames={'text-xs'}
                labelClassNames={'text-xs'}
                placeHolder={'City'}
                required={true}
                value={addressInfo.city}
                onChange={handleAddressInfo}
              />
              <Field
                id={'state'}
                label={'State'}
                inputClassNames={'text-xs'}
                labelClassNames={'text-xs'}
                placeHolder={'State'}
                required={true}
                value={addressInfo.state}
                onChange={handleAddressInfo}
              />
            </div>
            <div className="flex gap-5">
              <Field
                id={'addressLine2'}
                label={'Address Line 2'}
                inputClassNames={'text-xs'}
                labelClassNames={'text-xs'}
                placeHolder={'Address 2'}
                required={true}
                value={addressInfo.addressLine2}
                onChange={handleAddressInfo}
              />
              <Field
                id={'country'}
                label={'Country'}
                inputClassNames={'text-xs'}
                labelClassNames={'text-xs'}
                placeHolder={'Country'}
                required={true}
                value={addressInfo.country}
                onChange={handleAddressInfo}
              />
              <Field
                id={'pincode'}
                label={'Pincode'}
                inputClassNames={'text-xs'}
                labelClassNames={'text-xs'}
                placeHolder={'Pincode'}
                required={true}
                value={addressInfo.pincode}
                onChange={handleAddressInfo}
              />
            </div>
          </div>
        </div>
        <button className="m-4 rounded bg-red-800 px-4 py-2 text-sm text-white" onClick={updateDetails}>
          Update Details
        </button>
      </div>
    </PageWithSidebar>
  );
}

export default CustomerAddressEdit;
