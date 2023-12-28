import { useNavigate } from 'react-router-dom';
import { Tabs } from '../../common/components/tabs';
import { ordersTabs } from './duck';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAllOrders } from '../../redux';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const allOrdersList = useSelector((state) => state?.ordersList);
  
  const fetchNewOrders = () => {
    axios
      .get('http://43.252.197.60:8030/order/get_filtered_orders')
      .then(async (resp) => {
        if (resp.status === 200) {
          dispatch(setAllOrders(resp?.data || []));
        } else {
          toast('There is some error while fetching orders.', { type: 'error' });
        }
      })
      .catch(() => {
        toast('There is some error while fetching orders.', { type: 'error' });
      });
  };

  
  useEffect(() => {
    if (!allOrdersList) {
      fetchNewOrders();
    }
  }, [allOrdersList]);

  return (
    <PageWithSidebar>
      <div className="h-full w-full bg-[#f8f8f8] px-4 text-center">
        <div className="flex items-center justify-between px-1.5 pb-3 pt-4">
          <h1 className="text-xl font-bold">Orders</h1>
          <button
            className={'rounded-sm bg-[#eeebff] px-2.5 py-1.5 text-sm font-medium text-indigo-600'}
            onClick={() => navigate('/add-order')}
          >
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
