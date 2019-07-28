import { Product } from '../product';

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

/**
 * Reducers generally takes two parameters
 * @param state The state from the store
 * @param action
 */
export function reducer(state, action) {
  console.log('existing state: ' + JSON.stringify(state));
  console.log('payload: ' + JSON.stringify(action.payload));
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
