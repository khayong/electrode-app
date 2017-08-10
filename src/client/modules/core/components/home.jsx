/*
 * This is a demo component the Eletrode app generator included
 * to show using Skeleton CSS lib (named base.css) and Redux
 * store for display HTML elements and managing states.
 *
 * To start your own app, please replace or remove these files:
 *
 * - this file (home.jsx)
 * - demo-buttons.jsx
 * - demo-pure-states.jsx
 * - demo-states.jsx
 * - reducers/index.jsx
 * - styles/*.css
 *
 */

import React from "react";
import {Link} from "react-router";
import "../../../styles/normalize.css";
import "../../../styles/raleway.css";
import skeleton from "../../../styles/skeleton.css";
import custom from "../../../styles/custom.css";
import electrodePng from "../../../images/electrode.png";

/**/

export default ({children}) =>
  <div className={custom.container}>
    {/**/}

    <section className={custom.header}>
      <h2 className={skeleton.title}>
        Hello from {" "}
        <a href="https://github.com/electrode-io">{"Electrode"} <img src={electrodePng} /></a>
      </h2>
    </section>

    <ul>
      <li><Link to="/states">Demo Managing States with Redux</Link></li>
      <li><Link to="/pure-states">Demo Managing States in Pure Functional Component</Link></li>
      <li><Link to="/buttons">demo CSS modules with buttons from skeleton</Link></li>
    </ul>

    {children}

  </div>;
