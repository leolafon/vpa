/**
 * VPA - 2018
 * leo.lafon@epitech.eu
 */

import React from 'react'
import {
  View,
  Text,
  Modal,
  StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import I18n from 'ex-react-native-i18n'
import { NavigationActions } from 'react-navigation'

import IconButton from '../components/IconButton'
import ChoiceModal from '../components/ChoiceModal'
import DataRow from '../components/DataRow'
import Spinner from '../components/Spinner'
import EditProductView from '../views/EditProductView'
import {
  deleteRowById,
  getTable,
} from '../api'


class ProductView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
    }
  }

  openModal() {
    this.setState({ modalVisible: true })
  }

  closeModal() {
    this.setState({ modalVisible: false })
  }

  render() {
    const { navigation, dispatch, products } = this.props
    const product = products.find(item => {
      return item.id === navigation.state.params.productId
    })

    if (!product) {
      return <Spinner/>
    }

    return (
      <View style={styles.container}>
        <ChoiceModal
          visible={this.state.modalVisible}
          message={I18n.t('deleteProductWarning')}
          icon='warning'
          leftText={I18n.t('continue')}
          rightText={I18n.t('cancel')}
          onRequestClose={() => this.closeModal()}
          onPressRight={() => this.closeModal()}
          onPressLeft={() => {
            deleteRowById('products', product.id)
              .then(() => {
                getTable('products')
                  .then(items => {
                    dispatch({
                      type: 'FETCH_PRODUCTS',
                      products: items,
                    })
                    dispatch(NavigationActions.back())
                    this.closeModal()
                  })
              })
              .catch(error => {
                console.warn(error)
                this.closeModal()
              })
          }}
        />
        <View style={styles.innerContainer}>
          <View style={styles.productData}>
            <DataRow
              label='Name'
              value={product.name}
            />
            <DataRow
              label='Category'
              value={product.category}
            />
            <DataRow
              label='Reference'
              value={product.reference || 'N/A'}
            />
          </View>
          <View>
            <IconButton
              name='edit'
              size={30}
              onPress={() => {
                navigation.navigate('editProduct', {
                  product: product
                })
              }}
            />
            <IconButton
              name='remove'
              size={30}
              mergeStyle={true}
              style={{ marginTop: 10 }}
              onPress={() => this.openModal()}
            />
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  productData: {
    flex: 1,
    flexDirection: 'column',
  },
})

const mapStateToProps = state => ({
  products: state.data.products
})

export default connect(mapStateToProps)(ProductView)
