/**
 * VPA - 2018
 * leo.lafon@epitech.eu
 */

import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import I18n from 'ex-react-native-i18n'

import Button from '../components/Button'


/**
 * Home view
 */
class HomeView extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>{I18n.t('greeting')}</Text>
        <Button
          text='toto'
          callback={() => console.warn('toto')}
        />
      </View>
    )
  }
}

I18n.fallbacks = true
I18n.translations = {
  en: {
    greeting: 'Hello!'
  },
  fr: {
    greeting: 'Bonjour!'
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
