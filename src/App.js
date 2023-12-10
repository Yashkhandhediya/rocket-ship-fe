import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import routes from './routes/routes';
import { store } from './redux';

function App() {
  return (
    <div className="App h-screen max-h-screen w-screen overflow-hidden">
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>
    </div>
  );
}

export default App;
