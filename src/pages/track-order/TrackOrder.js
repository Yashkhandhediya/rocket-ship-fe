import { useParams } from 'react-router-dom';

const TrackOrder = () => {
  const { orderId } = useParams();

  return <div>{orderId}</div>;
};

export default TrackOrder;
