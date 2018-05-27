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

import TextArea from './TextArea'


class LabelTextInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      focused: false,
    }
  }

  textInputComponent = (textArea, inputProps) => {
    if (textArea) {
      return (
        <TextArea
          ref='input'
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          {...inputProps}
        />
      )
    } else {
      return (
        <TextInput
          ref='input'
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          {...inputProps}
        />
      )
    }
  }

  focus = () => {
    this.refs.input.focus()
  }

  onFocus = () => {
    this.setState({ focused: true })
  }

  onBlur = () => {
    this.setState({ focused: false })
  }

  render() {
    const {
      label,
      labelStyle,
      style,
      underlineColorAndroid,
      selectionColor,
      textArea,
      required,
      ...inputProps
    } = this.props

    return (
      <View>
        <Text
          style={labelStyle || styles.defaultLabel}>
          {`${label} ${required ? '*' : ''}`}
        </Text>
        {this.textInputComponent(
          textArea,
          Object.assign(inputProps, {
            style: [
              style || styles.defaultInput,
              { borderWidth: this.state.focused ? 2 : 1 },
            ],
            underlineColorAndroid: underlineColorAndroid || 'transparent',
            selectionColor: selectionColor || '#61A8BA',
          })
        )}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  defaultLabel: {
    marginTop: 10,
    color: '#61A8BA',
  },
  defaultInput: {
    height: 40,
    backgroundColor: '#f4fafd',
    borderColor: '#61A8BA',
    padding: 10,
  }
})

export default LabelTextInput
