import React from "react";
import PropTypes from "prop-types";
import custom from "../../../styles/custom.css";

class DemoStates extends React.Component {
  render() {
    const { checked, value, toggleCheck, incNumber, decNumber } = this.props;
    return (
      <div>
        <h6 className={custom["docs-header"]}>Demo Managing States with Redux</h6>
        <label
          style={{ display: "inline-block", textAlign: "center" }}
          onChange={toggleCheck}
          checked={checked}
        >
          <input type="checkbox" checked={checked} />
          <span className={custom["label-body"]}> checkbox </span>
        </label>
        <div style={{ width: "10rem", display: "inline-block", textAlign: "center" }}>
          {checked ? "checked" : "unchecked"}
        </div>
        <div>
          <button onClick={decNumber}>&#8810;</button>
          <div style={{ width: "6rem", display: "inline-block", textAlign: "center" }}>
            {value}
          </div>
          <button onClick={incNumber}>&#8811;</button>
        </div>
      </div>
    );
  }
}

DemoStates.propTypes = {
  checked: PropTypes.bool,
  value: PropTypes.number.isRequired,
};

export default DemoStates;
