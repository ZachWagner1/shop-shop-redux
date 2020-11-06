import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { idbPromise } from '../../utils/helpers';
import ProductItem from '../ProductItem';
import { QUERY_PRODUCTS } from '../../utils/queries';
import spinner from '../../assets/spinner.gif';

function ProductList() {
  const state = useSelector((state) => state);
	const dispatch = useDispatch();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(
		() => {
			// if there's data to be stored
			if (data) {
				// store it in the global state object
				dispatch({
					type     : UPDATE_PRODUCTS,
					products : data.products
				});

        data.products.forEach((product) => {
					idbPromise('products', 'put', product);
				});
				// check if 'loading' is undefined in 'useQuery()' hook. no connection to server
			} else if (!loading) {
				// get all data from 'products' store
				idbPromise('products', 'get').then((products) => {
					// use retrieved data to set global state for offline
					dispatch({
						type     : UPDATE_PRODUCTS,
						products : products
					});
				});
			}
		},
		[ data, loading, dispatch ]
	);

  function filterProducts() {
		if (!currentCategory) {
			return state.products;
		}

    return state.products.filter(
			(product) => product.category._id === currentCategory
		);
	}

  return (
		<div className="my-2">
			<h2>Our Products:</h2>
			{state.products.length ? (
				<div className="flex-row">
					{filterProducts().map((product) => (
						<ProductItem
							key={product._id}
							_id={product._id}
							image={product.image}
							name={product.name}
							price={product.price}
							quantity={product.quantity}
						/>
					))}
				</div>
			) : (
				<h3>You haven't added any products yet!</h3>
			)}
			{loading ? <img src={spinner} alt="loading" /> : null}
		</div>
	);
}

export default ProductList;
