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
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: []
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
         * new current product should also be similarly copied like the state.
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

    default:
      return state; // return original unmodified state
  }
}
