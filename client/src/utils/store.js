import { createStore } from 'redux';

import reducer from './reducer';
//import allReducer from './reducers'

const store = createStore(allReducer,
//     {
//         products: [],
//         cart: [],
//         cartOpen: false,
//         categories: [],
//         currentCategory: ''
//     },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store; 