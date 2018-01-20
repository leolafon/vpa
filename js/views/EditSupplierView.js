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
import I18n from 'ex-react-native-i18n'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'

import LabelTextInput from '../components/LabelTextInput'
import Button from '../components/Button'
import GenericModal from '../components/GenericModal'
import Spinner from '../components/Spinner'
import { editSupplier, getTable } from '../api'


/**
 * Home view
 */
class EditSupplierView extends React.Component {
  constructor(props) {
    super(props)
    const { supplier } = this.props.navigation.state.params
    this.state = {
      isReady: true,
      modalMessage: '',
      modalVisible: false,
      success: false,
      name: supplier.name,
      email: supplier.email,
      beginning: supplier.beginning,
      end: supplier.end,
    }
  }

  hideModal() {
    this.setState({ modalVisible: false })
  }

  render() {
    if (!this.state.isReady) {
      return <Spinner/>
    }
    const { supplier } = this.props.navigation.state.params

    return (
      <View
        style={styles.container}>
        <GenericModal
          success={this.state.success}
          visible={this.state.modalVisible}
          message={this.state.modalMessage}
          onRequestClose={() => this.hideModal()}
          hideModal={() => this.hideModal()}
          successCallback={() => {
            this.setState({ isReady: false })
            getTable('suppliers')
              .then(items => {
                this.props.dispatch({
                  type: 'FETCH_SUPPLIERS',
                  suppliers: items
                })
              })
              .then(() => {
                this.setState({ isReady: true })
                this.props.dispatch(NavigationActions.back())
              })
          }}
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
              label='Email'
              value={this.state.email}
              autoCapitalize='none'
              keyboardType='email-address'
              onChangeText={(text) => {
                this.setState({ email: text })
              }}
            />
            <LabelTextInput
              label='Beginning of message'
              value={this.state.beginning}
              onChangeText={(text) => {
                this.setState({ beginning: text })
              }}
            />
            <LabelTextInput
              label='End of message'
              value={this.state.end}
              onChangeText={(text) => {
                this.setState({ end: text })
              }}
            />
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button
            text='OK'
            onPress={() => {
              editSupplier(supplier.id, this.state)
                .then(() => {
                  console.log('edit supplier success')
                  this.setState({
                    success: true,
                    modalVisible: true,
                    modalMessage: I18n.t('editSupplierSuccess')
                  })
                })
                .catch((error) => {
                  console.warn(error)
                  this.setState({
                    success: false,
                    modalVisible: true,
                    modalMessage: I18n.t('editSupplierFailure')
                  })
                })
            }}
          />
        </View>
        <KeyboardSpacer/>
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
  }
})

export default connect()(EditSupplierView)
