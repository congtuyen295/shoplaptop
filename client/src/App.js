import { BrowserRouter as Router } from "react-router-dom";
import AppRoutesComponent from "./routes/index";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { positions, Provider as AlertProvider, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import { persistor, store } from "./redux/store";
import AppContainer from "./AppContainer";

const options = {
  timeout: 5000,
  position: positions.TOP_RIGHT,
  transition: transitions.SCALE
};

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <AlertProvider template={AlertTemplate} {...options}>
              <AppContainer>
                <AppRoutesComponent />
              </AppContainer>
            </AlertProvider>
          </Router>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
