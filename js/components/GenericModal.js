/**
 * VPA - 2018
 * leo.lafon@epitech.eu
 */

import React from 'react'
import {
  Modal,
  View,
  Text,
  StyleSheet
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import Button from './Button'


/**
 *
 * @param {*} props
 */
const GenericModal = props => {
  const {
    success,
    successCallback,
    errorCallback,
    message,
    hideModal,
    ...modalProps
  } = props
  return (
    <Modal
      animationType='slide'
      transparent={true}
      {...modalProps}>
      <View style={styles.outter}>
        <View style={styles.inner}>
          <View style={styles.header}>
            <FontAwesome
              name={success ? 'check' : 'remove'}
              size={32}
              color='#61A8BA'
            />
          </View>
          <View style={styles.body}>
            <Text>
              {message}
            </Text>
          </View>
          <View style={styles.footer}>
            <Button
              text='OK'
              onPress={() => {
                hideModal()
                if (success && successCallback) {
                  successCallback()
                } else if (!success && errorCallback) {
                  errorCallback()
                }
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  outter: {
    flex: 1,
    paddingHorizontal: 50,
    paddingVertical: 150,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  inner: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  header: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#61A8BA',
    paddingVertical: 10,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  footer: {
    padding: 20,
  }
})

export default GenericModal
