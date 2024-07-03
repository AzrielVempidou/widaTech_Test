// ProductReducer.js
import {
  PRODUCT_FETCH_SUCCESS,
  SEARCH_PRODUCTS_SUCCESS
} from '../action/actionType';

const initialState = {
  products: [],
  searchedProducts: []
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_FETCH_SUCCESS:
      return {
        ...state,
        products: action.payload.products
      };
    case SEARCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        searchedProducts: action.payload.products
      };
    default:
      return state;
  }
};

export default ProductReducer;
