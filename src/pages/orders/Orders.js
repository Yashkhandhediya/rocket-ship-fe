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

export let resData = [];
const Orders = () => {
  const location = useLocation();
  const id_user = localStorage.getItem('user_id');
  const company_id = localStorage.getItem('company_id');
  const [isLoading, setIsLoading] = useState(true);
  const is_company = localStorage.getItem('is_company');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let flag = false;
  flag = location?.state?.data?.flag !== undefined ? location.state.data.flag : false;
  let cuser_id = location?.state?.data?.id !== undefined ? location.state.data.id : id_user;

  const id = is_company ? cuser_id : id_user;

  console.log('FLAGGG', flag, cuser_id);

  const allOrdersList = useSelector((state) => state?.ordersList);
  const hasFetched = useRef(false);

  const fetchNewOrders = () => {
    if (localStorage.getItem('is_company') == 1 && !flag) {
      navigate('/all-user');
      return;
    }
    axios
      .get(BACKEND_URL + `/order/get_filtered_orders?created_by=${cuser_id}`)
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
      .catch(() => {
        toast('There is some error while fetching orders.', { type: 'error' });
        setIsLoading(false);
      });
  };

  let count = 1;
  useEffect(() => {
    if (localStorage.getItem('is_kyc') == 1) {
      if (count == 1) {
        toast('Complete Your KYC First', { type: 'error' });
        count++;
      }
      navigate('/seller/home');
      return;
    } else if (localStorage.getItem('is_kyc') == 2) {
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
          <div>
            <button
              className="rounded-sm bg-[#eeebff] px-2.5 py-1.5 text-sm font-medium text-orange-600 mr-2"
              onClick={() => navigate('/all-user')}>
              Back
              {/* Back Button */}
            </button>
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
          <Tabs tabs={ordersTabs} tabClassNames={'mr-6 px-3 py-3.5 text-[#7f7f7f] font-medium'} />
        </div>
      </div>
    </PageWithSidebar>
  );
};

export default Orders;
