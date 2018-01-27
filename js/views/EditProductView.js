/**
 * VPA - 2018
 * leo.lafon@epitech.eu
 */

import React from 'react'
import I18n from 'ex-react-native-i18n'
import { connect } from 'react-redux'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native'
import { NavigationActions } from 'react-navigation'

import Button from '../components/Button'
import GenericModal from '../components/GenericModal'
import LabelTextInput from '../components/LabelTextInput'
import { getTable, editProduct } from '../api'


class EditProductView extends React.Component {
  constructor(props) {
    super(props)

    const { product } = this.props.navigation.state.params
    this.state = {
      name: product.name,
      category: product.category,
      reference: product.reference,
      success: false,
      modalVisible: false,
      modalMessage: '',
    }
  }

  toggleModal(value) {
    this.setState({ modalVisible: value })
  }

  render() {
    const { dispatch, navigation } = this.props
    const { product } = navigation.state.params

    return (
      <View style={styles.container}>
        <GenericModal
          success={this.state.success}
          visible={this.state.modalVisible}
          message={this.state.modalMessage}
          onRequestClose={() => this.toggleModal(false)}
          successCallback={() => {
            getTable('products')
              .then(items => {
                dispatch({
                  type: 'FETCH_PRODUCTS',
                  products: items,
                })
                this.toggleModal(false)
                dispatch(NavigationActions.back())
              })
          }}
          errorCallback={() => this.toggleModal(false)}
        />
        <ScrollView>
          <View style={styles.formContainer}>
            <LabelTextInput
              label='Name'
              value={this.state.name}
              onChangeText={(text) => {
                this.setState({ name: text })
              }}
            />
            <LabelTextInput
              label='Category'
              value={this.state.category}
              onChangeText={(text) => {
                this.setState({ category: text })
              }}
            />
            <LabelTextInput
              label='Reference'
              value={this.state.reference}
              onChangeText={(text) => {
                this.setState({ reference: text })
              }}
            />
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <View style={[styles.buttonWrapper, { marginRight: 10 }]}>
            <Button
              text={I18n.t('continue')}
              onPress={() => {
                editProduct(product.id, this.state)
                  .then(() => {
                    this.setState({
                      success: true,
                      modalVisible: true,
                      modalMessage: I18n.t('editProductSuccess')
                    })
                  })
                  .catch((error) => {
                    console.warn(error)
                    this.setState({
                      success: false,
                      modalVisible: true,
                      modalMessage: I18n.t('editProductFailure')
                    })
                  })
              }}
            />
          </View>
          <View style={[styles.buttonWrapper, { marginLeft: 10 }]}>
            <Button
              text={I18n.t('cancel')}
              reversed={true}
              onPress={() => {
                dispatch(NavigationActions.back())
              }}
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
    justifyContent: 'center',
    padding: 40,
  },
  formContainer: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 30,
    flexDirection: 'row',
  },
  buttonWrapper: {
    flex: 1,
  }
})

export default connect()(EditProductView)
