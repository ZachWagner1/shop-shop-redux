import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { updateCategories, updateCurrentCategory } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';

function CategoryMenu() {
	//data from DB w/ Apollo
	const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

	const { categories } = useSelector((state) => state);

	const dispatch = useDispatch();

	useEffect(
		() => {
			if (categoryData) {
				// execute our dispatch function with our action object
				dispatch(updateCategories(categoryData.categories));
				//write to IndexedDB
				categoryData.categories.forEach((category) => {
					idbPromise('categories', 'put', category);
				});
			} else if (!loading) {
				idbPromise('categories', 'get').then((categories) => {
					dispatch(updateCategories(categories));
				});
			}
		},
		[categoryData, loading, dispatch]
	);

	const handleClick = (id) => {
		dispatch(updateCurrentCategory(id));
	};

	return (
		<div>
			<h2>Choose a Category:</h2>

			{categories ? (
				categories.map((item) => (
					<button
						key={item._id}
						onClick={() => {
							handleClick(item._id);
						}}
					>
						{item.name}
					</button>
				))
			) : null}
		</div>
	);
}

export default CategoryMenu;