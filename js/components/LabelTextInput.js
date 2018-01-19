/**
 * VPA - 2018
 * leo.lafon@epitech.eu
 */

import React from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native'


const LabelTextInput = props => {
  const {
    label,
    labelStyle,
    style,
    underlineColorAndroid,
    selectionColor,
    ...inputProps
  } = props

  return (
    <View>
      <Text
        style={labelStyle || styles.defaultLabel}>
        {label}
      </Text>
      <TextInput
        style={style || styles.defaultInput}
        underlineColorAndroid={underlineColorAndroid || 'transparent'}
        selectionColor={selectionColor || '#61A8BA'}
        {...inputProps}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  defaultLabel: {
    marginTop: 10,
    color: '#61A8BA',
  },
  defaultInput: {
    height: 40,
    // backgroundColor: '#c0e1ea',
    backgroundColor: '#c9c9c9',
    color: 'white',
    fontSize: 20,
    padding: 10,
  }
})

export default LabelTextInput
