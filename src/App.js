import Home from "./components/Home";
import Header from "./components/header/Header";
import AppState from "./contexts/AppContext/AppState";

function App() {
  return (
    <AppState>
      <Header />
      <Home />
    </AppState>
  );
}

export default App;
