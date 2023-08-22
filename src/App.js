import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AppState from "./contexts/AppContext/AppState";
import Login from "./pages/Login";
import Register from "./pages/Register";
import routes from "./config.js";
import AuthState from "./contexts/AuthContext/AuthState";
import PrivateRoute from "./PrivateRoute";
import NotAuthRoute from "./NotAuthRoute";
import ProductList from "./pages/ProductList";
import Customers from "./pages/Customers";
import Header from "./components/header/Header";
import LeftSideBar from "./components/LeftSideBar";
import Accounts from "./pages/Accounts";

function App() {
  return (
    <AppState>
      <AuthState>
        <div className="page-wrapper">
          <Header />
          <LeftSideBar />

          {/* <Routes>
            <Route path="/" element={<PrivateRoute component={Home} />}></Route>
            <Route
              path="/productList"
              element={<PrivateRoute component={ProductList} />}
            ></Route>
            <Route
              path="/customers"
              element={<PrivateRoute component={Customers} />}
            ></Route>
            <Route
              path="/accounts"
              element={<PrivateRoute component={Accounts} />}
            ></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Routes> */}
          <Routes>
            {routes.map((route, index) => {
              const { path, component, isPrivate, notAuth } = route;
              return (
                <Route
                  key={index}
                  path={path}
                  element={
                    isPrivate ? (
                      <PrivateRoute component={component} />
                    ) : notAuth ? (
                      <NotAuthRoute component={component} />
                    ) : (
                      component
                    )
                  }
                />
              );
            })}
          </Routes>
        </div>
      </AuthState>
    </AppState>
  );
}

export default App;
