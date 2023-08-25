import { Route, Routes } from "react-router-dom";
import AppState from "./contexts/AppContext/AppState";
import routes from "./config.js";
import AuthState from "./contexts/AuthContext/AuthState";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import NotAuthRoute from "./NotAuthRoute";
import Header from "./components/header/Header";
import LeftSideBar from "./components/LeftSideBar";

function App() {
  return (
    <AppState>
      <AuthState>
        <div className="page-wrapper">
          <Header />
          <LeftSideBar />
          <Routes>
            {routes.map((route, index) => {
              const { path, component, isPrivate, notAuth ,isAdmin} = route;
              return (
                <Route
                  key={index}
                  path={path}
                  element={
                    isPrivate ? (
                      isAdmin ? (
                        <AdminRoute component={component} />
                      ) : (
                        <PrivateRoute component={component} />
                      )
                    ) : notAuth ? (
                      <NotAuthRoute component={component} />
                    ) : (
                      component
                    )
                    // isPrivate ? (
                    //   <PrivateRoute component={component} />
                    // ) : notAuth ? (
                    //   <NotAuthRoute component={component} />
                    // ) : (
                    //   component
                    // )
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
