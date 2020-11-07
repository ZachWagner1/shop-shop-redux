import { createStore } from 'redux';

//import reducer from './reducer';
import allReducer from './reducers'

// const initialState = {
//     products: [],
//     cart: [],
//     cartOpen: false,
//     categories: [],
//     currentCategory: ''
// }

const store = createStore(allReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store; 