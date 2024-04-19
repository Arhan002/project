import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import User_details from "./Context/User Details/User_details";
import Customers from "./Pages/Customers/Customers";
import Home from "./Pages/Home/Home";
import Payments from "./Pages/Payments/Payments";
import Products from "./Pages/Products/Products";
import Register from "./Pages/Register/Register";
import Store from "./Pages/Store/Store";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/store",
    element: <Store />,
  },
  {
    path: "/store/customers",
    element: <Customers />,
  },
  {
    path: "/store/customers/Payments",
    element: <Payments />,
  },
  {
    path: "/store/customers/Payments/Products",
    element: <Products />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <PrimeReactProvider>
      <User_details>
        <RouterProvider router={router} />
      </User_details>
    </PrimeReactProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
