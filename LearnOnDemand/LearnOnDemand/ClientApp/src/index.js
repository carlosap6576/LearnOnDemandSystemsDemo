import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, Switch, BrowserRouter } from "react-router-dom";
import App from './layouts/App';

import "bootstrap/dist/css/bootstrap.min.css";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./azure/authConfig";
const msalInstance = new PublicClientApplication(msalConfig);


ReactDOM.render(
  <BrowserRouter>
  <MsalProvider instance={msalInstance}>
      <Switch>
        <Route path="/" render={(props) => <App {...props} />} />
        <Redirect from="/" to="/news" />
      </Switch></MsalProvider>
  </BrowserRouter>,
  document.getElementById('root')
);


