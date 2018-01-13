/**
 * VPA - 2018
 * leo.lafon@epitech.eu
 */

import { NavigationActions } from 'react-navigation'

import RootNav from '../navigation/AppNavigation'


let initialState = RootNav.router.getStateForAction(
  NavigationActions.init()
)

/**
 * Navigation reducer
 *
 * @param {*} state
 * @param {*} action
 */
export const navReducer = (state = initialState, action) => {
  const newState = RootNav.router
    .getStateForAction(action, state)

  return newState || state
}
