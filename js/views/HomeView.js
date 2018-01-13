/**
 * VPA - 2018
 * leo.lafon@epitech.eu
 */

import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'


/**
 * Home view
 */
class HomeView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Home view</Text>
        <Button
          title='Test'
          onPress={() => {
            this.props.dispatch(NavigationActions.navigate({
              routeName: 'test'
            }))
          }}
        />
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

export default connect()(HomeView)
