import {
    ADD_TO_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART
} from '../../utils/types';

const cartReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return [...state, action.product];

        case ADD_MULTIPLE_TO_CART:
            return [...state, ...action.products];

        case REMOVE_FROM_CART:
            let newState = action.cart.filter((product) => {
                return product._id !== action._id;
            });
            console.log('Old cart: ', action.cart);
            console.log('New cart: ', newState);

            return newState;

        case UPDATE_CART_QUANTITY:
            return state.map((product) => {
                if (action._id === product._id) {
                    product.purchaseQuantity = action.purchaseQuantity;
                }
                return product;
            });

        case CLEAR_CART:
            return [];

        default:
            return state;
    }
};

export default cartReducer;