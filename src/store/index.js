import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducers from '../reducers'

const middlewares = __DEV__ ? [logger, thunk] : [thunk]

const store = createStore(
  rootReducers,
  applyMiddleware(...middlewares)
)

export default store
