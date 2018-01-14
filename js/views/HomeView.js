/**
 * VPA - 2018
 * leo.lafon@epitech.eu
 */

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'

import Button from '../components/Button'


/**
 * Home view
 */
class HomeView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Home view</Text>
        <Button
          text='toto'
          callback={() => console.warn('toto')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
})

export default connect()(HomeView)
