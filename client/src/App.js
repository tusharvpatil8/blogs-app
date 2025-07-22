import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store";
import history from "./history";
import Views from "./views";
import { Toaster } from "react-hot-toast";
import Header from "./components/template/header";
import Footer from "./components/template/footer";
import MainContent from "./components/template/MainContent";
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter history={history}>
          <div className="app-container">
            <Header />
            <MainContent />
            <Footer />
          </div>
        </BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
      </PersistGate>
    </Provider>
  );
};

export default App;
