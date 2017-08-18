import React from "react";
import Button from 'material-ui/Button';
import custom from "../../../styles/custom.css";

/*
 * Demostrates a simple pure functional component
 */

export const DemoMaterialUi = () =>
  <div>
    <h6 className={custom["docs-header"]}>
      Demo Material UI components
    </h6>
    <div className={custom["docs-example"]}>
      <Button raised>Default</Button>
      <Button raised color="primary">Primary</Button>
      <Button raised color="accent">Accent</Button>
      <Button raised color="contrast">Contrast</Button>
      <Button raised color="accent" disabled>Disabled</Button>
      <Button raised dense>
        Dense
      </Button>
    </div>
  </div>;
