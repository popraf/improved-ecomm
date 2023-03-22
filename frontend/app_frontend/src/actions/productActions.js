import {
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_REQUEST,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET
} from '../constants/productConstants';
import axios from 'axios';

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_LIST_REQUEST})
        const { data } = await axios.get('/api/products/')
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail // In the backend, I have set up error message to return detail
                ? error.response.data.detail : error.message,
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST})
        const { data } = await axios.get(`/api/product/${id}`)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail : error.message,
        })
    }
}

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        })

        const {
            userLoginInfo: { userLoginInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userLoginInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/manage/product/update/${product._id}/`,
            product,
            config
        )
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data,
        })


        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })

        const {
            userLoginInfo: { userLoginInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userLoginInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/manage/product/delete/${id}/`,
            config
        )

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        })


    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const createProduct = (createdProduct) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })

        const {
            userLoginInfo: { userLoginInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userLoginInfo.token}`
            }
        }

        const { data } = await axios.post(
            `/api/manage/product/create/`,
            createdProduct,
            config
        )
        
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data,
        })


    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


// export const userRegisterAction = (name, email, password) => async (dispatch) => {
//     try {
//         dispatch({
//             type: USER_REGISTER_REQUEST
//         })
        
//         const config = {headers: {
//             'Content-type':'application/json'
//         }}
//         const {data} = await axios.post(
//             '/api/user/register/',
//             {
//                 'name':name,
//                 'email':email,
//                 'password':password
//             },
//             config
//             )

//         dispatch({
//             type: USER_REGISTER_SUCCESS,
//             payload: data
//         })

//         dispatch({
//             type: USER_LOGIN_SUCCESS,
//             payload: data
//         })

//     } catch (error) {
//         dispatch({
//             type: USER_REGISTER_FAILURE,
//             payload: error.response && error.response.data.detail
//                 ? error.response.data.detail
//                 : error.message,
//         })
//     }
// }
