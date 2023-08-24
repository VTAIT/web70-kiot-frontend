import Customers from "./pages/Customers.jsx";
import Products from "./pages/Products.jsx";
import Login from "./pages/Login.jsx";
import ProductList from "./pages/ProductList.jsx";
import Register from "./pages/Register.jsx";
import PendingAccounts from "./pages/PendingAccounts.jsx";
import Account from "./components/Account.jsx";
import Accounts from "./pages/Accounts.jsx";

export const routes = [
  {
    path: "/",
    component: <Products />,
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
    path: "/pending-accounts",
    component: <PendingAccounts />,
    isPrivate: true,
    isAdmin: true,
  },
  {
    path: "/accounts",
    component: <Accounts />,
    isPrivate: true,
    isAdmin: true,
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
