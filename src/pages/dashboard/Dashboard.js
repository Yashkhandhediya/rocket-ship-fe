import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setOrders } from '../../redux';

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // temporary checking redux.
    dispatch(
      setOrders([
        { name: 'letter', weight: '10gm', from: 'surat', to: 'mumbai' },
      ]),
    );
  }, [dispatch]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
