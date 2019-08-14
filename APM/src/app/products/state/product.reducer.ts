import { Product } from '../product';
import { ProductActionTypes, ProductActions } from './product.actions';

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: ''
};

/**
 * Reducers generally takes two parameters
 * @param state The state from the store
 * @param action
 */
export function reducer(
  state = initialState,
  action: ProductActions
): ProductState {
  console.log('existing state: ' + JSON.stringify(state));
  switch (action.type) {
    case ProductActionTypes.ToggleProductCode:
      console.log('payload: ' + JSON.stringify(action.payload));
      return {
        ...state, // copy over existing state
        showProductCode: action.payload // replace value of this one
      };

    case ProductActionTypes.SetCurrentProduct:
      return {
        ...state,
        /**
         * We pass a reference to the current product to the store. This means, changing the current product
         * would automatically change the reference values. But as we should maintain immutability of the state,
         * we create a copy of it using the ... operator.
         */
        currentProductId: action.payload.id
      };

    case ProductActionTypes.ClearCurrentProduct:
      return {
        ...state,
        currentProductId: null
      };

    case ProductActionTypes.InitializeCurrentProduct:
      return {
        ...state,
        currentProductId: 0
      };

    case ProductActionTypes.LoadSuccess:
      return {
        ...state,
        products: action.payload,
        error: ''
      };

    case ProductActionTypes.LoadFail:
      return {
        ...state,
        products: [],
        error: action.payload
      };

    case ProductActionTypes.UpdateProductSuccess:
      // create a new array of products with the edited product in place
      // of the existing one.
      const updatedProducts = state.products.map(item =>
        action.payload.id === item.id ? action.payload : item
      );
      return {
        ...state,
        products: updatedProducts,
        currentProductId: action.payload.id,
        error: ''
      };

    case ProductActionTypes.UpdateProductFail:
      return {
        ...state,
        error: action.payload // payload is the error message here
      };

    case ProductActionTypes.AddProductSuccess:
      const newListOfProducts = state.products.map(item => item);
      newListOfProducts.push(action.payload);
      return {
        ...state,
        products: newListOfProducts,
        currentProductId: action.payload.id,
        error: ''
      };

    case ProductActionTypes.DeleteProductFail:
    case ProductActionTypes.AddProductFail:
      return {
        ...state,
        error: action.payload
      };

    case ProductActionTypes.DeleteProductSuccess:
      return {
        ...state,
        products: state.products.filter(item => item.id !== action.payload),
        currentProductId: null,
        error: ''
      };

    default:
      return state; // return original unmodified state
  }
}
