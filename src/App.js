import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import routes from './routes/routes';
import { store } from './redux';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  return (
    <div className="App h-screen max-h-screen w-screen overflow-hidden">
      <Provider store={store}>
        <ToastContainer position="top-right" autoClose="3000" hideProgressBar={true} />
        <RouterProvider router={routes} />
      </Provider>
    </div>
  );
}

export default App;
