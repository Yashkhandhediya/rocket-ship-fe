import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../../../common/utils/env.config';
import { toast } from 'react-toastify';
import { Loader } from '../../../common/components';
import { Link } from 'react-router-dom';

function CustomerTable() {
  const [searchText, setSearchText] = useState('');
  const [customersData, setCustomersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const id_user = localStorage.getItem('user_id');
  const id_company = localStorage.getItem('company_id');
  const is_company = localStorage.getItem('is_company');

  const user_id = is_company == 1 ? id_company : id_user;

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const fetchCustomersData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${BACKEND_URL}/users/get_customer_details?user_id=${user_id}`);
      if (response.status === 200) {
        setCustomersData(response.data);
        setIsLoading(false);
      } else {
        toast(`There is some error while fetching orders`, { type: 'error' });
      }
    } catch (err) {
      setIsLoading(false);
      toast(`There is some error while fetching orders`, { type: 'error' });
    }
  };

  useEffect(() => {
    fetchCustomersData();
  }, []);

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
          {customersData &&
            customersData.map((data, index) => {
              if (
                (data.buyer_email === null || data.buyer_email === '') &&
                data.buyer_name === ' ' &&
                data.buyer_phone === '' &&
                data.address.address === null
              ) {
                return;
              }
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
                    <div>
                      <Link to={`/customer-overview/${data.buyer_id}`} className="text-red-800">
                        View Details
                      </Link>
                      <button className="text-red-800">Add Order</button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className=" flex w-1/2 items-center justify-between p-2 text-[12px] text-gray-500">
        <div className="flex items-center gap-2">
          <p>items per page:</p>
          <select className="rounded-lg text-[14px] text-gray-500 focus:ring-0">
            <option>15</option>
            <option>30</option>
            <option>60</option>
            <option>100</option>
          </select>
        </div>
        <p>1-6 of 6</p>
      </div>
    </div>
  );
}

export default CustomerTable;
