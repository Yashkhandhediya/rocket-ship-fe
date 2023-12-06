import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import routes from './routes/routes';
import { store } from './redux';

function App() {
  return (
    <div className="App" style={{width: '100vw', height: '100vh'}}>
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>
    </div>
  );
}

export default App;
