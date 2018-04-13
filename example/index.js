const redux = require('redux')
const reduxSetState = require('../lib')

function animalsReducer(state = [], action = {}) {
  switch (action.type) {
    case 'ADD_ANIMAL':
      return [ ...state, action.payload.animal ]
    default:
      return state
  }
}

function carsReducer(state = [], action = {}) {
  switch (action.type) {
    case 'ADD_CAR':
      return [  ...state, action.payload.car ]
    default:
      return state
  }
}

const createStoreWithSetState = reduxSetState.decorateCreateStore(redux.createStore)

let store = createStoreWithSetState(
  redux.combineReducers({
    animals: animalsReducer,
    cars: carsReducer
  })
)

store.subscribe(() => {
  console.log('state', store.getState())
})

store.dispatch({
  type: 'ADD_ANIMAL',
  payload: {
    animal: 'sheep'
  }
})

store.dispatch({
  type: 'ADD_CAR',
  payload: {
    car: 'f40'
  }
})

store.setState({ animals: ['dog', 'cow'] })
store.setState({
  cars: [ ...store.getState().cars, 'db9' ]
})
