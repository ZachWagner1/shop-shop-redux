import {
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY
} from '../../utils/actions';

const categoriesReducer = (state, action) => {
    switch (action.type) {
        // if action type value is the value of 'UPDATE_CATEGORIES', return a new state object with an updated products array
        case UPDATE_CATEGORIES:
            return {
                ...state,
                categories: [...action.categories]
            };

        case UPDATE_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.currentCategory
            };

        default:
            return state;
    }
}

export default categoriesReducer;