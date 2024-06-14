// import React, { useState, useEffect } from 'react';
// import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
// import { Field, Loader } from '../../common/components';
// import { useNavigate, useParams } from 'react-router-dom';
// import { BACKEND_URL } from '../../common/utils/env.config';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// function CustomerEdit() {
//   const [loading, setLoading] = useState(false);
//   const { buyerId } = useParams();
//   const id_user = localStorage.getItem('user_id');
//   const id_company = localStorage.getItem('company_id');
//   const is_company = localStorage.getItem('is_company');
//   const user_id = is_company == 1 ? id_company : id_user;
//   const navigate = useNavigate()

//   const [customerInfo, setCustomerInfo] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//   });

//   const [showSuccess, setShowSuccess] = useState(false);

//   const getName = (buyerName) => {
//     const nameArr = buyerName.split(' ');
//     const firstName = nameArr[0];
//     const lastName = nameArr.length === 1 ? '' : nameArr[nameArr.length - 1];
//     return { firstName, lastName };
//   };

//   const handleCustomerInfo = (event) => {
//     const { id, value } = event.target;
//     setCustomerInfo({
//       ...customerInfo,
//       [id]: value,
//     });
//   };

//   const fetchCustomerViewDetails = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `${BACKEND_URL}/users/get_customer_view_details/${buyerId}/detail?user_id=${user_id}`,
//       );
//       console.log(response);
//       setCustomerInfo({
//         firstName: getName(response.data?.buyer_info?.buyer_name).firstName,
//         lastName: getName(response.data?.buyer_info?.buyer_name).lastName,
//         email: response.data?.buyer_info?.buyer_email,
//         phone: response.data?.buyer_info?.buyer_phone,
//       });
//       setLoading(false);
//     } catch (err) {
//       toast('There is Error while fetching', { type: 'error' });
//       setLoading(false);
//     }
//   };

//   const updateDetails = async () => {
//     setLoading(true);
//      // Check if all required fields are available
//     if (customerInfo.firstName && customerInfo.lastName && customerInfo.email && customerInfo.phone) {
//       try {
//         const response = await axios.put(`${BACKEND_URL}/users/update_customers/${buyerId}`, {
//           first_name: customerInfo.firstName,
//           last_name: customerInfo.lastName,
//           email: customerInfo.email,
//           phone: customerInfo.phone,
//         });
        
//         console.log(response);
//         // toast(`${response.data.message}`, { type: 'success' });
//         setLoading(false);
        
//         // setShowSuccess(true);
//         navigate(`/customer-overview/${buyerId}?success=true`);
//         // navigate(`/customer-overview/${buyerId}`);
//       } catch (err) {
//         toast('There is Error while fetching', { type: 'error' });
//         setLoading(false);
//       }
//     } else {
//       // If any required field is missing, display an error message
//       toast('Please provide all required information', { type: 'error' });
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCustomerViewDetails();
//   }, []);

//   return (
//     <PageWithSidebar>
//       {loading && <Loader />}
//       <div className="ml-3 bg-zinc-200 px-3 py-2">
//         <div className="my-3 rounded-lg bg-white p-6 shadow">
//           <p className="border-b pb-2 text-xl font-bold text-gray-500">Edit Customer</p>
//           <div className="flex gap-6 py-4">
//             <Field
//               id={'firstName'}
//               label={'Customer First Name'}
//               inputClassNames={'text-xs'}
//               labelClassNames={'text-xs'}
//               placeHolder={'First Name'}
//               required={true}
//               value={customerInfo?.firstName}
//               onChange={handleCustomerInfo}
//             />
//             <Field
//               id={'lastName'}
//               label={'Customer Last Name'}
//               inputClassNames={'text-xs'}
//               labelClassNames={'text-xs'}
//               placeHolder={'Last Name'}
//               required={true}
//               value={customerInfo?.lastName}
//               onChange={handleCustomerInfo}
//             />
//             <Field
//               id={'email'}
//               label={'Email'}
//               inputClassNames={'text-xs'}
//               labelClassNames={'text-xs'}
//               placeHolder={'Email ID'}
//               required={true}
//               value={customerInfo?.email}
//               onChange={handleCustomerInfo}
//             />
//             <Field
//               id={'phone'}
//               label={'Customer Phone'}
//               inputClassNames={'text-xs'}
//               labelClassNames={'text-xs'}
//               placeHolder={'Phone No.'}
//               required={true}
//               value={customerInfo?.phone}
//               isDisabled={true}
//             />
//           </div>
//         </div>
//         <button className="m-4 rounded bg-red-800 px-4 py-2 text-sm text-white" onClick={updateDetails}>
//           Update Details
//         </button>
//       </div>
//     </PageWithSidebar>
//   );
// }

// export default CustomerEdit;


import React, { useState, useEffect } from 'react';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import { Field, Loader } from '../../common/components';
import { useNavigate, useParams } from 'react-router-dom';
import { BACKEND_URL } from '../../common/utils/env.config';
import axios from 'axios';
import { toast } from 'react-toastify';

function CustomerEdit() {
  const [loading, setLoading] = useState(false);
  const { buyerId } = useParams();
  const id_user = localStorage.getItem('user_id');
  const id_company = localStorage.getItem('company_id');
  const is_company = localStorage.getItem('is_company');
  const user_id = is_company == 1 ? id_company : id_user;
  const navigate = useNavigate()

  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  // const [showSuccess, setShowSuccess] = useState(false);

  const getName = (buyerName) => {
    const nameArr = buyerName.split(' ');
    const firstName = nameArr[0];
    const lastName = nameArr.length === 1 ? '' : nameArr[nameArr.length - 1];
    return { firstName, lastName };
  };

  const handleCustomerInfo = (event) => {
    const { id, value } = event.target;
    setCustomerInfo({
      ...customerInfo,
      [id]: value,
    });
  };

  const fetchCustomerViewDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BACKEND_URL}/users/get_customer_view_details/${buyerId}/detail?user_id=${user_id}`,
      );
      console.log(response);
      setCustomerInfo({
        firstName: getName(response.data?.buyer_info?.buyer_name).firstName,
        lastName: getName(response.data?.buyer_info?.buyer_name).lastName,
        email: response.data?.buyer_info?.buyer_email,
        phone: response.data?.buyer_info?.buyer_phone,
      });
      setLoading(false);
    } catch (err) {
      toast('There is Error while fetching', { type: 'error' });
      setLoading(false);
    }
  };

  // const updateDetails = async () => {
  //   setLoading(true);
  //    // Check if all required fields are available
  //   if (customerInfo.firstName && customerInfo.lastName && customerInfo.email && customerInfo.phone) {
  //     try {
  //       const response = await axios.put(`${BACKEND_URL}/users/update_customers/${buyerId}`, {
  //         first_name: customerInfo.firstName,
  //         last_name: customerInfo.lastName,
  //         email: customerInfo.email,
  //         phone: customerInfo.phone,
  //       });
        
  //       console.log(response);
  //       // toast(`${response.data.message}`, { type: 'success' });
  //       setLoading(false);
  //       // setShowSuccess(true)
        
  //       navigate(`/customer-overview/${buyerId}?success=true`);

  //     } catch (err) {
  //       toast('There is Error while fetching', { type: 'error' });
  //       setLoading(false);
  //     }
  //   } else {
  //     // If any required field is missing, display an error message
  //     toast('Please provide all required information', { type: 'error' });
  //     setLoading(false);
  //   }
  // };

  const updateDetails = async () => {
    setLoading(true);
    
    // Check if all required fields are available
    if (customerInfo.firstName && customerInfo.lastName && customerInfo.email && customerInfo.phone) {
      try {
        const response = await axios.put(`${BACKEND_URL}/users/update_customers/${buyerId}`, {
          first_name: customerInfo.firstName,
          last_name: customerInfo.lastName,
          email: customerInfo.email,
          phone: customerInfo.phone,
        });
  
        console.log(response);

        if (response.status === 200) {
          navigate(`/customer-overview/${buyerId}?success=true`);
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
      {loading && <Loader />}
      <div className="ml-3 bg-zinc-200 px-3 py-2">
        <div className="my-3 rounded-lg bg-white p-6 shadow">
          <p className="border-b pb-2 text-xl font-bold text-gray-500">Edit Customer</p>
          <div className="flex gap-6 py-4">
            <Field
              id={'firstName'}
              label={'Customer First Name'}
              inputClassNames={'text-xs'}
              labelClassNames={'text-xs'}
              placeHolder={'First Name'}
              required={true}
              value={customerInfo?.firstName}
              onChange={handleCustomerInfo}
            />
            <Field
              id={'lastName'}
              label={'Customer Last Name'}
              inputClassNames={'text-xs'}
              labelClassNames={'text-xs'}
              placeHolder={'Last Name'}
              required={true}
              value={customerInfo?.lastName}
              onChange={handleCustomerInfo}
            />
            <Field
              id={'email'}
              label={'Email'}
              inputClassNames={'text-xs'}
              labelClassNames={'text-xs'}
              placeHolder={'Email ID'}
              required={true}
              value={customerInfo?.email}
              onChange={handleCustomerInfo}
            />
            <Field
              id={'phone'}
              label={'Customer Phone'}
              inputClassNames={'text-xs'}
              labelClassNames={'text-xs'}
              placeHolder={'Phone No.'}
              required={true}
              value={customerInfo?.phone}
              isDisabled={true}
            />
          </div>
        </div>
        <button className="m-4 rounded bg-red-800 px-4 py-2 text-sm text-white" onClick={updateDetails}>
          Update Details
        </button>
      </div>
    </PageWithSidebar>
  );
}

export default CustomerEdit;
