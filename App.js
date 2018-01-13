/**
 * VPA - 2018
 * leo.lafon@epitech.eu
 */

import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Asset, AppLoading } from 'expo'
import { Provider } from 'react-redux'

import configureStore from './js/configureStore'
import ReduxNavigation from './js/navigation/ReduxNavigation'


/**
 * Caches images
 *
 * @param {*} images
 */
function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image)
    } else {
      return Asset.fromModule(image).downloadAsync()
    }
  })
}


/**
 * App entry point
 */
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isReady: false,
      store: configureStore(),
    }
  }

  /**
   * Asynchronously load assets
   */
  async loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('./assets/vpa.png'),
    ])

    await Promise.all([
      ...imageAssets,
    ])
  }

  render() {
    // display splash screen while assets are loading
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this.loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      )
    }

    return (
      <Provider store={this.state.store}>
        <ReduxNavigation/>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
