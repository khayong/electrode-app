import {createRouter, createStore} from "electrode-mantra-core";

export default function() {
  return {
    Router: createRouter(),
    Store: createStore(),
  }
}
