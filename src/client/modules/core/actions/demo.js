export default {

  toggleCheck({Store}) {
    Store.dispatch({
      type: "TOGGLE_CHECK"
    })
  },

  incNumber({Store}) {
    Store.dispatch({
      type: "INC_NUMBER"
    })
  },

  decNumber({Store}) {
    Store.dispatch({
      type: "DEC_NUMBER"
    })
  }

};
