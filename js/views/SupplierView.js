/**
 * VPA - 2018
 * leo.lafon@epitech.eu
 */

import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'
import I18n from 'ex-react-native-i18n'
import { NavigationActions } from 'react-navigation'

import AddProductView from './AddProductView'
import Button from '../components/Button'
import ChoiceModal from '../components/ChoiceModal'
import DataRow from '../components/DataRow'
import IconButton from '../components/IconButton'
import LabelTextInput from '../components/LabelTextInput'
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
      formVisible: false,
      isReady: false,
      newProduct: {},
      products: [],
      categories: [],
    }
  }

  componentWillMount() {
    const { supplierId } = this.props.navigation.state.params
    getProductsOfSupplierSorted(supplierId, 'category')
      .then(result => {
        this.setState({ products: result.items })
        return getCategoriesOfProductsBySupplier(supplierId)
      })
      .then(result => {
        this.setState({
          categories: result.items,
          isReady: true,
        })
      })
  }

  hideModal() {
    this.setState({ modalVisible: false })
  }

  hideForm() {
    this.setState({ formVisible: false })
  }

  showModal() {
    this.setState({ modalVisible: true })
  }

  showForm() {
    this.setState({ formVisible: true })
  }

  renderProducts() {
    if (this.state.products.length === 0) {
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
    return this.state.products
      .filter(product => product.category === category.category)
      .map((product, index) => {
        return (
          <TouchableOpacity
            onPress={() => {}}
            key={`p${index}`}
            style={{
              borderBottomWidth: 1,
              paddingLeft: 15,
              paddingVertical: 5,
            }}>
            <Text>
              {product.name}
            </Text>
          </TouchableOpacity>
        )
      })
  }

  render() {
    if (!this.state.isReady) {
      return <Spinner/>
    }

    const { supplierId } = this.props.navigation.state.params
    const supplier = this.props.data.suppliers.find((item) => {
      return item.id === supplierId
    }) || {}

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
                    this.props.dispatch(NavigationActions.back())
                    return items
                  })
                  .then(items => {
                    this.props.dispatch({
                      type: 'FETCH_SUPPLIERS',
                      suppliers: items,
                    })
                    this.hideModal()
                  })
              })
              .catch(error => {
                console.warn(error)
                this.hideModal()
              })
          }}
        />
        <Modal
          visible={this.state.formVisible}
          animationType='fade'
          transparent={false}
          onRequestClose={() => this.hideForm()}>
          <AddProductView
            close={() => this.hideForm()}
            supplierId={supplierId}
          />
        </Modal>
        <ScrollView contentContainerStyle={{padding: 30}}>
          <View style={styles.supplier}>
            <View style={styles.supplierData}>
              <DataRow
                label='Name'
                value={supplier.name}
              />
              <DataRow
                label='Email'
                value={supplier.email}
              />
              <DataRow
                label='Beginning of message'
                value={supplier.beginning}
              />
              <DataRow
                label='End of message'
                value={supplier.end}
              />
            </View>
            <View>
              <IconButton
                name='edit'
                size={30}
                onPress={() => {
                  this.props.navigation.navigate('editSupplier', {
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
                fontSize: 20,
              }}>
                Products
              </Text>
              <View style={{ marginTop: 10 }}>
                {this.renderProducts()}
              </View>
            </View>
            <View>
              <IconButton
                name='plus'
                size={30}
                style={{ width: 50 }}
                mergeStyle={true}
                onPress={() => this.showForm()}
              />
            </View>
          </View>
        </ScrollView>
        <View style={{
          paddingHorizontal: 30,
          paddingVertical: 10,
        }}>
          <Button
            text='New order'
            reversed={true}
            onPress={() => {}}
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
    paddingBottom: 25,
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
  data: state.data,
})

export default connect(mapStateToProps)(SupplierView)
