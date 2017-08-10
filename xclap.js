/*
 * Tell Electrode app archetype that you want to use ES6 syntax in your server code
 */

process.env.SERVER_ES6 = true;

/*
 * Enable webpack's NodeSourcePlugin to simulate NodeJS libs in browser
 */

// process.env.ENABLE_NODESOURCE_PLUGIN = true;

/*
 * Use PhantomJS to run your Karma Unit tests.  Default is "chrome" (Chrome Headless)
 */

// process.env.KARMA_BROWSER = "phantomjs";

/*
 * Turn off using electrode-webpack-reporter to show visual report of your webpack
 * compile results when running in dev mode with `clap dev`
 */

// process.env.HTML_WEBPACK_REPORTER_OFF = true;

/*
 * Use a custom host name instead of localhost, and a diff port instead of 2992
 * for webpack dev server when running in dev mode with `clap dev`
 */

// process.env.WEBPACK_DEV_HOST = "dev.mymachine.net";
// process.env.WEBPACK_DEV_PORT = 8100;

/*
 * Enable HTTPS for webpack dev server when running in dev mode with `clap dev`
 */

// process.env.WEBPACK_DEV_HTTPS = true;

const archetype = require("electrode-archetype-react-app/config/archetype");

const Path = require("path");
const devRequire = archetype.devRequire;

const xsh = devRequire("xsh");
const exec = xsh.exec;
const mkCmd = xsh.mkCmd;

const AppMode = archetype.AppMode;
const eTmpDir = archetype.eTmpDir;

const xclap = devRequire("xclap");
require("electrode-archetype-react-app")(xclap);

xclap.load("electrode", {
  "server-watch": {
    dep: [".init-bundle.valid.log"],
    desc: "Start app's node server in watch mode with nodemon",
    task: () => {
      const watches = [Path.join(eTmpDir, "bundle.valid.log"), AppMode.src.server, "config"]
      .map(n => `--watch ${n}`)
      .join(" ");
      AppMode.setEnv(AppMode.src.dir);
      const node = AppMode.isSrc ? `babel-node --plugins dynamic-import-node` : "node";
      const serverIndex = Path.join(AppMode.src.server, "index.js");
      return exec(
        `nodemon`,
        `--delay 1 -C --ext js,jsx,json,yaml ${watches}`,
        `--exec ${node} ${serverIndex}`
      );
    }
  },

  "build-lib:client": {
    desc: false,
    dep: [".clean.lib:client", ".mk.lib.client.dir", ".build.client.babelrc"],
    task: mkCmd(
      `babel --plugins dynamic-import-node`,
      `--source-maps=inline --copy-files --out-dir ${AppMode.lib.client}`,
      `${AppMode.src.client}`
    )
  },
});
