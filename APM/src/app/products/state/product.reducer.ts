export function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_PRODUCT_CODE':
      return {
        ...state, //copy over existing state
        showProductCode: action.payload // replace value of this one
      };
    default:
      return state;
  }
}
