import { createBrowserRouter } from 'react-router-dom';
import { LogIn, Orders, SignUp, Dashboard, AddOrder, TrackOrder } from '../pages';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/login',
    element: <LogIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/orders',
    element: <Orders />,
  },
  {
    path: '/add-order',
    element: <AddOrder />,
  },
  {
    path: '/track-order/:orderId',
    element: <TrackOrder />,
  },
]);

export default routes;
