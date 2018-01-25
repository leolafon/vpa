/**
 * VPA - 2018
 * leo.lafon@epitech.eu
 */

import React from 'react'
import I18n from 'ex-react-native-i18n'
import { StackNavigator } from 'react-navigation'
import { Image, StatusBar } from 'react-native'

import HomeView from '../views/HomeView'
import AddSupplierView from '../views/AddSupplierView'
import SupplierView from '../views/SupplierView'
import EditSupplierView from '../views/EditSupplierView'
import ProductView from '../views/ProductView'


/**
 * Root navigator off the app
 */
const RootNav = StackNavigator({
  home: {
    screen: HomeView,
    navigationOptions: ({ navigation }) => ({
      title: I18n.t('home'),
    })
  },
  addSupplier: {
    screen: AddSupplierView
  },
  supplier: {
    screen: SupplierView,
    navigationOptions: ({ navigation }) => ({
      title: I18n.t('supplier'),
    })
  },
  editSupplier: {
    screen: EditSupplierView
  },
  product: {
    screen: ProductView,
    navigationOptions: ({ navigation }) => ({
      title: I18n.t('product'),
    })
  }
}, {
  title: 'Main',
  initialRouteName: 'home',
  navigationOptions: {
    headerStyle: {
      paddingTop: StatusBar.currentHeight,
      paddingBottom: 10,
    }
  }
})

export default RootNav
