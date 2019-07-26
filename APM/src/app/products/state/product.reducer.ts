/**
 * Reducers generally takes two parameters
 * @param state The state from the store
 * @param action
 */
export function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_PRODUCT_CODE':
      return {
        ...state, // copy over existing state
        showProductCode: action.payload // replace value of this one
      };
    default:
      return state; // return original unmodified state
  }
}
