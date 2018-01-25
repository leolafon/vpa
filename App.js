/**
 * VPA - 2018
 * leo.lafon@epitech.eu
 */

import React from 'react';
import { Image, Platform } from 'react-native';
import { Asset, AppLoading } from 'expo'
import { Provider } from 'react-redux'
import I18n from 'ex-react-native-i18n'

import configureStore from './js/configureStore'
import ReduxNavigation from './js/navigation/ReduxNavigation'
import { initDB } from './js/api'


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
      I18n.initAsync(),
      initDB(),
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

I18n.fallbacks = true
I18n.translations = {
  'en': {
    continue: 'Continue',
    cancel: 'Cancel',
    yes: 'Yes',
    no: 'No',
    noSuppliers: 'You have not registered any supplier yet...',
    noProducts: 'No products associated with this supplier yet...',
    addSupplier: 'Add supplier',
    addSupplierSuccess: 'Supplier added successfuly',
    addSupplierFailure: 'Unable to add supplier',
    editSupplierSuccess: 'Supplier edited successfuly',
    editSupplierFailure: 'Unable to edit supplier',
    deleteSupplierWarning: 'Are you sure you want to delete this supplier ?',
    deleteSupplierSuccess: 'Supplier deleted successfuly',
    deleteSupplierFailure: 'Unable to delete supplier',
  },
  'fr': {
    continue: 'Continuer',
    cancel: 'Annuler',
    yes: 'Oui',
    no: 'Non',
    noSuppliers: 'Vous n\'avez pas encore enregistrer de fournisseur...',
    noProducts: 'Vous n\'avez pas encore associer de produits à ce fournisseur...',
    addSupplier: 'Ajouter un fournisseur',
    addSupplierSuccess: 'Fournisseur ajouté avec succès',
    addSupplierFailure: 'Impossible d\'ajouter le fournisseur',
    editSupplierSuccess: 'Fournisseur modifié avec succès',
    editSupplierFailure: 'Impossible de modifier le fournisseur',
    deleteSupplierWarning: 'Etes-vous sûr de vouloir suppimer ce fournisseur ?',
    deleteSupplierSuccess: 'Fournisseur supprimé avec succès',
    deleteSupplierFailure: 'Impossible de supprimer le fournisseur',
  },
  'ja-JP': {
    addSupplier: '業者を追加',
  }
}
