import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_PRODUCTS } from '../utils/queries';
import {
  removeFromCart,
  updateCartQuantity,
  addToCart,
  updateProducts
} from '../utils/actions';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';

import Cart from '../components/Cart';

function Detail() {
  const state = useSelector((state) => state);
  const { products, cart } = state;

  const dispatch = useDispatch();

  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);


  useEffect(
    () => {
      // already in global store
      if (products.length) {
        setCurrentProduct(products.find((product) => product._id === id));
        // retrieve from server
      } else if (data) {
        dispatch(updateProducts(data.products));

        data.products.forEach((product) => {
          idbPromise('products', 'put', product);
        });
        // get cache from idb
      } else if (!loading) {
        idbPromise('products', 'get').then((indexedProducts) => {
          dispatch(updateProducts(indexedProducts));
        });
      }
    },
    [products, data, loading, dispatch, id]
  );

  const addItemToCart = () => {
    // find cart item with matching id
    const itemInCart = cart.find((cartItem) => cartItem._id === id);

    // if match, call UPDATE with new purchase quantity
    if (itemInCart) {
      dispatch(updateCartQuantity(id, (parseInt(itemInCart.purchaseQuantity) + 1)));
      // updating quantity, use existing item data and increment purchaseQuantity value by one
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch(addToCart({ ...currentProduct, purchaseQuantity: 1 }));
      // if product isn't in cart yet, add it to the current shopping cart in IndexedDB
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const removeItemFromCart = () => {
    dispatch(removeFromCart(currentProduct._id, cart));

    // upon removal from cart, delete the item from IndexedDB using the 'currentProduct._id' to locate what to remove
    idbPromise('cart', 'delete', { ...currentProduct });
  };

  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>
						${currentProduct.price}{' '}
            <button onClick={addItemToCart}>Add to Cart</button>
            <button
              disabled={!cart.find((p) => p._id === currentProduct._id)}
              onClick={removeItemFromCart}
            >
              Remove from Cart
						</button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;