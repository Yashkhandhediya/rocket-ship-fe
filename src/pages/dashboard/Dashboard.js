import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setOrders } from '../../redux';
import PageWithSidebar from '../../common/components/page-with-sidebar/PageWithSidebar';

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // temporary checking redux.
    dispatch(setOrders([{ name: 'letter', weight: '10gm', from: 'surat', to: 'mumbai' }]));
  }, [dispatch]);

  return (
    <PageWithSidebar>
      <div style={{ textAlign: 'center' }}>
        <h1>Dashboard</h1>
      </div>
    </PageWithSidebar>
  );
};

export default Dashboard;
