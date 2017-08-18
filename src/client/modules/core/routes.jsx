import Home from "./components/home";

export default function (injectDeps, {Router, Store}, actions) {
  const HomeCtx = injectDeps(Home);

  Router.makeRootRoute({
    path: "/",
    component: HomeCtx,
    childRoutes: [{
      path: "states",
      getComponent(nextState, cb) {
        import(/* webpackChunkName: "states" */ "./containers/demo-states").then(module => {
          const {number, checkBox} = require("./reducers");
          Store.injectReducer({number, checkBox});

          cb(null, module.default)
        })
      },
    }, {
      path: "pure-states",
      getComponent(nextState, cb) {
        import(/* webpackChunkName: "pure-states" */ "./containers/demo-pure-states").then(module => {
          const {number, checkBox} = require("./reducers");
          Store.injectReducer({number, checkBox});

          cb(null, module.default)
        })
      },
    }, {
      path: "buttons",
      getComponent(nextState, cb) {
        import(/* webpackChunkName: "buttons" */ "./components/demo-buttons").then(module => {
          cb(null, module.DemoButtons)
        })
      },
    }, {
      path: "material-ui",
      getComponent(nextState, cb) {
        import(/* webpackChunkName: "buttons" */ "./components/demo-material-ui").then(module => {
          cb(null, module.DemoMaterialUi)
        })
      },
    }]
  });
}
