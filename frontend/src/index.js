import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import "./index.css";
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Redux toolkit and react-redux, store
import { Provider } from "react-redux";
import store from "./store";

// Translations
import i18n from './translation/i18n';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </Provider>
  </I18nextProvider>
);

reportWebVitals();