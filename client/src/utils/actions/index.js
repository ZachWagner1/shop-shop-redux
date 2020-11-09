import {
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    UPDATE_PRODUCTS,
    ADD_TO_CART,
    UPDATE_CART_QUANTITY,
    TOGGLE_CART,
    ADD_MULTIPLE_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART
} from '../types';

export const updateCategories = (categories) => {
    return {
        type: UPDATE_CATEGORIES,
        categories
    };
};

export const updateCurrentCategory = (id) => {
    return {
        type: UPDATE_CURRENT_CATEGORY,
        currentCategory: id
    };
};

export const updateProducts = (products) => {
    return {
        type: UPDATE_PRODUCTS,
        products
    };
};

export const addToCart = (product) => {
    return {
        type: ADD_TO_CART,
        product: product
    };
};

export const updateCartQuantity = (id, purchaseQuantity) => {
    return {
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity
    };
};

export const toggleCart = () => {
    return {
        type: TOGGLE_CART
    };
};

export const addMultipleToCart = (products) => {
    return {
        type: ADD_MULTIPLE_TO_CART,
        products
    };
};

export const removeFromCart = (id, cart) => {
    return {
        type: REMOVE_FROM_CART,
        _id: id,
        cart
    };
};

export const clearCart = (id) => {
    return {
        type: CLEAR_CART,
        _id: id
    };
};