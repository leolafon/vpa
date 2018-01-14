/**
 * VPA - 2018
 * leo.lafon@epitech.eu
 */

import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native'


/**
 * Button component with default style
 *
 * @param {*} props
 */
const Button = props =>
  <TouchableOpacity
    style={props.style ? props.style : styles.defaultButton}
    onPress={props.callback}>
    <Text style={props.textStyle || styles.defaultText}>
      {props.text}
    </Text>
  </TouchableOpacity>

const styles = StyleSheet.create({
  defaultButton: {
    backgroundColor: '#61A8BA',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
  },
  defaultText: {
    color: 'white',
  }
})

export default Button
