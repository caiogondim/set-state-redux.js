const typeFrom = require('type-from')

const actionType = '@@reduxSetState/SET_STATE'

function decorateCreateStore (createStore) {
  return (reducer, ...args) => {
    function reducerInterceptor (state, action) {
      if (action && action.type === actionType) {
        if (typeFrom(action.payload.newState) === 'object') {
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
