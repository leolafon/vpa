/**
 * VPA - 2018
 * leo.lafon@epitech.eu
 */

import React from 'react'
import I18n from 'ex-react-native-i18n'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Linking,
} from 'react-native'

import Button from '../components/Button'
import IconButton from '../components/IconButton'


class OrderView extends React.Component {
  constructor(props) {
    super(props)

    const { categories, products } = props.navigation.state.params
    this.state = {
      categories: categories.map(item => item.category),
      products: products.slice(),
      counts: products.map(() => 0),
    }
  }

  formatMailBody() {
    const { supplier } = this.props.navigation.state.params
    let body = `${supplier.beginning},\n`

    this.state.products.forEach((product, index) => {
      if (this.state.counts[index] > 0) {
        body += `${this.state.counts[index]}x ${product.name}\n`
      }
    })
    body += `\n${supplier.end}`

    return body
  }

  renderCategories() {
    if (!this.state.categories.map) {
      return (
        <View>
          <Text>toto</Text>
        </View>
      )
    }

    return this.state.categories.map((category, index) => {
      return (
        <View
          key={`c${index}`}
          style={{ flex: 1, marginTop: 10, }}>
          <View style={{
            backgroundColor: '#61A8BA',
            flex: 1,
            padding: 10,
          }}>
            <Text style={{ color: 'white'}}>
              {category}
            </Text>
          </View>
          <View>
            {this.renderProductsByCategory(category)}
          </View>
        </View>
      )
    })
  }

  renderProductsByCategory(category) {
    return this.state.products
      .filter(product => product.category === category)
      .map((product, index) => {
        const trueIndex = this.state.products.findIndex(item => {
          return item.id === product.id
        })

        return (
          <View
            key={`p${index}`}
            style={{
              flex: 1,
              borderBottomWidth: 1,
              paddingLeft: 20,
              paddingVertical: 5,
            }}>
            <View style={{
              flex: 1,
              flexDirection: 'row',
            }}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text>
                  {`${product.name} - ${product.reference}`}
                </Text>
              </View>
              <View style={{ justifyContent: 'center', padding: 10, }}>
                <Text>
                  {this.state.counts[trueIndex]}
                </Text>
              </View>
              <View style={{
                flexDirection: 'row',
              }}>
                <IconButton
                  name='minus'
                  size={30}
                  mergeStyle={true}
                  reversed={true}
                  style={{width: 50, marginRight: 10,}}
                  onPress={() => {
                    if (this.state.counts[trueIndex] > 0) {
                      const _counts = this.state.counts
                      _counts[trueIndex] -= 1
                      this.setState({ counts: _counts })
                    }
                  }}
                />
                <IconButton
                  name='plus'
                  size={30}
                  mergeStyle={true}
                  style={{width: 50}}
                  onPress={() => {
                    const _counts = this.state.counts
                    _counts[trueIndex] += 1
                    this.setState({ counts: _counts })
                }}
                />
              </View>
            </View>
          </View>
        )
      })
  }

  render() {
    const { supplier } = this.props.navigation.state.params

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ padding: 30 }}>
          {this.renderCategories()}
        </ScrollView>
        <View style={{ paddingHorizontal: 30, paddingVertical: 10, }}>
          <Button
            text={I18n.t('sendOrder')}
            onPress={() => {
              Linking.openURL(
                `mailto:${supplier.email}`
                + `?subject=${I18n.t('order')}`
                + `&body=${this.formatMailBody()}`
              )
            }}
          />
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
  }
})

export default OrderView
