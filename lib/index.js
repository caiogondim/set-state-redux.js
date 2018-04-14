const actionType = '@@reduxSetState/SET_STATE'

// Source: https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
function toType (x) {
  return Object.prototype.toString.call(x).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

function decorateCreateStore (createStore) {
  return (reducer, ...args) => {
    function reducerInterceptor (state, action) {
      if (action && action.type === actionType) {
        if (toType(action.payload.newState) === 'object') {
          return Object.assign({}, state, action.payload.newState)
        }
        return action.payload.newState
      } else if (!reducer) {
        return
      }

      return reducer(state, action)
    }

    const store = createStore(reducerInterceptor, ...args)

    store.setState = function (newState) {
      store.dispatch({
        type: actionType,
        payload: {
          newState
        }
      })
    }

    return store
  }
}

module.exports = {
  decorateCreateStore
}
