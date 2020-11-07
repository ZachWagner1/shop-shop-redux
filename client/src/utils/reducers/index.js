import { combineReducers } from 'redux';

import productsReducer from './productsReducer'
import cartReducer from './cartReducer'
import cartOpenReducer from './cartOpenReducer'
import categoriesReducer from './categoriesReducer'
import currentCategoryReducer from './currentCategoryReducer'

const allReducer = combineReducers({ 
  products: productsReducer,
  cart: cartReducer, 
  cartOpen: cartOpenReducer,
  categories: categoriesReducer,
  currentCategory: currentCategoryReducer
})

export default allReducer; 