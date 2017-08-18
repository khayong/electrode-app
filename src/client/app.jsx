//
// This is the client side entry point for the React app.
//

import React from "react";
import { render } from "react-dom";
import { Router, browserHistory } from "react-router";
import { Provider } from "react-redux";
//

//
// Add the client app start up code to a function as window.webappStart.
// The webapp's full HTML will check and call it once the js-content
// DOM is created.
//

import {buildApp} from "electrode-mantra-core";
import initContext from "./configs/context";
import {MuiThemeProvider} from "material-ui/styles";

import modules from "./modules";

window.webappStart = () => {
  const context = initContext();
  buildApp(modules, context);

  const {Router: {routes}, Store, Theme} = context;

  let enhancer;
  if (process.env.NODE_ENV !== "production") {
    enhancer = window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__();
  }

  render(
    <MuiThemeProvider theme={Theme}>
      <Provider store={Store.getStore(window.__PRELOADED_STATE__, enhancer)}>
        <Router history={browserHistory}>{routes}</Router>
      </Provider>
    </MuiThemeProvider>,
    document.querySelector(".js-content"),
    () => {
      const jssStyles = document.getElementById('jss-server-side');
      if (jssStyles && jssStyles.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles);
      }
    },
  );
};
