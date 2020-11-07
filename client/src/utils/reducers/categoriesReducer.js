import { UPDATE_CATEGORIES } from '../../utils/actions';

const categoriesReducer = (state, action) => {
    switch (action.type) {
        // if action type value is the value of 'UPDATE_CATEGORIES', return a new state object with an updated products array
        case UPDATE_CATEGORIES:
            return [...action.categories];
        // categories : [ ...action.categories ]
        default:
            return state;
    }
};

export default categoriesReducer;