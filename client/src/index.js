import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter,//reates a new router instance for use in your application. It requires a configuration, which can be created using createRoutesFromElements.
  createRoutesFromElements,//Converts the JSX elements representing routes into a format that createBrowserRouter can use. It takes the route definitions (like <Route> elements) and processes them into a route configuration object.
  Route,RouterProvider} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
       {/* Nested route: HomeScreen component is rendered when path is '/' ,index={true} so only one page will be displayed on'/' */}
        <Route index={true} path='/' element={<HomeScreen/>}/>
        <Route path='/product/:id' element={<ProductScreen/>}/>
    </Route>
  )
)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);