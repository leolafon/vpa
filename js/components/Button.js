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
  const {
    textStyle,
    style,
    text,
    reversed,
    ...otherProps
  } = props

  return (
    <TouchableOpacity
      {...otherProps}
      style={style || (reversed
        ? styles.reversedButton
        : styles.defaultButton)}>
      <Text style={textStyle || (reversed
          ? styles.reversedText
          : styles.defaultText)}>
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
    borderWidth: 1,
    borderColor: '#61A8BA',
  },
  reversedButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#61A8BA',
  },
  defaultText: {
    color: 'white',
  },
  reversedText: {
    color: '#61A8BA',
  }
})

export default Button
