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
import { connect } from 'react-redux'

import Button from '../components/Button'
import IconButton from '../components/IconButton'


/**
 *
 */
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

  /**
   *
   */
  formatMailBody() {
    const { supplier } = this.props.navigation.state.params
    let body = `${supplier.beginning}\n\n`

    this.state.products.forEach((product, index) => {
      if (this.state.counts[index] > 0) {
        body += `${this.state.counts[index]} ${product.name}\n`
      }
    })
    body += `\n${supplier.end}`

    return body
  }

  /**
   *
   */
  linkToEmail() {
    const { supplier } = this.props.navigation.state.params

    return Linking.openURL(
      `mailto:${supplier.email}`
      + `?subject=${supplier.subject || ''}`
      + `&body=${this.formatMailBody()}`
    ).then(() => this.props.navigation.navigate('home'))
  }

  /**
   *
   */
  linkToSMS() {
    const { supplier } = this.props.navigation.state.params
    Linking.openURL(
      `sms:${supplier.phone}`
      + `?body=${this.formatMailBody()}`
    ).then(() => this.props.navigation.navigate('home'))
  }

  /**
   *
   */
  renderCategories() {
    if (!this.state.categories.map) {
      return (
        <View style={styles.container}>
          <Text>. . .</Text>
        </View>
      )
    }

    return this.state.categories.map((category, index) => {
      return (
        <View
          key={`c${index}`}
          style={styles.categoryContainer}>
          <View style={styles.categoryHeader}>
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

  /**
   *
   * @param {*} category
   */
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
            style={styles.productContainer}>
            <View style={styles.productRow}>
              <View style={styles.productDisplay}>
                <Text>
                  {product.reference
                    ? `${product.name} - ${product.reference}`
                    : product.name}
                </Text>
              </View>
              <View style={styles.counterText}>
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

  /**
   *
   */
  renderButtons() {
    const { supplier } = this.props.navigation.state.params

    if (supplier.email && supplier.phone) {
      return (
        <View style={styles.buttonInner}>
          <View style={{ flex: 1, marginRight: 5, }}>
            <Button
              text={I18n.t('sms')}
              onPress={() => this.linkToSMS()}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 5, }}>
            <Button
              text={I18n.t('email')}
              reversed={true}
              onPress={() => this.linkToEmail()}
            />
          </View>
        </View>
      )
    }

    return (
      <Button
        text={I18n.t('sendOrder')}
        onPress={() => {
          if (supplier.email && !supplier.phone) {
            this.linkToEmail()
          } else if (supplier.phone && !supplier.email) {
            this.linkToSMS()
          }
        }}
      />
    )
  }

  /**
   *
   */
  render() {
    const { supplier } = this.props.navigation.state.params

    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {this.renderCategories()}
        </ScrollView>
        <View style={styles.buttonOutter}>
          {this.renderButtons()}
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
  },
  scrollContainer: {
    padding: 30,
  },
  buttonOutter: {
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  buttonInner: {
    flexDirection: 'row',
  },
  counterText: {
    justifyContent: 'center',
    padding: 10,
  },
  productDisplay: {
    flex: 1,
    justifyContent: 'center',
  },
  productContainer: {
    flex: 1,
    borderBottomWidth: 1,
    paddingLeft: 20,
    paddingVertical: 5,
  },
  productRow: {
    flex: 1,
    flexDirection: 'row',
  },
  categoryContainer: {
    flex: 1,
    marginTop: 10,
  },
  categoryHeader: {
    backgroundColor: '#61A8BA',
    flex: 1,
    padding: 10,
  },
})

export default connect()(OrderView)
