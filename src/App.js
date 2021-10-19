import { NavBar } from "./components/NavBar";
import Routes from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import AppProvider from "./hooks";

function App() {
  return (
    <>
      <AppProvider>
        <NavBar />
        <Routes />
      </AppProvider>
    </>
  );
}

export default App;
