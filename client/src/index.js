import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,//creates a new router instance for use in your application. It requires a configuration, which can be created using createRoutesFromElements.
  createRoutesFromElements,//Converts the JSX elements representing routes into a format that createBrowserRouter can use. It takes the route definitions (like <Route> elements) and processes them into a route configuration object.
  Route, RouterProvider
} from 'react-router-dom'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import store from './redux/app/store';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PrivateRoute from './Components/PrivateRoute';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import {PayPalScriptProvider} from '@paypal/react-paypal-js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      {/* Nested route: HomeScreen component is rendered when path is '/' ,index={true} so only one page will be displayed on'/' */}
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      {/* any nested route inside private route path='' will be private */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/payment' element={<PaymentScreen/>} />
        <Route path='/placeorder' element={<PlaceOrderScreen/>} />
        <Route path='/order/:id' element={<OrderScreen/>} />
      </Route>
    </Route>
  )
)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
         <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>

  </React.StrictMode>
);