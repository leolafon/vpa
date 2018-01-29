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
  StatusBar,
} from 'react-native'
import I18n from 'ex-react-native-i18n'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'

import LabelTextInput from '../components/LabelTextInput'
import Button from '../components/Button'
import GenericModal from '../components/GenericModal'
import Spinner from '../components/Spinner'
import { addSupplier, getTable } from '../api'


/**
 * Home view
 */
class AddSupplierView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isReady: true,
      modalMessage: '',
      modalVisible: false,
      success: false,
    }
  }

  hideModal() {
    this.setState({ modalVisible: false })
  }

  render() {
    if (!this.state.isReady) {
      return <Spinner/>
    }

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
                this.hideModal()
              })
          }}
          errorCallback={() => this.hideModal()}
        />
        <ScrollView>
          <View style={styles.formContainer}>
            <LabelTextInput
              label={I18n.t('name')}
              onChangeText={(text) => {
                this.setState({ name: text })
              }}
            />
            <LabelTextInput
              label={I18n.t('email')}
              autoCapitalize='none'
              keyboardType='email-address'
              onChangeText={(text) => {
                this.setState({ email: text })
              }}
            />
            <LabelTextInput
              label={I18n.t('phone')}
              autoCapitalize='none'
              keyboardType='phone-pad'
              onChangeText={(text) => {
                this.setState({ phone: text })
              }}
            />
            <LabelTextInput
              label={I18n.t('beginning')}
              multiline={true}
              autoGrow={true}
              onChangeText={(text) => {
                this.setState({ beginning: text })
              }}
            />
            <LabelTextInput
              label={I18n.t('end')}
              multiline={true}
              autoGrow={true}
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
              addSupplier(this.state)
                .then(() => {
                  console.log('add success')
                  this.setState({
                    success: true,
                    modalVisible: true,
                    modalMessage: I18n.t('addSupplierSuccess')
                  })
                })
                .catch((error) => {
                  console.warn(error)
                  this.setState({
                    success: false,
                    modalVisible: true,
                    modalMessage: I18n.t('addSupplierFailure')
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

export default connect()(AddSupplierView)
