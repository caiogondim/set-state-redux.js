const redux = require('redux')
const setStateRedux = require('../lib')

function animalsReducer(state = [], action = {}) {
  switch (action.type) {
    case 'ADD_ANIMAL':
      return [ ...state, action.payload ]
    default:
      return state
  }
}

function carsReducer(state = [], action = {}) {
  switch (action.type) {
    case 'ADD_CAR':
      return [ ...state, action.payload ]
    default:
      return state
  }
}

const createStoreWithSetState = setStateRedux.decorateCreateStore(redux.createStore)

const store = createStoreWithSetState(
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
  payload: 'sheep'
})

store.dispatch({
  type: 'ADD_CAR',
  payload: 'f40'
})

store.setState({ animals: ['dog', 'cow'] })
store.setState({
  cars: [ ...store.getState().cars, 'db9' ]
})
