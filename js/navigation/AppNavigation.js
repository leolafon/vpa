/**
 * VPA - 2018
 * leo.lafon@epitech.eu
 */

import React from 'react'
import { StackNavigator } from 'react-navigation'
import { Image, StatusBar } from 'react-native'

import HomeView from '../views/HomeView'
import AddSupplierView from '../views/AddSupplierView'
import SupplierView from '../views/SupplierView'
import EditSupplierView from '../views/EditSupplierView'


/**
 * Root navigator off the app
 */
const RootNav = StackNavigator({
  home: {
    screen: HomeView,
    navigationOptions: ({ navigation }) => ({
      title: 'Home',
    })
  },
  addSupplier: {
    screen: AddSupplierView
  },
  supplier: {
    screen: SupplierView,
    navigationOptions: ({ navigation }) => ({
      title: 'Supplier',
    })
  },
  editSupplier: {
    screen: EditSupplierView
  },
}, {
  title: 'Main',
  initialRouteName: 'home',
  navigationOptions: {
    headerStyle: {
      paddingTop: StatusBar.currentHeight,
    }
  }
})

export default RootNav
