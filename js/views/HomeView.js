/**
 * VPA - 2018
 * leo.lafon@epitech.eu
 */

import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import I18n from 'ex-react-native-i18n'

import Button from '../components/Button'
import Spinner from '../components/Spinner'
import {
  initDB,
  getTable,
  addSupplier
} from '../api'


/**
 * Home view
 */
class HomeView extends React.Component {
  constructor(props) {
    super(props)
    console.log('ctor')
    this.state = {
      isReady: false,
    }
  }

  componentWillMount() {
    console.log('will mount')
    getTable('suppliers')
      .then(items => {
        this.props.dispatch({
          type: 'FETCH_SUPPLIERS',
          suppliers: items
        })
      })
      .then(() => {
        return getTable('products')
      })
      .then(items => {
        this.props.dispatch({
          type: 'FETCH_PRODUCTS',
          products: items
        })
      })
      .then(() => {
        this.setState({ isReady: true })
      })
  }

  renderSuppliers() {
    const { data, navigation } = this.props

    if (data.suppliers.length === 0) {
      return (
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text>
            {I18n.t('noSuppliers')}
          </Text>
        </View>
      )
    }

    return data.suppliers.map((supplier, index) => (
      <TouchableOpacity
        key={index}
        style={styles.suppliers}
        onPress={() => {
          navigation.navigate('supplier', {
            supplierId: supplier.id
          })
        }}>
        <Text>
          {supplier.name}
        </Text>
      </TouchableOpacity>
    ))
  }

  render() {
    if (!this.state.isReady) {
      return <Spinner/>
    }
    const { dispatch } = this.props

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.suppliersContainer}>
            {this.renderSuppliers()}
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button
            text={I18n.t('addSupplier')}
            onPress={() => {
              dispatch(NavigationActions.navigate({
                routeName: 'addSupplier'
              }))
            }}
          />
        </View>
      </View>
    )
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 50,
    paddingTop: 30,
  },
  suppliersContainer: {
    flex: 1,
  },
  suppliers: {
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderColor: '#61A8BA',
    paddingVertical: 10,
  },
  buttonContainer: {
    paddingVertical: 30,
  }
})

const mapStateToProps = state => ({
  data: state.data,
})

export default connect(mapStateToProps)(HomeView)
