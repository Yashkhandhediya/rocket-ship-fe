import { useNavigate } from 'react-router-dom';
import { Tabs } from '../../common/components/tabs';
import { ordersTabs } from './duck';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAllOrders } from '../../redux';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import Loader from '../../common/loader/Loader';
import { BACKEND_URL } from '../../common/utils/env.config';

const Orders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allOrdersList = useSelector((state) => state?.ordersList);

  const fetchNewOrders = () => {
    axios
      .get(BACKEND_URL+'/order/get_filtered_orders')
      .then(async (resp) => {
        if (resp.status === 200) {
          dispatch(setAllOrders(resp?.data || []));
          setIsLoading(false);
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

  useEffect(() => {
    if (!allOrdersList) {
      fetchNewOrders();
    } else {
      setIsLoading(false);
    }
  }, [allOrdersList]);

  return (
    <PageWithSidebar>
      {isLoading && <Loader />}
      <div className="h-full w-full bg-[#f4f4f4] px-4 text-center">
        <div className="flex items-center justify-between px-1.5 pb-3 pt-4">
          <h1 className="text-xl font-bold">Orders</h1>
          <button
            className={'rounded-sm bg-[#eeebff] px-2.5 py-1.5 text-sm font-medium text-indigo-600'}
            onClick={() => navigate('/add-order')}>
            + Add Order
          </button>
        </div>
        <div>
          <Tabs tabs={ordersTabs} tabClassNames={'mr-6 px-3 py-3.5 text-[#7f7f7f] font-medium'} />
        </div>
      </div>
    </PageWithSidebar>
  );
};

export default Orders;
