<img src="http://rawgit.com/caiogondim/set-state-redux.js/master/logo/logo.svg">

# set-state-redux

<div>
<a href="https://travis-ci.org/caiogondim/set-state-redux.js?branch=master"><img src="http://travis-ci.org/caiogondim/set-state-redux.js.svg?branch=master" alt="Travis CI" /></a>
<a href="https://www.npmjs.com/package/set-state-redux"><img src="https://img.shields.io/npm/v/set-state-redux.svg" alt="npm" /></a>
</div>

<br>

Love and `setState` is all you need.

## Installation

```console
npm install --save set-state-redux
```

## Usage

```js
const redux = require('redux')
const setStateRedux = require('set-state-redux')

// Reducers are optional. You can create a store without one.
function animalsReducer(state = [], action = {}) {
  switch (action.type) {
    case 'ADD_ANIMAL':
      return [ ...state, action.payload ]
    default:
      return state
  }
}

// Decorate `redux.createStore`
const createStoreWithSetState = setStateRedux.decorateCreateStore(redux.createStore)

// Use `createStoreWithSetState` as `redux.createStore`
const store = createStoreWithSetState(animalsReducer)

// Choose between dispatching actions...
store.dispatch({
  type: 'ADD_ANIMAL',
  payload: 'sheep'
})

// Or using `setState` directly
store.setState({ animals: ['dog', 'cow'] })
```

<a href="https://github.com/caiogondim/set-state-redux.js/tree/master/example">Example</a>

## FAQ

### Why you did this? This is not blessed by the Holy Church of React!
Redux is an awesome piece of software, but too verbose to my needs.
What I just need is `setState`. Actually what I need is [unistore](https://github.com/developit/unistore),
but there is already a lot of code coupled with Redux on my current project.
Consider this an intermediate solution.

### This is a piece of shit! I'll not use that!
Whatever floats your boat, my dude. I'll use this shit because it's simpler and because shit floats as well.

### You will lose time travel and all other nice things Redux give to you if you follow the conventions!
Actually not. There is a reducer under the hood, so everything is still supported.

## Related

- [redux-logdown](https://github.com/caiogondim/redux-logdown.js)
- [redux-whenever](https://github.com/caiogondim/redux-whenever.js)

---

[caiogondim.com](https://caiogondim.com) &nbsp;&middot;&nbsp;
GitHub [@caiogondim](https://github.com/caiogondim) &nbsp;&middot;&nbsp;
Twitter [@caio_gondim](https://twitter.com/caio_gondim)
