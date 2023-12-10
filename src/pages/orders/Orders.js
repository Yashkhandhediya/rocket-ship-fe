import { useNavigate } from 'react-router-dom';
import './Orders.css';

const Orders = () => {
  const navigate = useNavigate();

  return (
    <div className="orders-container" style={{ textAlign: 'center' }}>
      <h1>Orders</h1>
      <button onClick={() => navigate('/add-order')}>+ Add Order</button>
    </div>
  );
};

export default Orders;
