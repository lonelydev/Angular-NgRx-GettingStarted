import { Product } from '../product';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductActionTypes, ProductActions } from './product.actions';

export interface State extends fromRoot.State {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
  error: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: [],
  error: ''
};

/**
 * There is no forward referencing in typescript, so declare constants in the order of usage.
 * If one has to be used later, declare it first.
 */
const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  state => state.currentProduct
);

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

export const getError = createSelector(
  getProductFeatureState,
  state => state.error
);

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
        currentProduct: { ...action.payload }
      };

    case ProductActionTypes.ClearCurrentProduct:
      return {
        ...state,
        currentProduct: null
      };

    case ProductActionTypes.InitializeCurrentProduct:
      return {
        ...state,
        currentProduct: {
          id: 0,
          productName: '',
          productCode: 'New',
          description: '',
          starRating: 0
        }
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

    default:
      return state; // return original unmodified state
  }
}
