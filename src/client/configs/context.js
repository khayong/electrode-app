import {createRouter, createStore} from "electrode-mantra-core";

import createTheme from "./createTheme";
import createApolloClient from "./createApolloClient";

export default function() {
  return {
    Router: createRouter(),
    Store: createStore(),
    Theme: createTheme(),
    ApolloClient: createApolloClient(),
  }
}
