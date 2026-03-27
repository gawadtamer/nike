import * as React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import AllAbout from "./Pages/About/AllAbout";
import AllShop from "./Pages/Shop/AllShop";
import ShopPage2 from "./Pages/Shop/ShopPage2";
import ShopPage3 from "./Pages/Shop/ShopPage3";
import AllContact from "./Pages/Contact/AllContact";
import AllCart from "./Pages/Cart/AllCart";
import { CartProvider } from "./Pages/Cart/CartContext";
import { AuthProvider } from "./Pages/Account/AuthContext";
import AllAccount from "./Pages/Account/AllAccount";
import Login from "./Pages/Account/Login";
const Gawad = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "About",
    element: <AllAbout />,
  },
{
  path: "Shop",
  element: <AllShop />,
},
{
  path: "Shop/page2",
  element: <ShopPage2 />,
},
{
  path: "Shop/page3",
  element: <ShopPage3 />,
},
  {
    path: "contact",
    element: <AllContact />,
  },
  {
    path: "Cart",
    element: <AllCart /> ,
  },
  {
    path: "Account",
    element: <AllAccount />,
  },
  {
    path: "Login",
    element: <Login />,
  },
]);

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <CartProvider>
      <RouterProvider router={Gawad} />
    </CartProvider>
  </AuthProvider>
);