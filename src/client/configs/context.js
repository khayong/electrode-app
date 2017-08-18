import {createRouter, createStore} from "electrode-mantra-core";

import createTheme from "./createTheme";

export default function() {
  return {
    Router: createRouter(),
    Store: createStore(),
    Theme: createTheme(),
  }
}
