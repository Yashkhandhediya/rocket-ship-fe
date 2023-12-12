import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full bg-[#f8f8f8] text-center">
      <h1>Orders</h1>
      <button
        className={
          'my-8 rounded-sm bg-[#eeebff] px-2.5 py-1.5 text-sm font-medium text-indigo-600'
        }
        onClick={() => navigate('/add-order')}
      >
        + Add Order
      </button>
    </div>
  );
};

export default Orders;
