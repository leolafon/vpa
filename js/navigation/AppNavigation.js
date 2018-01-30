/**
 * VPA - 2018
 * leo.lafon@epitech.eu
 */

import React from 'react'
import I18n from 'ex-react-native-i18n'
import { StackNavigator } from 'react-navigation'
import { Image, StatusBar } from 'react-native'

import AddProductView from '../views/AddProductView'
import HomeView from '../views/HomeView'
import AddSupplierView from '../views/AddSupplierView'
import SupplierView from '../views/SupplierView'
import EditSupplierView from '../views/EditSupplierView'
import ProductView from '../views/ProductView'
import OrderView from '../views/OrderView'
import EditProductView from '../views/EditProductView';


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
    screen: AddSupplierView,
    navigationOptions: () => ({
      title: I18n.t('addSupplier')
    })
  },
  supplier: {
    screen: SupplierView,
    navigationOptions: ({ navigation }) => ({
      title: I18n.t('supplier'),
    })
  },
  editSupplier: {
    screen: EditSupplierView,
    navigationOptions: ({ navigation }) => ({
      title: I18n.locale === 'ja-JP'
        ? `${navigation.state.params.supplier.name}を${I18n.t('edit')}`
        : `${I18n.t('edit')} ${navigation.state.params.supplier.name}`
    })
  },
  addProduct: {
    screen: AddProductView,
    navigationOptions: ({ navigation }) =>({
      title: I18n.t('addProduct')
    })
  },
  product: {
    screen: ProductView,
    navigationOptions: ({ navigation }) => ({
      title: I18n.t('product'),
    })
  },
  editProduct: {
    screen: EditProductView,
    navigationOptions: ({ navigation }) => ({
      title: I18n.locale === 'ja-JP'
        ? `${navigation.state.params.product.name}を${I18n.t('edit')}`
        : `${I18n.t('edit')} ${navigation.state.params.product.name}`
    })
  },
  order: {
    screen: OrderView,
    navigationOptions: ({ navigation }) => ({
      title: I18n.t('order'),
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
