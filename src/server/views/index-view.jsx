//
// This is the server side entry point for the React app.
//

import React from "react";
import ReactDomServer from "react-dom/server";
import {RouterContext} from "react-router";
import {JssProvider, SheetsRegistry} from "react-jss";
import {create}  from "jss";
import preset from "jss-preset-default";
import {MuiThemeProvider} from "material-ui/styles";
import createGenerateClassName from "material-ui/styles/createGenerateClassName";
import CleanCSS from "clean-css";
import assert from "assert";
import ReduxRouterEngine from "electrode-redux-router-engine";
import {config} from "electrode-confippet";
import {ApolloProvider} from "react-apollo";

import {buildApp} from "electrode-mantra-core";
import initContext from "../../client/configs/context";

import modules from "../../client/modules";

const Promise = require("bluebird");

const BAD_CHARS_REGEXP = /[<\u2028\u2029]/g;
const REPLACEMENTS_FOR_BAD_CHARS = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};

function escapeBadChars(sourceString) {
  return sourceString.replace(BAD_CHARS_REGEXP, (match) => REPLACEMENTS_FOR_BAD_CHARS[match]);
}

function stringifyPreloadedState(state) {
  return `window.__PRELOADED_STATE__ = ${escapeBadChars(JSON.stringify(state))};` +
    `window.__SIMPLE_API_ENDPOINT__ = '${config.$("apollo.uri")}';`
}

//
// This function is exported as the content for the webapp plugin.
//
// See config/default.json under plugins.webapp on specifying the content.
//
// When the Web server hits the routes handler installed by the webapp plugin, it
// will call this function to retrieve the content for SSR if it's enabled.
//
//

module.exports = (req) => {
  const app = req.server && req.server.app || req.app;
  if (!app.routesEngine) {
    const context = initContext();
    buildApp(modules, context);

    const {Router: {routes}, Store, Theme, ApolloClient} = context;

    const createReduxStore = (req, match) => {
      const initialState = {
        checkBox: {checked: false},
        number: {value: 999}
      };

      const store = Store.getStore(initialState);
      return Promise.resolve(store);
    };

    const renderToString = (req, store, match, withIds) => {
      if (req.app && req.app.disableSSR) {
        return "";
      } else {
        assert(React, "Can't do SSR because React module is not available");
        assert(ReactDomServer, "Can't do SSR because ReactDomServer module is not available");

        // Create a sheetsRegistry instance.
        const sheetsRegistry = new SheetsRegistry();

        // Configure JSS
        const jss = create(preset());
        jss.options.createGenerateClassName = createGenerateClassName;

        const client = ApolloClient.getClient(config.$("apollo.uri"), true);
        Store.injectReducer({apollo: client.reducer()})

        const element = React.createElement(
          JssProvider, {registry: sheetsRegistry, jss},
          React.createElement(
            MuiThemeProvider, {theme: Theme, sheetsManager: new Map()},
            React.createElement(
              ApolloProvider, { store, client },
              React.createElement(RouterContext, match.renderProps)
            )
          )
        )

        // Render the component to a string.
        const html = (withIds ? ReactDomServer.renderToString : ReactDomServer.renderToStaticMarkup)(
          element
        );

        // Grab the CSS from our sheetsRegistry.
        const css = new CleanCSS().minify(sheetsRegistry.toString()).styles;

        return `<div id="root">${html}</div><style id="jss-server-side">${css}</style>`
      }
    }

    app.routesEngine = new ReduxRouterEngine({routes, createReduxStore, renderToString, stringifyPreloadedState});
  }

  return app.routesEngine.render(req);
};
