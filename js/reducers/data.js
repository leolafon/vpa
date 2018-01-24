/**
 * VPA - 2018
 * leo.lafon@epitech.eu
 */


 /**
  * Data reducer
  */
export const data = (state = {}, action) => {
  switch(action.type) {
    case 'FETCH_SUPPLIERS': {
      return Object.assign({}, state, {
        suppliers: action.suppliers.items,
      })
    }
    case 'FETCH_PRODUCTS': {
      return Object.assign({}, state, {
        products: action.products.items,
      })
    }
    default: {
      return state
    }
  }
}
