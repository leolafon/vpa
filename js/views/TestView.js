/**
 * VPA - 2018
 * leo.lafon@epitech.eu
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


/**
 * Home view
 */
export default class TestView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Test view</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
