/**
 * VPA - 2018
 * leo.lafon@epitech.eu
 */

import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

import reducer from './reducers'


/**
 * Create and configure the redux store
 */
export default function configureStore() {
  const store = createStore(
    reducer,
    applyMiddleware(logger)
  )

  return store
}
