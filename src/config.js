import Accounts from "./pages/Accounts.jsx";
import Customers from "./pages/Customers.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import ProductList from "./pages/ProductList.jsx";
import Register from "./pages/Register.jsx";

export const routes = [
  {
    path: "/",
    component: <Home />,
    isPrivate: true,
  },
  {
    path: "/productList",
    component: <ProductList />,
    isPrivate: true,
  },
  {
    path: "/customers",
    component: <Customers />,
    isPrivate: true,
  },
  {
    path: "/accounts",
    component: <Accounts />,
    isPrivate: true,
  },
  {
    path: "/login",
    component: <Login />,
    notAuth: true,
  },
  {
    path: "/register",
    component: <Register />,
    notAuth: true,
  },
];
export default routes;
