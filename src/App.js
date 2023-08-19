import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/header/Header";
import AppState from "./contexts/AppContext/AppState";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthState from "./contexts/AuthContext/AuthState";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  return (
    <AppState>
      <AuthState>
        <Routes>
          <Route path="/" element={<PrivateRoute component={Home} />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </AuthState>
    </AppState>
  );
}

export default App;
