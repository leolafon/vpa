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
import KeyboarSpacer from 'react-native-keyboard-spacer'
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
    if (!this.state.isReady) {
      return <Spinner/>
    }

    return (
      <View style={styles.container}>
        <GenericModal
          success={this.state.success}
          visible={this.state.modalVisible}
          message={this.state.modalMessage}
          onRequestClose={() => this.closeModal()}
          successCallback={() => {
            this.setState({ isReady: false })
            getTable('products')
              .then(items => {
                this.props.dispatch({
                  type: 'FETCH_PRODUCTS',
                  products: items
                })
              })
              .then(() => {
                this.setState({ isReady: true })
                this.props.close()
              })
          }}
        />
        <View style={styles.header}>
          <Text style={styles.title}>
            New product
          </Text>
        </View>
        <ScrollView>
          <View style={styles.form}>
            <LabelTextInput
              label='Name'
              onChangeText={(text) => {
                this.setState({ name: text })
              }}
            />
            <LabelTextInput
              label='Category'
              onChangeText={(text) => {
                this.setState({ category: text })
              }}
            />
            <LabelTextInput
              label='Reference (optional)'
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
                addProduct(this.props.supplierId, this.state)
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
                this.props.close()
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
  header: {
    marginBottom: 30,
  },
  title: {
    color: '#61A8BA',
    alignSelf: 'center',
    fontSize: 20,
  },
  form: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  buttonWrapper: {
    flex: 1,
  }
})

export default connect()(AddProductView)
