//
// This is the server side entry point for the React app.
//

import ReduxRouterEngine from "electrode-redux-router-engine";

import {buildApp} from "electrode-mantra-core";
import initContext from "../../client/configs/context";

import modules from "../../client/modules";

const Promise = require("bluebird");

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

    const {Router: {routes}, Store} = context;

    const createReduxStore = (req, match) => {
      const initialState = {
        checkBox: {checked: false},
        number: {value: 999}
      };

      const store = Store.getStore(initialState);
      return Promise.resolve(store);
    };

    app.routesEngine = new ReduxRouterEngine({routes, createReduxStore});
  }

  return app.routesEngine.render(req);
};
