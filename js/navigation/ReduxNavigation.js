/**
 * VPA - 2018
 * leo.lafon@epitech.eu
 */

import React from 'react'
import { connect } from 'react-redux'
import { BackHandler } from 'react-native'
import {
  addNavigationHelpers,
  NavigationActions
} from 'react-navigation'

import RootNav from './AppNavigation'


/**
 *
 * @param {*} props
 */
class ReduxNavigation extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress', this.onBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress', this.onBackPress)
  }

  onBackPress = () => {
    const { dispatch, nav } = this.props
    if (nav.index === 0) {
      return false
    }
    dispatch(NavigationActions.back())
    return true
  }

  render() {
    const { dispatch, nav } = this.props
    const navigation = addNavigationHelpers({
      dispatch,
      state: nav
    })

    return <RootNav navigation={navigation}/>
  }
}

const mapStateToProps = state => ({ nav: state.nav })

export default connect(mapStateToProps)(ReduxNavigation)
