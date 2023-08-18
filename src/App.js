import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/header/Header";
import AppState from "./contexts/AppContext/AppState";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <AppState>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </AppState>
  );
}

export default App;
