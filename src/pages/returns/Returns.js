import { useLocation, useNavigate } from 'react-router-dom';
import { Tabs } from '../../common/components/tabs';
import { returnsTabs } from './duck';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAllReturns } from '../../redux';
import { toast } from 'react-toastify';
import { useEffect, useRef, useState } from 'react';
import Loader from '../../common/loader/Loader';
import { BACKEND_URL } from '../../common/utils/env.config';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setFilteredReturnOrders } from '../../redux';
// updated code
export let resData = [];
const Returns = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const is_company = localStorage.getItem('is_company');
  const [filteredOrderId, setFilteredOrderId] = useState([]);
  const [searchBy, setSearchBy] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const id_user = localStorage.getItem('user_id');
  const company_id = localStorage.getItem('company_id');
  const userId = is_company == 1 ? company_id : id_user;
  const [activeTab, setActiveTab] = useState(JSON.parse(localStorage.getItem('activeTab')) || 0);

  console.log(filteredOrderId, searchBy, errorMsg);

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
      const response = await axios.get(`${BACKEND_URL}/return/filter?user_id=${userId}&string=${query}`);
      console.log(response.data);
      setFilteredOrderId(
        (response.data.awb.return_ids.length != 0 && response.data.awb.return_ids) ||
          (response.data.email.return_ids.length != 0 && response.data.email.return_ids) ||
          (response.data.returns_id.return_ids.length != 0 && response.data.returns_id.return_ids) ||
          (response.data.phone.return_ids.length != 0 && response.data.phone.return_ids) ||
          (response.data.sku.return_ids.length != 0 && response.data.sku.return_ids),
      );
      setSearchBy(
        (response.data.awb.return_ids.length != 0 && 'AWB') ||
          (response.data.email.return_ids.length != 0 && 'Email') ||
          (response.data.returns_id.return_ids.length != 0 && 'Return ID') ||
          (response.data.phone.return_ids.length != 0 && 'Phone') ||
          (response.data.sku.return_ids.length != 0 && 'SKU'),
      );
      setErrorMsg(
        response.data.awb.return_ids.length == 0 &&
          response.data.email.return_ids.length == 0 &&
          response.data.returns_id.return_ids.length == 0 &&
          response.data.phone.return_ids.length == 0 &&
          response.data.sku.return_ids.length == 0 &&
          'No Result Found',
      );
    } catch (err) {
      setErrorMsg('There is Error while fetching');
    } finally {
      setLoading(false);
    }
  };

  const handlePostFilteredOrder = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/return/filter_returns`, filteredOrderId);
      dispatch(setFilteredReturnOrders(response?.data || []));
      setActiveTab(5);
      clearSearch();
    } catch (err) {
      toast('There is Error while fetching', { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilteredOrders();
    localStorage.setItem('activeTab', JSON.stringify(activeTab));
  }, [query]);

  const allReturnsList = useSelector((state) => state?.returnsList);
  const hasFetched = useRef(false);
  let flag = false;
  flag = location?.state?.data?.flag !== undefined ? location.state.data.flag : false;
  let cuser_id = location?.state?.data?.id !== undefined ? location.state.data.id : id_user;

  const fetchNewReturns = () => {
    axios
      .get(BACKEND_URL + `/return/get_filtered_returns?page=1&per_page=100&user_id=${cuser_id}`)
      .then(async (resp) => {
        if (resp.status === 200) {
          dispatch(setAllReturns(resp?.data || []));
          resData = resp.data;
          setIsLoading(false);
        } else {
          toast('There is some error while fetching returns.', { type: 'error' });
          setIsLoading(false);
        }
      })
      .catch(() => {
        toast('There is some error while fetching returns.', { type: 'error' });
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const checkKycStatus = () => {
      if (localStorage.getItem('is_kyc') == 1) {
        toast('Complete Your KYC First', { type: 'error' });
        navigate('/seller/home');
        return true;
      } else if (localStorage.getItem('is_kyc') == 2) {
        toast('KYC Verification Is Pending.', { type: 'error' });
        navigate('/seller/home');
        return true;
      }
      return false;
    };

    if (localStorage.getItem('is_company') == 1 && !flag) {
      navigate('/all-users');
      return;
    }

    if (!checkKycStatus() && !allReturnsList) {
      if (!hasFetched.current) {
        fetchNewReturns();
        hasFetched.current = true;
      }
    } else {
      setIsLoading(false);
    }
  }, [allReturnsList, flag]);

  return (
    <PageWithSidebar>
      {isLoading && <Loader />}
      <div className="h-full w-full bg-[#f4f4f4] px-4 text-center">
        <div className="flex items-center justify-between px-1.5 pb-3 pt-4">
          <h1 className="text-xl font-bold">Returns</h1>
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
          <button
            className="rounded-sm bg-[#eeebff] px-2.5 py-1.5 text-sm font-medium text-orange-600"
            onClick={() => navigate('/add-return')}>
            + Add Return
          </button>
        </div>
        <div>
          <Tabs
            tabs={returnsTabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabClassNames="mr-6 px-3 py-3.5 text-[#7f7f7f] font-medium"
          />
        </div>
      </div>
    </PageWithSidebar>
  );
};

export default Returns;
