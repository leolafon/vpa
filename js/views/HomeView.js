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
  Image,
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import I18n from 'ex-react-native-i18n'

import Button from '../components/Button'
import Spinner from '../components/Spinner'
import {
  initDB,
  getTable,
  addSupplier,
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
        style={[styles.suppliers, {
          borderTopWidth: index === 0 ? 1 : 0
        }]}
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
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Image
            style={{
              height: 115,
              width: 340,
              resizeMode: 'contain',
              marginRight: 5,
            }}
            source={require('../../assets/vpa.png')} />
        </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  suppliersContainer: {
    flex: 1,
    marginTop: 10,
  },
  suppliers: {
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderColor: '#61A8BA',
    paddingVertical: 10,
  },
  buttonContainer: {
    paddingVertical: 10,
  }
})

const mapStateToProps = state => ({
  data: state.data,
})

export default connect(mapStateToProps)(HomeView)
