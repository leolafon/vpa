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
      phone: supplier.phone,
      subject: supplier.subject,
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
                this.hideModal()
                this.setState({ isReady: true })
                this.props.dispatch(NavigationActions.back())
              })
          }}
          errorCallback={() => this.hideModal()}
        />
        <ScrollView>
          <View style={styles.formContainer}>
            <LabelTextInput
              label={I18n.t('name')}
              value={this.state.name}
              onChangeText={(text) => {
                this.setState({ name: text })
              }}
            />
            <LabelTextInput
              label={I18n.t('email')}
              value={this.state.email}
              autoCapitalize='none'
              keyboardType='email-address'
              onChangeText={(text) => {
                this.setState({ email: text })
              }}
            />
            <LabelTextInput
              label={I18n.t('phone')}
              value={this.state.phone}
              autoCapitalize='none'
              keyboardType='phone-pad'
              onChangeText={(text) => {
                this.setState({ phone: text })
              }}
            />
            <LabelTextInput
              label={I18n.t('subject')}
              value={this.state.subject}
              onChangeText={(text) => {
                this.setState({ subject: text })
              }}
            />
            <LabelTextInput
              label={I18n.t('beginning')}
              multiline={true}
              textArea={true}
              value={this.state.beginning}
              onChangeText={(text) => {
                this.setState({ beginning: text })
              }}
            />
            <LabelTextInput
              label={I18n.t('end')}
              multiline={true}
              textArea={true}
              value={this.state.end}
              onChangeText={(text) => {
                this.setState({ end: text })
              }}
            />
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button
            text={I18n.t('continue')}
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
    paddingHorizontal: 20,
  },
  formContainer: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
  }
})

export default connect()(EditSupplierView)
