import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center bg-[#f8f8f8] w-full h-full" >
      <h1>Orders</h1>
      <button className={'my-8 bg-[#eeebff] py-1.5 px-2.5 rounded-sm font-medium text-sm text-indigo-600'} onClick={() => navigate('/add-order')}>+ Add Order</button>
    </div>
  );
};

export default Orders;
