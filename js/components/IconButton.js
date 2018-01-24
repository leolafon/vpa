/**
 * VPA - 2018
 * leo.lafon@epitech.eu
 */

import React from 'react'
import {
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native'
import PropTypes from 'prop-types'
import { FontAwesome } from '@expo/vector-icons'


/**
 *
 * @param {*} props
 */
const IconButton = props => {
  const { name, size, color, ...buttonProps } = props
  const { style, mergeStyle, reversed, ...other } = buttonProps

  const actualStyle = reversed
    ? styles.reversedButton
    : styles.defaultButton

  return (
    <TouchableOpacity
      style={mergeStyle
        ? [style, actualStyle]
        : (style || actualStyle)}
      {...other}>
      <FontAwesome
        name={name}
        size={size || 20}
        color={color || (reversed ? '#61A8BA' : 'white')}
      />
    </TouchableOpacity>
  )
}

IconButton.propTypes = {
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
  defaultButton: {
    backgroundColor: '#61A8BA',
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#61A8BA',
  },
  reversedButton: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#61A8BA',
  }
})

export default IconButton
