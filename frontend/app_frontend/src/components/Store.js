import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { productListReducer, productDetailsReducer } from '../reducers/productReducers';
import { userCartReducer } from '../reducers/userCartReducer';
import { userLoginReducer, userRegisterReducer } from '../reducers/userReducer';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    userCartItems: userCartReducer,
    userLoginInfo: userLoginReducer,
    userRegister: userRegisterReducer,
})

const userLoginInfoFromStorage = localStorage.getItem('userLoginInfo') ? JSON.parse(localStorage.getItem('userLoginInfo')) : null

const userCartItemsFromStorage = localStorage.getItem('userCartItems') ? JSON.parse(localStorage.getItem('userCartItems')) : []

const initialState = {
    userCartItems:{userCartItems: userCartItemsFromStorage},
    userLoginInfo:{userLoginInfo: userLoginInfoFromStorage}
}
const middleware = [thunk]

const store = createStore(reducer, initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
    )

export default store