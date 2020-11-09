import { UPDATE_PRODUCTS } from '../../utils/actions';

const productsReducer = (state = [], action) => {
    switch (action.type) {
        case UPDATE_PRODUCTS:
            return [ ...action.products ]

		default:
			return state;
    }
};

export default productsReducer; 