import { useNavigate, useLocation } from 'react-router-dom';
import { ordersTabs } from './duck';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAllOrders } from '../../redux';
import { toast } from 'react-toastify';
import { useEffect, useRef, useState } from 'react';
import Loader from '../../common/loader/Loader';
import { isEmpty } from 'lodash';
import { BACKEND_URL } from '../../common/utils/env.config';
import Tabs from './Tabs';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setFilteredOrders } from '../../redux';
import { ACCESS_TOKEN } from '../../common/utils/config';

export let resData = [];
const Orders = () => {
  const location = useLocation();
  const id_user = sessionStorage.getItem('user_id');
  const company_id = sessionStorage.getItem('company_id');
  const [isLoading, setIsLoading] = useState(true);
  const is_company = sessionStorage.getItem('is_company');
  const [loading, setLoading] = useState(false);
  const userId = is_company == 1 ? company_id : id_user;
  const [filteredOrderId, setFilteredOrderId] = useState([]);
  const [searchBy, setSearchBy] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const headers = {             
    'Content-Type': 'application/json',
    'Authorization': ACCESS_TOKEN};
  const [activeTab, setActiveTab] = useState(JSON.parse(sessionStorage.getItem('activeOrderTab')) || 0);

  console.log(filteredOrderId, searchBy, errorMsg);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  let flag = false;
  flag = location?.state?.data?.flag !== undefined ? location.state.data.flag : false;
  let cuser_id = location?.state?.data?.id !== undefined ? location.state.data.id : id_user;

  const id = is_company ? cuser_id : id_user;

  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState('');

  const handleFocused = () => {
    setIsFocused(true);
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  const clearSearch = () => {
    setQuery('');
    setIsFocused(false);
  };

  const fetchFilteredOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BACKEND_URL}/order/filter?user_id=${userId}&string=${query}`,{headers:headers});
      console.log(response.data);
      setFilteredOrderId(
        (response.data.awb.order_id.length != 0 && response.data.awb.order_id) ||
          (response.data.email.order_id.length != 0 && response.data.email.order_id) ||
          (response.data.order_id.order_id.length != 0 && response.data.order_id.order_id) ||
          (response.data.phone.order_id.length != 0 && response.data.phone.order_id) ||
          (response.data.sku.order_id.length != 0 && response.data.sku.order_id),
      );
      setSearchBy(
        (response.data.awb.order_id.length != 0 && 'AWB') ||
          (response.data.email.order_id.length != 0 && 'Email') ||
          (response.data.order_id.order_id.length != 0 && 'Order ID') ||
          (response.data.phone.order_id.length != 0 && 'Phone') ||
          (response.data.sku.order_id.length != 0 && 'SKU'),
      );
      setErrorMsg(
        response.data.awb.order_id.length == 0 &&
          response.data.email.order_id.length == 0 &&
          response.data.order_id.order_id.length == 0 &&
          response.data.phone.order_id.length == 0 &&
          response.data.sku.order_id.length == 0 &&
          'No Result Found',
      );
    } catch (err) {
      if (err.response && err.response.status === 401) {
        sessionStorage.clear()
        navigate('/login');
    } else {
      setErrorMsg('There is Error while fetching');
    }
    } finally {
      setLoading(false);
    }
  };

  const handlePostFilteredOrder = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/order/filter_orders`, filteredOrderId,{headers:headers});
      dispatch(setFilteredOrders(response?.data || []));
      setActiveTab(6);
      clearSearch();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        sessionStorage.clear()
        navigate('/login');
    } else {
      toast('There is Error while fetching', { type: 'error' });
    }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    sessionStorage.setItem('activeTab', activeTab);
    fetchFilteredOrders();
  }, [query]);

  console.log('FLAGGG', flag, cuser_id);

  const allOrdersList = useSelector((state) => state?.ordersList);
  const hasFetched = useRef(false);

  const fetchNewOrders = () => {
    if (sessionStorage.getItem('is_company') == 1 && !flag) {
      navigate('/all-user');
      return;
    }
    axios
      .get(BACKEND_URL + `/order/get_filtered_orders?created_by=${cuser_id}`,{headers:headers})
      .then(async (resp) => {
        if (resp.status === 200) {
          dispatch(setAllOrders(resp?.data || []));
          setIsLoading(false);
          resData = resp.data;
          console.log('REsponseeeeeeee', resData);
        } else {
          toast('There is some error while fetching orders.', { type: 'error' });
          setIsLoading(false);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          sessionStorage.clear()
          navigate('/login');
      } else {
        toast('There is some error while fetching orders.', { type: 'error' });
        setIsLoading(false);
      }
      });
  };

  let count = 1;
  useEffect(() => {
    if (sessionStorage.getItem('is_kyc') == 1) {
      if (count == 1) {
        toast('Complete Your KYC First', { type: 'error' });
        count++;
      }
      navigate('/seller/home');
      return;
    } else if (sessionStorage.getItem('is_kyc') == 2) {
      if (count == 1) {
        toast('KYC Verification Is Pending.', { type: 'error' });
        count++;
      }
      navigate('/seller/home');
      return;
    }
    if (!allOrdersList || isEmpty[allOrdersList]) {
      if (!hasFetched.current) {
        fetchNewOrders();
        hasFetched.current = true;
      }
    } else {
      setIsLoading(false);
    }
  }, [allOrdersList, flag]);

  return (
    <PageWithSidebar>
      {isLoading && <Loader />}
      <div className="h-full w-full bg-[#f4f4f4] px-4 text-center">
        <div className="flex items-center justify-between px-1.5 pb-3 pt-4">
          <h1 className="text-xl font-bold">Orders</h1>
          <div className="relative w-1/3">
            <form className="my-4 flex items-center gap-2 rounded-lg border bg-white px-3 py-1 text-[12px]">
              <FontAwesomeIcon icon={faSearch} className=" text-gray-500" />
              <input
                type="text"
                placeholder="Search By AWB, Order ID, SKU, Buyer Mobile Number, Email, Pickup ID"
                value={query}
                onChange={(e) => handleSearch(e)}
                onFocus={handleFocused}
                className="text-semibold m-0 w-full border-transparent p-0 text-[12px] placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-0"
              />
              {isFocused && (
                <FontAwesomeIcon
                  icon={faXmark}
                  className="cursor-pointer text-lg text-gray-500"
                  onClick={clearSearch}
                />
              )}
            </form>
            {query.length != 0 && (
              <div
                className={`absolute w-full cursor-pointer rounded-lg bg-white p-4 text-[12px] shadow-lg hover:bg-gray-200  ${
                  errorMsg ? 'text-red-800' : 'text-gray-400'
                } hover:text-red-800`}
                onClick={handlePostFilteredOrder}>
                {!loading ? (
                  <p className={`text-left`}>{searchBy ? `${searchBy}: ${query}` : `${errorMsg}`}</p>
                ) : (
                  <p className="h-full w-full animate-pulse rounded-lg bg-gray-300 text-left">.</p>
                )}
              </div>
            )}
          </div>
          <div>
            {is_company == 1 && <button
              className="mr-2 rounded-sm bg-[#eeebff] px-2.5 py-1.5 text-sm font-medium text-orange-600"
              onClick={() => navigate('/all-user')}>
              Back
              {/* Back Button */}
            </button>}
            {is_company == 0 && (
              <button
                className={'rounded-sm bg-[#eeebff] px-2.5 py-1.5 text-sm font-medium text-orange-600'}
                onClick={() => navigate('/add-order')}>
                + Add Order
              </button>
            )}
          </div>
        </div>
        <div>
          <Tabs
            tabs={ordersTabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabClassNames={'mr-6 px-3 py-3.5 text-[#7f7f7f] font-medium'}
          />
        </div>
      </div>
    </PageWithSidebar>
  );
};

export default Orders;
