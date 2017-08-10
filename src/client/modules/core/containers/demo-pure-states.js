import {useDeps, compose} from "electrode-mantra-core";
import {connect} from "react-redux";

import DemoPureStates from "../components/demo-pure-states"

const mapStateToProps = (state, props) => {
  return {
    checked: state.checkBox.checked,
    value: state.number.value
  }
}

const depsMapper = (context, actions) => ({
  context: () => context,
  toggleCheck: actions.demo.toggleCheck,
  incNumber: actions.demo.incNumber,
  decNumber: actions.demo.decNumber,
})

export default compose(
  connect(mapStateToProps),
  useDeps(depsMapper)
)(DemoPureStates);
