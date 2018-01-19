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
        this.setState({ isReady: true })
      })
  }

  renderSuppliers() {
    return this.props.data.suppliers.map((supplier, index) => (
      <View
        key={index}
        style={styles.suppliers}>
        <Text>
          {supplier.name}
        </Text>
      </View>
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
    addSupplier: 'Add supplier',
    addSupplierSuccess: 'Supplier added successfuly',
    addSupplierFailure: 'Unable to add supplier'
  },
  'fr': {
    addSupplier: 'Ajouter un fournisseur',
    addSupplierSuccess: 'Fournisseur ajouté avec succès',
    addSupplierFailure: 'Impossible d\'ajouter le fournisseur'
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
