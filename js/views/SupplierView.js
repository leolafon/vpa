/**
 * VPA - 2018
 * leo.lafon@epitech.eu
 */

import React from 'react'
import {
  View,
  Text,
  StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import I18n from 'ex-react-native-i18n'
import { NavigationActions } from 'react-navigation'

import Button from '../components/Button'
import IconButton from '../components/IconButton'
import ChoiceModal from '../components/ChoiceModal'
import Spinner from '../components/Spinner'
import { deleteRowById, getTable } from '../api'


/**
 *
 * @param {*} props
 */
const DataRow = props =>
  <View style={{ marginBottom: 10 }}>
    <Text style={{ color: '#61A8BA' }}>
      {props.label}
    </Text>
    <Text>
      {props.value}
    </Text>
  </View>


/**
 *
 */
class SupplierView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      isReady: true,
    }
  }

  hideModal() {
    this.setState({ modalVisible: false })
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
              onPress={() => {
                this.setState({ modalVisible: true })
              }}
            />
          </View>
        </View>
        <View style={{ flex: 2 }}>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: 'white',
  },
  supplier: {
    flex: 1,
    flexDirection: 'row'
  },
  supplierData: {
    flex: 1,
    flexDirection: 'column',
  },
})

const mapStateToProps = state => ({
  data: state.data,
})

export default connect(mapStateToProps)(SupplierView)
