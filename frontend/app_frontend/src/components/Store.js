import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { productListReducer, productDetailsReducer } from '../reducers/productReducers';
import { userCartReducer } from '../reducers/userCartReducer';
import { userLoginReducer, userRegisterReducer, userProfileReducer, userProfileUpdateReducer, userListReducer } from '../reducers/userReducer';
import { shippingAddressReducer } from '../reducers/shippingReducers';
import { paymentMethodReducer } from '../reducers/paymentReducers';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListMyReducer, orderListReducer, orderDeliverReducer } from '../reducers/orderReducers';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    userCartItems: userCartReducer,
    userLoginInfo: userLoginReducer,
    userRegister: userRegisterReducer,
    userProfile: userProfileReducer,
    userProfileUpdate: userProfileUpdateReducer,
    shippingAddress: shippingAddressReducer,
    paymentMethod: paymentMethodReducer,
    userList: userListReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,
})

const userLoginInfoFromStorage = localStorage.getItem('userLoginInfo') ? JSON.parse(localStorage.getItem('userLoginInfo')) : null

const userCartItemsFromStorage = localStorage.getItem('userCartItems') ? JSON.parse(localStorage.getItem('userCartItems')) : []

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : null
const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : null

const initialState = {
    userCartItems:{userCartItems: userCartItemsFromStorage},
    userLoginInfo:{userLoginInfo: userLoginInfoFromStorage},
    shippingAddress:{shippingAddress: shippingAddressFromStorage},
    paymentMethod:{paymentMethod: paymentMethodFromStorage},
}

const middleware = [thunk]

const store = createStore(reducer, initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
    )

export default store