import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import store from './components/store';
import Routes from './routes';

const App = () => {
  const localCart = JSON.parse(localStorage.getItem('dioshopping: cart'));

  if (localCart !== null) {
    store.dispatch({ type: 'CHANGE_CART', localCart });
  }

  return (
    <Provider store={store}>
      <div className='container-fluid p-0'>
        <Router>
          <Header />
          <Routes />
        </Router>
      </div>
    </Provider>
  );
};

export default App;
