/**
 * VPA - 2018
 * leo.lafon@epitech.eu
 */

import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Modal,
} from 'react-native'
import I18n from 'ex-react-native-i18n'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'

import LabelTextInput from '../components/LabelTextInput'
import Button from '../components/Button'
import GenericModal from '../components/GenericModal'
import Spinner from '../components/Spinner'
import { addProduct, getTable } from '../api'


/**
 *
 */
class AddProductView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isReady: true,
      success: false,
      modalMessage: '',
      modalVisible: false,
    }
  }

  closeModal() {
    this.setState({ modalVisible: false })
  }

  openModal() {
    this.setState({ modalVisible: true })
  }

  render() {
    const { navigation, dispatch } = this.props

    return (
      <View style={styles.container}>
        <GenericModal
          success={this.state.success}
          visible={this.state.modalVisible}
          message={this.state.modalMessage}
          onRequestClose={() => this.closeModal()}
          successCallback={() => {
            getTable('products')
              .then(items => {
                dispatch({
                  type: 'FETCH_PRODUCTS',
                  products: items
                })
                this.closeModal()
                dispatch(NavigationActions.back())
              })
              .catch(error => {
                console.warn(error)
                this.closeModal()
              })
          }}
          errorCallback={() => this.closeModal()}
        />
        <ScrollView>
          <View style={styles.form}>
            <LabelTextInput
              label={I18n.t('name')}
              autoFocus={true}
              returnKeyType='next'
              required={true}
              onChangeText={(text) => {
                this.setState({ name: text })
              }}
              onSubmitEditing={() => {
                this.categoryInput.focus()
              }}
            />
            <LabelTextInput
              label={I18n.t('category')}
              ref={(view) => { this.categoryInput = view }}
              returnKeyType='next'
              required={true}
              onChangeText={(text) => {
                this.setState({ category: text })
              }}
              onSubmitEditing={() => {
                this.referenceInput.focus()
              }}
            />
            <LabelTextInput
              label={I18n.t('reference')}
              ref={(view) => { this.referenceInput = view }}
              onChangeText={(text) => {
                this.setState({ reference: text })
              }}
            />
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <View style={[styles.buttonWrapper, { marginRight: 5 }]}>
            <Button
              text={I18n.t('continue')}
              onPress={() => {
                const { supplierId } = navigation.state.params
                addProduct(supplierId, this.state)
                  .then(() => {
                    this.setState({ 
                      success: true,
                      modalVisible: true,
                      modalMessage: I18n.t('addProductSuccess')
                    })
                    console.log(this.state)
                  })
                  .catch((err) => {
                    console.warn(err)
                    this.setState({
                      success: false,
                      modalVisible: true,
                      modalMessage: I18n.t('addProductFailure')
                    })
                  })
              }}
            />
          </View>
          <View style={[styles.buttonWrapper, { marginLeft: 5 }]}>
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
    paddingHorizontal: 20,
  },
  form: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
  buttonWrapper: {
    flex: 1,
  }
})

export default connect()(AddProductView)
