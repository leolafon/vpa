/**
 * VPA - 2018
 * leo.lafon@epitech.eu
 */

import { combineReducers } from 'redux'

import { nav } from './navigation'
import { data } from './data'


/**
 * Root reducer
 */
export default combineReducers({
  nav,
  data,
})
