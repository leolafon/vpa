/**
 * VPA - 2018
 * leo.lafon@epitech.eu
 */

import React from 'react'
import { StackNavigator } from 'react-navigation'

import HomeView from '../views/HomeView'
import TestView from '../views/TestView'


/**
 * Root navigator off the app
 */
const RootNav = StackNavigator({
  home: { screen: HomeView },
  test: { screen: TestView },
}, {
  headerMode: 'none',
  title: 'Main',
  initialRouteName: 'home',
})

export default RootNav
