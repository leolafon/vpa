/**
 * VPA - 2018
 * leo.lafon@epitech.eu
 */

import React from 'react'
import { addNavigationHelpers } from 'react-navigation'
import { connect } from 'react-redux'

import RootNav from './AppNavigation'


/**
 *
 * @param {*} props
 */
const ReduxNavigation = props => {
  const { dispatch, nav } = props
  const navigation = addNavigationHelpers({
    dispatch,
    state: nav,
  })

  return <RootNav navigation={navigation}/>
}

const mapStateToProps = state => ({ nav: state.nav })

export default connect(mapStateToProps)(ReduxNavigation)
