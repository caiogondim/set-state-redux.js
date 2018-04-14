/* eslint-env jest */

const redux = require('redux')
const reduxSetState = require('../lib')
const createStoreWithSetState = reduxSetState.decorateCreateStore(redux.createStore)

test('literal value', () => {
  function reducer (state = 0, action = {}) {
    switch (action.type) {
      case 'SUM':
        return state + action.payload
      default:
        return state
    }
  }
  const store = createStoreWithSetState(reducer)

  store.dispatch({ type: 'SUM', payload: 1 })
  store.setState(store.getState() + 1)
  store.dispatch({ type: 'SUM', payload: 1 })

  expect(store.getState()).toEqual(3)
})

test('array value', () => {
  function reducer (state = [], action = {}) {
    switch (action.type) {
      case 'ADD_ANIMAL':
        return [ ...state, action.payload ]
      default:
        return state
    }
  }
  const store = createStoreWithSetState(reducer)

  store.dispatch({ type: 'ADD_ANIMAL', payload: 'cow' })
  store.setState([ ...store.getState(), 'sheep' ])
  store.dispatch({ type: 'ADD_ANIMAL', payload: 'dog' })

  expect(store.getState()).toEqual(['cow', 'sheep', 'dog'])
})

test('object value', () => {
  function animalsReducer (state = [], action = {}) {
    switch (action.type) {
      case 'ADD_ANIMAL':
        return [ ...state, action.payload ]
      default:
        return state
    }
  }

  function carsReducer (state = [], action = {}) {
    switch (action.type) {
      case 'ADD_CAR':
        return [ ...state, action.payload ]
      default:
        return state
    }
  }

  const store = createStoreWithSetState(
    redux.combineReducers({
      animals: animalsReducer,
      cars: carsReducer
    })
  )

  store.dispatch({ type: 'ADD_ANIMAL', payload: 'cow' })
  store.dispatch({ type: 'ADD_CAR', payload: 'db9' })
  store.setState({
    animals: [ ...store.getState().animals, 'dog' ]
  })
  store.setState({
    cars: [ ...store.getState().cars, 'f40' ]
  })

  expect(store.getState()).toEqual({
    animals: [ 'cow', 'dog' ],
    cars: [ 'db9', 'f40' ]
  })
})

test('store without reducers', () => {
  const store = createStoreWithSetState()

  store.setState([ 'sheep' ])

  expect(store.getState()).toEqual([ 'sheep' ])
})
