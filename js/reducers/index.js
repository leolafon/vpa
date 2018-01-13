/**
 * VPA - 2018
 * leo.lafon@epitech.eu
 */

import { combineReducers } from 'redux'

import { navReducer } from './navigation'


/**
 * Root reducer
 */
export default combineReducers({
  nav: navReducer,
})
