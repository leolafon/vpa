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
import PropTypes from 'prop-types'


/**
 * Button component with default style
 *
 * @param {*} props
 */
const Button = props => {
  const { textStyle, style, text, ...otherProps } = props
  return (
    <TouchableOpacity
      {...otherProps}
      style={style || styles.defaultButton}>
      <Text style={textStyle || styles.defaultText}>
        {text}
      </Text>
    </TouchableOpacity>
  )
}

Button.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
}

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
