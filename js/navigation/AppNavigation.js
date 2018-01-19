/**
 * VPA - 2018
 * leo.lafon@epitech.eu
 */

import React from 'react'
import { StackNavigator } from 'react-navigation'
import { Image, StatusBar } from 'react-native'

import HomeView from '../views/HomeView'
import AddSupplierView from '../views/AddSupplierView'


/**
 * Root navigator off the app
 */
const RootNav = StackNavigator({
  home: { screen: HomeView },
  addSupplier: { screen: AddSupplierView },
}, {
  title: 'Main',
  initialRouteName: 'home',
  navigationOptions: {
    headerTitle: (
      <Image
        source={require('./../../assets/vpa.png')}
        style={{
          height: 30,
          width: 90,
          alignSelf: 'center',
        }}/>
    ),
    headerStyle: {
      paddingTop: StatusBar.currentHeight,
    }
  }
})

export default RootNav
