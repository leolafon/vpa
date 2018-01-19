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
      return {
        suppliers: action.suppliers.items
      }
    }
    default: {
      return state
    }
  }
}
