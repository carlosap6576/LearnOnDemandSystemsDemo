import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import React, { Fragment, useState, useEffect } from 'react';
import { Switch, Route } from "react-router-dom";
import AppContextProvider from '../contexts/AppContext';
import Navbar from '../components/Navbar';
import NavbarRoutes from '../routes';

const App = ({ props }) => {

  const getRoutes = (routes) => {
    return NavbarRoutes.routes.map((prop, key) => {
      return (
        <Route
          path={prop.path}
          key={key}
          component={prop.component}
        />
      );
    });
  };
console.log(NavbarRoutes)
  return (

    <div className="App">
      <AppContextProvider>
        <Switch>{getRoutes(NavbarRoutes)}</Switch>
      </AppContextProvider>
    </div>


  )
}

export default App;
