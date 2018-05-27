/**
 *
 */

import React from 'react'
import { TextInput } from 'react-native'


class TextArea extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      height: 0
    }
  }

  focus = () => {
    this.refs.input.focus()
  }

  render() {
    const { style, ...otherProps } = this.props
    return (
      <TextInput
        ref='input'
        {...otherProps}
        style={[style, { height: Math.max(40, this.state.height) }]}
        onContentSizeChange={(e) => {
          console.log(e.nativeEvent.contentSize.height, 'style :', style)
          this.setState({ height: e.nativeEvent.contentSize.height })
        }}
      />
    )
  }
}

export default TextArea
