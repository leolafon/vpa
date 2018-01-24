/**
 * VPA - 2018
 * leo.lafon@epitech.eu
 */

import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, StyleSheet } from 'react-native'


/**
 *
 * @param {*} props
 */
const DataRow = props =>
  <View style={styles.container}>
    <Text style={styles.label}>
      {props.label}
    </Text>
    <Text>
      {props.value}
    </Text>
  </View>

DataRow.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    color: '#61A8BA',
  },
})

export default DataRow
