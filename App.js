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
    order: 'Order',
    name: 'Name',
    email: 'Email',
    sms: 'SMS',
    phone: 'Phone',
    beginning: 'Beginning of message',
    end: 'End of message',
    category: 'Category',
    reference: 'Reference',
    home: 'Home',
    supplier: 'Supplier',
    product: 'Product',
    continue: 'Continue',
    cancel: 'Cancel',
    yes: 'Yes',
    no: 'No',
    edit: 'Edit',
    sendOrder: 'Send order',
    noSuppliers: 'You have not registered any supplier yet...',
    noProducts: 'No products associated with this supplier yet...',
    addProduct: 'Add product',
    addProductSuccess: 'Product added successfuly',
    addProductFailure: 'Unable to add product',
    addSupplier: 'Add supplier',
    addSupplierSuccess: 'Supplier added successfuly',
    addSupplierFailure: 'Unable to add supplier',
    editSupplierSuccess: 'Supplier edited successfuly',
    editSupplierFailure: 'Unable to edit supplier',
    deleteSupplierWarning: 'Are you sure you want to delete this supplier ?',
    deleteSupplierSuccess: 'Supplier deleted successfuly',
    deleteSupplierFailure: 'Unable to delete supplier',
    deleteProductWarning: 'Are you sure you want to delete this product ?',
    editProductSuccess: 'Product edited successfuly',
    editProductFailure: 'Unable to edited product',
  },
  'fr': {
    order: 'Commande',
    name: 'Nom',
    email: 'Email',
    sms: 'SMS',
    phone: 'Téléphone',
    beginning: 'Début de message',
    end: 'Fin de message',
    category: 'Catégorie',
    reference: 'Référence',
    home: 'Accueil',
    supplier: 'Fournisseur',
    product: 'Produit',
    continue: 'Continuer',
    cancel: 'Annuler',
    yes: 'Oui',
    no: 'Non',
    edit: 'Modifier',
    sendOrder: 'Commander',
    noSuppliers: 'Vous n\'avez pas encore enregistrer de fournisseur...',
    noProducts: 'Vous n\'avez pas encore associer de produits à ce fournisseur...',
    addProduct: 'Ajouter un produit',
    addProductSuccess: 'Produit ajouté avec succès',
    addProductFailure: 'Impossible d\'ajouter le produit',
    addSupplier: 'Ajouter un fournisseur',
    addSupplierSuccess: 'Fournisseur ajouté avec succès',
    addSupplierFailure: 'Impossible d\'ajouter le fournisseur',
    editSupplierSuccess: 'Fournisseur modifié avec succès',
    editSupplierFailure: 'Impossible de modifier le fournisseur',
    deleteSupplierWarning: 'Etes-vous sûr de vouloir suppimer ce fournisseur ?',
    deleteSupplierSuccess: 'Fournisseur supprimé avec succès',
    deleteSupplierFailure: 'Impossible de supprimer le fournisseur',
    deleteProductWarning: 'Etes-vous sûr de vouloir supprimer ce produit ?',
    editProductSuccess: 'Produit modifié avec succès',
    editProductFailure: 'Impossible de modifier le produit',
  },
  'ja-JP': {
    order: '発注',
    name: '名前',
    email: 'メール',
    sms: 'メッセージ',
    phone: '電話',
    beginning: 'メールの始まり',
    end: 'メールの終わり',
    category: 'カテゴリー',
    reference: '型番',
    home: 'ホーム',
    supplier: '業者',
    product: '製品',
    continue: '続ける',
    cancel: 'キャンセル',
    yes: 'はい',
    no: 'いいえ',
    edit: '変更する',
    sendOrder: '発注する',
    noSuppliers: '業者を追加してください',
    noProducts: '製品を追加してください',
    addProduct: '製品を追加',
    addProductSuccess: '製品を追加しました',
    addProductFailure: '製品を追加せなかった',
    addSupplier: '業者を追加',
    addSupplierSuccess: '業者を追加しました',
    addSupplierFailure: '業者を追加せなかった',
    editSupplierSuccess: '業者を変更しました',
    editSupplierFailure: '業者を変更せなかった',
    deleteSupplierWarning: 'Are you sure you want to delete this supplier ?',
    deleteSupplierSuccess: 'Supplier deleted successfuly',
    deleteSupplierFailure: 'Unable to delete supplier',
    deleteProductWarning: 'Are you sure you want to delete this product ?',
    editProductSuccess: '製品を変更しました',
    editProductFailure: '製品を変更せなかった',
  }
}
