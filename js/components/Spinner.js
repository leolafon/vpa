/**
 * VPA - 2018
 * leo.lafon@epitech.eu
 */

import React from 'react'
import {
  ActivityIndicator,
  View,
  StyleSheet,
} from 'react-native'


/**
 * Spinner component
 *
 * @param {*} props
 */
const Spinner = props =>
  <View style={styles.container}>
    <ActivityIndicator
      size={props.size || 'large'}
      color={props.color || '#61A8BA'}
    />
  </View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  }
})

export default Spinner
