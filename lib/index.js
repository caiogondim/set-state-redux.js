const actionType = '@@reduxSetState/SET_STATE'

function decorateCreateStore(createStore) {
  return (reducer, ...args) => {
    function reducerInterceptor(state, action) {
      if (action && action.type === actionType) {
        return Object.assign({}, state, action.payload.newState)
      }

      return reducer(state, action)
    }

    const store = createStore(reducerInterceptor, ...args)

    store.setState = function(newState) {
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
