import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../../../common/utils/env.config';
import { toast } from 'react-toastify';
import { Loader } from '../../../common/components';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ACCESS_TOKEN } from '../../../common/utils/config';

function CustomerTable() {
  const [searchText, setSearchText] = useState('');
  const [customersData, setCustomersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [page, setPage] = useState(1);
  const [incrementDisabled, setIncrementDisable] = useState(false);
  const headers = {             
    'Content-Type': 'application/json',
    'Authorization': ACCESS_TOKEN};

  const id_user = sessionStorage.getItem('user_id');
  const id_company = sessionStorage.getItem('company_id');
  const is_company = sessionStorage.getItem('is_company');
  const navigate = useNavigate();

  const user_id = is_company == 1 ? id_company : id_user;

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleChange = (event) => {
    setItemsPerPage(event.target.value);
  };

  const handlePageIncrement = () => {
    setPage((prev) => prev + 1);
  };

  const handlePageDecrement = () => {
    setPage((prev) => (prev <= 1 ? prev : prev - 1));
  };

  const fetchCustomersData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${BACKEND_URL}/users/get_customer_details?user_id=${user_id}&page=${page}&page_size=${itemsPerPage}`,{headers:headers}
      );
      if (response.status === 200 && Array.isArray(response.data)) {
        setCustomersData(response.data);
        setIncrementDisable(false);
      } else {
        toast(`${response.data.message}`, { type: 'error' });
        setIncrementDisable(true);
      }
      setIsLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        sessionStorage.clear()
        navigate('/login');
    } else {
      setIsLoading(false);
      setIncrementDisable(false);
      toast(`There is some error while fetching orders`, { type: 'error' });
    }
    }
  };

  useEffect(() => {
    fetchCustomersData();
  }, []);

  const handleGoBackToAddOrder = (customer) => {
    // Navigate to the order page with customer details as URL parameters
    navigate(
      `/add-order?buyerName=${customer.buyer_name}&buyerPhone=${customer.buyer_phone}&buyerEmail=${customer.buyer_email}&buyerAddress=${customer.address.address}&buyerCity=${customer.address.city}&buyerState=${customer.address.state}&buyerPincode=${customer.address.pincode}`,
    );
  };

  return (
    <div>
      {isLoading && <Loader />}
      <form className="my-4 flex h-8 w-1/4 items-center gap-2 overflow-hidden rounded border border-zinc-400 bg-white text-[12px]">
        <input
          type="text"
          placeholder="Search By Name,Email,Phone and Pincode"
          value={searchText}
          onChange={(e) => handleSearch(e)}
          className="text-semibold m-0 h-full w-full border-transparent text-[12px] focus:border-transparent focus:outline-none focus:ring-0"
        />
        <FontAwesomeIcon icon={faSearch} className="w-10 border py-2 text-sm text-gray-500" />
      </form>
      <table className="mt-10 min-w-full overflow-hidden rounded text-[12px] shadow">
        <thead className=" bg-white">
          <tr>
            <th className=" border px-4 py-4 text-left">Name</th>
            <th className=" flex flex-col border px-4 py-4 text-left">
              <span>Phone</span>
              <span>Number</span>
            </th>
            <th className=" border px-4 py-4 text-left">Email</th>
            <th className="w-1/2 border px-4 py-4 text-left">Address</th>
            <th className=" border px-4 py-4 text-left">Channel</th>
            <th className=" border px-4 py-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {customersData.length !== 0 &&
            customersData.map((data, index) => {
              // if (
              //   (data.buyer_email === null || data.buyer_email === '') &&
              //   data.buyer_name === ' ' &&
              //   data.buyer_phone === '' &&
              //   data.address.address === null
              // ) {
              //   return;
              // }
              return (
                <tr
                  key={data.buyer_id}
                  className={`${
                    index % 2 !== 0 ? 'bg-white  ' : 'bg-gray-100'
                  } text-[13px] text-gray-500 transition hover:bg-gray-100`}>
                  <td className="border px-4 py-4 text-left text-red-800">
                    <p>{data?.buyer_name}</p>
                  </td>
                  <td className="border px-4 py-4 text-left text-red-800">{data?.buyer_phone}</td>
                  <td className="border px-4 py-4 text-left">{data?.buyer_email}</td>
                  <td className="border px-4 py-4 text-left">
                    <p>
                      {data.address.address !== null && `${data.address.address},`}
                      {data.address.city !== null && `${data.address.city},`}
                      {data.address.state !== null && `${data.address.state},`}
                      {data.address.country !== null && `${data.address.country},`}
                      {data.address.pincode !== null && `${data.address.pincode}.`}
                    </p>
                  </td>
                  <td className="border px-4 py-4 text-left">{data?.channel_name}</td>
                  <td className=" border px-4 py-4 text-left">
                    <div className="flex flex-col items-center justify-center">
                      <Link to={`/customer-overview/${data.buyer_id}`} className="text-red-800">
                        View Details
                      </Link>
                      <button onClick={() => handleGoBackToAddOrder(data)} className="text-red-800">
                        Add Order
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="flex w-full flex-wrap-reverse justify-between gap-2 rounded-lg bg-white px-4 py-2">
        <div className="mr-2 flex items-center">
          <div className="mr-4 text-xs text-black">{'Items per page: '}</div>
          <div>
            <select
              id="select"
              value={itemsPerPage}
              className="block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              onChange={handleChange}>
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="60">60</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
        <div className="flex items-center text-xs">
          <Button
            color="light"
            className="mr-6 border-0 *:px-3 *:text-xs *:font-normal"
            onClick={handlePageDecrement}
            disabled={page === 1 ? true : false}>
            <FontAwesomeIcon icon={faArrowLeft} className="mx-2 h-4 w-3" />
            {'PREV'}
          </Button>
          <button className="rounded-lg border-0 bg-gray-100 px-3 py-2 font-medium" disabled={true}>
            {page}
          </button>
          <Button
            color="light"
            className="ml-6 border-0 *:px-3  *:text-xs *:font-normal"
            disabled={incrementDisabled ? true : false}
            onClick={handlePageIncrement}>
            {'NEXT'} <FontAwesomeIcon icon={faArrowRight} className="mx-2 h-4 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CustomerTable;
