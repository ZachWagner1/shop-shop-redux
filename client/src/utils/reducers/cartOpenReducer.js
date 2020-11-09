import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    CLEAR_CART,
    TOGGLE_CART
} from '../../utils/types';

const cartOpenReducer = (state = false, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return true;

        case REMOVE_FROM_CART:
            let newState = action.cart.filter((product) => {
                return product._id !== action._id;
            });
            return newState.length > 0;

        case UPDATE_CART_QUANTITY:
            return true;

        case CLEAR_CART:
            return false;

        case TOGGLE_CART:
            return !state;

        default:
            return state;
    }
};

export default cartOpenReducer;