import { UPDATE_CATEGORIES } from '../../utils/types';

const categoriesReducer = (state = [], action) => {
	switch (action.type) {
		case UPDATE_CATEGORIES:
			return [ ...action.categories ];
		default:
			return state;
	}
};

export default categoriesReducer;