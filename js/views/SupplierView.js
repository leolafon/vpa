/**
 * VPA - 2018
 * leo.lafon@epitech.eu
 */

import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'
import I18n from 'ex-react-native-i18n'
import { NavigationActions } from 'react-navigation'

import Button from '../components/Button'
import ChoiceModal from '../components/ChoiceModal'
import DataRow from '../components/DataRow'
import IconButton from '../components/IconButton'
import Spinner from '../components/Spinner'
import {
  deleteRowById,
  getTable,
  getProductsOfSupplierSorted,
  getCategoriesOfProductsBySupplier,
} from '../api'


/**
 *
 */
class SupplierView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      isReady: false,
      newProduct: {},
      productsArray: [],
      categories: [],
    }
  }

  componentWillMount() {
    this.updateProducts()
  }

  componentWillUpdate(nextProps, nextState) {
    if (!this.state.isReady
      || nextState.modalVisible) {
      return
    }
    this.updateProducts()
  }

  deepCompare(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2)
  }

  updateProducts() {
    const { supplierId } = this.props.navigation.state.params
    getProductsOfSupplierSorted(supplierId, 'category')
      .then(result => {
        if (this.deepCompare(result.items, this.state.productsArray)) {
          return null
        }
        this.setState({
          isReady: false,
          productsArray: result.items
        })
        return getCategoriesOfProductsBySupplier(supplierId)
      })
      .then(result => {
        if (result === null) {
          if (!this.state.isReady) {
            this.setState({ isReady: true })
          }
          return null
        }
        this.setState({
          categories: result.items,
          isReady: true,
        })
      })
  }

  hideModal() {
    this.setState({ modalVisible: false })
  }

  showModal() {
    this.setState({ modalVisible: true })
  }

  renderProducts() {
    if (this.state.productsArray.length === 0) {
      return (
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text>
            {I18n.t('noProducts')}
          </Text>
        </View>
      )
    }

    return this.state.categories.map((category, index) => {
      return (
        <View
          key={`c${index}`}
          style={{ flex: 1, marginTop: 10, }}>
          <View style={{
            backgroundColor: '#61A8BA',
            flex: 1,
            padding: 5,
          }}>
            <Text style={{
              color: 'white',
            }}>
              {category['category']}
            </Text>
          </View>
          {this.renderProductsByCategory(category)}
        </View>
      )
    })
  }

  renderProductsByCategory(category) {
    return this.state.productsArray
      .filter(product => product.category === category.category)
      .map((product, index) => {
        const refString = product.reference
          ? ` - ${product.reference}`
          : ''
        return (
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('product', {
                productId: product.id
              })
            }}
            key={`p${index}`}
            style={{
              borderBottomWidth: 1,
              paddingLeft: 15,
              paddingVertical: 5,
            }}>
            <Text>
              {`${product.name}${refString}`}
            </Text>
          </TouchableOpacity>
        )
      })
  }

  render() {
    if (!this.state.isReady) {
      return <Spinner/>
    }
    const { navigation, dispatch } = this.props
    const { supplierId } = navigation.state.params
    const supplier = this.props.suppliers.find((item) => {
      return item.id === supplierId
    })
    if (!supplier) {
      return <Spinner/>
    }

    return (
      <View style={styles.container}>
        <ChoiceModal
          visible={this.state.modalVisible}
          message={I18n.t('deleteSupplierWarning')}
          icon='warning'
          leftText={I18n.t('continue')}
          rightText={I18n.t('cancel')}
          hideModal={() => this.hideModal()}
          onRequestClose={() => this.hideModal()}
          onPressRight={() => this.hideModal()}
          onPressLeft={() => {
            deleteRowById('suppliers', supplierId)
              .then(() => {
                getTable('suppliers')
                  .then(items => {
                    dispatch({
                      type: 'FETCH_SUPPLIERS',
                      suppliers: items,
                    })
                    this.hideModal()
                    dispatch(NavigationActions.back())
                  })
              })
              .catch(error => {
                console.warn(error)
                this.hideModal()
              })
          }}
        />
        <ScrollView contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 10,
        }}>
          <View style={styles.supplier}>
            <View style={styles.supplierData}>
              <DataRow
                label={I18n.t('name')}
                value={supplier.name}
              />
              <DataRow
                label={I18n.t('email')}
                value={supplier.email || 'N/A'}
              />
              <DataRow
                label={I18n.t('phone')}
                value={supplier.phone || 'N/A'}
              />
              <DataRow
                label={I18n.t('subject')}
                value={supplier.subject || 'N/A'}
              />
              <DataRow
                label={I18n.t('beginning')}
                value={supplier.beginning}
              />
              <DataRow
                label={I18n.t('end')}
                value={supplier.end}
              />
            </View>
            <View>
              <IconButton
                name='edit'
                size={30}
                onPress={() => {
                  navigation.navigate('editSupplier', {
                    supplier: supplier
                  })
                }}
              />
              <IconButton
                name='remove'
                size={30}
                mergeStyle={true}
                style={{ marginTop: 10 }}
                onPress={() => this.showModal()}
              />
            </View>
          </View>
          <View style={styles.productsContainer}>
            <View style={styles.productsList}>
              <Text style={{
                color: '#61A8BA',
                fontSize: 25,
              }}>
                Products
              </Text>
            </View>
            <View>
              <IconButton
                name='plus'
                size={30}
                style={{ width: 50 }}
                mergeStyle={true}
                onPress={() => {
                  navigation.navigate('addProduct', {
                    supplierId: supplier.id
                  })
                }}
              />
            </View>
          </View>
          <View>
            {this.renderProducts()}
          </View>
        </ScrollView>
        <View style={{
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
          <Button
            text={I18n.t('order')}
            onPress={() => {
              if (this.state.productsArray.length === 0) {
                return
              }

              navigation.navigate('order', {
                categories: this.state.categories,
                products: this.state.productsArray,
                supplier: supplier,
              })
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
    backgroundColor: 'white',
  },
  supplier: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 5,
  },
  supplierData: {
    flex: 1,
    flexDirection: 'column',
  },
  productsContainer: {
    flex: 2,
    flexDirection: 'row',
  },
  productsList: {
    flex: 1,
    flexDirection: 'column',
    marginRight: 10,
    justifyContent: 'center',
  },
  formContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 40,
  },
  form: {
    flex: 1,
  }
})

const mapStateToProps = state => ({
  products: state.data.products,
  suppliers: state.data.suppliers,
})

export default connect(mapStateToProps)(SupplierView)
