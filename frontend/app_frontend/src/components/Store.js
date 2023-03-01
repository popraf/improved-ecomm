import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { productListReducer, productDetailsReducer } from '../reducers/productReducers';
import { userCartReducer } from '../reducers/userCartReducer';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    userCartItems: userCartReducer
})
const userCartItemsFromStorage = localStorage.getItem('userCartItems') ? JSON.parse(localStorage.getItem('userCartItems')) : []

const initialState = {
    userCartItems:{userCartItems: userCartItemsFromStorage}
}
const middleware = [thunk]

const store = createStore(reducer, initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
    )

export default store