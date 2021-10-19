import Routes from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import AppProvider from "./hooks";

function App() {
  return (
    <>
      <AppProvider>
        <Routes />
      </AppProvider>
    </>
  );
}

export default App;
